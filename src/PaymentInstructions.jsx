import React from "react";
import { api, money } from "./backend-client.js";

export const paymentLabel = (method) =>
  ({
    applepay: "Manual payment instructions",
    btc: "Bitcoin (BTC)",
    usdt: "Tether (USDT)",
    wire: "Wire transfer",
    cashapp: "Cash App (existing order)",
    card: "Card (existing order)",
    crypto: "Stablecoin (existing order)",
  })[method] || method;
export const manualMethod = (method) =>
  ["applepay", "btc", "usdt", "wire", "cashapp"].includes(method);
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
export function ManualInstructions({ details }) {
  const [copied, setCopied] = React.useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(details.recipient);
      setCopied(true);
    } catch {}
  }
  return (
    <section className="payment-instructions">
      <p className="crm-eyebrow">
        INSTRUCTIONS ONLY · ADMIN VERIFICATION REQUIRED
      </p>
      <h2>{details.title}</h2>
      <div className="manual-payment-copy">{details.instructions}</div>
      {details.recipient && (
        <dl className="payment-detail-list">
          <div>
            <dt>{details.recipientLabel || "Receiving details"}</dt>
            <dd>
              <span>{details.recipient}</span>
              <button type="button" className="crm-row-action" onClick={copy}>
                {copied ? "Copied" : "Copy"}
              </button>
            </dd>
          </div>
        </dl>
      )}
    </section>
  );
}
export function InstructionModal({ details, onClose }) {
  const closeButton = React.useRef(null),
    previousFocus = React.useRef(null);
  React.useEffect(() => {
    previousFocus.current = document.activeElement;
    closeButton.current?.focus();
    const key = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const nodes = [
          ...document.querySelectorAll(".manual-instruction-dialog button"),
        ];
        const first = nodes[0],
          last = nodes.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("keydown", key);
      previousFocus.current?.focus();
    };
  }, [onClose]);
  return (
    <div className="crm-overlay" onClick={onClose}>
      <section
        className="crm-modal manual-instruction-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="manual-instruction-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="crm-modal-title">
          <h2 id="manual-instruction-title">{details.title}</h2>
          <button
            ref={closeButton}
            type="button"
            aria-label="Close instructions"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <ManualInstructions details={details} />
        <button type="button" className="crm-primary" onClick={onClose}>
          {details.continueLabel || "Continue"}
        </button>
      </section>
    </div>
  );
}
