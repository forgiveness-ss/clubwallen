import React from "react";
import { ManualInstructions } from "./PaymentInstructions.jsx";
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
          {toggle(
            "applePayEnabled",
            "Offer the editable instruction option at checkout",
          )}
          <p>
            This option opens your own instruction panel. No Stripe account or
            payment API is used. The customer-facing panel states that admin
            verification is required.
          </p>
          {field("applePayButtonLabel", "Checkout option / button label")}
          {field("applePayDescription", "Short checkout description")}
          {field("applePayTitle", "Instruction heading")}
          <label>
            Instructions shown to customers
            <textarea
              rows={6}
              maxLength={5000}
              value={form.applePayInstructions || ""}
              onChange={(e) =>
                setForm({ ...form, applePayInstructions: e.target.value })
              }
            />
          </label>
          {field("applePayRecipientLabel", "Receiving details label")}
          {field("applePayRecipient", "Receiving number or other details", {
            autoComplete: "off",
          })}
          {field(
            "applePayContinueLabel",
            "Instruction panel continue button text",
          )}
          {field("applePayReferenceLabel", "Payment reference field label")}
          {field("applePayReceiptLabel", "Receipt upload label")}
          {field("applePaySubmitLabel", "Submit payment details button text")}
          {field("applePayReviewTitle", "Heading after submission")}
          {toggle(
            "applePayReceiptRequired",
            "Require a receipt image when the customer submits payment details",
          )}
          <label>
            Message after submission
            <textarea
              rows={3}
              maxLength={1500}
              value={form.applePayReviewMessage || ""}
              onChange={(e) =>
                setForm({ ...form, applePayReviewMessage: e.target.value })
              }
            />
          </label>
          <p>
            Use accurate instructions for the service receiving the payment.
            Preview the panel below before saving. Updates apply to new orders;
            existing orders retain the details already issued.
          </p>
          <ManualInstructions
            details={{
              title: form.applePayTitle,
              instructions: form.applePayInstructions,
              recipientLabel: form.applePayRecipientLabel,
              recipient: form.applePayRecipient,
            }}
          />
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
