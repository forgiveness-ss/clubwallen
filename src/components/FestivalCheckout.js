import { siteConfig } from "../site.config.js";
export default (e) => {
  "use strict";
  var t = e.i(40450),
    i = e.i(13742),
    a = e.i(6028),
    n = e.i(29150),
    o = e.i(17652),
    s = e.i(55411);
  let r = ["Your details", "Delivery address", "Review cart", "Payment"],
    l = siteConfig.supportEmail,
    d = "#9be3b0",
    c = "#635BFF",
    h = "/sib/payments/stripe-mark.svg",
    u = {
      width: "100%",
      boxSizing: "border-box",
      background: "#2b3354",
      border: "1px solid #cfe0f355",
      color: "#fbebb5",
      borderRadius: 6,
      padding: "14px 14px",
      fontSize: 16,
      fontFamily: "inherit",
    },
    p = { display: "block", fontSize: 13, color: "#cfe0f3", marginBottom: 6 },
    m = {
      background: "#e38d90",
      color: "#212640",
      border: "none",
      borderRadius: 6,
      padding: "16px 32px",
      fontFamily: s.T.font,
      fontSize: 14,
      cursor: "pointer",
    },
    y = {
      background: "transparent",
      color: "#cfe0f3",
      border: "1px solid #cfe0f355",
      borderRadius: 6,
      padding: "16px 24px",
      fontSize: 14,
      cursor: "pointer",
    },
    f = {
      width: 22,
      height: 22,
      minWidth: 22,
      maxWidth: 22,
      flex: "none",
      margin: "2px 0 0",
      padding: 0,
      accentColor: "#e38d90",
      cursor: "pointer",
    },
    g = [
      {
        id: "crypto",
        title: "Crypto (NOWPayments)",
        sub: "Pay with Bitcoin or other supported crypto on a secure NOWPayments page.",
        img: "/sib/payments/crypto.png",
        fallback: "₿",
      },
      {
        id: "card",
        title: "Debit / Credit Card",
        sub: "Pay securely on Stripe's hosted checkout page.",
        img: h,
        fallback: "💳",
      },
      {
        id: "bank",
        title: "Bank Transfer",
        sub: "Send the total to our bank account, then email a screenshot of your payment for immediate confirmation.",
        img: null,
        fallback: "🏦",
      },
    ];
  function b({ orderId: e, amount: i }) {
    let a = (e, i) =>
      (0, t.jsxs)("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          padding: "8px 0",
          borderBottom: "1px solid #ffffff18",
          fontSize: 14,
        },
        children: [
          (0, t.jsx)("span", {
            style: { color: s.T.sky, flex: "none" },
            children: e,
          }),
          (0, t.jsx)("span", {
            style: {
              fontWeight: 700,
              textAlign: "right",
              overflowWrap: "anywhere",
              userSelect: "all",
            },
            children: i,
          }),
        ],
      });
    return (0, t.jsxs)("div", {
      style: {
        background: "#1c2038",
        borderRadius: 10,
        padding: "18px 18px 14px",
        marginBottom: 18,
      },
      children: [
        (0, t.jsx)("h3", {
          style: { fontFamily: s.T.font, fontSize: 16, margin: "0 0 8px" },
          children: "BANK TRANSFER DETAILS",
        }),
        a("Name", "Club Wallen"),
        a("Bank name", "Your bank name"),
        a("Routing number", "DEMO — NOT PAYABLE"),
        a("Account number", "DEMO — NOT PAYABLE"),
        a("Bank address", "Your bank address"),
        a("Amount to send", i),
        a("Reference", e),
        (0, t.jsxs)("p", {
          style: {
            fontSize: 14,
            lineHeight: 1.65,
            color: s.T.sky,
            margin: "14px 0 0",
          },
          children: [
            "After sending, email a screenshot of your payment to",
            " ",
            (0, t.jsx)("a", {
              href: `mailto:${l}?subject=${encodeURIComponent(`Payment confirmation ${e}`)}`,
              style: { color: s.T.pink, fontWeight: 700 },
              children: l,
            }),
            " ",
            "for immediate confirmation. Include your order reference above.",
          ],
        }),
      ],
    });
  }
  function v({ size: e = 28, dim: a = !1 }) {
    let [n, o] = (0, i.useState)(!0);
    return n
      ? (0, t.jsx)("img", {
          src: h,
          alt: "Stripe",
          width: e,
          height: e,
          onError: () => o(!1),
          style: {
            display: "block",
            objectFit: "contain",
            filter: a ? "grayscale(1) opacity(0.55)" : void 0,
          },
        })
      : (0, t.jsx)("span", {
          style: {
            fontFamily: s.T.body,
            fontWeight: 700,
            fontSize: Math.round(0.6 * e),
            letterSpacing: "-0.01em",
            color: a ? "#8a8fa3" : c,
          },
          children: "Stripe",
        });
  }
  let x = [
      { label: "Establishing secure connection", ms: 1700 },
      { label: "Verifying your order details", ms: 1900 },
      { label: "Connecting to Stripe", ms: 2200 },
      { label: "Preparing your secure checkout", ms: 1800 },
    ],
    w = `
@keyframes cwSpin { to { transform: rotate(360deg); } }
@keyframes cwPulse { 0%, 100% { opacity: .4; transform: scale(1); } 50% { opacity: 1; transform: scale(1.06); } }
@keyframes cwDash { to { background-position: -24px 0; } }
@keyframes cwGlow { 0%, 100% { opacity: .45; } 50% { opacity: .9; } }
.cw-spin { animation: cwSpin .9s linear infinite; }
.cw-led { animation: cwPulse 1.6s ease-in-out infinite; }
.cw-connector { height: 2px; flex: 1; min-width: 32px; background-size: 22px 2px; animation: cwDash 0.9s linear infinite; }
.cw-glow { animation: cwGlow 2.4s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .cw-spin, .cw-led, .cw-connector, .cw-glow { animation: none !important; }
}
`;
  function S({ children: e, caption: i, ring: a }) {
    return (0, t.jsxs)("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        flex: "none",
      },
      children: [
        (0, t.jsx)("div", {
          style: {
            width: 62,
            height: 62,
            borderRadius: 18,
            background: "linear-gradient(160deg, #222a4d, #1a2040)",
            border: `1px solid ${a ? a + "55" : "#ffffff20"}`,
            boxShadow: a
              ? `0 0 0 5px ${a}22, 0 8px 20px #00000040`
              : "0 8px 20px #00000030",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          children: e,
        }),
        (0, t.jsx)("span", {
          style: {
            fontSize: 11.5,
            color: s.T.sky,
            fontWeight: 500,
            letterSpacing: "0.01em",
          },
          children: i,
        }),
      ],
    });
  }
  function k() {
    return (0, t.jsxs)("svg", {
      width: "26",
      height: "26",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "#cfe0f3",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        (0, t.jsx)("rect", {
          x: "4",
          y: "2",
          width: "16",
          height: "20",
          rx: "2.4",
        }),
        (0, t.jsx)("path", { d: "M10 18h4" }),
      ],
    });
  }
  function j({ active: e }) {
    return (0, t.jsxs)("svg", {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: e ? "#e38d90" : "#cfe0f3",
      strokeWidth: "1.7",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        (0, t.jsx)("rect", {
          x: "5",
          y: "11",
          width: "14",
          height: "9",
          rx: "2.2",
        }),
        (0, t.jsx)("path", { d: "M8 11V7a4 4 0 018 0v4" }),
        (0, t.jsx)("circle", {
          cx: "12",
          cy: "15.3",
          r: "1.1",
          fill: e ? "#e38d90" : "#cfe0f3",
          stroke: "none",
        }),
      ],
    });
  }
  function A({ broken: e = !1 }) {
    return (0, t.jsxs)("div", {
      style: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: 10,
        margin: "4px auto 30px",
        maxWidth: 400,
      },
      children: [
        (0, t.jsx)(S, { caption: "Your device", children: (0, t.jsx)(k, {}) }),
        (0, t.jsx)("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 30,
            flex: 1,
            minWidth: 30,
          },
          children: (0, t.jsx)("div", {
            className: "cw-connector",
            style: {
              width: "100%",
              backgroundImage: `repeating-linear-gradient(90deg, ${e ? "#ffffff30" : "#e38d90"} 0 6px, transparent 6px 12px)`,
            },
          }),
        }),
        (0, t.jsx)(S, {
          caption: "Secure link",
          ring: e ? void 0 : "#e38d90",
          children: (0, t.jsx)(j, { active: !e }),
        }),
        (0, t.jsx)("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 30,
            flex: 1,
            minWidth: 30,
          },
          children: (0, t.jsx)("div", {
            className: "cw-connector",
            style: {
              width: "100%",
              backgroundImage: `repeating-linear-gradient(90deg, ${e ? "#ffffff30" : "#a383e8"} 0 6px, transparent 6px 12px)`,
            },
          }),
        }),
        (0, t.jsx)(S, {
          caption: "Stripe",
          ring: e ? void 0 : c,
          children: (0, t.jsx)("span", {
            className: e ? "" : "cw-glow",
            style: { display: "flex" },
            children: (0, t.jsx)(v, { size: 26, dim: e }),
          }),
        }),
      ],
    });
  }
  function T({ onDone: e }) {
    let a = x.reduce((e, t) => e + t.ms, 0),
      [n, o] = (0, i.useState)(0),
      r = (0, i.useRef)(e);
    ((r.current = e),
      (0, i.useEffect)(() => {
        let e = Date.now(),
          t = setInterval(() => {
            let i = Date.now() - e;
            i >= a
              ? (clearInterval(t), o(a), setTimeout(() => r.current(), 550))
              : o(i);
          }, 50);
        return () => clearInterval(t);
      }, [a]));
    let l = 0,
      h = x.length;
    for (let e = 0; e < x.length; e++)
      if (n < (l += x[e].ms)) {
        h = e;
        break;
      }
    let u = n >= a,
      p = Math.min(100, Math.floor((n / a) * 100));
    return (0, t.jsxs)("div", {
      role: "status",
      "aria-live": "polite",
      style: { maxWidth: 440, margin: "0 auto", position: "relative" },
      children: [
        (0, t.jsx)("style", { children: w }),
        (0, t.jsx)("div", {
          "aria-hidden": "true",
          style: {
            position: "absolute",
            inset: "-40px -20px auto",
            height: 240,
            background:
              "radial-gradient(circle at 50% 30%, #635bff22, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          },
        }),
        (0, t.jsxs)("div", {
          style: {
            position: "relative",
            zIndex: 1,
            background: "#1b2040cc",
            backdropFilter: "blur(6px)",
            border: "1px solid #ffffff14",
            borderRadius: 20,
            padding: "32px 26px 28px",
            boxShadow: "0 24px 60px #00000055",
          },
          children: [
            (0, t.jsx)("div", {
              style: {
                display: "flex",
                justifyContent: "center",
                marginBottom: 18,
              },
              children: (0, t.jsxs)("span", {
                style: {
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 12,
                  color: d,
                  background: "#9be3b01a",
                  border: "1px solid #9be3b040",
                  borderRadius: 999,
                  padding: "5px 13px",
                  fontFamily: s.T.body,
                  fontWeight: 500,
                },
                children: [
                  (0, t.jsx)("span", {
                    className: "cw-led",
                    style: {
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: d,
                      display: "inline-block",
                    },
                  }),
                  u ? "Connected" : "Demo connection preview",
                ],
              }),
            }),
            (0, t.jsx)(A, {}),
            (0, t.jsx)("p", {
              style: {
                textAlign: "center",
                fontSize: 11,
                letterSpacing: "0.12em",
                color: s.T.sky,
                textTransform: "uppercase",
                margin: "0 0 6px",
                opacity: 0.8,
              },
              children: "Secure Checkout",
            }),
            (0, t.jsx)("h2", {
              style: {
                fontFamily: s.T.font,
                fontWeight: 700,
                fontSize: 25,
                textAlign: "center",
                margin: "0 0 6px",
                color: s.T.cream,
              },
              children: "Previewing card checkout…",
            }),
            (0, t.jsx)("p", {
              style: {
                textAlign: "center",
                color: s.T.sky,
                fontSize: 13.5,
                margin: "0 0 24px",
              },
              children: "Please don’t close or refresh this page.",
            }),
            (0, t.jsx)("div", {
              style: {
                height: 6,
                background: "#10142b",
                borderRadius: 6,
                overflow: "hidden",
              },
              children: (0, t.jsx)("div", {
                style: {
                  width: `${p}%`,
                  height: "100%",
                  borderRadius: 6,
                  transition: "width .3s linear",
                  background: `linear-gradient(90deg, #e38d90, ${c})`,
                },
              }),
            }),
            (0, t.jsxs)("div", {
              style: {
                display: "flex",
                justifyContent: "space-between",
                fontSize: 11.5,
                color: s.T.sky,
                margin: "8px 0 18px",
              },
              children: [
                (0, t.jsx)("span", {
                  children: u
                    ? "Complete"
                    : `Step ${Math.min(h + 1, x.length)} of ${x.length}`,
                }),
                (0, t.jsxs)("span", { children: [p, "%"] }),
              ],
            }),
            (0, t.jsx)("ul", {
              style: {
                listStyle: "none",
                margin: 0,
                padding: 0,
                background: "#141833",
                borderRadius: 14,
                border: "1px solid #ffffff14",
                overflow: "hidden",
              },
              children: x.map((e, i) => {
                let a = i < h || u ? "done" : i === h ? "active" : "wait";
                return (0, t.jsxs)(
                  "li",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "13px 16px",
                      borderTop: i ? "1px solid #ffffff10" : "none",
                      background: "active" === a ? "#e38d900f" : "transparent",
                      opacity: "wait" === a ? 0.42 : 1,
                      transition: "opacity .4s, background .3s",
                    },
                    children: [
                      (0, t.jsxs)("span", {
                        style: {
                          width: 20,
                          height: 20,
                          flex: "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        },
                        "aria-hidden": "true",
                        children: [
                          "done" === a &&
                            (0, t.jsxs)("svg", {
                              width: "20",
                              height: "20",
                              viewBox: "0 0 20 20",
                              children: [
                                (0, t.jsx)("circle", {
                                  cx: "10",
                                  cy: "10",
                                  r: "9",
                                  fill: d,
                                }),
                                (0, t.jsx)("path", {
                                  d: "M5.5 10.2l3 3 6-6.4",
                                  stroke: "#1a1f38",
                                  strokeWidth: "2",
                                  fill: "none",
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round",
                                }),
                              ],
                            }),
                          "active" === a &&
                            (0, t.jsxs)("svg", {
                              className: "cw-spin",
                              width: "20",
                              height: "20",
                              viewBox: "0 0 20 20",
                              children: [
                                (0, t.jsx)("circle", {
                                  cx: "10",
                                  cy: "10",
                                  r: "8",
                                  stroke: "#ffffff25",
                                  strokeWidth: "2.5",
                                  fill: "none",
                                }),
                                (0, t.jsx)("path", {
                                  d: "M10 2a8 8 0 018 8",
                                  stroke: "#e38d90",
                                  strokeWidth: "2.5",
                                  fill: "none",
                                  strokeLinecap: "round",
                                }),
                              ],
                            }),
                          "wait" === a &&
                            (0, t.jsx)("span", {
                              style: {
                                width: 14,
                                height: 14,
                                borderRadius: "50%",
                                border: "2px solid #ffffff2a",
                              },
                            }),
                        ],
                      }),
                      (0, t.jsx)("span", {
                        style: {
                          fontSize: 14,
                          lineHeight: 1.4,
                          color: "active" === a ? s.T.cream : s.T.sky,
                          fontWeight: "active" === a ? 600 : 400,
                        },
                        children: e.label,
                      }),
                    ],
                  },
                  e.label,
                );
              }),
            }),
            (0, t.jsxs)("p", {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 7,
                fontSize: 11.5,
                color: s.T.sky,
                margin: "20px 0 0",
              },
              children: [
                (0, t.jsxs)("svg", {
                  width: "13",
                  height: "13",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: s.T.sky,
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  "aria-hidden": "true",
                  children: [
                    (0, t.jsx)("rect", {
                      x: "4",
                      y: "11",
                      width: "16",
                      height: "10",
                      rx: "2",
                    }),
                    (0, t.jsx)("path", { d: "M8 11V8a4 4 0 018 0v3" }),
                  ],
                }),
                "256-bit encrypted · Secured by ",
                (0, t.jsx)(v, { size: 13 }),
              ],
            }),
          ],
        }),
      ],
    });
  }
  function I({ message: e, onTryBank: i, onTryCrypto: a, onRetry: n }) {
    return (0, t.jsx)("div", {
      style: { maxWidth: 460, margin: "0 auto" },
      children: (0, t.jsxs)("div", {
        style: {
          background: "#1b2040cc",
          border: "1px solid #ffffff14",
          borderRadius: 20,
          padding: "32px 28px 28px",
          boxShadow: "0 24px 60px #00000055",
          textAlign: "center",
        },
        children: [
          (0, t.jsx)(A, { broken: !0 }),
          (0, t.jsx)("div", {
            style: {
              width: 52,
              height: 52,
              margin: "0 auto 16px",
              borderRadius: "50%",
              background: "#3a2433",
              border: "1px solid #f0a0a355",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            children: (0, t.jsxs)("svg", {
              width: "24",
              height: "24",
              viewBox: "0 0 22 22",
              "aria-hidden": "true",
              children: [
                (0, t.jsx)("circle", {
                  cx: "11",
                  cy: "11",
                  r: "10",
                  fill: s.T.pink,
                }),
                (0, t.jsx)("path", {
                  d: "M7.5 7.5l7 7M14.5 7.5l-7 7",
                  stroke: "#1a1f38",
                  strokeWidth: "2",
                  fill: "none",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                }),
              ],
            }),
          }),
          (0, t.jsx)("h2", {
            style: {
              fontFamily: s.T.font,
              fontWeight: 700,
              fontSize: 24,
              margin: "0 0 10px",
              color: s.T.cream,
            },
            children: "We couldn’t reach Stripe",
          }),
          (0, t.jsx)("p", {
            style: {
              color: s.T.sky,
              lineHeight: 1.7,
              fontSize: 14,
              margin: "0 0 26px",
            },
            children: e,
          }),
          (0, t.jsxs)("div", {
            style: { display: "grid", gap: 10 },
            children: [
              (0, t.jsx)("button", {
                type: "button",
                style: m,
                onClick: a,
                children: "PAY WITH CRYPTO INSTEAD",
              }),
              (0, t.jsx)("button", {
                type: "button",
                style: y,
                onClick: i,
                children: "PAY BY BANK TRANSFER INSTEAD",
              }),
              (0, t.jsx)("button", {
                type: "button",
                onClick: n,
                style: {
                  background: "none",
                  border: "none",
                  color: s.T.sky,
                  fontSize: 13,
                  textDecoration: "underline",
                  cursor: "pointer",
                  padding: "6px 0",
                },
                children: "Try card payment again",
              }),
            ],
          }),
        ],
      }),
    });
  }
  let C = {
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
  function P({ label: e, value: i, bold: a }) {
    return (0, t.jsxs)("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        padding: "5px 0",
        fontWeight: a ? 800 : 400,
        fontSize: a ? 18 : 14,
      },
      children: [
        (0, t.jsx)("span", { children: e }),
        (0, t.jsx)("span", { children: i }),
      ],
    });
  }
  e.s([
    "default",
    0,
    function () {
      let {
          items: e,
          promo: l,
          ready: c,
          totals: h,
          setQty: x,
          removeItem: w,
          applyPromo: S,
          removePromo: k,
          clear: j,
        } = (0, o.useSibCart)(),
        A = (0, i.useRef)(`SIB_${Date.now()}`).current,
        [E, B] = (0, i.useState)(1),
        [R, N] = (0, i.useState)({ fullName: "", email: "", phone: "" }),
        [O, W] = (0, i.useState)({
          line1: "",
          line2: "",
          city: "",
          state: "",
          zip: "",
          country: "United States",
        }),
        [L, D] = (0, i.useState)(""),
        [M, F] = (0, i.useState)(null),
        [z, H] = (0, i.useState)(!1),
        [V, Y] = (0, i.useState)("crypto"),
        [q, G] = (0, i.useState)(null),
        [U, $] = (0, i.useState)(!1),
        [K, _] = (0, i.useState)(null),
        [J, X] = (0, i.useState)("idle"),
        [Q, Z] = (0, i.useState)(null),
        ee = (0, i.useRef)(null),
        et = (e) => (t) => N((i) => ({ ...i, [e]: t.target.value })),
        ei = (e) => (t) => W((i) => ({ ...i, [e]: t.target.value })),
        ea = async (t, i) => {
          let a = await fetch("/api/sand-orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: A,
              status: t,
              paymentMethod: i || null,
              customer: R,
              address: E >= 2 || "checkout_started" !== t ? O : null,
              items: e,
              promoCode: l || null,
            }),
          });
          if (!a.ok)
            throw Error(
              (await a.json().catch(() => ({}))).error ||
                "Could not save your order.",
            );
        },
        en = async () => {
          if (
            (G(null),
            !R.fullName.trim() ||
              !/^\S+@\S+\.\S+$/.test(R.email) ||
              R.phone.replace(/\D/g, "").length < 7)
          )
            return void G(
              "Enter your full name, a valid email and a phone number.",
            );
          $(!0);
          try {
            (await ea("checkout_started"), B(2));
          } catch (e) {
            G(e.message);
          }
          $(!1);
        },
        eo = async () => {
          if (
            (G(null),
            !O.line1.trim() ||
              !O.city.trim() ||
              !O.state.trim() ||
              !O.zip.trim() ||
              !O.country.trim())
          )
            return void G(
              "Enter your full delivery address. Wristbands ship to this address.",
            );
          $(!0);
          try {
            (await ea("address_added"), B(3));
          } catch (e) {
            G(e.message);
          }
          $(!1);
        },
        es = () => {
          ((ee.current = fetch("/api/sand-orders/pay-card", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: A,
              amount: h.total,
              description: `Sand In My Boots order ${A}`,
              customerEmail: R.email,
            }),
          })
            .then(async (e) => {
              let t = await e.json().catch(() => ({}));
              return e.ok && t.url
                ? { url: t.url }
                : {
                    error:
                      t.error ||
                      "We couldn't connect to our card payment provider right now. Please choose Crypto or Bank Transfer to complete your order.",
                  };
            })
            .catch(() => ({
              error:
                "We couldn't connect to our card payment provider right now. Please choose Crypto or Bank Transfer to complete your order.",
            }))),
            Z(null),
            X("connecting"));
        },
        er = async () => {
          let e = await (ee.current ??
            Promise.resolve({ error: "Connection error. Please try again." }));
          if (e.url) {
            (localStorage.setItem("cw_pending_email", R.email),
              j(),
              (window.location.href = e.url));
            return;
          }
          (Z(
            e.error ||
              "We couldn't connect to our card payment provider right now. Please choose Crypto or Bank Transfer to complete your order.",
          ),
            X("failed"),
            $(!1));
        },
        el = async () => {
          (G(null), $(!0));
          try {
            if (
              (await ea("awaiting_payment", "bank" === V ? "bank_transfer" : V),
              "bank" === V)
            ) {
              localStorage.setItem("cw_pending_email", R.email);
              let e = h.total;
              (j(),
                _({ total: e }),
                $(!1),
                window.scrollTo({ top: 0, behavior: "smooth" }));
              return;
            }
            if ("card" === V) return void es();
            let e = await fetch("/api/sand-orders/pay", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId: A }),
              }),
              t = await e.json();
            if (!e.ok || !t.url)
              throw Error(t.error || "Could not start the crypto payment.");
            (localStorage.setItem("cw_pending_email", R.email),
              j(),
              (window.location.href = t.url));
          } catch (e) {
            (G(e.message), $(!1));
          }
        },
        ed = (e) =>
          (0, t.jsxs)("div", {
            style: {
              background: s.T.navy,
              minHeight: "100vh",
              color: s.T.cream,
              fontFamily: s.T.body,
              overflowX: "hidden",
            },
            children: [(0, t.jsx)(n.default, {}), e],
          });
      if ("connecting" === J)
        return ed(
          (0, t.jsx)("div", {
            style: {
              maxWidth: 1050,
              margin: "0 auto",
              padding: "60px 20px 100px",
            },
            children: (0, t.jsx)(T, { onDone: er }),
          }),
        );
      if ("failed" === J)
        return ed(
          (0, t.jsx)("div", {
            style: {
              maxWidth: 1050,
              margin: "0 auto",
              padding: "60px 20px 100px",
            },
            children: (0, t.jsx)(I, {
              message:
                Q ||
                "We couldn't connect to our card payment provider right now.",
              onTryCrypto: () => {
                (Y("crypto"), X("idle"), Z(null));
              },
              onTryBank: () => {
                (Y("bank"), X("idle"), Z(null));
              },
              onRetry: () => {
                (X("idle"), Z(null), $(!0), es());
              },
            }),
          }),
        );
      if (K)
        return ed(
          (0, t.jsxs)("div", {
            style: {
              maxWidth: 620,
              margin: "0 auto",
              padding: "48px 20px 80px",
              boxSizing: "border-box",
            },
            children: [
              (0, t.jsx)("h1", {
                style: {
                  fontFamily: s.T.font,
                  fontSize: "clamp(26px, 6vw, 38px)",
                  margin: "0 0 10px",
                },
                children: "ORDER RECEIVED",
              }),
              (0, t.jsx)("p", {
                style: { color: s.T.sky, lineHeight: 1.7, marginTop: 0 },
                children:
                  "Demo order saved. Bank transfers are disabled in this preview. Configure your own bank details before launching.",
              }),
              (0, t.jsx)(b, { orderId: A, amount: (0, o.money)(K.total) }),
              (0, t.jsx)(a.default, {
                href: "/sand-in-my-boots",
                style: {
                  ...y,
                  textDecoration: "none",
                  display: "inline-block",
                },
                children: "Back to Sand In My Boots",
              }),
            ],
          }),
        );
      if (c && 0 === e.length)
        return ed(
          (0, t.jsxs)("div", {
            style: {
              maxWidth: 560,
              margin: "0 auto",
              padding: "80px 20px",
              textAlign: "center",
            },
            children: [
              (0, t.jsx)("h1", {
                style: { fontFamily: s.T.font, fontSize: 32 },
                children: "YOUR CART IS EMPTY",
              }),
              (0, t.jsx)("p", {
                style: { color: s.T.sky, lineHeight: 1.7 },
                children:
                  "Add festival passes or a hotel package, then come back to check out.",
              }),
              (0, t.jsxs)("div", {
                style: {
                  display: "flex",
                  gap: 12,
                  justifyContent: "center",
                  flexWrap: "wrap",
                  marginTop: 24,
                },
                children: [
                  (0, t.jsx)(a.default, {
                    href: "/sand-in-my-boots#passes",
                    style: { ...m, textDecoration: "none" },
                    children: "BUY PASSES",
                  }),
                  (0, t.jsx)(a.default, {
                    href: "/sand-in-my-boots/hotels",
                    style: { ...y, textDecoration: "none" },
                    children: "HOTEL PACKAGES",
                  }),
                ],
              }),
            ],
          }),
        );
      let ec = (0, t.jsxs)("aside", {
        style: {
          background: s.T.slate,
          borderRadius: 10,
          padding: "22px 20px",
          alignSelf: "start",
          position: "sticky",
          top: 130,
          minWidth: 0,
        },
        children: [
          (0, t.jsx)("h2", {
            style: { fontFamily: s.T.font, fontSize: 18, margin: "0 0 14px" },
            children: "ORDER SUMMARY",
          }),
          e.map((e) =>
            (0, t.jsxs)(
              "div",
              {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 10,
                  padding: "10px 0",
                  borderBottom: "1px solid #ffffff18",
                },
                children: [
                  (0, t.jsxs)("div", {
                    style: { minWidth: 0 },
                    children: [
                      (0, t.jsx)("div", {
                        style: { fontSize: 14, fontWeight: 700 },
                        children: e.name,
                      }),
                      e.detail &&
                        (0, t.jsx)("div", {
                          style: {
                            fontSize: 12,
                            color: s.T.sky,
                            lineHeight: 1.5,
                          },
                          children: e.detail,
                        }),
                      (0, t.jsxs)("div", {
                        style: { fontSize: 12, color: s.T.sky },
                        children: ["Qty ", e.qty],
                      }),
                    ],
                  }),
                  (0, t.jsx)("div", {
                    style: { fontSize: 14, whiteSpace: "nowrap" },
                    children: (0, o.money)(e.unitPrice * e.qty),
                  }),
                ],
              },
              e.id,
            ),
          ),
          (0, t.jsxs)("div", {
            style: { marginTop: 14, fontSize: 14 },
            children: [
              (0, t.jsx)(P, {
                label: "Subtotal",
                value: (0, o.money)(h.subtotal),
              }),
              h.discount > 0 &&
                (0, t.jsx)(P, {
                  label: `Promo ${l}`,
                  value: `−${(0, o.money)(h.discount)}`,
                }),
              (0, t.jsx)(P, {
                label: "Total",
                value: (0, o.money)(h.total),
                bold: !0,
              }),
            ],
          }),
          (0, t.jsx)("p", {
            style: {
              fontSize: 11,
              color: s.T.sky,
              lineHeight: 1.6,
              marginBottom: 0,
            },
            children:
              "Prices include taxes & beach restoration fees. Hotel packages are subject to a 5% booking fee.",
          }),
          (0, t.jsxs)("div", {
            style: { marginTop: 12, display: "flex", gap: 14, fontSize: 13 },
            children: [
              (0, t.jsx)(a.default, {
                href: "/sand-in-my-boots#passes",
                style: { color: s.T.pink },
                children: "+ Add passes",
              }),
              (0, t.jsx)(a.default, {
                href: "/sand-in-my-boots/hotels",
                style: { color: s.T.pink },
                children: "+ Add hotel",
              }),
            ],
          }),
        ],
      });
      return ed(
        (0, t.jsxs)("div", {
          style: {
            maxWidth: 1050,
            margin: "0 auto",
            padding: "36px 20px 80px",
            boxSizing: "border-box",
            width: "100%",
          },
          children: [
            (0, t.jsx)("h1", {
              style: {
                fontFamily: s.T.font,
                fontSize: "clamp(28px, 6vw, 44px)",
                margin: "0 0 20px",
              },
              children: "CHECKOUT",
            }),
            (0, t.jsx)("ol", {
              style: {
                display: "flex",
                gap: 8,
                listStyle: "none",
                padding: 0,
                margin: "0 0 30px",
                flexWrap: "wrap",
              },
              children: r.map((e, i) => {
                let a = i + 1,
                  n = E === a,
                  o = E > a;
                return (0, t.jsxs)(
                  "li",
                  {
                    style: {
                      padding: "8px 14px",
                      borderRadius: 20,
                      fontSize: 13,
                      background: n ? s.T.pink : "transparent",
                      color: n ? s.T.navy : o ? s.T.cream : s.T.sky,
                      border: `1px solid ${n ? s.T.pink : "#cfe0f355"}`,
                      fontWeight: n ? 700 : 400,
                    },
                    children: [o ? "✓ " : `${a}. `, e],
                  },
                  e,
                );
              }),
            }),
            (0, t.jsxs)("div", {
              style: {
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
                gap: 28,
              },
              children: [
                (0, t.jsxs)("div", {
                  style: { minWidth: 0 },
                  children: [
                    1 === E &&
                      (0, t.jsxs)("div", {
                        children: [
                          (0, t.jsx)("h2", {
                            style: { fontSize: 22, marginTop: 0 },
                            children: "Your details",
                          }),
                          (0, t.jsxs)("div", {
                            style: { marginBottom: 16 },
                            children: [
                              (0, t.jsx)("label", {
                                htmlFor: "fn",
                                style: p,
                                children: "Full name",
                              }),
                              (0, t.jsx)("input", {
                                id: "fn",
                                style: u,
                                value: R.fullName,
                                onChange: et("fullName"),
                                autoComplete: "name",
                              }),
                            ],
                          }),
                          (0, t.jsxs)("div", {
                            style: { marginBottom: 16 },
                            children: [
                              (0, t.jsx)("label", {
                                htmlFor: "em",
                                style: p,
                                children: "Email",
                              }),
                              (0, t.jsx)("input", {
                                id: "em",
                                type: "email",
                                style: u,
                                value: R.email,
                                onChange: et("email"),
                                autoComplete: "email",
                              }),
                            ],
                          }),
                          (0, t.jsxs)("div", {
                            style: { marginBottom: 22 },
                            children: [
                              (0, t.jsx)("label", {
                                htmlFor: "ph",
                                style: p,
                                children: "Phone number",
                              }),
                              (0, t.jsx)("input", {
                                id: "ph",
                                type: "tel",
                                style: u,
                                value: R.phone,
                                onChange: et("phone"),
                                autoComplete: "tel",
                              }),
                            ],
                          }),
                          (0, t.jsx)("button", {
                            type: "button",
                            onClick: en,
                            disabled: U,
                            style: { ...m, opacity: U ? 0.7 : 1 },
                            children: U ? "SAVING…" : "CONTINUE",
                          }),
                        ],
                      }),
                    2 === E &&
                      (0, t.jsxs)("div", {
                        children: [
                          (0, t.jsx)("h2", {
                            style: { fontSize: 22, marginTop: 0 },
                            children: "Delivery address",
                          }),
                          (0, t.jsx)("p", {
                            style: {
                              color: s.T.sky,
                              lineHeight: 1.6,
                              fontSize: 14,
                            },
                            children:
                              "Physical wristbands ship to this address starting April 2027. Outside the US? Use an address UPS can deliver to.",
                          }),
                          (0, t.jsxs)("div", {
                            style: { marginBottom: 16 },
                            children: [
                              (0, t.jsx)("label", {
                                htmlFor: "a1",
                                style: p,
                                children: "Address line 1",
                              }),
                              (0, t.jsx)("input", {
                                id: "a1",
                                style: u,
                                value: O.line1,
                                onChange: ei("line1"),
                                autoComplete: "address-line1",
                              }),
                            ],
                          }),
                          (0, t.jsxs)("div", {
                            style: { marginBottom: 16 },
                            children: [
                              (0, t.jsx)("label", {
                                htmlFor: "a2",
                                style: p,
                                children: "Address line 2 (optional)",
                              }),
                              (0, t.jsx)("input", {
                                id: "a2",
                                style: u,
                                value: O.line2,
                                onChange: ei("line2"),
                                autoComplete: "address-line2",
                              }),
                            ],
                          }),
                          (0, t.jsxs)("div", {
                            style: {
                              display: "grid",
                              gridTemplateColumns: "1fr 1fr",
                              gap: 12,
                              marginBottom: 16,
                            },
                            children: [
                              (0, t.jsxs)("div", {
                                style: { minWidth: 0 },
                                children: [
                                  (0, t.jsx)("label", {
                                    htmlFor: "ci",
                                    style: p,
                                    children: "City",
                                  }),
                                  (0, t.jsx)("input", {
                                    id: "ci",
                                    style: u,
                                    value: O.city,
                                    onChange: ei("city"),
                                    autoComplete: "address-level2",
                                  }),
                                ],
                              }),
                              (0, t.jsxs)("div", {
                                style: { minWidth: 0 },
                                children: [
                                  (0, t.jsx)("label", {
                                    htmlFor: "st",
                                    style: p,
                                    children: "State / Province",
                                  }),
                                  (0, t.jsx)("input", {
                                    id: "st",
                                    style: u,
                                    value: O.state,
                                    onChange: ei("state"),
                                    autoComplete: "address-level1",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, t.jsxs)("div", {
                            style: {
                              display: "grid",
                              gridTemplateColumns: "1fr 1fr",
                              gap: 12,
                              marginBottom: 22,
                            },
                            children: [
                              (0, t.jsxs)("div", {
                                style: { minWidth: 0 },
                                children: [
                                  (0, t.jsx)("label", {
                                    htmlFor: "zp",
                                    style: p,
                                    children: "ZIP / Postal code",
                                  }),
                                  (0, t.jsx)("input", {
                                    id: "zp",
                                    style: u,
                                    value: O.zip,
                                    onChange: ei("zip"),
                                    autoComplete: "postal-code",
                                  }),
                                ],
                              }),
                              (0, t.jsxs)("div", {
                                style: { minWidth: 0 },
                                children: [
                                  (0, t.jsx)("label", {
                                    htmlFor: "co",
                                    style: p,
                                    children: "Country",
                                  }),
                                  (0, t.jsx)("input", {
                                    id: "co",
                                    style: u,
                                    value: O.country,
                                    onChange: ei("country"),
                                    autoComplete: "country-name",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, t.jsxs)("div", {
                            style: { display: "flex", gap: 12 },
                            children: [
                              (0, t.jsx)("button", {
                                type: "button",
                                onClick: () => B(1),
                                style: y,
                                children: "Back",
                              }),
                              (0, t.jsx)("button", {
                                type: "button",
                                onClick: eo,
                                disabled: U,
                                style: { ...m, opacity: U ? 0.7 : 1 },
                                children: U ? "SAVING…" : "CONTINUE",
                              }),
                            ],
                          }),
                        ],
                      }),
                    3 === E &&
                      (0, t.jsxs)("div", {
                        children: [
                          (0, t.jsx)("h2", {
                            style: { fontSize: 22, marginTop: 0 },
                            children: "Review your cart",
                          }),
                          e.map((e) =>
                            (0, t.jsxs)(
                              "div",
                              {
                                style: {
                                  background: s.T.slate,
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
                                        style: { minWidth: 0 },
                                        children: [
                                          (0, t.jsx)("div", {
                                            style: { fontWeight: 700 },
                                            children: e.name,
                                          }),
                                          e.detail &&
                                            (0, t.jsx)("div", {
                                              style: {
                                                fontSize: 12,
                                                color: s.T.sky,
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
                                        children: (0, o.money)(
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
                                      marginTop: 10,
                                    },
                                    children: [
                                      (0, t.jsx)("button", {
                                        type: "button",
                                        "aria-label": "Decrease quantity",
                                        onClick: () => x(e.id, e.qty - 1),
                                        style: C,
                                        children: "−",
                                      }),
                                      (0, t.jsx)("span", { children: e.qty }),
                                      (0, t.jsx)("button", {
                                        type: "button",
                                        "aria-label": "Increase quantity",
                                        onClick: () => x(e.id, e.qty + 1),
                                        style: C,
                                        children: "+",
                                      }),
                                      (0, t.jsx)("button", {
                                        type: "button",
                                        onClick: () => w(e.id),
                                        style: {
                                          marginLeft: "auto",
                                          background: "none",
                                          border: "none",
                                          color: s.T.pink,
                                          cursor: "pointer",
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
                          (0, t.jsxs)("div", {
                            style: { margin: "22px 0" },
                            children: [
                              (0, t.jsx)("label", {
                                htmlFor: "pc",
                                style: p,
                                children: "Promo code",
                              }),
                              l
                                ? (0, t.jsxs)("div", {
                                    style: {
                                      display: "flex",
                                      justifyContent: "space-between",
                                      background: s.T.slate,
                                      padding: "12px 14px",
                                      borderRadius: 6,
                                    },
                                    children: [
                                      (0, t.jsxs)("span", {
                                        children: [l, " applied"],
                                      }),
                                      (0, t.jsx)("button", {
                                        type: "button",
                                        onClick: k,
                                        style: {
                                          background: "none",
                                          border: "none",
                                          color: s.T.pink,
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
                                        id: "pc",
                                        style: { ...u, minWidth: 0, flex: 1 },
                                        value: L,
                                        onChange: (e) => {
                                          (D(e.target.value), F(null));
                                        },
                                        placeholder: "Enter code",
                                      }),
                                      (0, t.jsx)("button", {
                                        type: "button",
                                        onClick: () => {
                                          S(L)
                                            ? (F({
                                                ok: !0,
                                                text: "Promo code applied.",
                                              }),
                                              D(""))
                                            : F({
                                                ok: !1,
                                                text: "That code isn’t valid.",
                                              });
                                        },
                                        style: { ...y, whiteSpace: "nowrap" },
                                        children: "Apply",
                                      }),
                                    ],
                                  }),
                              M &&
                                (0, t.jsx)("p", {
                                  style: {
                                    fontSize: 13,
                                    color: M.ok ? d : s.T.pink,
                                    margin: "8px 0 0",
                                  },
                                  children: M.text,
                                }),
                            ],
                          }),
                          (0, t.jsxs)("div", {
                            style: {
                              background: "#1c2038",
                              borderRadius: 10,
                              padding: "20px 20px 6px",
                              marginBottom: 20,
                            },
                            children: [
                              (0, t.jsx)("h3", {
                                style: {
                                  fontFamily: s.T.font,
                                  fontSize: 16,
                                  margin: "0 0 14px",
                                },
                                children: "WHAT HAPPENS AFTER YOU BUY",
                              }),
                              s.ORDER_INFO.map((e) =>
                                (0, t.jsxs)(
                                  "div",
                                  {
                                    style: { marginBottom: 16 },
                                    children: [
                                      (0, t.jsx)("p", {
                                        style: {
                                          fontWeight: 700,
                                          margin: "0 0 6px",
                                        },
                                        children: e.title,
                                      }),
                                      (0, t.jsx)("ul", {
                                        style: {
                                          margin: 0,
                                          paddingLeft: 20,
                                          color: s.T.sky,
                                          lineHeight: 1.65,
                                          fontSize: 14,
                                        },
                                        children: e.lines.map((e, i) =>
                                          (0, t.jsx)("li", { children: e }, i),
                                        ),
                                      }),
                                    ],
                                  },
                                  e.title,
                                ),
                              ),
                            ],
                          }),
                          (0, t.jsxs)("label", {
                            style: {
                              display: "flex",
                              gap: 12,
                              alignItems: "flex-start",
                              fontSize: 14,
                              lineHeight: 1.6,
                              marginBottom: 20,
                              cursor: "pointer",
                              background: "#1c2038",
                              borderRadius: 10,
                              padding: "16px 16px",
                            },
                            children: [
                              (0, t.jsx)("input", {
                                type: "checkbox",
                                checked: z,
                                onChange: (e) => H(e.target.checked),
                                style: f,
                              }),
                              (0, t.jsxs)("span", {
                                style: {
                                  flex: 1,
                                  minWidth: 0,
                                  overflowWrap: "anywhere",
                                },
                                children: [
                                  "I’ve reviewed my order and the information above, including my delivery address: ",
                                  O.line1,
                                  O.line2 ? `, ${O.line2}` : "",
                                  ", ",
                                  O.city,
                                  ", ",
                                  O.state,
                                  " ",
                                  O.zip,
                                  ", ",
                                  O.country,
                                  ".",
                                ],
                              }),
                            ],
                          }),
                          (0, t.jsxs)("div", {
                            style: { display: "flex", gap: 12 },
                            children: [
                              (0, t.jsx)("button", {
                                type: "button",
                                onClick: () => B(2),
                                style: y,
                                children: "Back",
                              }),
                              (0, t.jsx)("button", {
                                type: "button",
                                disabled: !z,
                                onClick: () => {
                                  (G(null), B(4));
                                },
                                style: {
                                  ...m,
                                  opacity: z ? 1 : 0.5,
                                  cursor: z ? "pointer" : "not-allowed",
                                },
                                children: "CONFIRM & CONTINUE",
                              }),
                            ],
                          }),
                        ],
                      }),
                    4 === E &&
                      (0, t.jsxs)("div", {
                        children: [
                          (0, t.jsx)("h2", {
                            style: { fontSize: 22, marginTop: 0 },
                            children: "Choose how to pay",
                          }),
                          g.map((e) =>
                            (0, t.jsxs)(
                              "label",
                              {
                                style: {
                                  display: "flex",
                                  gap: 14,
                                  alignItems: "center",
                                  background:
                                    V === e.id ? s.T.slate : "transparent",
                                  border: `2px solid ${V === e.id ? s.T.pink : "#cfe0f355"}`,
                                  borderRadius: 10,
                                  padding: 16,
                                  marginBottom: 12,
                                  cursor: "pointer",
                                },
                                children: [
                                  (0, t.jsx)("input", {
                                    type: "radio",
                                    name: "method",
                                    checked: V === e.id,
                                    onChange: () => Y(e.id),
                                    style: f,
                                  }),
                                  e.img
                                    ? (0, t.jsx)("img", {
                                        src: e.img,
                                        alt: e.title,
                                        width: 56,
                                        height: 56,
                                        onError: (e) => {
                                          e.currentTarget.style.display =
                                            "none";
                                        },
                                        style: {
                                          width: 56,
                                          height: 56,
                                          objectFit: "contain",
                                          flex: "none",
                                          borderRadius: 10,
                                          background: "#ffffff10",
                                        },
                                      })
                                    : (0, t.jsx)("span", {
                                        "aria-hidden": "true",
                                        style: {
                                          width: 56,
                                          height: 56,
                                          flex: "none",
                                          borderRadius: 10,
                                          background: "#ffffff10",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          fontSize: 28,
                                        },
                                        children: e.fallback,
                                      }),
                                  (0, t.jsxs)("span", {
                                    style: { flex: 1, minWidth: 0 },
                                    children: [
                                      (0, t.jsx)("strong", {
                                        style: {
                                          display: "block",
                                          fontSize: 17,
                                          marginBottom: 4,
                                        },
                                        children: e.title,
                                      }),
                                      (0, t.jsx)("span", {
                                        style: {
                                          display: "block",
                                          color: s.T.sky,
                                          fontSize: 14,
                                          lineHeight: 1.5,
                                        },
                                        children: e.sub,
                                      }),
                                    ],
                                  }),
                                ],
                              },
                              e.id,
                            ),
                          ),
                          "bank" === V &&
                            (0, t.jsx)(b, {
                              orderId: A,
                              amount: (0, o.money)(h.total),
                            }),
                          "card" === V &&
                            (0, t.jsxs)("p", {
                              style: {
                                fontSize: 13,
                                lineHeight: 1.65,
                                color: s.T.sky,
                                background: "#1c2038",
                                borderRadius: 10,
                                padding: "14px 16px",
                                margin: "0 0 18px",
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                flexWrap: "wrap",
                              },
                              children: [
                                "You’ll be securely redirected to ",
                                (0, t.jsx)(v, { size: 14 }),
                                " to complete your card payment.",
                              ],
                            }),
                          (0, t.jsxs)("p", {
                            style: {
                              fontSize: 22,
                              fontWeight: 800,
                              margin: "20px 0",
                            },
                            children: ["Amount due: ", (0, o.money)(h.total)],
                          }),
                          (0, t.jsxs)("div", {
                            style: {
                              display: "flex",
                              gap: 12,
                              flexWrap: "wrap",
                            },
                            children: [
                              (0, t.jsx)("button", {
                                type: "button",
                                onClick: () => B(3),
                                style: y,
                                children: "Back",
                              }),
                              (0, t.jsx)("button", {
                                type: "button",
                                onClick: el,
                                disabled: U,
                                style: { ...m, opacity: U ? 0.7 : 1 },
                                children: U
                                  ? "PLEASE WAIT…"
                                  : "crypto" === V
                                    ? "PAY WITH CRYPTO"
                                    : "card" === V
                                      ? "PAY WITH CARD"
                                      : "PLACE ORDER",
                              }),
                            ],
                          }),
                        ],
                      }),
                    q &&
                      (0, t.jsx)("p", {
                        role: "alert",
                        style: {
                          color: s.T.pink,
                          marginTop: 18,
                          lineHeight: 1.5,
                        },
                        children: q,
                      }),
                  ],
                }),
                ec,
              ],
            }),
          ],
        }),
      );
    },
  ]);
};
