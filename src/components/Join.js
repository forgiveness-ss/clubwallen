export default (e) => {
  "use strict";
  var r = e.i(40450),
    t = e.i(13742),
    i = e.i(30037),
    n = e.i(6028);
  let a = ["XS", "S", "M", "L", "XL", "XXL"],
    o = {
      crew: {
        name: "Club Wallen: The Crew — 2026 Membership",
        price: 350,
        desc: "Exclusive club access, exclusive content, welcome gift, monthly merch, members-only drops, and special surprises.",
      },
      backroad: {
        name: "Club Wallen: The Backroad Circle — 2026 Membership",
        price: 650,
        desc: "Everything in The Crew, plus members-only livestreams, enhanced content, exclusive experiences, and early access.",
      },
      frontrow: {
        name: "Club Wallen: The Front Row — 2026 Membership",
        price: 900,
        desc: "The full Club Wallen experience — premium content, priority experiences, ticket upgrades, and Front Row exclusives.",
      },
    };
  function s() {
    let e = (0, i.useRouter)(),
      s = (0, i.useSearchParams)().get("tier") || "crew",
      l = o[s] || o.crew,
      [c, p] = (0, t.useState)("M"),
      d = "#c8a84b";
    return (0, r.jsx)("div", {
      style: {
        minHeight: "100vh",
        background: "#0a0a0a",
        padding: "80px 24px",
      },
      children: (0, r.jsxs)("div", {
        style: { maxWidth: 800, margin: "0 auto" },
        children: [
          (0, r.jsxs)("div", {
            style: { textAlign: "center", marginBottom: 48 },
            children: [
              (0, r.jsx)("p", {
                style: {
                  fontSize: 10,
                  letterSpacing: 6,
                  color: "#5a5040",
                  textTransform: "uppercase",
                  marginBottom: 16,
                },
                children: "2026 Reserve",
              }),
              (0, r.jsx)("h1", {
                style: {
                  fontSize: "clamp(32px, 5vw, 56px)",
                  color: d,
                  marginBottom: 16,
                },
                children: l.name
                  .replace("Club Wallen: ", "")
                  .replace(" — 2026 Membership", ""),
              }),
              (0, r.jsx)("p", {
                style: {
                  fontSize: 15,
                  color: "#5a5040",
                  maxWidth: 500,
                  margin: "0 auto",
                  lineHeight: 1.7,
                },
                children: l.desc,
              }),
            ],
          }),
          (0, r.jsx)("div", {
            style: {
              display: "flex",
              justifyContent: "center",
              gap: 8,
              marginBottom: 40,
              flexWrap: "wrap",
            },
            children: Object.entries(o).map(([e, t]) =>
              (0, r.jsxs)(
                n.default,
                {
                  href: `/join?tier=${e}`,
                  style: {
                    padding: "8px 20px",
                    fontSize: 11,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    border: `1px solid ${e === s ? d : "#2a2a2a"}`,
                    color: e === s ? d : "#5a5040",
                    borderRadius: 2,
                    textDecoration: "none",
                  },
                  children: [
                    t.name.split(":")[1].split("—")[0].trim(),
                    " · $",
                    t.price,
                  ],
                },
                e,
              ),
            ),
          }),
          (0, r.jsxs)("div", {
            style: {
              background: "#111",
              border: "1px solid #2a2010",
              padding: "48px 40px",
              textAlign: "center",
            },
            children: [
              (0, r.jsx)("p", {
                style: {
                  fontSize: 10,
                  letterSpacing: 5,
                  color: "#6a5c3a",
                  textTransform: "uppercase",
                  marginBottom: 12,
                },
                children: "2026 Reserve Membership",
              }),
              (0, r.jsxs)("div", {
                style: {
                  fontSize: 52,
                  color: d,
                  fontWeight: "bold",
                  marginBottom: 4,
                },
                children: ["$", l.price],
              }),
              (0, r.jsx)("p", {
                style: {
                  fontSize: 12,
                  color: "#4a3c24",
                  letterSpacing: 2,
                  marginBottom: 36,
                },
                children: "YEARLY · SHIPPING INCLUDED",
              }),
              (0, r.jsx)("p", {
                style: {
                  fontSize: 12,
                  letterSpacing: 3,
                  color: "#7a6850",
                  textTransform: "uppercase",
                  marginBottom: 16,
                },
                children: "Select Your Size",
              }),
              (0, r.jsx)("div", {
                style: {
                  display: "flex",
                  justifyContent: "center",
                  gap: 8,
                  marginBottom: 40,
                  flexWrap: "wrap",
                },
                children: a.map((e) =>
                  (0, r.jsx)(
                    "button",
                    {
                      type: "button",
                      onClick: () => p(e),
                      style: {
                        width: 52,
                        height: 52,
                        background: c === e ? d : "transparent",
                        color: c === e ? "#0a0a0a" : "#5a5040",
                        border: `1px solid ${c === e ? d : "#2a2a2a"}`,
                        fontSize: 13,
                        fontWeight: "bold",
                        borderRadius: 2,
                        transition: "all 0.15s",
                      },
                      children: e,
                    },
                    e,
                  ),
                ),
              }),
              (0, r.jsx)("button", {
                type: "button",
                onClick: () => {
                  let r = new URLSearchParams({
                    type: "membership",
                    name: l.name,
                    price: String(l.price),
                    size: c,
                    description: l.desc,
                    image: "/merch/membership-box.jpg",
                  });
                  e.push(`/checkout?${r.toString()}`);
                },
                style: {
                  background: d,
                  color: "#0a0a0a",
                  padding: "16px 60px",
                  fontSize: 13,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  border: "none",
                  borderRadius: 2,
                  width: "100%",
                  maxWidth: 360,
                  transition: "background 0.2s",
                },
                children: "Purchase Membership",
              }),
              (0, r.jsxs)("p", {
                style: { fontSize: 12, color: "#3a3020", marginTop: 20 },
                children: [
                  "Already a member? ",
                  (0, r.jsx)(n.default, {
                    href: "/login",
                    style: { color: d },
                    children: "Log in here",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    });
  }
  e.s([
    "default",
    0,
    function () {
      return (0, r.jsx)(t.Suspense, { children: (0, r.jsx)(s, {}) });
    },
  ]);
};
