export default (e) => {
  "use strict";
  var t = e.i(40450),
    i = e.i(13742),
    r = e.i(6028);
  let a = [
      {
        category: "Membership",
        q: "What is Club Wallen: The Reserve?",
        a: "The Reserve is a yearly membership for Morgan Wallen fans that includes exclusive quarterly merch bundles, limited-edition member-only drops, a welcome gift, and special perks throughout 2026.",
      },
      {
        category: "Membership",
        q: "How much does the 2026 membership cost?",
        a: "The 2026 Reserve membership is $500. This one-time annual fee includes your welcome gift, four quarterly bundles with shipping included, and access to all members-only drops throughout the year.",
      },
      {
        category: "Membership",
        q: "Can I buy merch without becoming a member?",
        a: "Yes! Our public shop at clubwallen.com/shop is open to everyone. Members receive additional exclusive access to limited-edition drops not available to the general public.",
      },
      {
        category: "Shipping",
        q: "When will I receive my first box?",
        a: "Your welcome gift ships within 2–3 weeks of joining. Quarterly bundles are distributed throughout 2026. You will receive a shipping notification and tracking number for each delivery.",
      },
      {
        category: "Shipping",
        q: "Is shipping included in the membership?",
        a: "Yes — all bundle shipping costs are included in your 2026 Reserve membership fee. You will not be charged additional shipping for your quarterly boxes.",
      },
      {
        category: "Shipping",
        q: "Do you ship internationally?",
        a: "We ship to the United States, Canada, United Kingdom, and Australia. Additional international shipping fees may apply for addresses outside the continental US.",
      },
      {
        category: "Products",
        q: "What's included in the quarterly bundles?",
        a: "Each quarterly bundle features an assortment of premium exclusive products including hoodies, t-shirts, hats, and more. The exact contents vary each quarter and are kept secret as a surprise to members.",
      },
      {
        category: "Products",
        q: "Can I choose the items in my bundle?",
        a: "Bundle contents are curated and cannot be individually selected. You will choose your primary size during registration, which determines apparel sizing throughout the year.",
      },
      {
        category: "Products",
        q: "What are the members-only drops?",
        a: "Throughout 2026, Reserve members will receive access to limited-edition Morgan Wallen products exclusively available in your member portal. These items are not available for general public purchase.",
      },
      {
        category: "Account",
        q: "How do I access my member portal?",
        a: "After joining, create an account at clubwallen.com/signup and log in at clubwallen.com/login to access your member dashboard. Your portal includes bundle tracking, exclusive drop access, and member perks.",
      },
      {
        category: "Account",
        q: "Can I transfer or gift a membership?",
        a: "Memberships are tied to a single account and shipping address. They cannot currently be transferred to another person. Gift memberships may be available — contact support for details.",
      },
    ],
    n = ["All", "Membership", "Shipping", "Products", "Account"];
  e.s([
    "default",
    0,
    function () {
      let [e, o] = (0, i.useState)("All"),
        [s, l] = (0, i.useState)(null),
        c = "All" === e ? a : a.filter((t) => t.category === e);
      return (0, t.jsx)("div", {
        style: {
          minHeight: "100vh",
          background: "#0a0a0a",
          padding: "80px 24px 100px",
        },
        children: (0, t.jsxs)("div", {
          style: { maxWidth: 760, margin: "0 auto" },
          children: [
            (0, t.jsxs)("div", {
              style: { textAlign: "center", marginBottom: 64 },
              children: [
                (0, t.jsx)("p", {
                  style: {
                    fontSize: 10,
                    letterSpacing: 6,
                    color: "#5a5040",
                    textTransform: "uppercase",
                    marginBottom: 16,
                  },
                  children: "Questions",
                }),
                (0, t.jsx)("h1", {
                  style: {
                    fontSize: "clamp(28px, 4vw, 48px)",
                    color: "#f0e8d0",
                  },
                  children: "Frequently Asked Questions",
                }),
                (0, t.jsx)("div", {
                  style: {
                    width: 40,
                    height: 1,
                    background: "#c8a84b",
                    margin: "20px auto 0",
                  },
                }),
              ],
            }),
            (0, t.jsx)("div", {
              style: {
                display: "flex",
                gap: 8,
                marginBottom: 48,
                flexWrap: "wrap",
                justifyContent: "center",
              },
              children: n.map((i) =>
                (0, t.jsx)(
                  "button",
                  {
                    type: "button",
                    onClick: () => o(i),
                    style: {
                      padding: "7px 18px",
                      background: e === i ? "#c8a84b" : "transparent",
                      color: e === i ? "#0a0a0a" : "#5a5040",
                      border: `1px solid ${e === i ? "#c8a84b" : "#2a2a2a"}`,
                      fontSize: 11,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      borderRadius: 2,
                      cursor: "pointer",
                    },
                    children: i,
                  },
                  i,
                ),
              ),
            }),
            c.map((e, i) =>
              (0, t.jsxs)(
                "div",
                {
                  style: { borderBottom: "1px solid #141414" },
                  children: [
                    (0, t.jsxs)("button", {
                      type: "button",
                      onClick: () => l(s === i ? null : i),
                      style: {
                        width: "100%",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "24px 0",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 16,
                        textAlign: "left",
                      },
                      children: [
                        (0, t.jsxs)("div", {
                          style: { flex: 1 },
                          children: [
                            (0, t.jsx)("span", {
                              style: {
                                fontSize: 10,
                                letterSpacing: 3,
                                color: "#4a3c24",
                                textTransform: "uppercase",
                                display: "block",
                                marginBottom: 6,
                              },
                              children: e.category,
                            }),
                            (0, t.jsx)("span", {
                              style: { fontSize: 15, color: "#c0b080" },
                              children: e.q,
                            }),
                          ],
                        }),
                        (0, t.jsx)("span", {
                          style: {
                            color: "#c8a84b",
                            fontSize: 22,
                            lineHeight: 1,
                            flexShrink: 0,
                            marginTop: 2,
                          },
                          children: s === i ? "−" : "+",
                        }),
                      ],
                    }),
                    s === i &&
                      (0, t.jsx)("div", {
                        style: { paddingBottom: 24, paddingLeft: 8 },
                        children: (0, t.jsx)("p", {
                          style: {
                            fontSize: 14,
                            color: "#5a5040",
                            lineHeight: 1.8,
                          },
                          children: e.a,
                        }),
                      }),
                  ],
                },
                i,
              ),
            ),
            (0, t.jsxs)("div", {
              style: {
                textAlign: "center",
                marginTop: 72,
                padding: "48px 40px",
                background: "#111",
                border: "1px solid #2a2010",
              },
              children: [
                (0, t.jsx)("p", {
                  style: { fontSize: 15, color: "#7a6850", marginBottom: 24 },
                  children:
                    "Still have questions? Our support team is here to help.",
                }),
                (0, t.jsx)(r.default, {
                  href: "mailto:support@clubwallen.site",
                  style: {
                    display: "inline-block",
                    border: "1px solid #c8a84b",
                    color: "#c8a84b",
                    padding: "12px 32px",
                    fontSize: 11,
                    letterSpacing: 3,
                    textTransform: "uppercase",
                  },
                  children: "Contact Support",
                }),
              ],
            }),
          ],
        }),
      });
    },
  ]);
};
