import { siteConfig } from "../site.config.js";
export default (e) => {
  "use strict";
  var t = e.i(40450),
    i = e.i(13742),
    n = e.i(30037);
  let r = siteConfig.cashTag,
    o = siteConfig.supportEmail;
  e.s([
    "default",
    0,
    function () {
      let e = (0, n.useRouter)(),
        a = (0, i.useRef)(null),
        [s, l] = (0, i.useState)(!1),
        [d, p] = (0, i.useState)(!1),
        [c, g] = (0, i.useState)(!1),
        [h, x] = (0, i.useState)(null),
        [f, u] = (0, i.useState)(null),
        [m, y] = (0, i.useState)(null),
        [b, j] = (0, i.useState)(!1),
        [S, v] = (0, i.useState)(!1),
        [k, w] = (0, i.useState)(null);
      ((0, i.useEffect)(() => {
        let t = localStorage.getItem("cw_cashapp_order");
        t ? x(JSON.parse(t)) : e.push("/checkout");
      }, []),
        (0, i.useEffect)(
          () => () => {
            m && URL.revokeObjectURL(m);
          },
          [m],
        ));
      let C = h?.total || 0,
        B = h?.type === "membership",
        R = h?.type === "tickets",
        z = h?.form?.firstName || "",
        D = h?.form?.lastName || "",
        W = z || "Guest",
        T = `${z} ${D}`.trim() || "Guest",
        U = h?.form?.email || "",
        I = h?.orderId || `CW_CA_${Date.now()}`,
        A = h?.items?.[0]
          ? `${h.items[0].name}${h.items[0].size ? ` \xb7 ${h.items[0].size}` : ""}`
          : "",
        L = (e, t) => {
          (navigator.clipboard.writeText(e),
            "tag" === t
              ? (l(!0), setTimeout(() => l(!1), 2e3))
              : (p(!0), setTimeout(() => p(!1), 2e3)));
        },
        $ = async () => {
          if (f) {
            (j(!0), w(null));
            try {
              let e = await new Promise((e, t) => {
                  let i = new Image(),
                    n = URL.createObjectURL(f);
                  ((i.onload = () => {
                    let r = Math.min(1, 1600 / Math.max(i.width, i.height)),
                      o = document.createElement("canvas");
                    ((o.width = Math.round(i.width * r)),
                      (o.height = Math.round(i.height * r)));
                    let a = o.getContext("2d");
                    if (!a) {
                      (URL.revokeObjectURL(n), t(Error("canvas")));
                      return;
                    }
                    (a.drawImage(i, 0, 0, o.width, o.height),
                      URL.revokeObjectURL(n),
                      o.toBlob(
                        (i) => (i ? e(i) : t(Error("compress"))),
                        "image/jpeg",
                        0.82,
                      ));
                  }),
                    (i.onerror = () => {
                      (URL.revokeObjectURL(n), t(Error("load")));
                    }),
                    (i.src = n));
                }),
                t = new FormData();
              (t.append("file", e, "payment-screenshot.jpg"),
                t.append("name", T),
                t.append("email", U),
                t.append("total", String(C)),
                t.append("orderId", I),
                t.append("description", A));
              let i = await fetch("/api/tickets/payment-proof", {
                  method: "POST",
                  body: t,
                }),
                n = await i.json().catch(() => ({}));
              i.ok ? v(!0) : w(n.error || "Upload failed. Please try again.");
            } catch {
              w("Could not read that image. Try a different screenshot.");
            }
            j(!1);
          }
        };
      if (!h)
        return (0, t.jsx)("div", {
          style: {
            minHeight: "100vh",
            background: "#000000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          children: (0, t.jsx)("p", {
            style: { color: "#00D54B", fontFamily: "system-ui" },
            children: "Loading...",
          }),
        });
      let O = c || (R && !S);
      return (0, t.jsx)("div", {
        style: {
          minHeight: "100vh",
          background: "#000000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 24px 80px",
          fontFamily: "'SF Pro Display', 'Helvetica Neue', Arial, sans-serif",
        },
        children: (0, t.jsxs)("div", {
          style: {
            background: "#1a1a1a",
            borderRadius: 24,
            maxWidth: 480,
            width: "100%",
            overflow: "hidden",
            boxShadow:
              "0 0 0 1px rgba(0,213,75,0.15), 0 32px 80px rgba(0,213,75,0.08)",
          },
          children: [
            (0, t.jsxs)("div", {
              style: {
                background: "linear-gradient(160deg, #00D54B 0%, #00a83c 100%)",
                padding: "36px 36px 32px",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              },
              children: [
                (0, t.jsx)("div", {
                  style: {
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                      "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.06) 0%, transparent 40%)",
                  },
                }),
                (0, t.jsxs)("div", {
                  style: { position: "relative" },
                  children: [
                    (0, t.jsx)("div", {
                      style: {
                        width: 60,
                        height: 60,
                        background: "rgba(0,0,0,0.2)",
                        borderRadius: 16,
                        margin: "0 auto 16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      },
                      children: (0, t.jsx)("span", {
                        style: {
                          fontSize: 32,
                          fontWeight: 900,
                          color: "white",
                        },
                        children: "$",
                      }),
                    }),
                    (0, t.jsx)("h1", {
                      style: {
                        margin: 0,
                        fontSize: 26,
                        fontWeight: 800,
                        color: "white",
                        letterSpacing: -0.5,
                      },
                      children: "Cash App",
                    }),
                    (0, t.jsxs)("p", {
                      style: {
                        margin: "6px 0 0",
                        color: "rgba(255,255,255,0.7)",
                        fontSize: 13,
                        letterSpacing: 1,
                      },
                      children: [
                        "Club Wallen · ",
                        B ? "2026 Membership" : R ? "Tickets" : "Shop Order",
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, t.jsxs)("div", {
              style: {
                background: "#111",
                borderBottom: "1px solid #2a2a2a",
                padding: "22px 36px",
                textAlign: "center",
              },
              children: [
                (0, t.jsx)("p", {
                  style: {
                    margin: "0 0 4px",
                    fontSize: 11,
                    color: "#666",
                    letterSpacing: 3,
                    textTransform: "uppercase",
                  },
                  children: "Amount to Send",
                }),
                (0, t.jsxs)("p", {
                  style: {
                    margin: 0,
                    fontSize: 42,
                    fontWeight: 900,
                    color: "#00D54B",
                    letterSpacing: -1,
                  },
                  children: ["$", C.toFixed(2)],
                }),
                (0, t.jsx)("p", {
                  style: {
                    margin: "4px 0 0",
                    fontSize: 12,
                    color: "#444",
                    letterSpacing: 1,
                  },
                  children: "USD",
                }),
              ],
            }),
            (0, t.jsxs)("div", {
              style: { padding: "32px 36px" },
              children: [
                (0, t.jsxs)("div", {
                  style: { marginBottom: 24 },
                  children: [
                    (0, t.jsxs)("div", {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 14,
                      },
                      children: [
                        (0, t.jsx)("div", {
                          style: {
                            width: 30,
                            height: 30,
                            borderRadius: "50%",
                            background: "#00D54B",
                            color: "#000",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 13,
                            fontWeight: 800,
                            flexShrink: 0,
                          },
                          children: "1",
                        }),
                        (0, t.jsx)("p", {
                          style: {
                            margin: 0,
                            fontSize: 15,
                            fontWeight: 700,
                            color: "#ffffff",
                          },
                          children: "Open Cash App and send payment",
                        }),
                      ],
                    }),
                    (0, t.jsxs)("div", {
                      style: {
                        background: "#0d0d0d",
                        border: "2px solid #00D54B",
                        borderRadius: 14,
                        padding: "20px 22px",
                        marginBottom: 12,
                      },
                      children: [
                        (0, t.jsx)("p", {
                          style: {
                            margin: "0 0 8px",
                            fontSize: 11,
                            color: "#666",
                            letterSpacing: 3,
                            textTransform: "uppercase",
                          },
                          children: "Cash App Tag",
                        }),
                        (0, t.jsxs)("div", {
                          style: {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 12,
                          },
                          children: [
                            (0, t.jsx)("p", {
                              style: {
                                margin: 0,
                                fontSize: 26,
                                fontWeight: 900,
                                color: "#00D54B",
                                letterSpacing: 0.5,
                              },
                              children: r,
                            }),
                            (0, t.jsx)("button", {
                              type: "button",
                              onClick: () => L(r, "tag"),
                              style: {
                                background: s ? "#00D54B" : "transparent",
                                color: s ? "#000" : "#00D54B",
                                border: "2px solid #00D54B",
                                borderRadius: 8,
                                padding: "8px 16px",
                                fontSize: 12,
                                fontWeight: 700,
                                cursor: "pointer",
                                flexShrink: 0,
                                transition: "all 0.15s",
                              },
                              children: s ? "Copied ✓" : "Copy",
                            }),
                          ],
                        }),
                        (0, t.jsxs)("div", {
                          style: {
                            marginTop: 18,
                            paddingTop: 16,
                            borderTop: "1px solid rgba(0,213,75,0.25)",
                          },
                          children: [
                            (0, t.jsx)("p", {
                              style: {
                                margin: "0 0 6px",
                                fontSize: 11,
                                color: "#666",
                                letterSpacing: 3,
                                textTransform: "uppercase",
                              },
                              children: "Recipient Name",
                            }),
                            (0, t.jsx)("p", {
                              style: {
                                margin: 0,
                                fontSize: 20,
                                fontWeight: 800,
                                color: "#ffffff",
                                letterSpacing: 0.2,
                              },
                              children: "Sonita Hawkins",
                            }),
                            (0, t.jsx)("p", {
                              style: {
                                margin: "6px 0 0",
                                fontSize: 12,
                                color: "#888",
                                lineHeight: 1.5,
                              },
                              children:
                                "Authorised Club Wallen payment representative",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, t.jsxs)("div", {
                      style: {
                        background: "#0d0d0d",
                        border: "1px solid #2a2a2a",
                        borderRadius: 12,
                        padding: "16px 20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                      },
                      children: [
                        (0, t.jsxs)("div", {
                          children: [
                            (0, t.jsx)("p", {
                              style: {
                                margin: "0 0 3px",
                                fontSize: 11,
                                color: "#666",
                                letterSpacing: 2,
                                textTransform: "uppercase",
                              },
                              children: "Amount",
                            }),
                            (0, t.jsxs)("p", {
                              style: {
                                margin: 0,
                                fontSize: 20,
                                fontWeight: 800,
                                color: "#ffffff",
                              },
                              children: ["$", C.toFixed(2), " USD"],
                            }),
                          ],
                        }),
                        (0, t.jsx)("button", {
                          type: "button",
                          onClick: () => L(C.toFixed(2), "amount"),
                          style: {
                            background: d ? "#00D54B" : "transparent",
                            color: d ? "#000" : "#00D54B",
                            border: "1px solid #00D54B",
                            borderRadius: 8,
                            padding: "8px 16px",
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.15s",
                          },
                          children: d ? "Copied ✓" : "Copy",
                        }),
                      ],
                    }),
                  ],
                }),
                (0, t.jsx)("div", {
                  style: { borderTop: "1px solid #222", margin: "20px 0" },
                }),
                (0, t.jsxs)("div", {
                  style: { marginBottom: 24 },
                  children: [
                    (0, t.jsxs)("div", {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 14,
                      },
                      children: [
                        (0, t.jsx)("div", {
                          style: {
                            width: 30,
                            height: 30,
                            borderRadius: "50%",
                            background: "#00D54B",
                            color: "#000",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 13,
                            fontWeight: 800,
                            flexShrink: 0,
                          },
                          children: "2",
                        }),
                        (0, t.jsx)("p", {
                          style: {
                            margin: 0,
                            fontSize: 15,
                            fontWeight: 700,
                            color: "#ffffff",
                          },
                          children: R
                            ? "Upload your payment screenshot"
                            : "Send your payment receipt to us",
                        }),
                      ],
                    }),
                    R
                      ? (0, t.jsxs)("div", {
                          style: {
                            background: "#0d1a0f",
                            border: "1px solid #00D54B30",
                            borderRadius: 12,
                            padding: "18px 20px",
                          },
                          children: [
                            (0, t.jsx)("p", {
                              style: {
                                margin: "0 0 14px",
                                fontSize: 13,
                                color: "#888",
                                lineHeight: 1.7,
                              },
                              children:
                                "After completing your Cash App payment, take a screenshot of the receipt and upload it here. It goes straight to our team with your name and email.",
                            }),
                            (0, t.jsx)("input", {
                              ref: a,
                              type: "file",
                              accept: "image/*",
                              onChange: (e) => {
                                let t = e.target.files?.[0];
                                if (t) {
                                  if (
                                    (w(null),
                                    v(!1),
                                    !t.type.startsWith("image/"))
                                  )
                                    return void w(
                                      "Please choose an image (a screenshot of your Cash App receipt).",
                                    );
                                  (m && URL.revokeObjectURL(m),
                                    u(t),
                                    y(URL.createObjectURL(t)));
                                }
                              },
                              style: { display: "none" },
                            }),
                            m &&
                              (0, t.jsx)("img", {
                                src: m,
                                alt: "Payment screenshot preview",
                                style: {
                                  width: "100%",
                                  maxHeight: 260,
                                  objectFit: "contain",
                                  background: "#000",
                                  border: "1px solid #2a2a2a",
                                  borderRadius: 10,
                                  marginBottom: 12,
                                  display: "block",
                                },
                              }),
                            (0, t.jsxs)("div", {
                              style: {
                                display: "flex",
                                gap: 10,
                                flexWrap: "wrap",
                              },
                              children: [
                                (0, t.jsx)("button", {
                                  type: "button",
                                  onClick: () => a.current?.click(),
                                  disabled: b,
                                  style: {
                                    flex: "1 1 140px",
                                    background: "transparent",
                                    color: "#00D54B",
                                    border: "2px solid #00D54B",
                                    borderRadius: 10,
                                    padding: "12px 16px",
                                    fontSize: 13,
                                    fontWeight: 700,
                                    cursor: b ? "not-allowed" : "pointer",
                                  },
                                  children: f
                                    ? "Change screenshot"
                                    : "Choose screenshot",
                                }),
                                f &&
                                  !S &&
                                  (0, t.jsx)("button", {
                                    type: "button",
                                    onClick: $,
                                    disabled: b,
                                    style: {
                                      flex: "1 1 140px",
                                      background: "#00D54B",
                                      color: "#000",
                                      border: "none",
                                      borderRadius: 10,
                                      padding: "12px 16px",
                                      fontSize: 13,
                                      fontWeight: 800,
                                      cursor: b ? "not-allowed" : "pointer",
                                      opacity: b ? 0.7 : 1,
                                    },
                                    children: b
                                      ? "Uploading..."
                                      : "Send screenshot",
                                  }),
                              ],
                            }),
                            k &&
                              (0, t.jsx)("p", {
                                style: {
                                  margin: "12px 0 0",
                                  fontSize: 12,
                                  color: "#e05c5c",
                                  lineHeight: 1.5,
                                },
                                children: k,
                              }),
                            S &&
                              (0, t.jsx)("p", {
                                style: {
                                  margin: "12px 0 0",
                                  fontSize: 13,
                                  color: "#00D54B",
                                  fontWeight: 700,
                                },
                                children:
                                  "✓ Screenshot sent. You can now confirm below.",
                              }),
                          ],
                        })
                      : (0, t.jsxs)("div", {
                          style: {
                            background: "#0d1a0f",
                            border: "1px solid #00D54B30",
                            borderRadius: 12,
                            padding: "18px 20px",
                          },
                          children: [
                            (0, t.jsxs)("p", {
                              style: {
                                margin: "0 0 10px",
                                fontSize: 13,
                                color: "#888",
                                lineHeight: 1.7,
                              },
                              children: [
                                "After completing your Cash App payment, please screenshot your receipt and email it to us to confirm your ",
                                B ? "membership" : "order",
                                ":",
                              ],
                            }),
                            (0, t.jsx)("p", {
                              style: {
                                margin: 0,
                                fontSize: 16,
                                fontWeight: 800,
                                color: "#00D54B",
                                letterSpacing: 0.3,
                                wordBreak: "break-all",
                              },
                              children: o,
                            }),
                          ],
                        }),
                  ],
                }),
                (0, t.jsx)("div", {
                  style: { borderTop: "1px solid #222", margin: "20px 0" },
                }),
                (0, t.jsxs)("div", {
                  style: { marginBottom: 32 },
                  children: [
                    (0, t.jsxs)("div", {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 14,
                      },
                      children: [
                        (0, t.jsx)("div", {
                          style: {
                            width: 30,
                            height: 30,
                            borderRadius: "50%",
                            background: "#00D54B",
                            color: "#000",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 13,
                            fontWeight: 800,
                            flexShrink: 0,
                          },
                          children: "3",
                        }),
                        (0, t.jsx)("p", {
                          style: {
                            margin: 0,
                            fontSize: 15,
                            fontWeight: 700,
                            color: "#ffffff",
                          },
                          children: "Confirm below once done",
                        }),
                      ],
                    }),
                    (0, t.jsx)("p", {
                      style: {
                        fontSize: 13,
                        color: "#666",
                        lineHeight: 1.7,
                        margin: 0,
                        paddingLeft: 42,
                      },
                      children: R
                        ? "Once your screenshot is sent, tap the button below to complete your ticket order."
                        : `After sending your payment and emailing your screenshot, tap the button below to complete your ${B ? "membership registration" : "order"}.`,
                    }),
                  ],
                }),
                (0, t.jsx)("button", {
                  type: "button",
                  onClick: () => {
                    (!R || S) &&
                      (g(!0),
                      setTimeout(() => {
                        (localStorage.setItem(
                          "reserve_demo_orders",
                          JSON.stringify([
                            ...JSON.parse(
                              localStorage.getItem("reserve_demo_orders") ||
                                "[]",
                            ),
                            { ...h, status: "demo_complete" },
                          ]),
                        ),
                          localStorage.removeItem("cw_cashapp_order"),
                          e.push(
                            `/confirmation?order=${I}&type=${h?.type || "shop"}&name=${encodeURIComponent(W)}&method=cashapp`,
                          ));
                      }, 1e3));
                  },
                  disabled: O,
                  style: {
                    width: "100%",
                    background: O ? "#009933" : "#00D54B",
                    color: "#000000",
                    padding: "18px",
                    fontSize: 15,
                    fontWeight: 800,
                    border: "none",
                    borderRadius: 12,
                    cursor: O ? "not-allowed" : "pointer",
                    opacity: !R || S || c ? 1 : 0.5,
                    letterSpacing: 0.3,
                    boxShadow: O ? "none" : "0 8px 24px rgba(0,213,75,0.35)",
                    transition: "all 0.2s",
                    marginBottom: 12,
                  },
                  children: c
                    ? "Confirming..."
                    : R && !S
                      ? "Upload screenshot to continue"
                      : "Complete Demo Payment ✓",
                }),
                (0, t.jsx)("button", {
                  type: "button",
                  onClick: () => e.back(),
                  style: {
                    width: "100%",
                    background: "transparent",
                    color: "#555",
                    padding: "14px",
                    fontSize: 13,
                    border: "1px solid #2a2a2a",
                    borderRadius: 12,
                    cursor: "pointer",
                  },
                  children: "← Go Back",
                }),
              ],
            }),
            (0, t.jsxs)("div", {
              style: {
                background: "#111",
                borderTop: "1px solid #222",
                padding: "16px 36px",
                textAlign: "center",
              },
              children: [
                (0, t.jsx)("p", {
                  style: {
                    margin: 0,
                    fontSize: 11,
                    color: "#444",
                    lineHeight: 1.6,
                  },
                  children: "Club Wallen: The Reserve · 2026",
                }),
                (0, t.jsxs)("p", {
                  style: { margin: "5px 0 0", fontSize: 11, color: "#444" },
                  children: [
                    "Questions?",
                    " ",
                    (0, t.jsx)("a", {
                      href: `mailto:${o}`,
                      style: { color: "#00D54B", fontWeight: 600 },
                      children: o,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      });
    },
  ]);
};
