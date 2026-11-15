import festivalData from "../src/components/FestivalData.js";

let data;
festivalData({ s(entries) {
  data = {};
  for (let i = 0; i < entries.length; i += 3) data[entries[i]] = entries[i + 2];
} });

// Use the same hard-coded catalog as the festival pages, ignoring browser prices.
export function festivalProduct(id) {
  for (const pass of data.PASS_TIERS) {
    for (const variant of pass.variants) {
      if (id === `pass-${pass.id}-${variant.key}`) return {
        id, name: `${pass.short} — ${variant.title}`, kind: "festival",
        price_cents: Math.round(variant.price * variant.qty * 100), sizes: "[]", inventory: null,
      };
    }
  }
  for (const pack of data.HOTEL_PACKAGES) {
    for (const property of data.PROPERTIES) {
      for (let guests = 2; guests <= 10; guests++) {
        if (id === `hotel-${pack.id}-${property.id}-${guests}` && pack.prices[property.id]) return {
          id, name: `${property.name} · ${pack.name} · ${guests} guests`, kind: "festival",
          price_cents: Math.round(pack.prices[property.id] * guests * 100), sizes: "[]", inventory: null,
        };
      }
    }
  }
  return null;
}
