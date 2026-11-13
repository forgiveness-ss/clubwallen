export function cryptoAmount(cents, rate, asset) {
  if (
    !Number.isSafeInteger(cents) ||
    cents <= 0 ||
    !/^\d{1,12}(\.\d{1,18})?$/.test(rate)
  )
    throw Error("Invalid crypto quote");
  const [whole, part = ""] = rate.split("."),
    scale = 10n ** BigInt(part.length),
    price = BigInt(whole + part);
  if (price <= 0n) throw Error("Invalid crypto quote");
  const decimals = asset === "btc" ? 8 : 6,
    units =
      (BigInt(cents) * scale * 10n ** BigInt(decimals) + 100n * price - 1n) /
      (100n * price);
  const padded = units.toString().padStart(decimals + 1, "0");
  return padded.slice(0, -decimals) + "." + padded.slice(-decimals);
}
export function validCryptoAmount(value, asset) {
  return (
    typeof value === "string" &&
    new RegExp(
      "^\\d{1,10}(\\.\\d{1," + (asset === "btc" ? 8 : 6) + "})?$",
    ).test(value) &&
    Number(value) > 0
  );
}
export async function marketQuote(asset, cents, fetcher = fetch) {
  const pair = asset === "btc" ? "XBTUSD" : "USDTUSD";
  const response = await fetcher(
    "https://api.kraken.com/0/public/Ticker?pair=" + pair,
    {
      signal: AbortSignal.timeout(7000),
      headers: { Accept: "application/json" },
    },
  );
  const data = await response.json();
  const rates = Object.values(data.result || {});
  if (
    !response.ok ||
    data.error?.length ||
    rates.length !== 1 ||
    typeof rates[0].c?.[0] !== "string"
  )
    throw Error("Market quote unavailable");
  const rate = rates[0].c[0],
    at = new Date();
  return {
    amount: cryptoAmount(cents, rate, asset),
    usdRate: rate,
    source: "Kraken",
    quotedAt: at.toISOString(),
    expiresAt: new Date(at.getTime() + 15 * 60000).toISOString(),
  };
}
