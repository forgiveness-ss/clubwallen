export default (e) => {
  "use strict";
  var i = e.i(40450),
    t = e.i(30037),
    r = e.i(6028),
    o = e.i(13742);
  function n() {
    let e = (0, t.useSearchParams)(),
      o = e.get("order") || "CW00000000",
      n = e.get("type") || "shop",
      l = e.get("name") || "Guest",
      a = e.get("method") || "bitcoin",
      s = "tickets" === n,
      d = "membership" === n,
      c = "cashapp" === a;
    return (0, i.jsx)("div", {
      style: {
        minHeight: "100vh",
        background: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px",
        textAlign: "center",
        fontFamily: "Georgia, serif",
      },
      children: (0, i.jsxs)("div", {
        style: { maxWidth: 580, width: "100%" },
        children: [
          (0, i.jsx)("div", {
            style: { fontSize: 48, marginBottom: 24, color: "#c8a84b" },
            children: "✦",
          }),
          (0, i.jsxs)("p", {
            style: {
              fontSize: 10,
              letterSpacing: 6,
              color: "#5a5040",
              textTransform: "uppercase",
              marginBottom: 16,
            },
            children: [
              s ? "Ticket Order" : d ? "Membership" : "Order",
              " Received",
            ],
          }),
          (0, i.jsx)("h1", {
            style: {
              fontSize: "clamp(26px, 5vw, 44px)",
              color: "#c8a84b",
              marginBottom: 24,
              lineHeight: 1.15,
            },
            children: s ? `Thank You, ${l}!` : `Welcome, ${l}!`,
          }),
          s &&
            c &&
            (0, i.jsx)("div", {
              style: {
                background: "#0d1a0d",
                border: "1px solid #2a5a2a",
                borderRadius: 10,
                padding: "24px 28px",
                marginBottom: 28,
                textAlign: "left",
              },
              children: (0, i.jsxs)("p", {
                style: {
                  fontSize: 15,
                  color: "#c0e8c0",
                  lineHeight: 1.85,
                  margin: 0,
                },
                children: [
                  (0, i.jsx)("strong", {
                    style: { color: "#00D54B" },
                    children: "$ Cash App demo checkout completed.",
                  }),
                  " ",
                  "Please email your payment screenshot or receipt to",
                  " ",
                  (0, i.jsx)("strong", {
                    style: { color: "#f0e8d0" },
                    children: "info@clubwallen.site",
                  }),
                  ". Our team will verify your payment within a few minutes and your",
                  " ",
                  (0, i.jsx)("strong", {
                    children: "e-ticket will be sent directly to your email",
                  }),
                  " immediately after confirmation.",
                ],
              }),
            }),
          s &&
            !c &&
            (0, i.jsx)("div", {
              style: {
                background: "#1a1200",
                border: "1px solid #3a2a00",
                borderRadius: 10,
                padding: "24px 28px",
                marginBottom: 28,
                textAlign: "left",
              },
              children: (0, i.jsxs)("p", {
                style: {
                  fontSize: 15,
                  color: "#e0c870",
                  lineHeight: 1.85,
                  margin: 0,
                },
                children: [
                  (0, i.jsx)("strong", {
                    style: { color: "#F7931A" },
                    children: "₿ Bitcoin demo checkout submitted.",
                  }),
                  " ",
                  "Once your payment is confirmed on the blockchain, your",
                  " ",
                  (0, i.jsx)("strong", {
                    children:
                      "e-ticket will be sent to your email automatically.",
                  }),
                  " ",
                  "This typically takes 10–30 minutes. Please check your inbox and spam folder.",
                ],
              }),
            }),
          d &&
            c &&
            (0, i.jsx)("div", {
              style: {
                background: "#0d1a0d",
                border: "1px solid #2a5a2a",
                borderRadius: 10,
                padding: "24px 28px",
                marginBottom: 28,
                textAlign: "left",
              },
              children: (0, i.jsxs)("p", {
                style: {
                  fontSize: 15,
                  color: "#c0e8c0",
                  lineHeight: 1.85,
                  margin: 0,
                },
                children: [
                  (0, i.jsx)("strong", {
                    style: { color: "#00D54B" },
                    children: "$ Cash App demo checkout completed.",
                  }),
                  " ",
                  "Please email your receipt to",
                  " ",
                  (0, i.jsx)("strong", {
                    style: { color: "#f0e8d0" },
                    children: "info@clubwallen.site",
                  }),
                  ". Your membership will be activated within",
                  " ",
                  (0, i.jsx)("strong", { children: "1 hour" }),
                  " once our team verifies your payment.",
                ],
              }),
            }),
          d &&
            !c &&
            (0, i.jsx)("div", {
              style: {
                background: "#1a1200",
                border: "1px solid #3a2a00",
                borderRadius: 10,
                padding: "24px 28px",
                marginBottom: 28,
                textAlign: "left",
              },
              children: (0, i.jsxs)("p", {
                style: {
                  fontSize: 15,
                  color: "#e0c870",
                  lineHeight: 1.85,
                  margin: 0,
                },
                children: [
                  (0, i.jsx)("strong", {
                    style: { color: "#F7931A" },
                    children: "₿ Bitcoin demo checkout completed.",
                  }),
                  " ",
                  "Your membership will be activated once payment is confirmed on the blockchain. You will receive a confirmation email shortly. Welcome to The Reserve.",
                ],
              }),
            }),
          !s &&
            !d &&
            c &&
            (0, i.jsx)("div", {
              style: {
                background: "#0d1a0d",
                border: "1px solid #2a5a2a",
                borderRadius: 10,
                padding: "24px 28px",
                marginBottom: 28,
                textAlign: "left",
              },
              children: (0, i.jsxs)("p", {
                style: {
                  fontSize: 15,
                  color: "#c0e8c0",
                  lineHeight: 1.85,
                  margin: 0,
                },
                children: [
                  (0, i.jsx)("strong", {
                    style: { color: "#00D54B" },
                    children: "$ Cash App demo checkout completed.",
                  }),
                  " ",
                  "Please email your receipt to",
                  " ",
                  (0, i.jsx)("strong", {
                    style: { color: "#f0e8d0" },
                    children: "info@clubwallen.site",
                  }),
                  ". Your order will be processed and shipped once payment is verified.",
                ],
              }),
            }),
          !s &&
            !d &&
            !c &&
            (0, i.jsx)("p", {
              style: {
                fontSize: 15,
                color: "#5a5040",
                lineHeight: 1.8,
                marginBottom: 28,
              },
              children:
                "Your order has been received. You'll receive a confirmation email shortly with tracking information.",
            }),
          (0, i.jsxs)("div", {
            style: {
              background: "#111",
              border: "1px solid #2a2010",
              padding: "20px 32px",
              marginBottom: 36,
              display: "inline-block",
              minWidth: 280,
              borderRadius: 4,
            },
            children: [
              (0, i.jsx)("p", {
                style: {
                  fontSize: 10,
                  letterSpacing: 4,
                  color: "#5a5040",
                  marginBottom: 8,
                },
                children: s ? "TICKET ORDER NUMBER" : "ORDER NUMBER",
              }),
              (0, i.jsx)("p", {
                style: { fontSize: 18, color: "#c8a84b", letterSpacing: 2 },
                children: o,
              }),
              s &&
                (0, i.jsx)("p", {
                  style: { fontSize: 11, color: "#3a3020", marginTop: 8 },
                  children: "Keep this number for your records",
                }),
            ],
          }),
          !s &&
            (0, i.jsx)("p", {
              style: { fontSize: 13, color: "#3a3020", marginBottom: 32 },
              children:
                "Your order has been placed. Watch your email for shipping updates.",
            }),
          s &&
            (0, i.jsx)("p", {
              style: { fontSize: 13, color: "#3a3020", marginBottom: 32 },
              children:
                "Your e-ticket will be sent to your registered email address after payment verification.",
            }),
          (0, i.jsxs)("div", {
            style: {
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            },
            children: [
              d && !c
                ? (0, i.jsx)(r.default, {
                    href: "/dashboard",
                    style: {
                      background: "#c8a84b",
                      color: "#0a0a0a",
                      padding: "14px 36px",
                      fontSize: 12,
                      letterSpacing: 3,
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      borderRadius: 2,
                      display: "inline-block",
                    },
                    children: "Go to My Portal",
                  })
                : s
                  ? (0, i.jsx)(r.default, {
                      href: "/tickets",
                      style: {
                        background: "#c8a84b",
                        color: "#0a0a0a",
                        padding: "14px 36px",
                        fontSize: 12,
                        letterSpacing: 3,
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        borderRadius: 2,
                        display: "inline-block",
                      },
                      children: "View All Tickets",
                    })
                  : (0, i.jsx)(r.default, {
                      href: "/shop",
                      style: {
                        background: "#c8a84b",
                        color: "#0a0a0a",
                        padding: "14px 36px",
                        fontSize: 12,
                        letterSpacing: 3,
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        borderRadius: 2,
                        display: "inline-block",
                      },
                      children: "Continue Shopping",
                    }),
              (0, i.jsx)(r.default, {
                href: "/",
                style: {
                  background: "transparent",
                  color: "#c8a84b",
                  border: "1px solid #3a3020",
                  padding: "14px 36px",
                  fontSize: 12,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  borderRadius: 2,
                  display: "inline-block",
                },
                children: "Back to Home",
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
      return (0, i.jsx)(o.Suspense, { children: (0, i.jsx)(n, {}) });
    },
  ]);
};
