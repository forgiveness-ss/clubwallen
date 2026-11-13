import React from "react";
export default function PaymentSettings({ data, busy, onSave }) {
  const [form, setForm] = React.useState(data.settings);
  React.useEffect(() => setForm(data.settings), [data]);
  const p = data.payments;
  const field = (key, label, props = {}) => (
    <label key={key}>
      {label}
      <input
        {...props}
        value={form[key] || ""}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
      />
    </label>
  );
  const toggle = (key, label) => (
    <label className="crm-check">
      <input
        type="checkbox"
        checked={form[key] === "true"}
        onChange={(e) => setForm({ ...form, [key]: String(e.target.checked) })}
      />
      {label}
    </label>
  );
  const badge = (ready) => (
    <span className={"crm-badge " + (ready ? "good" : "pending")}>
      {ready ? "Configured" : "Not enabled"}
    </span>
  );
  return (
    <form
      className="crm-settings"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(form);
      }}
    >
      <section className="crm-panel">
        <div className="crm-panel-heading">
          <h2>Business details</h2>
          <span>USD · United States</span>
        </div>
        <div className="crm-settings-body">
          {field("brand", "Business name")}
          {field("supportEmail", "Support email", { type: "email" })}
          <p>Memberships last one year and renew manually.</p>
        </div>
      </section>
      <section className="crm-panel">
        <div className="crm-panel-heading">
          <h2>Apple Pay</h2>
          {badge(p.applePayConfigured)}
        </div>
        <div className="crm-settings-body">
          {toggle("applePayEnabled", "Offer Apple Pay at checkout")}
          <p>
            Apple Pay uses Stripe and confirms payments automatically. Customers
            need a supported device and Apple Wallet.
          </p>
          <div className="crm-alert">
            One-time provider setup: configure STRIPE_SECRET_KEY,
            STRIPE_PUBLISHABLE_KEY, and STRIPE_WEBHOOK_SECRET in Vercel,
            register your website domain in Stripe, and redeploy. Secret keys
            are not entered in this dashboard.
          </div>
          <p className="crm-muted">
            Stripe mode: {p.applePayMode}. Webhook:{" "}
            <code>/api/webhooks/stripe</code>. Include{" "}
            <code>payment_intent.succeeded</code> and{" "}
            <code>charge.refunded</code>.
          </p>
        </div>
      </section>
      <section className="crm-panel">
        <div className="crm-panel-heading">
          <h2>Bitcoin · BTC</h2>
          {badge(p.btcConfigured)}
        </div>
        <div className="crm-settings-body">
          {toggle("btcEnabled", "Offer Bitcoin wallet transfers")}
          {field("btcAddress", "Bitcoin mainnet receiving address", {
            spellCheck: false,
            autoComplete: "off",
          })}
          <p>
            Customers receive an exact BTC quote and submit their transaction
            hash. Verify the destination, amount, and blockchain confirmations
            before approving payment.
          </p>
        </div>
      </section>
      <section className="crm-panel">
        <div className="crm-panel-heading">
          <h2>Tether · USDT</h2>
          {badge(p.usdtConfigured)}
        </div>
        <div className="crm-settings-body">
          {toggle("usdtEnabled", "Offer USDT wallet transfers")}
          <label>
            Receiving network
            <select
              value={form.usdtNetwork || ""}
              onChange={(e) =>
                setForm({ ...form, usdtNetwork: e.target.value })
              }
            >
              <option value="">Choose the network your wallet supports</option>
              <option value="ethereum">Ethereum · ERC-20</option>
              <option value="tron">Tron · TRC-20</option>
            </select>
          </label>
          {field("usdtAddress", "USDT receiving address on this network", {
            spellCheck: false,
            autoComplete: "off",
          })}
          <p>
            The selected network appears beside the address on every order. USDT
            transfers require your verification before activation.
          </p>
        </div>
      </section>
      <section className="crm-panel">
        <div className="crm-panel-heading">
          <h2>Wire transfer · USD</h2>
          {badge(p.wireConfigured)}
        </div>
        <div className="crm-settings-body">
          {toggle("wireEnabled", "Offer wire transfer")}
          {field("wireBeneficiary", "Beneficiary / account holder")}
          {field("wireBeneficiaryAddress", "Beneficiary address")}
          {field("wireBank", "Bank name")}
          {field("wireBankAddress", "Bank address")}
          {field("wireAccount", "Account number / IBAN", {
            autoComplete: "off",
          })}
          <div className="crm-form-grid">
            {field("wireRouting", "US wire routing number", {
              inputMode: "numeric",
              maxLength: 9,
            })}
            {field("wireSwift", "SWIFT / BIC", { maxLength: 11 })}
          </div>
          <label>
            Additional transfer instructions
            <textarea
              rows={4}
              value={form.wireInstructions || ""}
              onChange={(e) =>
                setForm({ ...form, wireInstructions: e.target.value })
              }
            />
          </label>
          <p>
            Provide the bank’s wire routing details. Customers submit a receipt;
            approve only after the funds arrive in your account.
          </p>
        </div>
      </section>
      <section className="crm-panel">
        <div className="crm-settings-body">
          <p>
            Saved destination changes apply to new orders. Existing orders keep
            their original receiving details. Only Apple Pay, BTC, USDT, and
            wire transfer are offered for new orders.
          </p>
          <button className="crm-primary" disabled={busy}>
            {busy ? "Saving…" : "Save payment settings"}
          </button>
        </div>
      </section>
    </form>
  );
}
