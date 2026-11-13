import { address as bitcoinAddress, networks } from "bitcoinjs-lib";
import bs58check from "bs58check";
import { getAddress } from "@ethersproject/address";

export const PAYMENT_DEFAULTS = {
  applePayEnabled: "false",
  btcEnabled: "false",
  btcAddress: "",
  usdtEnabled: "false",
  usdtNetwork: "",
  usdtAddress: "",
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
export function paymentReadiness(
  s,
  { stripeKey, stripeWebhook, stripePublishable },
) {
  const mode = /^(sk|rk)_live_/.test(stripeKey) ? "live" : "test";
  return {
    applePayConfigured:
      isTrue(s.applePayEnabled) &&
      !!stripeWebhook &&
      /^(sk|rk)_(test|live)_/.test(stripeKey) &&
      stripePublishable.startsWith("pk_" + mode + "_"),
    applePayMode: mode,
    btcConfigured:
      isTrue(s.btcEnabled) && validWallet("btc", s.btcAddress, "bitcoin"),
    usdtConfigured:
      isTrue(s.usdtEnabled) &&
      validWallet("usdt", s.usdtAddress, s.usdtNetwork),
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
  ])
    if (!["true", "false"].includes(s[key]))
      throw Error("Choose a valid payment method status");
  if (s.btcAddress && !validWallet("btc", s.btcAddress, "bitcoin"))
    throw Error("Enter a valid Bitcoin mainnet receiving address");
  if (s.usdtAddress && !validWallet("usdt", s.usdtAddress, s.usdtNetwork))
    throw Error(
      "Choose Ethereum (ERC-20) or Tron (TRC-20) and enter a valid USDT receiving address",
    );
  if (isTrue(s.btcEnabled) && !s.btcAddress)
    throw Error("Add a BTC receiving address before enabling Bitcoin");
  if (isTrue(s.usdtEnabled) && !s.usdtAddress)
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
  ["btc", "usdt", "wire", "cashapp"].includes(method);
export function receivingDetails(method, s) {
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
  return {
    type: "crypto",
    asset: method.toUpperCase(),
    network: method === "btc" ? "bitcoin" : s.usdtNetwork,
    address: method === "btc" ? s.btcAddress : s.usdtAddress,
  };
}
