export default (e) => {
  "use strict";
  var t = e.i(40450),
    a = e.i(13742),
    i = e.i(6028),
    o = e.i(55411),
    n = e.i(17652);
  let s = {
    width: 30,
    height: 30,
    borderRadius: 6,
    border: "1px solid #cfe0f3aa",
    background: "transparent",
    color: "#fbebb5",
    fontSize: 18,
    cursor: "pointer",
    lineHeight: 1,
  };
  function r({ label: e, value: a, bold: i }) {
    return (0, t.jsxs)("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        padding: "5px 0",
        fontWeight: i ? 800 : 400,
        fontSize: i ? 17 : 14,
      },
      children: [
        (0, t.jsx)("span", { children: e }),
        (0, t.jsx)("span", { children: a }),
      ],
    });
  }
  e.s([
    "default",
    0,
    function () {
      let [e, l] = (0, a.useState)(!1),
        [d, c] = (0, a.useState)(""),
        [h, u] = (0, a.useState)(null),
        {
          items: p,
          promo: m,
          count: y,
          totals: f,
          setQty: g,
          removeItem: b,
          applyPromo: v,
          removePromo: x,
        } = (0, n.useSibCart)();
      return (
        (0, a.useEffect)(() => {
          let e = () => l(!0);
          return (
            window.addEventListener("sib-open-cart", e),
            () => window.removeEventListener("sib-open-cart", e)
          );
        }, []),
        (0, t.jsxs)(t.Fragment, {
          children: [
            (0, t.jsxs)("button", {
              type: "button",
              onClick: () => l(!0),
              "aria-label": `Open cart, ${y} items`,
              style: {
                position: "fixed",
                right: 16,
                bottom: 16,
                zIndex: 150,
                background: o.T.pink,
                color: o.T.navy,
                border: "none",
                borderRadius: 40,
                padding: "14px 22px",
                fontFamily: o.T.font,
                fontSize: 13,
                cursor: "pointer",
                boxShadow: "0 6px 24px rgba(0,0,0,0.45)",
              },
              children: [
                "YOUR CART ",
                y,
                y > 0 &&
                  (0, t.jsx)("span", {
                    style: { marginLeft: 10 },
                    children: (0, n.money)(f.total),
                  }),
              ],
            }),
            e &&
              (0, t.jsx)("div", {
                onClick: () => l(!1),
                style: {
                  position: "fixed",
                  inset: 0,
                  background: "rgba(0,0,0,0.6)",
                  zIndex: 200,
                },
                children: (0, t.jsxs)("aside", {
                  onClick: (e) => e.stopPropagation(),
                  style: {
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: "min(440px, 100%)",
                    background: o.T.navy,
                    color: o.T.cream,
                    padding: "22px 20px",
                    overflowY: "auto",
                    fontFamily: o.T.body,
                    display: "flex",
                    flexDirection: "column",
                  },
                  children: [
                    (0, t.jsxs)("div", {
                      style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 18,
                      },
                      children: [
                        (0, t.jsxs)("h2", {
                          style: {
                            fontFamily: o.T.font,
                            fontSize: 22,
                            margin: 0,
                          },
                          children: ["YOUR CART (", y, ")"],
                        }),
                        (0, t.jsx)("button", {
                          type: "button",
                          onClick: () => l(!1),
                          "aria-label": "Close cart",
                          style: {
                            background: "none",
                            border: "none",
                            color: o.T.cream,
                            fontSize: 26,
                            cursor: "pointer",
                          },
                          children: "✕",
                        }),
                      ],
                    }),
                    0 === p.length
                      ? (0, t.jsxs)("div", {
                          style: { padding: "30px 0", color: o.T.sky },
                          children: [
                            (0, t.jsx)("p", {
                              style: { marginTop: 0 },
                              children:
                                "Your cart is empty. Add festival passes or a hotel package to get started.",
                            }),
                            (0, t.jsx)(i.default, {
                              href: "/sand-in-my-boots#passes",
                              onClick: () => l(!1),
                              style: { color: o.T.pink },
                              children: "Browse passes",
                            }),
                            " · ",
                            (0, t.jsx)(i.default, {
                              href: "/sand-in-my-boots/hotels",
                              onClick: () => l(!1),
                              style: { color: o.T.pink },
                              children: "Browse hotel packages",
                            }),
                          ],
                        })
                      : (0, t.jsxs)(t.Fragment, {
                          children: [
                            (0, t.jsx)("div", {
                              style: { flex: 1 },
                              children: p.map((e) =>
                                (0, t.jsxs)(
                                  "div",
                                  {
                                    style: {
                                      background: o.T.slate,
                                      borderRadius: 8,
                                      padding: "14px 16px",
                                      marginBottom: 10,
                                    },
                                    children: [
                                      (0, t.jsxs)("div", {
                                        style: {
                                          display: "flex",
                                          justifyContent: "space-between",
                                          gap: 10,
                                        },
                                        children: [
                                          (0, t.jsxs)("div", {
                                            children: [
                                              (0, t.jsx)("div", {
                                                style: {
                                                  fontWeight: 700,
                                                  fontSize: 15,
                                                },
                                                children: e.name,
                                              }),
                                              e.detail &&
                                                (0, t.jsx)("div", {
                                                  style: {
                                                    fontSize: 12,
                                                    color: o.T.sky,
                                                    marginTop: 4,
                                                    lineHeight: 1.5,
                                                  },
                                                  children: e.detail,
                                                }),
                                            ],
                                          }),
                                          (0, t.jsx)("div", {
                                            style: {
                                              fontWeight: 700,
                                              whiteSpace: "nowrap",
                                            },
                                            children: (0, n.money)(
                                              e.unitPrice * e.qty,
                                            ),
                                          }),
                                        ],
                                      }),
                                      (0, t.jsxs)("div", {
                                        style: {
                                          display: "flex",
                                          alignItems: "center",
                                          gap: 10,
                                          marginTop: 12,
                                        },
                                        children: [
                                          (0, t.jsx)("button", {
                                            type: "button",
                                            onClick: () => g(e.id, e.qty - 1),
                                            "aria-label": "Decrease quantity",
                                            style: s,
                                            children: "−",
                                          }),
                                          (0, t.jsx)("span", {
                                            style: {
                                              minWidth: 20,
                                              textAlign: "center",
                                            },
                                            children: e.qty,
                                          }),
                                          (0, t.jsx)("button", {
                                            type: "button",
                                            onClick: () => g(e.id, e.qty + 1),
                                            "aria-label": "Increase quantity",
                                            style: s,
                                            children: "+",
                                          }),
                                          (0, t.jsx)("button", {
                                            type: "button",
                                            onClick: () => b(e.id),
                                            style: {
                                              marginLeft: "auto",
                                              background: "none",
                                              border: "none",
                                              color: o.T.pink,
                                              cursor: "pointer",
                                              fontSize: 13,
                                            },
                                            children: "Remove",
                                          }),
                                        ],
                                      }),
                                    ],
                                  },
                                  e.id,
                                ),
                              ),
                            }),
                            (0, t.jsxs)("div", {
                              style: {
                                borderTop: `1px solid ${o.T.slate}`,
                                paddingTop: 16,
                                marginTop: 8,
                              },
                              children: [
                                (0, t.jsx)("label", {
                                  htmlFor: "sib-promo",
                                  style: {
                                    fontSize: 12,
                                    color: o.T.sky,
                                    display: "block",
                                    marginBottom: 6,
                                  },
                                  children: "Promo code",
                                }),
                                m
                                  ? (0, t.jsxs)("div", {
                                      style: {
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        background: o.T.slate,
                                        borderRadius: 6,
                                        padding: "10px 14px",
                                      },
                                      children: [
                                        (0, t.jsxs)("span", {
                                          children: [m, " applied"],
                                        }),
                                        (0, t.jsx)("button", {
                                          type: "button",
                                          onClick: x,
                                          style: {
                                            background: "none",
                                            border: "none",
                                            color: o.T.pink,
                                            cursor: "pointer",
                                          },
                                          children: "Remove",
                                        }),
                                      ],
                                    })
                                  : (0, t.jsxs)("div", {
                                      style: { display: "flex", gap: 8 },
                                      children: [
                                        (0, t.jsx)("input", {
                                          id: "sib-promo",
                                          value: d,
                                          onChange: (e) => {
                                            (c(e.target.value), u(null));
                                          },
                                          placeholder: "Enter code",
                                          style: {
                                            flex: 1,
                                            background: o.T.slate,
                                            border: `1px solid ${o.T.sky}55`,
                                            color: o.T.cream,
                                            borderRadius: 6,
                                            padding: "11px 12px",
                                            fontSize: 14,
                                          },
                                        }),
                                        (0, t.jsx)("button", {
                                          type: "button",
                                          onClick: () => {
                                            v(d)
                                              ? (u({
                                                  ok: !0,
                                                  text: "Promo code applied.",
                                                }),
                                                c(""))
                                              : u({
                                                  ok: !1,
                                                  text: "That code isn’t valid.",
                                                });
                                          },
                                          style: {
                                            background: "transparent",
                                            border: `2px solid ${o.T.cream}`,
                                            color: o.T.cream,
                                            borderRadius: 6,
                                            padding: "0 16px",
                                            fontFamily: o.T.font,
                                            fontSize: 12,
                                            cursor: "pointer",
                                          },
                                          children: "APPLY",
                                        }),
                                      ],
                                    }),
                                h &&
                                  (0, t.jsx)("p", {
                                    style: {
                                      fontSize: 12,
                                      margin: "8px 0 0",
                                      color: h.ok ? "#9be3b0" : o.T.pink,
                                    },
                                    children: h.text,
                                  }),
                                (0, t.jsxs)("div", {
                                  style: { marginTop: 18, fontSize: 14 },
                                  children: [
                                    (0, t.jsx)(r, {
                                      label: "Subtotal",
                                      value: (0, n.money)(f.subtotal),
                                    }),
                                    f.discount > 0 &&
                                      (0, t.jsx)(r, {
                                        label: `Promo ${m} (${Math.round(100 * f.rate)}% off)`,
                                        value: `−${(0, n.money)(f.discount)}`,
                                      }),
                                    (0, t.jsx)(r, {
                                      label: "Total",
                                      value: (0, n.money)(f.total),
                                      bold: !0,
                                    }),
                                  ],
                                }),
                                (0, t.jsx)("p", {
                                  style: {
                                    fontSize: 11,
                                    color: o.T.sky,
                                    lineHeight: 1.6,
                                  },
                                  children:
                                    "Hotel packages are subject to a 5% booking fee. Prices include taxes & beach restoration fees.",
                                }),
                                (0, t.jsx)(i.default, {
                                  href: "/sand-in-my-boots/checkout",
                                  onClick: () => l(!1),
                                  style: {
                                    display: "block",
                                    textAlign: "center",
                                    background: o.T.pink,
                                    color: o.T.navy,
                                    fontFamily: o.T.font,
                                    fontSize: 14,
                                    padding: "16px",
                                    borderRadius: 6,
                                    textDecoration: "none",
                                    marginTop: 12,
                                  },
                                  children: "CHECKOUT",
                                }),
                                (0, t.jsx)("button", {
                                  type: "button",
                                  onClick: () => l(!1),
                                  style: {
                                    width: "100%",
                                    marginTop: 10,
                                    background: "transparent",
                                    border: `1px solid ${o.T.sky}55`,
                                    color: o.T.sky,
                                    borderRadius: 6,
                                    padding: 12,
                                    cursor: "pointer",
                                  },
                                  children: "Keep shopping",
                                }),
                              ],
                            }),
                          ],
                        }),
                  ],
                }),
              }),
          ],
        })
      );
    },
  ]);
};
