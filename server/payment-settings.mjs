import { address as bitcoinAddress, networks } from "bitcoinjs-lib";
import bs58check from "bs58check";
import { getAddress } from "@ethersproject/address";

export const PAYMENT_DEFAULTS = {
  applePayEnabled: "false",
  applePayButtonLabel: "Apple Pay instructions",
  applePayDescription:
    "View the payment instructions supplied by the administrator.",
  applePayTitle: "Payment instructions",
  applePayInstructions: "",
  applePayRecipientLabel: "Receiving details",
  applePayRecipient: "",
  applePayContinueLabel: "Continue with these instructions",
  applePayReferenceLabel: "Payment reference",
  applePayReceiptLabel: "Receipt image",
  applePaySubmitLabel: "Submit payment details for review",
  applePayReviewTitle: "Payment under review",
  applePayReviewMessage:
    "Your payment details have been submitted. An administrator will verify the payment before activating your order.",
  applePayReceiptRequired: "true",
  btcEnabled: "false",
  btcAddress: "",
  usdtEnabled: "false",
  usdtNetwork: "",
  usdtAddress: "",
  usdtEthereumAddress: "",
  usdtTronAddress: "",
  wireEnabled: "false",
  wireBeneficiary: "",
  wireBank: "",
  wireAccount: "",
  wireRouting: "",
  wireSwift: "",
  wireBankAddress: "",
  wireBeneficiaryAddress: "",
  wireInstructions: "",
};
const isTrue = (value) => value === "true";
const validRouting = (value) =>
  /^\d{9}$/.test(value) &&
  Number(value) > 0 &&
  [...value].reduce(
    (sum, digit, index) => sum + Number(digit) * [3, 7, 1][index % 3],
    0,
  ) %
    10 ===
    0;
