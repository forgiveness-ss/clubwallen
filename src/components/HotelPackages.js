export default (e) => {
  "use strict";
  var t = e.i(40450),
    a = e.i(13742),
    i = e.i(6028),
    o = e.i(29150),
    n = e.i(80883),
    s = e.i(56226),
    r = e.i(17652),
    l = e.i(55411);
  let d = (e) => ({
    background: "transparent",
    color: e ? l.T.navy : l.T.cream,
    border: `2px solid ${e ? l.T.navy : l.T.cream}`,
    borderRadius: 4,
    padding: "15px 24px",
    fontFamily: l.T.font,
    fontSize: 14,
    cursor: "pointer",
  });
  function c({ items: e, color: a }) {
    return (0, t.jsx)("ul", {
      style: { listStyle: "none", padding: 0, margin: "10px 0" },
      children: e.map((e, i) => {
        let o = e.startsWith("– ");
        return (0, t.jsxs)(
          "li",
          {
            style: {
              display: "flex",
              gap: 10,
              padding: o ? "3px 0 3px 24px" : "6px 0",
              lineHeight: 1.6,
              color: a,
            },
            children: [
              (0, t.jsx)("span", {
                style: { color: l.T.pink, flexShrink: 0 },
                children: o ? "–" : "•",
              }),
              (0, t.jsx)("span", { children: o ? e.slice(2) : e }),
            ],
          },
          i,
        );
      }),
    });
  }
  e.s([
    "default",
    0,
    function () {
      let { addItem: e, count: h } = (0, r.useSibCart)(),
        [u, p] = (0, a.useState)({}),
        [m, y] = (0, a.useState)(null),
        [f, g] = (0, a.useState)(null),
        [b, v] = (0, a.useState)(null),
        x = (e) => u[e] ?? 2,
        w = (e) => {
          (y(e),
            setTimeout(
              () =>
                document
                  .getElementById("properties")
                  ?.scrollIntoView({ behavior: "smooth" }),
              50,
            ));
        };
      return (0, t.jsxs)("div", {
        style: {
          background: l.T.navy,
          minHeight: "100vh",
          color: l.T.cream,
          fontFamily: l.T.body,
          paddingBottom: 110,
        },
        children: [
          (0, t.jsx)(o.default, {}),
          (0, t.jsx)(n.default, {}),
          (0, t.jsxs)("section", {
            style: {
              background: `linear-gradient(to bottom, ${l.T.navy} 0%, #6a5578 55%, ${l.T.pink} 100%)`,
              padding: "70px 20px 80px",
              textAlign: "center",
            },
            children: [
              (0, t.jsx)("h1", {
                style: {
                  fontFamily: l.T.font,
                  color: l.T.cream,
                  fontSize: "clamp(34px, 8vw, 72px)",
                  lineHeight: 1.05,
                  margin: "0 auto 36px",
                  maxWidth: 900,
                },
                children: "OFFICIAL SAND IN MY BOOTS HOTEL PACKAGES",
              }),
              (0, t.jsxs)("div", {
                style: {
                  maxWidth: 760,
                  margin: "0 auto",
                  lineHeight: 1.75,
                  fontSize: 16,
                },
                children: [
                  (0, t.jsx)("p", {
                    children:
                      "Join Morgan Wallen and more on the white sand beaches of Gulf Shores, Alabama for Sand In My Boots Festival, May 21–23, 2027!",
                  }),
                  (0, t.jsx)("p", {
                    children:
                      "Whether you want to wake up in the action or stay up the road, you’ve got choices aplenty throughout the Gulf Shores area. All Hotel Packages bundle festival passes with lodging, shuttle passes and merchandise.",
                  }),
                  (0, t.jsx)("p", {
                    children:
                      "First, pick your pass type and group size, then select from available properties, and head to checkout!",
                  }),
                ],
              }),
              (0, t.jsx)("div", {
                style: {
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 14,
                  justifyContent: "center",
                  marginTop: 36,
                },
                children: l.HOTEL_PACKAGES.map((e) =>
                  (0, t.jsx)(
                    "a",
                    {
                      href: `#pkg-${e.id}`,
                      style: {
                        background: l.T.slate,
                        color: l.T.sky,
                        fontFamily: l.T.font,
                        fontSize: 18,
                        padding: "20px 30px",
                        borderRadius: 6,
                        textDecoration: "none",
                      },
                      children:
                        "ga" === e.id
                          ? "GA"
                          : "party-pit" === e.id
                            ? "PARTY PIT"
                            : "vip" === e.id
                              ? "VIP"
                              : "super-vip" === e.id
                                ? "SUPER VIP"
                                : "LIVIN' THE DREAM",
                    },
                    e.id,
                  ),
                ),
              }),
            ],
          }),
          (0, t.jsxs)("section", {
            style: { padding: "60px 20px 20px", textAlign: "center" },
            children: [
              (0, t.jsx)("h2", {
                style: {
                  fontFamily: l.T.font,
                  color: l.T.cream,
                  fontSize: "clamp(32px, 7vw, 56px)",
                  margin: "0 0 20px",
                },
                children: "FESTIVAL PASSES",
              }),
              (0, t.jsx)("p", {
                style: {
                  maxWidth: 700,
                  margin: "0 auto 12px",
                  lineHeight: 1.7,
                },
                children:
                  "All Hotel Packages come with 3-day festival passes for 2+ people!",
              }),
              (0, t.jsxs)("p", {
                style: {
                  maxWidth: 700,
                  margin: "0 auto",
                  lineHeight: 1.7,
                  color: l.T.sky,
                },
                children: [
                  "Festival Passes are sold on this website as part of the Official Hotel Packages program. Prefer passes only?",
                  " ",
                  (0, t.jsx)(i.default, {
                    href: "/sand-in-my-boots#passes",
                    style: { color: l.T.pink },
                    children: "Buy passes here",
                  }),
                  ".",
                ],
              }),
            ],
          }),
          (0, t.jsx)("section", {
            style: { maxWidth: 760, margin: "0 auto", padding: "30px 20px" },
            children: l.HOTEL_PACKAGES.map((e) => {
              let a = !!e.dark,
                i = a ? l.T.cream : l.T.navy;
              return (0, t.jsxs)(
                "article",
                {
                  id: `pkg-${e.id}`,
                  style: {
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 8,
                    padding: "28px 28px 34px",
                    marginBottom: 26,
                    background: a
                      ? l.T.navy
                      : "linear-gradient(to bottom, #fbe9b9 0%, #f3cdaa 55%, #e6909a 100%)",
                    border: a ? "1px solid #ffffff22" : "none",
                    color: i,
                  },
                  children: [
                    (0, t.jsx)("div", {
                      style: {
                        aspectRatio: "16/9",
                        background: a ? l.T.slate : "#00000015",
                        borderRadius: 6,
                        overflow: "hidden",
                        marginBottom: 22,
                      },
                      children: (0, t.jsx)(s.default, {
                        src: `/sib/hotels/${e.id}.jpeg`,
                        alt: e.name,
                        style: {
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        },
                      }),
                    }),
                    (0, t.jsx)("h3", {
                      style: {
                        fontFamily: l.T.font,
                        fontSize: "clamp(26px, 6vw, 38px)",
                        lineHeight: 1.1,
                        margin: "0 0 18px",
                        color: a ? l.T.pink : l.T.navy,
                      },
                      children: e.name,
                    }),
                    (0, t.jsx)("p", {
                      style: {
                        fontSize: 17,
                        lineHeight: 1.7,
                        margin: "0 0 22px",
                      },
                      children:
                        "Includes Festival Passes, Choice of Property, Shuttle Passes & Merchandise",
                    }),
                    (0, t.jsx)("p", {
                      style: { margin: "0 0 4px", fontSize: 16 },
                      children: "starting at",
                    }),
                    (0, t.jsxs)("p", {
                      style: {
                        fontFamily: l.T.font,
                        fontSize: "clamp(24px, 6vw, 32px)",
                        margin: "0 0 10px",
                      },
                      children: [
                        (0, r.money)(e.fromNight),
                        " / person per night",
                      ],
                    }),
                    (0, t.jsx)("p", {
                      style: {
                        fontSize: 14,
                        margin: "0 0 26px",
                        opacity: 0.85,
                      },
                      children:
                        "*All Hotel Packages are subject to a 5% booking fee",
                    }),
                    (0, t.jsxs)("div", {
                      style: {
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 14,
                        alignItems: "stretch",
                      },
                      children: [
                        (0, t.jsx)("select", {
                          "aria-label": `Number of guests for ${e.name}`,
                          value: x(e.id),
                          onChange: (t) =>
                            p((a) => ({
                              ...a,
                              [e.id]: Number(t.target.value),
                            })),
                          style: {
                            background: "transparent",
                            color: i,
                            border: `1.5px solid ${i}`,
                            borderRadius: 4,
                            padding: "0 18px",
                            height: 56,
                            fontSize: 16,
                            minWidth: 150,
                          },
                          children: Array.from(
                            { length: 9 },
                            (e, t) => t + 2,
                          ).map((e) =>
                            (0, t.jsxs)(
                              "option",
                              {
                                value: e,
                                style: { color: l.T.navy },
                                children: [e, " guests"],
                              },
                              e,
                            ),
                          ),
                        }),
                        (0, t.jsx)("button", {
                          type: "button",
                          onClick: () => w(e),
                          style: { ...d(!a), height: 56 },
                          children: "SELECT",
                        }),
                        (0, t.jsx)("button", {
                          type: "button",
                          onClick: () => g(e),
                          style: { ...d(!a), height: 56 },
                          children: "IMPORTANT INFO",
                        }),
                      ],
                    }),
                  ],
                },
                e.id,
              );
            }),
          }),
          (0, t.jsxs)("section", {
            id: "properties",
            style: { maxWidth: 900, margin: "0 auto", padding: "40px 20px" },
            children: [
              (0, t.jsx)("h2", {
                style: {
                  fontFamily: l.T.font,
                  color: l.T.cream,
                  fontSize: "clamp(28px, 6vw, 44px)",
                  margin: "0 0 12px",
                },
                children: "HOTEL & CONDO OPTIONS",
              }),
              (0, t.jsx)("p", {
                style: { lineHeight: 1.7, color: l.T.sky, marginBottom: 24 },
                children:
                  "Choose from one of our hand-picked properties and seamlessly bundle your reservation.",
              }),
              m
                ? (0, t.jsxs)(t.Fragment, {
                    children: [
                      (0, t.jsxs)("p", {
                        style: {
                          fontFamily: l.T.font,
                          fontSize: 16,
                          color: l.T.pink,
                          margin: "0 0 18px",
                        },
                        children: [m.name, " · ", x(m.id), " guests"],
                      }),
                      l.PROPERTIES.filter((e) => m.prices[e.id]).map((a) => {
                        let i = m.prices[a.id],
                          o = x(m.id);
                        return (0, t.jsxs)(
                          "div",
                          {
                            style: {
                              background: l.T.slate,
                              borderRadius: 10,
                              overflow: "hidden",
                              marginBottom: 20,
                            },
                            children: [
                              (0, t.jsx)("div", {
                                style: {
                                  aspectRatio: "16/7",
                                  background: "#1c2038",
                                },
                                children: (0, t.jsx)(s.default, {
                                  src: `/sib/properties/${a.id}.jpeg`,
                                  alt: a.name,
                                  style: {
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    display: "block",
                                  },
                                }),
                              }),
                              (0, t.jsxs)("div", {
                                style: { padding: "22px 22px 26px" },
                                children: [
                                  (0, t.jsx)("h3", {
                                    style: {
                                      fontFamily: l.T.font,
                                      fontSize: 22,
                                      margin: "0 0 8px",
                                    },
                                    children: a.name,
                                  }),
                                  (0, t.jsx)("p", {
                                    style: {
                                      margin: "0 0 12px",
                                      color: l.T.sky,
                                      lineHeight: 1.6,
                                    },
                                    children: a.desc,
                                  }),
                                  (0, t.jsx)(c, {
                                    items: l.STAY_LINES.map((e, t) =>
                                      1 === t && a.passLine ? a.passLine : e,
                                    ),
                                    color: l.T.cream,
                                  }),
                                  (0, t.jsxs)("div", {
                                    style: {
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "flex-end",
                                      flexWrap: "wrap",
                                      gap: 16,
                                      marginTop: 14,
                                    },
                                    children: [
                                      (0, t.jsxs)("div", {
                                        children: [
                                          (0, t.jsx)("p", {
                                            style: {
                                              margin: 0,
                                              fontSize: 13,
                                              color: l.T.sky,
                                            },
                                            children: "Package from",
                                          }),
                                          (0, t.jsxs)("p", {
                                            style: {
                                              margin: "2px 0",
                                              fontFamily: l.T.font,
                                              fontSize: 24,
                                            },
                                            children: [
                                              (0, r.money)(i),
                                              " / person",
                                            ],
                                          }),
                                          (0, t.jsxs)("p", {
                                            style: {
                                              margin: 0,
                                              color: l.T.sky,
                                            },
                                            children: [
                                              (0, r.money)(i * o),
                                              " total for ",
                                              o,
                                              " guests",
                                            ],
                                          }),
                                        ],
                                      }),
                                      (0, t.jsx)("button", {
                                        type: "button",
                                        onClick: () => {
                                          var t;
                                          let i, o, n;
                                          return (
                                            (t = a.id),
                                            (i = l.PROPERTIES.find(
                                              (e) => e.id === t,
                                            )),
                                            (o = x(m.id)),
                                            (n = m.prices[t]),
                                            void (e({
                                              id: `hotel-${m.id}-${t}-${o}`,
                                              kind: "hotel",
                                              name: `${i.name}`,
                                              detail: `${m.name.replace(" HOTEL PACKAGE", "")} Hotel Package \xb7 ${o} guests \xb7 ${(0, r.money)(n)} / person \xb7 4 nights (Thu 5/20 – Mon 5/24)`,
                                              unitPrice:
                                                Math.round(n * o * 100) / 100,
                                              qty: 1,
                                            }),
                                            v(i.name),
                                            (0, r.openSibCart)())
                                          );
                                        },
                                        style: {
                                          background: l.T.pink,
                                          color: l.T.navy,
                                          border: "none",
                                          borderRadius: 4,
                                          padding: "16px 34px",
                                          fontFamily: l.T.font,
                                          fontSize: 14,
                                          cursor: "pointer",
                                        },
                                        children: "SELECT",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          },
                          a.id,
                        );
                      }),
                      b &&
                        (0, t.jsxs)("p", {
                          style: { color: "#9be3b0" },
                          children: [b, " was added to your cart."],
                        }),
                    ],
                  })
                : (0, t.jsxs)("div", {
                    style: {
                      background: l.T.slate,
                      borderRadius: 10,
                      padding: "26px 22px",
                    },
                    children: [
                      (0, t.jsx)("p", {
                        style: { margin: "0 0 16px" },
                        children:
                          "Pick a hotel package above and press SELECT to see the available properties and prices for your group size.",
                      }),
                      (0, t.jsx)("a", {
                        href: "#pkg-ga",
                        style: {
                          ...d(!1),
                          textDecoration: "none",
                          display: "inline-block",
                        },
                        children: "EXPLORE OPTIONS",
                      }),
                    ],
                  }),
            ],
          }),
          (0, t.jsxs)("div", {
            style: {
              position: "fixed",
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 120,
              background: l.T.slate,
              borderTop: `2px solid ${l.T.pink}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 18px",
              gap: 12,
            },
            children: [
              (0, t.jsxs)("button", {
                type: "button",
                onClick: r.openSibCart,
                style: {
                  background: "none",
                  border: "none",
                  color: l.T.cream,
                  fontFamily: l.T.font,
                  fontSize: 14,
                  cursor: "pointer",
                },
                children: ["YOUR CART ", h],
              }),
              (0, t.jsx)(i.default, {
                href: h > 0 ? "/sand-in-my-boots/checkout" : "#",
                onClick: (e) => {
                  0 === h && (e.preventDefault(), (0, r.openSibCart)());
                },
                style: {
                  background: l.T.pink,
                  color: l.T.navy,
                  fontFamily: l.T.font,
                  fontSize: 13,
                  padding: "12px 26px",
                  borderRadius: 4,
                  textDecoration: "none",
                },
                children: "NEXT PAGE",
              }),
            ],
          }),
          f &&
            (0, t.jsx)("div", {
              onClick: () => g(null),
              style: {
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.75)",
                zIndex: 300,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 16,
              },
              children: (0, t.jsxs)("div", {
                onClick: (e) => e.stopPropagation(),
                role: "dialog",
                "aria-modal": "true",
                style: {
                  background: l.T.navy,
                  border: `1px solid ${l.T.slate}`,
                  borderRadius: 10,
                  maxWidth: 720,
                  width: "100%",
                  maxHeight: "90vh",
                  overflowY: "auto",
                  padding: "26px 24px",
                },
                children: [
                  (0, t.jsx)("button", {
                    type: "button",
                    onClick: () => g(null),
                    "aria-label": "Close",
                    style: {
                      display: "block",
                      marginLeft: "auto",
                      background: "none",
                      border: "none",
                      color: l.T.cream,
                      fontSize: 26,
                      cursor: "pointer",
                    },
                    children: "✕",
                  }),
                  (0, t.jsx)("h3", {
                    style: {
                      fontFamily: l.T.font,
                      fontSize: 26,
                      margin: "0 0 12px",
                      color: l.T.pink,
                    },
                    children: f.name,
                  }),
                  (0, t.jsxs)("p", {
                    style: { fontSize: 24, fontWeight: 700, margin: "0 0 4px" },
                    children: [
                      (0, r.money)(f.taxedFrom),
                      " including taxes & beach restoration fees*",
                    ],
                  }),
                  (0, t.jsx)("p", {
                    style: { fontSize: 13, color: l.T.sky, margin: "0 0 16px" },
                    children:
                      "*All Hotel Packages are subject to a 5% booking fee",
                  }),
                  (0, t.jsx)("p", {
                    style: { lineHeight: 1.7 },
                    children: f.lead,
                  }),
                  f.perksIntro &&
                    (0, t.jsx)("p", {
                      style: { fontWeight: 700 },
                      children: f.perksIntro,
                    }),
                  f.perks.length > 0 &&
                    (0, t.jsx)(c, { items: f.perks, color: l.T.cream }),
                  (0, t.jsx)("p", {
                    style: {
                      fontFamily: l.T.font,
                      fontSize: 14,
                      margin: "20px 0 4px",
                    },
                    children: "ALL PASSES INCLUDE",
                  }),
                  (0, t.jsx)(c, {
                    items: l.HOTEL_COMMON_INCLUDE,
                    color: l.T.cream,
                  }),
                  (0, t.jsx)("p", {
                    style: {
                      fontFamily: l.T.font,
                      fontSize: 14,
                      margin: "20px 0 4px",
                    },
                    children: "IMPORTANT",
                  }),
                  (0, t.jsx)(c, { items: l.HOTEL_IMPORTANT, color: l.T.cream }),
                  (0, t.jsx)("button", {
                    type: "button",
                    onClick: () => {
                      (g(null), w(f));
                    },
                    style: {
                      background: l.T.pink,
                      color: l.T.navy,
                      border: "none",
                      borderRadius: 4,
                      padding: "15px 30px",
                      fontFamily: l.T.font,
                      fontSize: 14,
                      cursor: "pointer",
                      marginTop: 14,
                    },
                    children: "SELECT THIS PACKAGE",
                  }),
                ],
              }),
            }),
        ],
      });
    },
  ]);
};
