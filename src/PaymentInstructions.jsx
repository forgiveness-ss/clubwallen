import React from "react";
import { loadStripe } from "@stripe/stripe-js/pure";
import { api, money } from "./backend-client.js";
import { navigate } from "./navigation.js";

export const paymentLabel = (method) =>
  ({
    applepay: "Apple Pay",
    btc: "Bitcoin (BTC)",
    usdt: "Tether (USDT)",
    wire: "Wire transfer",
    cashapp: "Cash App (existing order)",
    card: "Card (existing order)",
    crypto: "Stablecoin (existing order)",
  })[method] || method;
export const manualMethod = (method) =>
  ["btc", "usdt", "wire", "cashapp"].includes(method);
export function PaymentInstructions({ order, onRefresh }) {
  const details = order.payment_details || {},
    crypto = ["btc", "usdt"].includes(order.method),
    expired = details.expiresAt && details.expiresAt < new Date().toISOString();
  const [busy, setBusy] = React.useState(false),
    [error, setError] = React.useState(""),
    [copied, setCopied] = React.useState("");
  async function copy(value) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
    } catch {
      setError("Select and copy the value shown below.");
    }
  }
  async function refresh() {
    setBusy(true);
    try {
      await api("/api/order/quote" + location.search, {
        method: "POST",
        body: {},
      });
      await onRefresh();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  const fields = crypto
    ? [
        [
          "Network",
          details.network === "bitcoin"
            ? "Bitcoin mainnet"
            : details.network === "ethereum"
              ? "Ethereum · ERC-20"
              : "Tron · TRC-20",
        ],
        ["Receiving address", details.address],
      ]
    : [
        ["Beneficiary", details.beneficiary],
        ["Beneficiary address", details.beneficiaryAddress],
        ["Bank", details.bank],
        ["Bank address", details.bankAddress],
        ["Account number", details.account],
        ["Wire routing number", details.routing],
        ["SWIFT / BIC", details.swift],
      ];
  return (
    <section className="payment-instructions">
      <h2>{paymentLabel(order.method)}</h2>
      {crypto ? (
        <>
          {!details.amount || details.quoteRequested ? (
            <div className="crm-alert">
              Your order is saved. We’re waiting for an exact crypto amount. An
              administrator can issue your quote; this page updates
              automatically. Please wait before sending funds.
            </div>
          ) : (
            <>
              <p className="payment-total">
                {details.amount} {details.asset}
              </p>
              <p className="crm-muted">
                Equivalent order total: {money(order.amount_cents)} · Quote{" "}
                {expired
                  ? "expired"
                  : "valid until " +
                    new Date(details.expiresAt).toLocaleTimeString()}
                {details.source && " · " + details.source}
              </p>
              {expired && (
                <div className="crm-alert">
                  This quote expired. Request a new amount before sending. If
                  you already transferred, submit your transaction hash below
                  for review.
                </div>
              )}
            </>
          )}
          <p className="crm-alert">
            Send only {details.asset} on the{" "}
            {details.network === "bitcoin"
              ? "Bitcoin"
              : details.network === "ethereum"
                ? "Ethereum (ERC-20)"
                : "Tron (TRC-20)"}{" "}
            network shown here. Other assets or networks won’t match this order.
          </p>
        </>
      ) : (
        <p>
          Transfer {money(order.amount_cents)} in USD. Include your order ID as
          the payment reference. Your bank may charge transfer fees.
        </p>
      )}
      <dl className="payment-detail-list">
        {fields
          .filter(([, value]) => value)
          .map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>
                <span>{value}</span>
                {[
                  "Receiving address",
                  "Account number",
                  "Wire routing number",
                  "SWIFT / BIC",
                ].includes(label) && (
                  <button
                    type="button"
                    className="crm-row-action"
                    onClick={() => copy(value)}
                  >
                    {copied === value ? "Copied" : "Copy"}
                  </button>
                )}
              </dd>
            </div>
          ))}
      </dl>
      {!crypto && details.instructions && (
        <p className="crm-message-body">{details.instructions}</p>
      )}
      {crypto &&
        ["unpaid", "rejected"].includes(order.payment_status) &&
        (!details.amount || expired || details.quoteRequested) && (
          <button className="crm-secondary" disabled={busy} onClick={refresh}>
            {busy ? "Requesting…" : "Request updated quote"}
          </button>
        )}
      {error && <p className="crm-error">{error}</p>}
    </section>
  );
}
export function ApplePay({ order, query }) {
  const mount = React.useRef(null),
    [message, setMessage] = React.useState("Checking Apple Pay availability…"),
    [error, setError] = React.useState("");
  React.useEffect(() => {
    let active = true,
      element;
    (async () => {
      const payment = await api("/api/order/applepay?" + query);
      const stripe = await loadStripe(payment.publishableKey);
      if (!active) return;
      if (!stripe) throw Error("Apple Pay could not load. Please retry.");
      const elements = stripe.elements({
        clientSecret: payment.clientSecret,
        appearance: { theme: "night", variables: { colorPrimary: "#c8aa50" } },
      });
      element = elements.create("expressCheckout", {
        buttonHeight: 50,
        buttonType: { applePay: "buy" },
        paymentMethods: {
          applePay: "always",
          googlePay: "never",
          link: "never",
          paypal: "never",
          amazonPay: "never",
          klarna: "never",
        },
        layout: { maxColumns: 1, maxRows: 1 },
      });
      element.on("ready", ({ availablePaymentMethods }) => {
        if (active)
          setMessage(
            availablePaymentMethods?.applePay
              ? "Confirm your payment using Apple Pay."
              : "Apple Pay isn’t available on this device or browser. Use a supported device with Apple Wallet set up, or return to checkout and choose BTC, USDT, or wire transfer.",
          );
      });
      element.on("loaderror", () => {
        if (active)
          setError(
            "Apple Pay could not load. Check your connection or choose another payment method.",
          );
      });
      element.on("confirm", async (event) => {
        if (event.expressPaymentType !== "apple_pay") {
          event.paymentFailed({ reason: "fail" });
          return;
        }
        setError("");
        try {
          const submit = await elements.submit();
          if (submit.error) throw Error(submit.error.message);
          const result = await stripe.confirmPayment({
            elements,
            clientSecret: payment.clientSecret,
            confirmParams: { return_url: payment.returnUrl },
            redirect: "if_required",
          });
          if (result.error) throw Error(result.error.message);
          if (active) navigate("/checkout/result?" + query);
        } catch (e) {
          if (active) setError(e.message);
          event.paymentFailed({ reason: "fail" });
        }
      });
      element.mount(mount.current);
    })().catch((e) => {
      if (active) setError(e.message);
    });
    return () => {
      active = false;
      element?.destroy();
    };
  }, [query]);
  return (
    <section className="payment-instructions">
      <h2>Pay with Apple Pay</h2>
      <p>{message}</p>
      <div ref={mount} />
      {error && (
        <p className="crm-error" role="alert">
          {error}
        </p>
      )}
      <p className="crm-muted">
        {money(order.amount_cents)} USD · Payment is confirmed by Stripe before
        your order is activated.
      </p>
      <a href="/checkout" className="text-link">
        Choose another payment method →
      </a>
    </section>
  );
}
