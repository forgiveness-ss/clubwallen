export default (e) => {
  "use strict";
  var t = e.i(40450),
    o = e.i(13742);
  let n = [30, 40, 50, 75, 100, 250],
    a = [
      {
        name: "Kathryn Masterson",
        amount: 30,
        note: "Keep those kids busy!",
        time: "2 days ago",
      },
      {
        name: "Ian Gaw",
        amount: null,
        note: "Hoping my donation can help a kid get a chance to play baseball.",
        time: "12 days ago",
      },
      {
        name: "Anonymous",
        amount: null,
        note: "Thanks for supporting youth. Music and sports bring so much joy to life.",
        time: "12 days ago",
      },
      {
        name: "Anonymous",
        amount: 35,
        note: "Appreciate you so much!",
        time: "13 days ago",
      },
      {
        name: "Anonymous",
        amount: 40,
        note: "I donated in support of this campaign.",
        time: "13 days ago",
      },
      {
        name: "Sarah K.",
        amount: 50,
        note: "Morgan's music changed my life. Happy to give back!",
        time: "14 days ago",
      },
      {
        name: "James Whitfield",
        amount: 100,
        note: "Sports saved me as a kid. Every child deserves that chance.",
        time: "15 days ago",
      },
      {
        name: "Anonymous",
        amount: 25,
        note: "God bless this foundation.",
        time: "15 days ago",
      },
      {
        name: "TN Country Girl",
        amount: 75,
        note: "East Tennessee proud! Go MWF!",
        time: "16 days ago",
      },
      {
        name: "Derrick Moore",
        amount: 200,
        note: "Music programs in schools matter so much. Thank you Morgan.",
        time: "17 days ago",
      },
      {
        name: "Anonymous",
        amount: 10,
        note: "Every dollar counts.",
        time: "17 days ago",
      },
      {
        name: "Lisa Harrington",
        amount: 50,
        note: "For every kid who needs a chance to find their talent.",
        time: "18 days ago",
      },
      {
        name: "Anonymous",
        amount: 30,
        note: "Fast Car got me through a tough year. Paying it forward.",
        time: "18 days ago",
      },
      {
        name: "Brad & Michelle T.",
        amount: 150,
        note: "Donating in honor of our son who plays baseball.",
        time: "19 days ago",
      },
      {
        name: "Anonymous",
        amount: 20,
        note: "Keep up the great work!",
        time: "20 days ago",
      },
      {
        name: "Cassidy Faulkner",
        amount: 60,
        note: "Communities in need deserve this kind of support.",
        time: "21 days ago",
      },
      {
        name: "Anonymous",
        amount: 25,
        note: "One Thing at a Time — including giving back 🤠",
        time: "22 days ago",
      },
      {
        name: "Robert Yates",
        amount: 500,
        note: "Proud to support youth sports in Tennessee.",
        time: "23 days ago",
      },
      {
        name: "Anonymous",
        amount: 15,
        note: "Small amount but big heart.",
        time: "24 days ago",
      },
      {
        name: "Melissa D.",
        amount: 45,
        note: "Thank you for helping kids find music like you did.",
        time: "25 days ago",
      },
    ];
  e.s([
    "default",
    0,
    function () {
      let [e, i] = (0, o.useState)(!1),
        [r, s] = (0, o.useState)(null),
        [l, d] = (0, o.useState)(""),
        [c, p] = (0, o.useState)(""),
        [m, g] = (0, o.useState)(!0),
        [u, h] = (0, o.useState)(!0),
        [y, x] = (0, o.useState)("no"),
        [f, b] = (0, o.useState)(!1),
        [S, j] = (0, o.useState)(null),
        [v, k] = (0, o.useState)(!1),
        [w, T] = (0, o.useState)(""),
        [z, B] = (0, o.useState)(""),
        W = l ? parseFloat(l) : r,
        M = v ? a : a.slice(0, 5),
        C = a.reduce((e, t) => e + (t.amount || 0), 0) + 14820,
        A = async () => {
          if (!W || W < 1)
            return void j("Please select or enter a donation amount.");
          if (!z) return void j("Please enter your email address.");
          (b(!0), j(null));
          try {
            let e = `MWF_${Date.now()}`,
              t = await fetch("/api/nowpayments/create-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  amount: W,
                  orderDescription: `Morgan Wallen Foundation Donation${c ? ` — ${c.slice(0, 80)}` : ""}`,
                  orderId: e,
                  orderType: "donation",
                  customerName: w || "Supporter",
                }),
              }),
              o = await t.json(),
              n = o.invoiceUrl || o.paymentUrl;
            if (!t.ok || !n) {
              (j(o.error || "Payment setup failed. Please try again."), b(!1));
              return;
            }
            window.location.href = n;
          } catch {
            (j("Something went wrong. Please try again."), b(!1));
          }
        },
        F = "#c8a84b",
        R = {
          width: "100%",
          background: "#1a1a1a",
          border: "1px solid #2a2a2a",
          color: "#f0e8d0",
          borderRadius: 8,
          padding: "13px 16px",
          fontSize: 15,
          outline: "none",
          fontFamily: "Georgia, serif",
          boxSizing: "border-box",
        };
      return (0, t.jsxs)("div", {
        style: {
          background: "#0a0a0a",
          minHeight: "100vh",
          paddingTop: 66,
          fontFamily: "Georgia, serif",
        },
        children: [
          (0, t.jsxs)("section", {
            style: {
              position: "relative",
              background: "linear-gradient(160deg, #130f00 0%, #0a0a0a 70%)",
              borderBottom: "1px solid #1e1a08",
              padding: "72px 24px 64px",
              textAlign: "center",
              overflow: "hidden",
            },
            children: [
              (0, t.jsx)("div", {
                style: {
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  background:
                    "radial-gradient(ellipse at 50% 30%, rgba(200,168,75,0.07) 0%, transparent 65%)",
                },
              }),
              (0, t.jsxs)("div", {
                style: {
                  maxWidth: 720,
                  margin: "0 auto",
                  position: "relative",
                },
                children: [
                  (0, t.jsx)("p", {
                    style: {
                      fontSize: 10,
                      letterSpacing: 6,
                      color: "#5a4c28",
                      textTransform: "uppercase",
                      marginBottom: 32,
                    },
                    children: "The Morgan Wallen Foundation",
                  }),
                  (0, t.jsx)("blockquote", {
                    style: {
                      fontSize: "clamp(16px, 2.5vw, 22px)",
                      color: "#d4c494",
                      lineHeight: 1.85,
                      fontStyle: "italic",
                      marginBottom: 28,
                      borderLeft: `3px solid ${F}`,
                      paddingLeft: 28,
                      textAlign: "left",
                    },
                    children:
                      "\"The Morgan Wallen Foundation combines my love of sports, music and community service. Without sports and music, I don't know where I'd be. I know my life would look a whole lot different, so I want to give great opportunities to kids in these areas. In addition, MWF lends a helping hand when we see communities in need.\"",
                  }),
                  (0, t.jsx)("p", {
                    style: {
                      fontSize: 14,
                      color: F,
                      letterSpacing: 2,
                      textAlign: "right",
                    },
                    children: "— Morgan Wallen",
                  }),
                ],
              }),
            ],
          }),
          (0, t.jsxs)("section", {
            style: { maxWidth: 860, margin: "0 auto", padding: "72px 24px" },
            children: [
              (0, t.jsxs)("div", {
                style: {
                  background: "#111",
                  border: "1px solid #2a2010",
                  borderRadius: 12,
                  padding: "28px 32px",
                  marginBottom: 56,
                },
                children: [
                  (0, t.jsxs)("div", {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 16,
                      marginBottom: 16,
                    },
                    children: [
                      (0, t.jsxs)("div", {
                        children: [
                          (0, t.jsx)("p", {
                            style: {
                              fontSize: 10,
                              letterSpacing: 4,
                              color: "#5a4c28",
                              marginBottom: 6,
                            },
                            children: "TOTAL RAISED",
                          }),
                          (0, t.jsxs)("p", {
                            style: {
                              fontSize: 32,
                              color: F,
                              fontWeight: "bold",
                            },
                            children: ["$", (C + 14820).toLocaleString()],
                          }),
                        ],
                      }),
                      (0, t.jsxs)("div", {
                        style: { textAlign: "right" },
                        children: [
                          (0, t.jsx)("p", {
                            style: {
                              fontSize: 10,
                              letterSpacing: 4,
                              color: "#5a4c28",
                              marginBottom: 6,
                            },
                            children: "SUPPORTERS",
                          }),
                          (0, t.jsx)("p", {
                            style: { fontSize: 32, color: "#f0e8d0" },
                            children: "600+",
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, t.jsx)("div", {
                    style: {
                      background: "#1a1a1a",
                      borderRadius: 4,
                      height: 6,
                      overflow: "hidden",
                    },
                    children: (0, t.jsx)("div", {
                      style: {
                        width: "72%",
                        height: "100%",
                        background: `linear-gradient(90deg, ${F}, #e8c86a)`,
                        borderRadius: 4,
                        transition: "width 1s ease",
                      },
                    }),
                  }),
                  (0, t.jsx)("p", {
                    style: { fontSize: 12, color: "#3a3020", marginTop: 8 },
                    children:
                      "$3 from every Morgan Wallen concert ticket supports MWF",
                  }),
                ],
              }),
              (0, t.jsxs)("div", {
                style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: 40,
                  marginBottom: 64,
                },
                children: [
                  (0, t.jsxs)("div", {
                    children: [
                      (0, t.jsx)("p", {
                        style: {
                          fontSize: 9,
                          letterSpacing: 6,
                          color: "#5a4c28",
                          textTransform: "uppercase",
                          marginBottom: 14,
                        },
                        children: "About Us",
                      }),
                      (0, t.jsxs)("h2", {
                        style: {
                          fontSize: "clamp(22px, 3vw, 32px)",
                          color: "#f0e8d0",
                          marginBottom: 20,
                          lineHeight: 1.2,
                        },
                        children: [
                          "Sports & Music.",
                          (0, t.jsx)("br", {}),
                          (0, t.jsx)("span", {
                            style: { color: F },
                            children: "Every Child Deserves Both.",
                          }),
                        ],
                      }),
                      (0, t.jsx)("p", {
                        style: {
                          fontSize: 14,
                          color: "#5a5040",
                          lineHeight: 1.9,
                          marginBottom: 16,
                        },
                        children:
                          "Access to sports and music transformed and enriched Morgan Wallen's life in ways he never could have imagined growing up as a kid in East Tennessee. They have been a constant presence since the age of three. Playing sports instilled in him the values and benefits of discipline, hard work and commitment. Exposure to music at a young age has led him to become the country artist he is today.",
                      }),
                      (0, t.jsx)("p", {
                        style: {
                          fontSize: 14,
                          color: "#5a5040",
                          lineHeight: 1.9,
                        },
                        children:
                          "With a core belief that all children deserve a chance to thrive, play, and create through sports and music, the Morgan Wallen Foundation (MWF) supports programs for youth in these two areas. MWF is also dedicated to being there for communities in times of need — providing supplies in the wake of natural disasters, meals for first responders, and distributing groceries to food insecure families.",
                      }),
                    ],
                  }),
                  (0, t.jsxs)("div", {
                    children: [
                      (0, t.jsxs)("div", {
                        style: {
                          background: "#111",
                          border: "1px solid #2a2010",
                          borderRadius: 10,
                          padding: "28px 26px",
                          marginBottom: 20,
                        },
                        children: [
                          (0, t.jsx)("p", {
                            style: {
                              fontSize: 9,
                              letterSpacing: 5,
                              color: F,
                              textTransform: "uppercase",
                              marginBottom: 14,
                            },
                            children: "Mission Statement",
                          }),
                          (0, t.jsx)("p", {
                            style: {
                              fontSize: 14,
                              color: "#c0b080",
                              lineHeight: 1.9,
                              fontStyle: "italic",
                            },
                            children:
                              '"The Morgan Wallen Foundation supports programs for youth in the areas of sports and music. We are also committed to helping communities in times of crisis, ensuring access to food, critical supplies, and more."',
                          }),
                        ],
                      }),
                      (0, t.jsx)("div", {
                        style: {
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: 10,
                        },
                        children: [
                          { num: "$3", label: "Per Concert Ticket" },
                          { num: "100%", label: "Charity Funded" },
                          { num: "Youth", label: "Sports & Music" },
                          { num: "TN", label: "East Tennessee Roots" },
                        ].map((e, o) =>
                          (0, t.jsxs)(
                            "div",
                            {
                              style: {
                                background: "#111",
                                border: "1px solid #1a1a1a",
                                borderRadius: 8,
                                padding: "16px 14px",
                                textAlign: "center",
                              },
                              children: [
                                (0, t.jsx)("p", {
                                  style: {
                                    fontSize: 18,
                                    color: F,
                                    fontWeight: "bold",
                                    marginBottom: 4,
                                  },
                                  children: e.num,
                                }),
                                (0, t.jsx)("p", {
                                  style: {
                                    fontSize: 10,
                                    color: "#4a4030",
                                    letterSpacing: 1,
                                  },
                                  children: e.label,
                                }),
                              ],
                            },
                            o,
                          ),
                        ),
                      }),
                    ],
                  }),
                ],
              }),
              e
                ? (0, t.jsxs)("div", {
                    style: {
                      background: "#111",
                      border: "1px solid #2a2010",
                      borderRadius: 12,
                      padding: "40px 36px",
                      marginBottom: 80,
                    },
                    children: [
                      (0, t.jsx)("h3", {
                        style: {
                          fontSize: 22,
                          color: F,
                          marginBottom: 8,
                          textAlign: "center",
                        },
                        children: "Make a Donation",
                      }),
                      (0, t.jsx)("p", {
                        style: {
                          fontSize: 13,
                          color: "#5a5040",
                          textAlign: "center",
                          marginBottom: 36,
                        },
                        children:
                          "100% of your donation supports the Morgan Wallen Foundation",
                      }),
                      (0, t.jsx)("p", {
                        style: {
                          fontSize: 10,
                          letterSpacing: 3,
                          color: "#5a5040",
                          textTransform: "uppercase",
                          marginBottom: 14,
                        },
                        children: "Select Amount",
                      }),
                      (0, t.jsx)("div", {
                        style: {
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: 10,
                          marginBottom: 12,
                        },
                        children: n.map((e) =>
                          (0, t.jsxs)(
                            "button",
                            {
                              type: "button",
                              onClick: () => {
                                (s(e), d(""));
                              },
                              style: {
                                padding: "14px",
                                background: r !== e || l ? "#1a1a1a" : F,
                                color: r !== e || l ? "#c0b080" : "#0a0a0a",
                                border: `1px solid ${r === e && !l ? F : "#2a2a2a"}`,
                                borderRadius: 8,
                                fontSize: 16,
                                fontWeight: "bold",
                                cursor: "pointer",
                                fontFamily: "Georgia, serif",
                                transition: "all 0.15s",
                              },
                              children: ["$", e],
                            },
                            e,
                          ),
                        ),
                      }),
                      (0, t.jsxs)("div", {
                        style: { position: "relative", marginBottom: 28 },
                        children: [
                          (0, t.jsx)("span", {
                            style: {
                              position: "absolute",
                              left: 16,
                              top: "50%",
                              transform: "translateY(-50%)",
                              fontSize: 16,
                              color: "#5a5040",
                            },
                            children: "$",
                          }),
                          (0, t.jsx)("input", {
                            type: "number",
                            min: "1",
                            placeholder: "Other amount",
                            value: l,
                            onChange: (e) => {
                              (d(e.target.value), s(null));
                            },
                            style: { ...R, paddingLeft: 32 },
                          }),
                        ],
                      }),
                      (0, t.jsx)("p", {
                        style: {
                          fontSize: 10,
                          letterSpacing: 3,
                          color: "#5a5040",
                          textTransform: "uppercase",
                          marginBottom: 14,
                        },
                        children: "Your Information",
                      }),
                      (0, t.jsxs)("div", {
                        style: {
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: 12,
                          marginBottom: 12,
                        },
                        children: [
                          (0, t.jsx)("input", {
                            type: "text",
                            placeholder:
                              "Your name (or leave blank for Anonymous)",
                            value: w,
                            onChange: (e) => T(e.target.value),
                            style: R,
                          }),
                          (0, t.jsx)("input", {
                            type: "email",
                            placeholder: "Email address *",
                            value: z,
                            onChange: (e) => B(e.target.value),
                            style: R,
                          }),
                        ],
                      }),
                      (0, t.jsx)("p", {
                        style: {
                          fontSize: 10,
                          letterSpacing: 3,
                          color: "#5a5040",
                          textTransform: "uppercase",
                          marginBottom: 14,
                          marginTop: 8,
                        },
                        children: "Your Note for the Donor Scroll",
                      }),
                      (0, t.jsx)("textarea", {
                        placeholder:
                          "Write a public note about why you're choosing to give!",
                        value: c,
                        onChange: (e) => {
                          e.target.value.length <= 150 && p(e.target.value);
                        },
                        rows: 4,
                        style: { ...R, resize: "vertical", minHeight: 100 },
                      }),
                      (0, t.jsxs)("p", {
                        style: {
                          fontSize: 11,
                          color: "#3a3020",
                          textAlign: "right",
                          marginTop: 4,
                          marginBottom: 20,
                        },
                        children: [c.length, " / 150"],
                      }),
                      (0, t.jsx)("div", {
                        style: {
                          display: "flex",
                          flexDirection: "column",
                          gap: 12,
                          marginBottom: 24,
                        },
                        children: [
                          { label: "Post my donation amount", val: m, set: g },
                          { label: "Post my name", val: u, set: h },
                        ].map((e, o) =>
                          (0, t.jsxs)(
                            "label",
                            {
                              style: {
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                cursor: "pointer",
                                fontSize: 14,
                                color: "#c0b080",
                              },
                              children: [
                                (0, t.jsx)("input", {
                                  type: "checkbox",
                                  checked: e.val,
                                  onChange: (t) => e.set(t.target.checked),
                                  style: {
                                    width: 18,
                                    height: 18,
                                    accentColor: F,
                                  },
                                }),
                                e.label,
                              ],
                            },
                            o,
                          ),
                        ),
                      }),
                      (0, t.jsxs)("div", {
                        style: { marginBottom: 32 },
                        children: [
                          (0, t.jsx)("p", {
                            style: {
                              fontSize: 13,
                              color: "#c0b080",
                              marginBottom: 10,
                            },
                            children:
                              "Honor or remember someone with your gift?",
                          }),
                          (0, t.jsxs)("select", {
                            value: y,
                            onChange: (e) => x(e.target.value),
                            style: { ...R, maxWidth: 200, cursor: "pointer" },
                            children: [
                              (0, t.jsx)("option", {
                                value: "no",
                                children: "No",
                              }),
                              (0, t.jsx)("option", {
                                value: "honor",
                                children: "In honor of...",
                              }),
                              (0, t.jsx)("option", {
                                value: "memory",
                                children: "In memory of...",
                              }),
                            ],
                          }),
                        ],
                      }),
                      S &&
                        (0, t.jsx)("p", {
                          style: {
                            fontSize: 13,
                            color: "#b91c1c",
                            marginBottom: 16,
                          },
                          children: S,
                        }),
                      (0, t.jsx)("button", {
                        type: "button",
                        onClick: A,
                        disabled: f,
                        style: {
                          width: "100%",
                          background: f ? "#6a5820" : F,
                          color: "#0a0a0a",
                          padding: "18px",
                          fontSize: 14,
                          letterSpacing: 3,
                          textTransform: "uppercase",
                          fontWeight: "bold",
                          border: "none",
                          borderRadius: 8,
                          cursor: f ? "not-allowed" : "pointer",
                          fontFamily: "Georgia, serif",
                          transition: "all 0.2s",
                          marginBottom: 16,
                        },
                        children: f
                          ? "Redirecting..."
                          : `💛 Donate Once${W ? ` — $${W}` : ""}`,
                      }),
                      (0, t.jsxs)("div", {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 8,
                        },
                        children: [
                          (0, t.jsx)("span", {
                            style: { fontSize: 16, color: "#4a4030" },
                            children: "₿",
                          }),
                          (0, t.jsx)("p", {
                            style: { fontSize: 11, color: "#3a3020" },
                            children:
                              "Secure payment via Bitcoin · Powered by NOWPayments",
                          }),
                        ],
                      }),
                      (0, t.jsx)("button", {
                        type: "button",
                        onClick: () => i(!1),
                        style: {
                          background: "none",
                          border: "none",
                          color: "#3a3020",
                          cursor: "pointer",
                          fontSize: 12,
                          display: "block",
                          margin: "14px auto 0",
                          textDecoration: "underline",
                        },
                        children: "Cancel",
                      }),
                    ],
                  })
                : (0, t.jsxs)("div", {
                    style: { textAlign: "center", marginBottom: 80 },
                    children: [
                      (0, t.jsx)("div", {
                        style: {
                          width: 40,
                          height: 1,
                          background: F,
                          margin: "0 auto 32px",
                        },
                      }),
                      (0, t.jsx)("p", {
                        style: {
                          fontSize: 13,
                          color: "#5a5040",
                          marginBottom: 28,
                          letterSpacing: 1,
                        },
                        children:
                          "Your donation directly supports youth sports and music programs.",
                      }),
                      (0, t.jsx)("button", {
                        type: "button",
                        onClick: () => i(!0),
                        style: {
                          background: F,
                          color: "#0a0a0a",
                          padding: "18px 60px",
                          fontSize: 14,
                          letterSpacing: 4,
                          textTransform: "uppercase",
                          fontWeight: "bold",
                          border: "none",
                          borderRadius: 4,
                          cursor: "pointer",
                          fontFamily: "Georgia, serif",
                          boxShadow: "0 8px 32px rgba(200,168,75,0.3)",
                          transition: "all 0.2s",
                        },
                        onMouseEnter: (e) => {
                          ((e.currentTarget.style.transform =
                            "translateY(-2px)"),
                            (e.currentTarget.style.boxShadow =
                              "0 14px 40px rgba(200,168,75,0.4)"));
                        },
                        onMouseLeave: (e) => {
                          ((e.currentTarget.style.transform = "translateY(0)"),
                            (e.currentTarget.style.boxShadow =
                              "0 8px 32px rgba(200,168,75,0.3)"));
                        },
                        children: "💛 Donate Now",
                      }),
                    ],
                  }),
            ],
          }),
          (0, t.jsx)("section", {
            style: {
              background: "#0c0c0c",
              borderTop: "1px solid #141414",
              borderBottom: "1px solid #141414",
              padding: "72px 24px",
            },
            children: (0, t.jsxs)("div", {
              style: { maxWidth: 860, margin: "0 auto" },
              children: [
                (0, t.jsx)("p", {
                  style: {
                    fontSize: 9,
                    letterSpacing: 6,
                    color: "#5a4c28",
                    textTransform: "uppercase",
                    marginBottom: 14,
                  },
                  children: "Learn More",
                }),
                (0, t.jsx)("h2", {
                  style: {
                    fontSize: "clamp(22px, 3vw, 36px)",
                    color: "#f0e8d0",
                    marginBottom: 24,
                    lineHeight: 1.2,
                  },
                  children: "About the Morgan Wallen Foundation",
                }),
                (0, t.jsx)("div", {
                  style: {
                    width: 36,
                    height: 1,
                    background: F,
                    marginBottom: 28,
                  },
                }),
                (0, t.jsx)("p", {
                  style: {
                    fontSize: 15,
                    color: "#5a5040",
                    lineHeight: 1.9,
                    marginBottom: 20,
                  },
                  children:
                    "The Morgan Wallen Foundation supports programs for youth in the areas of sports and music. We have a core belief that every child deserves a chance to thrive, play, and create through sports and music. We are also committed to helping communities in times of crisis.",
                }),
                (0, t.jsx)("p", {
                  style: {
                    fontSize: 15,
                    color: "#5a5040",
                    lineHeight: 1.9,
                    marginBottom: 36,
                  },
                  children:
                    "Whether it's providing critical supplies in the wake of natural disasters or distributing groceries and meals to food insecure families, the Morgan Wallen Foundation is here to help. The foundation is primarily funded by Morgan Wallen and consumer donations, with $3 from every concert ticket Morgan sells going directly to support the foundation's work.",
                }),
                (0, t.jsxs)("div", {
                  style: {
                    background: "#111",
                    border: "1px solid #1e1a08",
                    borderRadius: 8,
                    padding: "20px 24px",
                  },
                  children: [
                    (0, t.jsx)("p", {
                      style: {
                        fontSize: 10,
                        letterSpacing: 4,
                        color: "#5a4c28",
                        textTransform: "uppercase",
                        marginBottom: 10,
                      },
                      children: "Fiscal Sponsorship",
                    }),
                    (0, t.jsxs)("p", {
                      style: {
                        fontSize: 12,
                        color: "#4a4030",
                        lineHeight: 1.8,
                      },
                      children: [
                        "The foundation operates under the fiscal sponsorship of the Edward Charles Foundation, an established, registered 501(c)(3) public charity with the Internal Revenue Service (IRS) under ",
                        (0, t.jsx)("strong", {
                          style: { color: "#6a5840" },
                          children: "EIN 26-4245043",
                        }),
                        ".",
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
          (0, t.jsxs)("section", {
            style: {
              maxWidth: 760,
              margin: "0 auto",
              padding: "72px 24px 100px",
            },
            children: [
              (0, t.jsxs)("div", {
                style: { textAlign: "center", marginBottom: 48 },
                children: [
                  (0, t.jsx)("p", {
                    style: {
                      fontSize: 9,
                      letterSpacing: 6,
                      color: "#5a4c28",
                      textTransform: "uppercase",
                      marginBottom: 14,
                    },
                    children: "Community",
                  }),
                  (0, t.jsx)("h2", {
                    style: {
                      fontSize: "clamp(22px, 3vw, 36px)",
                      color: "#f0e8d0",
                      marginBottom: 8,
                    },
                    children: "Our Supporters",
                  }),
                  (0, t.jsx)("p", {
                    style: { fontSize: 13, color: "#3a3020" },
                    children: "600+ donors and counting",
                  }),
                  (0, t.jsx)("div", {
                    style: {
                      width: 36,
                      height: 1,
                      background: F,
                      margin: "20px auto 0",
                    },
                  }),
                ],
              }),
              (0, t.jsx)("div", {
                style: { display: "flex", flexDirection: "column", gap: 0 },
                children: M.map((e, o) =>
                  (0, t.jsxs)(
                    "div",
                    {
                      style: {
                        borderBottom: "1px solid #141414",
                        padding: "22px 0",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 16,
                      },
                      children: [
                        (0, t.jsxs)("div", {
                          style: { flex: 1 },
                          children: [
                            (0, t.jsxs)("div", {
                              style: {
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                marginBottom: 8,
                              },
                              children: [
                                (0, t.jsx)("div", {
                                  style: {
                                    width: 36,
                                    height: 36,
                                    borderRadius: "50%",
                                    background: `linear-gradient(135deg, ${F}, #9a7d30)`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 13,
                                    fontWeight: "bold",
                                    color: "#0a0a0a",
                                    flexShrink: 0,
                                  },
                                  children:
                                    "Anonymous" === e.name ? "A" : e.name[0],
                                }),
                                (0, t.jsx)("p", {
                                  style: {
                                    margin: 0,
                                    fontSize: 15,
                                    fontWeight: "bold",
                                    color: "#c0b080",
                                  },
                                  children: e.name,
                                }),
                              ],
                            }),
                            (0, t.jsx)("p", {
                              style: {
                                fontSize: 14,
                                color: "#5a5040",
                                lineHeight: 1.7,
                                marginBottom: 8,
                                paddingLeft: 48,
                              },
                              children: e.note,
                            }),
                            (0, t.jsx)("p", {
                              style: {
                                fontSize: 11,
                                color: "#2a2020",
                                letterSpacing: 1,
                                paddingLeft: 48,
                              },
                              children: e.time,
                            }),
                          ],
                        }),
                        e.amount &&
                          (0, t.jsxs)("span", {
                            style: {
                              fontSize: 16,
                              fontWeight: "bold",
                              color: F,
                              whiteSpace: "nowrap",
                              marginTop: 6,
                            },
                            children: ["$", e.amount],
                          }),
                      ],
                    },
                    o,
                  ),
                ),
              }),
              !v &&
                a.length > 5 &&
                (0, t.jsx)("div", {
                  style: { textAlign: "center", marginTop: 32 },
                  children: (0, t.jsx)("button", {
                    type: "button",
                    onClick: () => k(!0),
                    style: {
                      background: "transparent",
                      border: "1px solid #2a2010",
                      color: "#c0b080",
                      padding: "14px 40px",
                      fontSize: 13,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      borderRadius: 40,
                      cursor: "pointer",
                      fontFamily: "Georgia, serif",
                      transition: "all 0.2s",
                    },
                    onMouseEnter: (e) => {
                      ((e.currentTarget.style.borderColor = F),
                        (e.currentTarget.style.color = F));
                    },
                    onMouseLeave: (e) => {
                      ((e.currentTarget.style.borderColor = "#2a2010"),
                        (e.currentTarget.style.color = "#c0b080"));
                    },
                    children: "View All 600 Supporters",
                  }),
                }),
              (0, t.jsxs)("div", {
                style: { textAlign: "center", marginTop: 64 },
                children: [
                  (0, t.jsx)("div", {
                    style: {
                      width: 36,
                      height: 1,
                      background: F,
                      margin: "0 auto 28px",
                    },
                  }),
                  (0, t.jsx)("p", {
                    style: { fontSize: 14, color: "#5a5040", marginBottom: 24 },
                    children:
                      "Join our community of supporters and help change a child's life.",
                  }),
                  (0, t.jsx)("button", {
                    type: "button",
                    onClick: () => {
                      (i(!0),
                        window.scrollTo({ top: 400, behavior: "smooth" }));
                    },
                    style: {
                      background: F,
                      color: "#0a0a0a",
                      padding: "16px 52px",
                      fontSize: 13,
                      letterSpacing: 4,
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: 4,
                      cursor: "pointer",
                      fontFamily: "Georgia, serif",
                    },
                    children: "💛 Make a Donation",
                  }),
                ],
              }),
            ],
          }),
        ],
      });
    },
  ]);
};
