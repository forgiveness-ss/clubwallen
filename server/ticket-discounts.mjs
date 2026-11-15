// Prices and item kinds must come from the server catalog, never the browser.
export function ticketDiscount(items, rawCode) {
  const code = String(rawCode || "").trim().toUpperCase();
  if (!code) return { code: "", amount: 0 };
  const rules = { MOWA1: ["festival", 50], MOWA101: ["ticket", 30] };
  const rule = rules[code];
  if (!rule) throw Error("Invalid promo code.");
  const eligible = items.filter((item) => item.kind === rule[0]);
  if (!eligible.length) throw Error("This promo code does not apply to these items.");
  const cents = eligible.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  return { code, amount: Math.round(cents * rule[1] / 100) };
}
