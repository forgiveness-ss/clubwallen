export default (e) => {
  "use strict";
  var t = e.i(40450),
    a = e.i(13742),
    i = e.i(6028),
    n = e.i(30037),
    o = e.i(29150),
    s = e.i(80883),
    r = e.i(56226),
    l = e.i(17652),
    d = e.i(55411);
  let c = {
      fontFamily: d.T.font,
      color: d.T.cream,
      fontSize: "clamp(30px, 6vw, 52px)",
      margin: "0 0 24px",
      lineHeight: 1.05,
    },
    h = { maxWidth: 1200, margin: "0 auto", padding: "0 20px" },
    p = new Set(["ga", "vip"]);
  function u({ small: e }) {
    return (0, t.jsx)("span", {
      style: {
        display: "inline-block",
        background: d.T.pink,
        color: d.T.navy,
        fontFamily: d.T.font,
        fontSize: e ? 9 : 13,
        letterSpacing: 1.5,
        padding: e ? "3px 7px" : "6px 12px",
        borderRadius: 4,
        verticalAlign: "middle",
        lineHeight: 1,
      },
      children: "SOLD OUT",
    });
  }
  function m({ items: e }) {
    return (0, t.jsx)("ul", {
      style: { listStyle: "none", padding: 0, margin: "12px 0" },
      children: e.map((e, a) => {
        let i = e.startsWith("– ");
        return (0, t.jsxs)(
          "li",
          {
            style: {
              display: "flex",
              gap: 10,
              padding: i ? "3px 0 3px 26px" : "6px 0",
              lineHeight: 1.6,
              color: d.T.cream,
            },
            children: [
              (0, t.jsx)("span", {
                style: { color: d.T.pink, flexShrink: 0 },
                children: i ? "–" : "•",
              }),
              (0, t.jsx)("span", { children: i ? e.slice(2) : e }),
            ],
          },
          a,
        );
      }),
    });
  }
  let y = {
    background: "none",
    border: "none",
    color: d.T.cream,
    fontFamily: d.T.font,
    fontSize: 14,
    cursor: "pointer",
    padding: 0,
    letterSpacing: 0.5,
  };
  e.s([
    "default",
    0,
    function () {
      let e = (0, n.useRouter)(),
        { items: f, addItem: g, removeItem: b } = (0, l.useSibCart)();
      (0, a.useEffect)(() => {
        f.forEach((e) => {
          (e.id.startsWith("pass-ga-") || e.id.startsWith("pass-vip-")) &&
            b(e.id);
        });
      }, [f.length]);
      let [v, x] = (0, a.useState)(""),
        [S, w] = (0, a.useState)(null),
        [T, k] = (0, a.useState)("grid"),
        A = (0, a.useMemo)(
          () => Array.from(new Set(d.LINEUP.map((e) => e.name[0]))).sort(),
          [],
        ),
        I = d.LINEUP.filter(
          (e) =>
            e.name.toLowerCase().includes(v.toLowerCase()) &&
            (!S || e.name.startsWith(S)),
        ),
        [j, E] = (0, a.useState)({}),
        [P, C] = (0, a.useState)(null),
        L = d.FESTIVAL_INFO.flatMap((e) =>
          e.items.map((t) => `${e.group}:${t.title}`),
        ),
        [R, O] = (0, a.useState)(new Set()),
        N = R.size === L.length;
      return (0, t.jsxs)("div", {
        style: {
          background: d.T.navy,
          minHeight: "100vh",
          color: d.T.cream,
          fontFamily: d.T.body,
          paddingBottom: 90,
        },
        children: [
          (0, t.jsx)(o.default, {}),
          (0, t.jsx)(s.default, {}),
          (0, t.jsx)("section", {
            style: {
              background: `linear-gradient(to bottom, ${d.T.slate} 0%, #7a5f7c 70%, ${d.T.pink} 100%)`,
              padding: "28px 0 70px",
            },
            children: (0, t.jsxs)("div", {
              style: { ...h, maxWidth: 640 },
              children: [
                (0, t.jsx)("a", {
                  href: "#passes",
                  style: {
                    display: "block",
                    textAlign: "center",
                    background: d.T.pink,
                    color: d.T.navy,
                    fontFamily: d.T.font,
                    fontSize: 16,
                    padding: "18px",
                    borderRadius: 6,
                    textDecoration: "none",
                    marginBottom: 14,
                  },
                  children: "BUY TICKETS",
                }),
                (0, t.jsx)(i.default, {
                  href: "/sand-in-my-boots/hotels",
                  style: {
                    display: "block",
                    textAlign: "center",
                    border: `3px solid ${d.T.cream}`,
                    color: d.T.cream,
                    fontFamily: d.T.font,
                    fontSize: 16,
                    padding: "16px",
                    borderRadius: 6,
                    textDecoration: "none",
                    marginBottom: 28,
                  },
                  children: "BUY HOTEL PACKAGES",
                }),
                (0, t.jsx)(r.default, {
                  src: "/sib/poster.jpeg",
                  alt: "Sand In My Boots 2027 lineup poster",
                  style: { width: "100%", borderRadius: 10, display: "block" },
                }),
              ],
            }),
          }),
          (0, t.jsx)("section", {
            id: "lineup",
            style: { padding: "70px 0 50px" },
            children: (0, t.jsxs)("div", {
              style: h,
              children: [
                (0, t.jsx)("h2", { style: c, children: "LINEUP" }),
                (0, t.jsx)("div", {
                  style: { maxWidth: 420, margin: "0 auto 18px" },
                  children: (0, t.jsx)("input", {
                    value: v,
                    onChange: (e) => x(e.target.value),
                    placeholder: "Search",
                    "aria-label": "Search lineup",
                    style: {
                      width: "100%",
                      boxSizing: "border-box",
                      background: "transparent",
                      border: `2px solid ${d.T.cream}`,
                      borderRadius: 6,
                      color: d.T.cream,
                      padding: "16px 18px",
                      fontSize: 16,
                    },
                  }),
                }),
                (0, t.jsx)("div", {
                  style: {
                    display: "flex",
                    justifyContent: "center",
                    gap: 14,
                    marginBottom: 22,
                  },
                  children: ["grid", "list"].map((e) =>
                    (0, t.jsx)(
                      "button",
                      {
                        type: "button",
                        onClick: () => k(e),
                        "aria-label": `${e} view`,
                        style: {
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: 22,
                          color: T === e ? "#7fd1b0" : d.T.sky,
                        },
                        children: "grid" === e ? "▦" : "☰",
                      },
                      e,
                    ),
                  ),
                }),
                (0, t.jsx)("div", {
                  style: {
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    justifyContent: "center",
                    marginBottom: 30,
                  },
                  children: A.map((e) =>
                    (0, t.jsx)(
                      "button",
                      {
                        type: "button",
                        onClick: () => w(S === e ? null : e),
                        style: {
                          width: 44,
                          height: 44,
                          borderRadius: 10,
                          background: S === e ? d.T.cream : "transparent",
                          color: S === e ? d.T.navy : d.T.cream,
                          border: `1.5px solid ${d.T.cream}`,
                          fontSize: 16,
                          cursor: "pointer",
                        },
                        children: e,
                      },
                      e,
                    ),
                  ),
                }),
                0 === I.length &&
                  (0, t.jsx)("p", {
                    style: { textAlign: "center", color: d.T.sky },
                    children:
                      "No artists match your search. Clear the search or letter filter to see the full lineup.",
                  }),
                "grid" === T
                  ? (0, t.jsx)("div", {
                      style: {
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(240px, 1fr))",
                        gap: 22,
                      },
                      children: I.map((e) =>
                        (0, t.jsxs)(
                          "div",
                          {
                            style: {
                              background: "#1c2038",
                              borderRadius: 6,
                              overflow: "hidden",
                            },
                            children: [
                              (0, t.jsx)("div", {
                                style: {
                                  aspectRatio: "4/5",
                                  background: d.T.slate,
                                },
                                children: (0, t.jsx)(r.default, {
                                  src: e.img,
                                  alt: e.name,
                                  style: {
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    display: "block",
                                  },
                                }),
                              }),
                              (0, t.jsx)("div", {
                                style: { height: 8, background: d.T.pink },
                              }),
                              (0, t.jsx)("p", {
                                style: {
                                  margin: 0,
                                  padding: "16px 10px",
                                  textAlign: "center",
                                  fontFamily: d.T.font,
                                  fontSize: 15,
                                  color: d.T.cream,
                                },
                                children: e.name,
                              }),
                            ],
                          },
                          e.name,
                        ),
                      ),
                    })
                  : (0, t.jsx)("div", {
                      style: { maxWidth: 640, margin: "0 auto" },
                      children: I.map((e) =>
                        (0, t.jsxs)(
                          "div",
                          {
                            style: {
                              display: "flex",
                              alignItems: "center",
                              gap: 16,
                              padding: "10px 0",
                              borderBottom: `1px solid ${d.T.slate}`,
                            },
                            children: [
                              (0, t.jsx)("div", {
                                style: {
                                  width: 56,
                                  height: 56,
                                  borderRadius: 6,
                                  overflow: "hidden",
                                  background: d.T.slate,
                                  flexShrink: 0,
                                },
                                children: (0, t.jsx)(r.default, {
                                  src: e.img,
                                  alt: e.name,
                                  style: {
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  },
                                }),
                              }),
                              (0, t.jsx)("span", {
                                style: { fontFamily: d.T.font, fontSize: 16 },
                                children: e.name,
                              }),
                            ],
                          },
                          e.name,
                        ),
                      ),
                    }),
              ],
            }),
          }),
          (0, t.jsx)("section", {
            id: "passes",
            style: { padding: "60px 0" },
            children: (0, t.jsxs)("div", {
              style: h,
              children: [
                (0, t.jsx)("h2", { style: c, children: "PASSES" }),
                (0, t.jsx)("p", {
                  style: { fontSize: 17, lineHeight: 1.7, maxWidth: 760 },
                  children:
                    "Buy your passes now. The price you see is the price you pay. No tiered pricing, no surprises at checkout. Have a promo code? Add it in your cart before you pay.",
                }),
                (0, t.jsx)("div", {
                  style: {
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 10,
                    margin: "18px 0 36px",
                  },
                  children: d.PASS_TIERS.map((e) => {
                    let a;
                    return (0, t.jsxs)(
                      "a",
                      {
                        href: `#pass-${e.id}`,
                        style: {
                          border: `2px solid ${d.T.cream}`,
                          color: d.T.cream,
                          borderRadius: 6,
                          padding: "9px 16px",
                          fontFamily: d.T.font,
                          fontSize: 12,
                          textDecoration: "none",
                        },
                        children: [
                          e.short.toUpperCase(),
                          ((a = e.id),
                          p.has(a) &&
                            (0, t.jsxs)(t.Fragment, {
                              children: [" ", (0, t.jsx)(u, { small: !0 })],
                            })),
                        ],
                      },
                      e.id,
                    );
                  }),
                }),
                (0, t.jsx)("h3", {
                  style: { ...c, fontSize: "clamp(26px, 5vw, 40px)" },
                  children: "PASS TYPES",
                }),
                (0, t.jsxs)("div", {
                  style: {
                    background: d.T.slate,
                    borderRadius: 10,
                    padding: "24px 22px",
                    marginBottom: 50,
                  },
                  children: [
                    (0, t.jsx)("p", {
                      style: { marginTop: 0 },
                      children: "All Passes Include:",
                    }),
                    (0, t.jsx)("ul", {
                      style: { listStyle: "none", padding: 0, margin: 0 },
                      children: d.ALL_PASSES_INCLUDE.map((e, a) =>
                        (0, t.jsxs)(
                          "li",
                          {
                            style: {
                              display: "flex",
                              gap: 12,
                              padding: "9px 0",
                              lineHeight: 1.6,
                            },
                            children: [
                              (0, t.jsx)("span", {
                                style: {
                                  color: d.T.navy,
                                  background: d.T.cream,
                                  borderRadius: "50%",
                                  width: 20,
                                  height: 20,
                                  fontSize: 12,
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexShrink: 0,
                                  marginTop: 2,
                                },
                                children: "✓",
                              }),
                              (0, t.jsx)("span", { children: e }),
                            ],
                          },
                          a,
                        ),
                      ),
                    }),
                    (0, t.jsx)("p", {
                      style: { fontStyle: "italic" },
                      children: "While supplies last.",
                    }),
                    (0, t.jsx)(m, { items: d.PASS_RULES }),
                  ],
                }),
                d.PASS_TIERS.map((a) => {
                  let i, n, o;
                  return (0, t.jsxs)(
                    "div",
                    {
                      id: `pass-${a.id}`,
                      style: {
                        marginBottom: 56,
                        paddingBottom: 40,
                        borderBottom: `1px solid ${d.T.slate}`,
                      },
                      children: [
                        (0, t.jsxs)("h3", {
                          style: {
                            fontFamily: d.T.font,
                            fontSize: "clamp(24px, 5vw, 34px)",
                            color: d.T.sky,
                            margin: "0 0 14px",
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: 12,
                          },
                          children: [
                            a.name,
                            ((i = a.id), p.has(i) && (0, t.jsx)(u, {})),
                          ],
                        }),
                        (0, t.jsx)("p", {
                          style: {
                            fontSize: 22,
                            fontWeight: 700,
                            color: ((n = a.id), p.has(n)) ? d.T.sky : d.T.cream,
                            margin: "0 0 2px",
                            textDecoration: ((o = a.id), p.has(o))
                              ? "line-through"
                              : "none",
                          },
                          children: (0, l.money)(a.price),
                        }),
                        (0, t.jsx)("p", {
                          style: { margin: "0 0 2px" },
                          children: "including taxes & beach restoration fees",
                        }),
                        (0, t.jsx)("p", {
                          style: { margin: "0 0 18px", fontSize: 14 },
                          children: "upfront pricing",
                        }),
                        (0, t.jsx)("p", {
                          style: { lineHeight: 1.7, maxWidth: 820 },
                          children: a.intro,
                        }),
                        (0, t.jsxs)("div", {
                          style: {
                            display: "flex",
                            gap: 26,
                            flexWrap: "wrap",
                            margin: "16px 0",
                          },
                          children: [
                            a.learnMore &&
                              (0, t.jsxs)("button", {
                                type: "button",
                                onClick: () =>
                                  E((e) => ({ ...e, [a.id]: !e[a.id] })),
                                style: y,
                                children: ["LEARN MORE ", j[a.id] ? "−" : "+"],
                              }),
                            a.mapKind &&
                              (0, t.jsx)("button", {
                                type: "button",
                                onClick: () => C(a.mapKind),
                                style: y,
                                children:
                                  "party-pit" === a.mapKind
                                    ? "VIEW VENUE MAP"
                                    : "VIEW VIP AREAS",
                              }),
                          ],
                        }),
                        a.learnMore &&
                          j[a.id] &&
                          (0, t.jsxs)("div", {
                            style: {
                              background: d.T.slate,
                              borderRadius: 10,
                              padding: "8px 22px 14px",
                              marginBottom: 18,
                            },
                            children: [
                              a.learnMore.lead &&
                                (0, t.jsx)("p", {
                                  style: { fontWeight: 700 },
                                  children: a.learnMore.lead,
                                }),
                              (0, t.jsx)(m, { items: a.learnMore.bullets }),
                            ],
                          }),
                        (0, t.jsx)("div", {
                          style: {
                            maxWidth: 560,
                            aspectRatio: "3/2",
                            background: d.T.slate,
                            borderRadius: 6,
                            overflow: "hidden",
                            margin: "18px 0 24px",
                          },
                          children: (0, t.jsx)(r.default, {
                            src: `/sib/passes/${a.id}.jpeg`,
                            alt: a.name,
                            style: {
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            },
                          }),
                        }),
                        (0, t.jsx)("div", {
                          style: {
                            display: "grid",
                            gridTemplateColumns:
                              "repeat(auto-fit, minmax(250px, 1fr))",
                            gap: 16,
                          },
                          children: a.variants.map((i) => {
                            let n, o, s;
                            return (0, t.jsxs)(
                              "div",
                              {
                                style: {
                                  background: d.T.sky,
                                  color: d.T.slate,
                                  borderRadius: 12,
                                  padding: "24px 22px",
                                  display: "flex",
                                  flexDirection: "column",
                                  opacity: ((n = a.id), p.has(n)) ? 0.6 : 1,
                                },
                                children: [
                                  (0, t.jsx)("h4", {
                                    style: { margin: "0 0 8px", fontSize: 21 },
                                    children: i.title,
                                  }),
                                  (0, t.jsx)("p", {
                                    style: {
                                      margin: "0 0 10px",
                                      lineHeight: 1.55,
                                    },
                                    children: i.desc,
                                  }),
                                  i.shuttleMap &&
                                    (0, t.jsxs)("p", {
                                      style: { margin: "0 0 10px" },
                                      children: [
                                        "Check out the Shuttle Map",
                                        " ",
                                        (0, t.jsx)("button", {
                                          type: "button",
                                          onClick: () => C("shuttle"),
                                          style: {
                                            background: "none",
                                            border: "none",
                                            padding: 0,
                                            color: d.T.slate,
                                            textDecoration: "underline",
                                            cursor: "pointer",
                                            fontSize: "inherit",
                                          },
                                          children: "here",
                                        }),
                                      ],
                                    }),
                                  (0, t.jsxs)("p", {
                                    style: {
                                      margin: "auto 0 14px",
                                      fontSize: 22,
                                      textDecoration: ((o = a.id), p.has(o))
                                        ? "line-through"
                                        : "none",
                                    },
                                    children: [
                                      (0, l.money)(i.price),
                                      i.qty > 1 &&
                                        (0, t.jsxs)("span", {
                                          style: { fontSize: 14 },
                                          children: [
                                            " × ",
                                            i.qty,
                                            " = ",
                                            (0, l.money)(i.price * i.qty),
                                          ],
                                        }),
                                    ],
                                  }),
                                  ((s = a.id), p.has(s))
                                    ? (0, t.jsx)("button", {
                                        type: "button",
                                        disabled: !0,
                                        "aria-disabled": "true",
                                        style: {
                                          background: "#9aa5bd",
                                          color: d.T.slate,
                                          border: "none",
                                          borderRadius: 6,
                                          padding: "15px",
                                          fontFamily: d.T.font,
                                          fontSize: 14,
                                          cursor: "not-allowed",
                                        },
                                        children: "SOLD OUT",
                                      })
                                    : (0, t.jsx)("button", {
                                        type: "button",
                                        onClick: () =>
                                          ((t, a) => {
                                            let i;
                                            if (((i = t.id), p.has(i))) return;
                                            let n =
                                              Math.round(
                                                a.price * a.qty * 100,
                                              ) / 100;
                                            (g({
                                              id: `pass-${t.id}-${a.key}`,
                                              kind: "pass",
                                              name: `${t.short} — ${"single" === a.key ? "Single 3-Day Pass" : "4pack" === a.key ? "4-Pack (4 passes)" : "Pass + Shuttle Bundle"}`,
                                              detail:
                                                a.qty > 1
                                                  ? `${a.qty} passes \xd7 ${(0, l.money)(a.price)}`
                                                  : "3-Day pass · May 21–23, 2027",
                                              unitPrice: n,
                                              qty: 1,
                                            }),
                                              e.push(
                                                "/sand-in-my-boots/checkout",
                                              ));
                                          })(a, i),
                                        style: {
                                          background: d.T.pink,
                                          color: d.T.navy,
                                          border: "none",
                                          borderRadius: 6,
                                          padding: "15px",
                                          fontFamily: d.T.font,
                                          fontSize: 14,
                                          cursor: "pointer",
                                        },
                                        children: "BUY NOW",
                                      }),
                                ],
                              },
                              i.key,
                            );
                          }),
                        }),
                      ],
                    },
                    a.id,
                  );
                }),
                (0, t.jsxs)("div", {
                  id: "cabanas",
                  style: { marginBottom: 56 },
                  children: [
                    (0, t.jsx)("h3", {
                      style: {
                        fontFamily: d.T.font,
                        fontSize: "clamp(24px, 5vw, 34px)",
                        color: d.T.sky,
                      },
                      children: "CABANAS",
                    }),
                    (0, t.jsx)("p", {
                      style: { lineHeight: 1.7, maxWidth: 820 },
                      children: d.CABANAS.intro,
                    }),
                    (0, t.jsx)("p", {
                      style: { fontWeight: 700 },
                      children: "Cabanas include:",
                    }),
                    (0, t.jsx)(m, { items: d.CABANAS.includes }),
                    (0, t.jsx)("p", {
                      style: { lineHeight: 1.7, maxWidth: 820 },
                      children: d.CABANAS.outro,
                    }),
                    (0, t.jsxs)("p", {
                      children: [
                        "For more information on pricing and customization options, reach out to",
                        " ",
                        (0, t.jsx)("a", {
                          href: `mailto:${d.CABANAS.contact}`,
                          style: { color: d.T.pink },
                          children: d.CABANAS.contact,
                        }),
                      ],
                    }),
                  ],
                }),
                (0, t.jsxs)("div", {
                  style: {
                    background: d.T.slate,
                    borderRadius: 12,
                    padding: "30px 24px",
                  },
                  children: [
                    (0, t.jsx)("h3", {
                      style: {
                        fontFamily: d.T.font,
                        fontSize: "clamp(24px, 5vw, 34px)",
                        color: d.T.sky,
                        margin: "0 0 10px",
                      },
                      children: d.HOTEL_TEASER.title,
                    }),
                    (0, t.jsx)("p", {
                      style: {
                        fontSize: 20,
                        fontWeight: 700,
                        margin: "0 0 8px",
                      },
                      children: d.HOTEL_TEASER.from,
                    }),
                    (0, t.jsx)("p", {
                      style: { lineHeight: 1.7 },
                      children: d.HOTEL_TEASER.sub,
                    }),
                    (0, t.jsx)("p", {
                      style: { fontWeight: 700 },
                      children: "Included:",
                    }),
                    (0, t.jsx)(m, { items: d.HOTEL_TEASER.included }),
                    (0, t.jsx)("p", {
                      style: { fontSize: 13, lineHeight: 1.6, color: d.T.sky },
                      children: d.HOTEL_TEASER.note,
                    }),
                    (0, t.jsx)(i.default, {
                      href: "/sand-in-my-boots/hotels",
                      style: {
                        display: "inline-block",
                        background: d.T.pink,
                        color: d.T.navy,
                        fontFamily: d.T.font,
                        fontSize: 14,
                        padding: "15px 36px",
                        borderRadius: 6,
                        textDecoration: "none",
                        marginTop: 8,
                      },
                      children: "BUY NOW",
                    }),
                  ],
                }),
              ],
            }),
          }),
          (0, t.jsx)("section", {
            id: "festival-info",
            style: { padding: "60px 0" },
            children: (0, t.jsxs)("div", {
              style: h,
              children: [
                (0, t.jsx)("h2", { style: c, children: "FESTIVAL INFO" }),
                (0, t.jsx)("p", {
                  style: { lineHeight: 1.7, maxWidth: 820 },
                  children: d.FESTIVAL_INTRO,
                }),
                d.FESTIVAL_INFO.map((e) =>
                  (0, t.jsxs)(
                    "div",
                    {
                      style: { marginTop: 40 },
                      children: [
                        (0, t.jsxs)("div", {
                          style: {
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: 10,
                            marginBottom: 12,
                          },
                          children: [
                            (0, t.jsx)("h3", {
                              style: {
                                fontFamily: d.T.font,
                                fontSize: 22,
                                color: d.T.sky,
                                margin: 0,
                              },
                              children: e.group,
                            }),
                            (0, t.jsx)("button", {
                              type: "button",
                              onClick: () => {
                                let t = e.items.map(
                                  (t) => `${e.group}:${t.title}`,
                                );
                                O((e) => {
                                  let a = new Set(e),
                                    i = t.every((e) => a.has(e));
                                  return (
                                    t.forEach((e) =>
                                      i ? a.delete(e) : a.add(e),
                                    ),
                                    a
                                  );
                                });
                              },
                              style: y,
                              children: e.items.every((t) =>
                                R.has(`${e.group}:${t.title}`),
                              )
                                ? "COLLAPSE ALL"
                                : "EXPAND ALL",
                            }),
                          ],
                        }),
                        e.items.map((a) => {
                          let i = `${e.group}:${a.title}`,
                            n = R.has(i);
                          return (0, t.jsxs)(
                            "div",
                            {
                              style: { borderTop: `1px solid ${d.T.slate}` },
                              children: [
                                (0, t.jsxs)("button", {
                                  type: "button",
                                  "aria-expanded": n,
                                  onClick: () =>
                                    O((e) => {
                                      let t = new Set(e);
                                      return (n ? t.delete(i) : t.add(i), t);
                                    }),
                                  style: {
                                    width: "100%",
                                    background: "none",
                                    border: "none",
                                    color: d.T.cream,
                                    cursor: "pointer",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "18px 0",
                                    textAlign: "left",
                                    fontSize: 18,
                                    fontWeight: 700,
                                    fontFamily: d.T.body,
                                    gap: 12,
                                  },
                                  children: [
                                    (0, t.jsx)("span", { children: a.title }),
                                    (0, t.jsx)("span", {
                                      style: { color: d.T.pink, fontSize: 24 },
                                      children: n ? "−" : "+",
                                    }),
                                  ],
                                }),
                                n &&
                                  (0, t.jsx)("div", {
                                    style: { paddingBottom: 18 },
                                    children: a.body.map((e, a) =>
                                      (0, t.jsx)(
                                        "p",
                                        {
                                          style: {
                                            lineHeight: 1.75,
                                            margin: "0 0 12px",
                                            color: d.T.sky,
                                          },
                                          children: e,
                                        },
                                        a,
                                      ),
                                    ),
                                  }),
                              ],
                            },
                            i,
                          );
                        }),
                      ],
                    },
                    e.group,
                  ),
                ),
                (0, t.jsx)("div", {
                  style: { marginTop: 14 },
                  children: (0, t.jsx)("button", {
                    type: "button",
                    onClick: () => O(N ? new Set() : new Set(L)),
                    style: y,
                    children: N ? "COLLAPSE EVERYTHING" : "EXPAND EVERYTHING",
                  }),
                }),
              ],
            }),
          }),
          (0, t.jsx)("section", {
            id: "experience",
            style: { padding: "60px 0 40px" },
            children: (0, t.jsxs)("div", {
              style: h,
              children: [
                (0, t.jsx)("h2", {
                  style: c,
                  children: "ATTRACTIONS & ACTIVITIES",
                }),
                (0, t.jsx)("p", {
                  style: { lineHeight: 1.7, maxWidth: 820, marginBottom: 36 },
                  children: d.EXPERIENCE_INTRO,
                }),
                (0, t.jsx)("div", {
                  style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: 32,
                  },
                  children: d.EXPERIENCES.map((e) =>
                    (0, t.jsxs)(
                      "div",
                      {
                        id: (0, d.slugify)(e.title),
                        children: [
                          (0, t.jsx)("h3", {
                            style: {
                              fontSize: 22,
                              margin: "0 0 10px",
                              fontWeight: 700,
                            },
                            children: e.title,
                          }),
                          (0, t.jsxs)("p", {
                            style: {
                              lineHeight: 1.7,
                              color: d.T.sky,
                              margin: "0 0 14px",
                            },
                            children: [
                              e.text,
                              e.link &&
                                (0, t.jsxs)(t.Fragment, {
                                  children: [
                                    " ",
                                    (0, t.jsx)("a", {
                                      href: e.link.href,
                                      style: { color: d.T.cream },
                                      children: e.link.label,
                                    }),
                                    " to learn more.",
                                  ],
                                }),
                            ],
                          }),
                          (0, t.jsx)("div", {
                            style: {
                              aspectRatio: "1/1",
                              background: d.T.slate,
                              borderRadius: 8,
                              overflow: "hidden",
                            },
                            children: (0, t.jsx)(r.default, {
                              src: e.img,
                              alt: e.title,
                              style: {
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                              },
                            }),
                          }),
                        ],
                      },
                      e.title,
                    ),
                  ),
                }),
              ],
            }),
          }),
          (0, t.jsxs)("footer", {
            style: {
              textAlign: "center",
              padding: "40px 20px",
              color: d.T.sky,
              fontSize: 13,
            },
            children: [
              "Questions? ",
              (0, t.jsx)("a", {
                href: "mailto:support@clubwallen.site",
                style: { color: d.T.pink },
                children: "support@clubwallen.site",
              }),
            ],
          }),
          P &&
            (0, t.jsx)("div", {
              onClick: () => C(null),
              style: {
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.85)",
                zIndex: 300,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 20,
              },
              children: (0, t.jsxs)("div", {
                onClick: (e) => e.stopPropagation(),
                style: {
                  maxWidth: 900,
                  width: "100%",
                  maxHeight: "92vh",
                  overflow: "auto",
                  background: d.T.navy,
                  borderRadius: 10,
                  padding: 16,
                },
                children: [
                  (0, t.jsx)("button", {
                    type: "button",
                    onClick: () => C(null),
                    style: {
                      display: "block",
                      marginLeft: "auto",
                      background: "none",
                      border: "none",
                      color: d.T.cream,
                      fontSize: 26,
                      cursor: "pointer",
                    },
                    "aria-label": "Close map",
                    children: "✕",
                  }),
                  (0, t.jsx)(r.default, {
                    src: {
                      "party-pit": "/sib/maps/party-pit-map.jpeg",
                      "vip-areas": "/sib/maps/vip-areas-map.jpeg",
                      shuttle: "/sib/maps/shuttle-map.jpeg",
                    }[P],
                    alt: "Map",
                    style: { width: "100%", display: "block", borderRadius: 6 },
                  }),
                ],
              }),
            }),
        ],
      });
    },
  ]);
};
