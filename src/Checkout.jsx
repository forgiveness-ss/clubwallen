import React from "react";
import { api, money } from "./backend-client.js";
import { Link, navigate } from "./navigation.js";
import {
  ApplePay,
  PaymentInstructions,
  paymentLabel,
  manualMethod,
} from "./PaymentInstructions.jsx";
function readCart() {
  try {
    return JSON.parse(localStorage.getItem("cw_cart") || "[]");
  } catch {
    return [];
  }
}
const available = (status, method) =>
  ({
    applepay: status.applePayConfigured,
    btc: status.btcConfigured,
    usdt: status.usdtConfigured,
    wire: status.wireConfigured,
  })[method];
export function StoreCheckout() {
  const query = new URLSearchParams(location.search),
    membership = query.get("type") === "membership";
  const selectedPlan =
    query.get("productId") ||
    "membership-" +
      ((query.get("name") || "").includes("Front Row")
        ? "frontrow"
        : (query.get("name") || "").includes("Backroad")
          ? "backroad"
          : "crew");
  const [items, setItems] = React.useState(() =>
      membership
        ? [
            {
              productId: selectedPlan,
              quantity: 1,
              size: query.get("size") || "M",
            },
          ]
        : readCart().map((i) => ({
            productId: i.id,
            quantity: i.quantity,
            size: i.size || "",
          })),
    ),
    [catalog, setCatalog] = React.useState([]),
    [status, setStatus] = React.useState(null),
    [form, setForm] = React.useState({
      name: "",
      email: "",
      address: {
        line1: "",
        city: "",
        state: "",
        zip: "",
        country: "United States",
      },
    }),
    [method, setMethod] = React.useState("applepay"),
    [error, setError] = React.useState(""),
    [busy, setBusy] = React.useState(false);
  React.useEffect(() => {
    Promise.all([api("/api/catalog"), api("/api/status")])
      .then(([data, status]) => {
        setCatalog(data.products);
        setStatus(status);
        setMethod(
          ["applepay", "btc", "usdt", "wire"].find((method) =>
            available(status, method),
          ) || "applepay",
        );
      })
      .catch((e) => setError(e.message));
  }, []);
  const rows = items.map((i) => ({
      ...i,
      product: catalog.find((p) => p.id === i.productId),
    })),
    subtotal = rows.reduce(
      (sum, i) => sum + (i.product?.price_cents || 0) * i.quantity,
      0,
    ),
    hasMerch = rows.some((i) => i.product?.kind === "merch"),
    shipping = hasMerch && subtotal <= 10000 ? 999 : 0;
  function update(next) {
    setItems(next);
    if (!membership) {
      const previous = readCart();
      localStorage.setItem(
        "cw_cart",
        JSON.stringify(
          next.map((i) => ({
            ...previous.find((p) => p.id === i.productId),
            id: i.productId,
            size: i.size,
            quantity: i.quantity,
          })),
        ),
      );
    }
  }
  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const data = await api("/api/orders", {
        method: "POST",
        body: { ...form, method, items },
      });
      navigate(data.url);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="commerce-page">
      <div className="commerce-heading">
        <p className="crm-eyebrow">SECURE CHECKOUT · USD</p>
        <h1>Complete your order.</h1>
        <p>One place for your next Club Wallen experience.</p>
      </div>
      {error && (
        <p className="crm-error" role="alert">
          {error}
        </p>
      )}
      {!status ? (
        <p>
          {error
            ? "Checkout is temporarily unavailable. Please refresh and try again."
            : "Loading checkout…"}
        </p>
      ) : !items.length ? (
        <div className="utility-card">
          <h2>Your cart is empty.</h2>
          <Link className="gold-button" href="/shop">
            Explore the shop
          </Link>
        </div>
      ) : (
        <form onSubmit={submit} className="commerce-grid">
          <div>
            <section className="commerce-card">
              <h2>Your details</h2>
              <label>
                Full name
                <input
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </label>
              <label>
                Email address
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </label>
              <p className="crm-muted">
                Use the same email for your customer account to see your order
                history.
              </p>
            </section>
            {hasMerch && (
              <section className="commerce-card">
                <h2>Shipping address</h2>
                {[
                  ["line1", "Street address", "street-address"],
                  ["city", "City", "address-level2"],
                  ["state", "State", "address-level1"],
                  ["zip", "ZIP code", "postal-code"],
                  ["country", "Country", "country-name"],
                ].map(([key, label, auto]) => (
                  <label key={key}>
                    {label}
                    <input
                      required
                      autoComplete={auto}
                      value={form.address[key]}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          address: { ...form.address, [key]: e.target.value },
                        })
                      }
                    />
                  </label>
                ))}
              </section>
            )}
            <section className="commerce-card">
              <h2>Choose how to pay</h2>
              {[
                [
                  "applepay",
                  "Apple Pay",
                  "Pay using Apple Wallet on a supported device.",
                ],
                [
                  "btc",
                  "Bitcoin · BTC",
                  "Transfer on Bitcoin mainnet. Payment is verified before activation.",
                ],
                [
                  "usdt",
                  "Tether · USDT",
                  "Transfer on the exact network shown with your receiving address.",
                ],
                [
                  "wire",
                  "Wire transfer",
                  "Receive bank instructions, then submit your transfer receipt.",
                ],
              ].map(([key, label, copy]) => (
                <label
                  className={
                    "commerce-method " + (method === key ? "selected" : "")
                  }
                  key={key}
                >
                  <input
                    type="radio"
                    name="payment-method"
                    value={key}
                    checked={method === key}
                    disabled={!available(status, key)}
                    onChange={() => setMethod(key)}
                  />
                  <div>
                    <strong>{label}</strong>
                    <p>{copy}</p>
                    {!available(status, key) && (
                      <small>Currently unavailable</small>
                    )}
                  </div>
                </label>
              ))}
              {membership && (
                <div className="crm-alert">
                  One-year membership · manual yearly renewal.
                </div>
              )}
              {method === "applepay" && status.applePayMode === "test" && (
                <div className="crm-alert">
                  Apple Pay is in Stripe test mode.
                </div>
              )}
            </section>
          </div>
          <aside className="commerce-card commerce-summary">
            <h2>Order summary</h2>
            {rows.map((i, index) => (
              <div className="commerce-line" key={index}>
                <div>
                  <strong>{i.product?.name || "Unavailable item"}</strong>
                  <small>Size {i.size || "Standard"}</small>
                  {!membership && (
                    <div className="commerce-quantity">
                      <button
                        type="button"
                        aria-label={"Decrease quantity for " + i.product?.name}
                        onClick={() =>
                          update(
                            items
                              .map((v, n) =>
                                n === index
                                  ? { ...v, quantity: v.quantity - 1 }
                                  : v,
                              )
                              .filter((v) => v.quantity > 0),
                          )
                        }
                      >
                        −
                      </button>
                      <span>{i.quantity}</span>
                      <button
                        type="button"
                        aria-label={"Increase quantity for " + i.product?.name}
                        onClick={() =>
                          update(
                            items.map((v, n) =>
                              n === index
                                ? {
                                    ...v,
                                    quantity: Math.min(20, v.quantity + 1),
                                  }
                                : v,
                            ),
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
                <b>{money((i.product?.price_cents || 0) * i.quantity)}</b>
              </div>
            ))}
            <div className="commerce-totals">
              <p>
                <span>Subtotal</span>
                <strong>{money(subtotal)}</strong>
              </p>
              <p>
                <span>Shipping</span>
                <strong>{shipping ? money(shipping) : "Included"}</strong>
              </p>
              <p className="commerce-total">
                <span>Total USD</span>
                <strong>{money(subtotal + shipping)}</strong>
              </p>
            </div>
            {error && <p className="crm-error">{error}</p>}
            <button
              className="gold-button"
              disabled={
                busy ||
                rows.some((i) => !i.product) ||
                !available(status, method)
              }
            >
              {busy
                ? "Creating your order…"
                : "Continue with " + paymentLabel(method)}
            </button>
            <p className="crm-muted">
              Your membership is activated after payment is verified.
            </p>
            <Link className="text-link" href="/shop">
              Continue shopping →
            </Link>
          </aside>
        </form>
      )}
    </div>
  );
}
export function OrderResult() {
  const params = new URLSearchParams(location.search),
    query = new URLSearchParams({
      order: params.get("order") || "",
      token: params.get("token") || "",
    }).toString();
  const [data, setData] = React.useState(null),
    [image, setImage] = React.useState(""),
    [reference, setReference] = React.useState(""),
    [error, setError] = React.useState(""),
    [busy, setBusy] = React.useState(false);
  const load = React.useCallback(
    () =>
      api("/api/order?" + query)
        .then(setData)
        .catch((e) => setError(e.message)),
    [query],
  );
  React.useEffect(() => {
    load();
    const timer = setInterval(load, 8000);
    return () => clearInterval(timer);
  }, [load]);
  function file(e) {
    const f = e.target.files[0];
    if (!f) return;
    if (f.size > 3 * 1024 * 1024) {
      setError("Choose an image under 3 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImage(String(reader.result));
    reader.readAsDataURL(f);
  }
  async function send(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api("/api/order/proof?" + query, {
        method: "POST",
        body: { image, reference },
      });
      await load();
      setImage("");
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  const order = data?.order,
    crypto = order && ["btc", "usdt"].includes(order.method),
    review = order?.payment_status === "awaiting_review",
    paid = order?.payment_status === "paid";
  return (
    <div className="utility-page">
      <div className="utility-card wide">
        <p className="eyebrow">THE EXCLUSIVE · ORDER STATUS</p>
        <h1>
          {paid
            ? "Payment verified."
            : review
              ? "Transfer under review."
              : order?.method === "applepay"
                ? "Complete Apple Pay."
                : order?.status === "quote_requested"
                  ? "Your crypto quote is being prepared."
                  : "Complete your transfer."}
        </h1>
        {error && (
          <p className="crm-error" role="alert">
            {error}
          </p>
        )}
        {order && (
          <>
            <p className="payment-total">{money(order.amount_cents)}</p>
            <p className="crm-code">{order.id}</p>
            <p>
              {paid
                ? "Your order is recorded. Membership purchases are available in your account."
                : review
                  ? "Your transfer details are saved. An administrator will verify the actual funds before marking your order paid."
                  : "Keep this private order link to check your payment status."}
            </p>
            {order.payment_status === "rejected" && (
              <div className="crm-alert">
                The submitted transfer could not be verified. Check the payment
                details and submit the correct transaction reference, or contact
                support.
              </div>
            )}
            {order.method === "applepay" && !paid && (
              <ApplePay order={order} query={query} />
            )}
            {["btc", "usdt", "wire"].includes(order.method) && !paid && (
              <PaymentInstructions order={order} onRefresh={load} />
            )}
            {manualMethod(order.method) &&
              ["unpaid", "rejected"].includes(order.payment_status) &&
              (!crypto || !!order.payment_details?.amount) && (
                <form onSubmit={send}>
                  <label>
                    {crypto
                      ? "Blockchain transaction hash"
                      : "Bank transfer reference"}
                    <input
                      required
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                      autoComplete="off"
                    />
                  </label>
                  <label>
                    Receipt image · maximum 3 MB{crypto ? " · optional" : ""}
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      required={!crypto}
                      onChange={file}
                    />
                  </label>
                  {image && (
                    <img
                      className="commerce-receipt-preview"
                      src={image}
                      alt="Your receipt preview"
                    />
                  )}
                  <button
                    className="gold-button"
                    disabled={busy || (!crypto && !image)}
                  >
                    {busy ? "Submitting…" : "Submit transfer for verification"}
                  </button>
                </form>
              )}
            <button className="text-link" onClick={load}>
              Refresh payment status
            </button>
            <Link href="/dashboard" className="gold-button">
              Your account →
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