export function validWallet(asset, address, network) {
  try {
    if (asset === "btc") {
      bitcoinAddress.toOutputScript(address, networks.bitcoin);
      return true;
    }
    if (asset === "usdt" && network === "ethereum") {
      getAddress(address);
      return true;
    }
    if (asset === "usdt" && network === "tron") {
      const bytes = bs58check.decode(address);
      return bytes.length === 21 && bytes[0] === 65;
    }
  } catch {}
  return false;
}
export function wireReady(s) {
  return !!(
    s.wireBeneficiary &&
    s.wireBank &&
    s.wireAccount &&
    s.wireBankAddress &&
    s.wireBeneficiaryAddress &&
    (validRouting(s.wireRouting) ||
      /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(s.wireSwift))
  );
}
export function usdtNetworks(s) {
  return [
    {
      network: "ethereum",
      label: "Ethereum (ETH) · ERC-20",
      address:
        s.usdtEthereumAddress ||
        (s.usdtNetwork === "ethereum" ? s.usdtAddress : ""),
    },
    {
      network: "tron",
      label: "Tron · TRC-20",
      address:
        s.usdtTronAddress || (s.usdtNetwork === "tron" ? s.usdtAddress : ""),
    },
  ].filter((n) => validWallet("usdt", n.address, n.network));
}
export function paymentReadiness(s) {
  return {
    applePayConfigured:
      isTrue(s.applePayEnabled) &&
      !!s.applePayInstructions?.trim() &&
      !!s.applePayButtonLabel?.trim() &&
      !!s.applePayTitle?.trim(),
    applePayMode: "manual",
    applePayButtonLabel:
      s.applePayButtonLabel || PAYMENT_DEFAULTS.applePayButtonLabel,
    applePayDescription:
      s.applePayDescription || PAYMENT_DEFAULTS.applePayDescription,
    btcConfigured:
      isTrue(s.btcEnabled) && validWallet("btc", s.btcAddress, "bitcoin"),
    usdtConfigured: isTrue(s.usdtEnabled) && usdtNetworks(s).length > 0,
    usdtNetworks: isTrue(s.usdtEnabled)
      ? usdtNetworks(s).map(({ network, label }) => ({ network, label }))
      : [],
    wireConfigured: isTrue(s.wireEnabled) && wireReady(s),
    methods: ["applepay", "btc", "usdt", "wire"],
  };
}
export function validatePaymentSettings(s) {
  for (const key of [
    "applePayEnabled",
    "btcEnabled",
    "usdtEnabled",
    "wireEnabled",
    "applePayReceiptRequired",
  ])
    if (!["true", "false"].includes(s[key]))
      throw Error("Choose a valid payment method status");
  if (
    isTrue(s.applePayEnabled) &&
    (!s.applePayInstructions?.trim() ||
      !s.applePayButtonLabel?.trim() ||
      !s.applePayTitle?.trim() ||
      !s.applePayContinueLabel?.trim() ||
      !s.applePayReferenceLabel?.trim() ||
      !s.applePayReceiptLabel?.trim() ||
      !s.applePaySubmitLabel?.trim() ||
      !s.applePayReviewTitle?.trim() ||
      !s.applePayReviewMessage?.trim())
  )
    throw Error(
      "Complete the customer-facing label, title, instructions, continue button, reference label, and review message before enabling this option",
    );
  if (s.btcAddress && !validWallet("btc", s.btcAddress, "bitcoin"))
    throw Error("Enter a valid Bitcoin mainnet receiving address");
  for (const [key, network] of [
    ["usdtEthereumAddress", "ethereum"],
    ["usdtTronAddress", "tron"],
  ])
    if (s[key] && !validWallet("usdt", s[key], network))
      throw Error(`Enter a valid USDT ${network} receiving address`);
  if (s.usdtAddress && !validWallet("usdt", s.usdtAddress, s.usdtNetwork))
    throw Error(
      "Choose Ethereum (ERC-20) or Tron (TRC-20) and enter a valid USDT receiving address",
    );
  if (isTrue(s.btcEnabled) && !s.btcAddress)
    throw Error("Add a BTC receiving address before enabling Bitcoin");
  if (isTrue(s.usdtEnabled) && !usdtNetworks(s).length)
    throw Error("Add a network and receiving address before enabling USDT");
  if (s.wireRouting && !validRouting(s.wireRouting))
    throw Error("Enter a valid nine-digit US wire routing number");
  if (s.wireSwift && !/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(s.wireSwift))
    throw Error("Enter a valid 8- or 11-character SWIFT/BIC");
  if (isTrue(s.wireEnabled) && !wireReady(s))
    throw Error(
      "Complete the beneficiary, bank, account, both addresses, and routing number or SWIFT code before enabling wire transfer",
    );
}
export const isManual = (method) =>
  ["applepay", "btc", "usdt", "wire", "cashapp"].includes(method);
export function receivingDetails(method, s, network) {
  if (method === "applepay")
    return {
      type: "manual_instructions",
      label: s.applePayButtonLabel,
      title: s.applePayTitle,
      instructions: s.applePayInstructions,
      recipientLabel: s.applePayRecipientLabel,
      recipient: s.applePayRecipient,
      continueLabel: s.applePayContinueLabel,
      referenceLabel: s.applePayReferenceLabel,
      receiptLabel: s.applePayReceiptLabel,
      submitLabel: s.applePaySubmitLabel,
      reviewTitle: s.applePayReviewTitle,
      reviewMessage: s.applePayReviewMessage,
      receiptRequired: s.applePayReceiptRequired === "true",
    };
  if (method === "wire")
    return {
      type: "wire",
      beneficiary: s.wireBeneficiary,
      bank: s.wireBank,
      account: s.wireAccount,
      routing: s.wireRouting,
      swift: s.wireSwift,
      bankAddress: s.wireBankAddress,
      beneficiaryAddress: s.wireBeneficiaryAddress,
      instructions: s.wireInstructions,
    };
  const wallet =
    method === "usdt"
      ? usdtNetworks(s).find((n) => n.network === network)
      : null;
  if (method === "usdt" && !wallet)
    throw Error("Choose an available USDT receiving network");
  return {
    type: "crypto",
    asset: method.toUpperCase(),
    network: method === "btc" ? "bitcoin" : wallet.network,
    address: method === "btc" ? s.btcAddress : wallet.address,
  };
}
