export default (e) => {
  "use strict";
  var t = e.i(40450),
    a = e.i(13742);
  e.s([
    "default",
    0,
    function () {
      let e = "#c8a84b",
        [o, r] = (0, a.useState)({
          name: "",
          email: "",
          subject: "",
          message: "",
        }),
        [i, l] = (0, a.useState)(null),
        [n, s] = (0, a.useState)(!1),
        [d, c] = (0, a.useState)(!1),
        [p, m] = (0, a.useState)(null),
        [u, g] = (0, a.useState)(!1),
        x = (0, a.useRef)(null);
      (0, a.useEffect)(() => {
        let e = localStorage.getItem("cw_user");
        if (e) {
          let t = JSON.parse(e);
          (r((e) => ({
            ...e,
            name: `${t.firstName || ""} ${t.lastName || ""}`.trim(),
            email: t.email || "",
          })),
            g("active" === t.status));
        }
      }, []);
      let b = async () => {
        if (!o.name || !o.email || !o.message)
          return void m("Please fill in your name, email, and message.");
        (s(!0), m(null));
        try {
          if (u) {
            let e = JSON.parse(
              localStorage.getItem("cw_platform_messages") || "[]",
            );
            (e.push({
              id: `msg_${Date.now()}`,
              type: "support",
              from: "me",
              subject: o.subject || "Support Request",
              body: o.message,
              timestamp: new Date().toISOString(),
              read: !0,
              replies: [],
              attachment: i?.name || null,
            }),
              localStorage.setItem("cw_platform_messages", JSON.stringify(e)));
          }
          (await fetch("/api/notify-admin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "support_message",
              data: {
                name: o.name,
                email: o.email,
                subject: o.subject,
                message: o.message,
                isMember: u,
                attachment: i?.base64 || null,
                attachmentName: i?.name || null,
              },
            }),
          }),
            c(!0));
        } catch {
          m(
            "Something went wrong. Please try email us directly at support@clubwallen.site.",
          );
        }
        s(!1);
      };
      return d
        ? (0, t.jsx)("div", {
            style: {
              minHeight: "100vh",
              background: "#0a0a0a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 40,
              textAlign: "center",
              fontFamily: "Georgia,serif",
            },
            children: (0, t.jsxs)("div", {
              style: { maxWidth: 480 },
              children: [
                (0, t.jsx)("div", {
                  style: { fontSize: 48, color: e, marginBottom: 24 },
                  children: "✦",
                }),
                (0, t.jsx)("p", {
                  style: {
                    fontSize: 10,
                    letterSpacing: 6,
                    color: "#5a5040",
                    textTransform: "uppercase",
                    marginBottom: 16,
                  },
                  children: "Message Sent",
                }),
                (0, t.jsx)("h1", {
                  style: { fontSize: 32, color: e, marginBottom: 16 },
                  children: "We'll be in touch!",
                }),
                (0, t.jsxs)("p", {
                  style: { fontSize: 14, color: "#5a5040", lineHeight: 1.8 },
                  children: [
                    "Your message has been saved to our support inbox. Sign in with the same email address to view replies in your account.",
                    u
                      ? ""
                      : " Connect your own support service before launching.",
                  ],
                }),
              ],
            }),
          })
        : (0, t.jsx)("div", {
            style: {
              minHeight: "100vh",
              background: "#0a0a0a",
              padding: "80px 24px 100px",
              fontFamily: "Georgia,serif",
            },
            children: (0, t.jsxs)("div", {
              style: { maxWidth: 660, margin: "0 auto" },
              children: [
                (0, t.jsxs)("div", {
                  style: { textAlign: "center", marginBottom: 56 },
                  children: [
                    (0, t.jsx)("p", {
                      style: {
                        fontSize: 10,
                        letterSpacing: 6,
                        color: "#5a5040",
                        textTransform: "uppercase",
                        marginBottom: 16,
                      },
                      children: "Get Help",
                    }),
                    (0, t.jsx)("h1", {
                      style: {
                        fontSize: "clamp(28px, 4vw, 44px)",
                        color: e,
                        marginBottom: 12,
                      },
                      children: "Support",
                    }),
                    (0, t.jsx)("div", {
                      style: {
                        width: 40,
                        height: 1,
                        background: e,
                        margin: "0 auto 20px",
                      },
                    }),
                    (0, t.jsx)("p", {
                      style: {
                        fontSize: 14,
                        color: "#5a5040",
                        lineHeight: 1.8,
                        maxWidth: 480,
                        margin: "0 auto",
                      },
                      children:
                        "Have a question about your membership, an order, or anything else? Send us a message and we'll get back to you.",
                    }),
                  ],
                }),
                (0, t.jsx)("div", {
                  style: {
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                    marginBottom: 40,
                  },
                  children: [
                    {
                      icon: "✉",
                      label: "Email",
                      value: "support@clubwallen.site",
                    },
                    {
                      icon: "⏱",
                      label: "Response Time",
                      value: "Within 1–4 hours",
                    },
                  ].map((e, a) =>
                    (0, t.jsxs)(
                      "div",
                      {
                        style: {
                          background: "#111",
                          border: "1px solid #1a1a1a",
                          padding: "20px 22px",
                        },
                        children: [
                          (0, t.jsx)("p", {
                            style: { fontSize: 20, marginBottom: 8 },
                            children: e.icon,
                          }),
                          (0, t.jsx)("p", {
                            style: {
                              fontSize: 10,
                              letterSpacing: 3,
                              color: "#5a5040",
                              textTransform: "uppercase",
                              marginBottom: 6,
                            },
                            children: e.label,
                          }),
                          (0, t.jsx)("p", {
                            style: { fontSize: 13, color: "#c0b080" },
                            children: e.value,
                          }),
                        ],
                      },
                      a,
                    ),
                  ),
                }),
                (0, t.jsxs)("div", {
                  style: {
                    background: "#111",
                    border: "1px solid #1a1a1a",
                    padding: "36px 32px",
                    borderRadius: 2,
                  },
                  children: [
                    (0, t.jsx)("h3", {
                      style: {
                        fontSize: 14,
                        color: e,
                        letterSpacing: 3,
                        textTransform: "uppercase",
                        marginBottom: 28,
                      },
                      children: "Send a Message",
                    }),
                    (0, t.jsxs)("div", {
                      style: {
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 12,
                      },
                      children: [
                        (0, t.jsxs)("div", {
                          style: { marginBottom: 16 },
                          children: [
                            (0, t.jsx)("label", {
                              style: {
                                fontSize: 11,
                                letterSpacing: 2,
                                color: "#5a5040",
                                display: "block",
                                marginBottom: 8,
                                textTransform: "uppercase",
                              },
                              children: "Your Name *",
                            }),
                            (0, t.jsx)("input", {
                              value: o.name,
                              onChange: (e) =>
                                r((t) => ({ ...t, name: e.target.value })),
                              placeholder: "Your name",
                              style: {
                                width: "100%",
                                background: "#1a1a1a",
                                border: "1px solid #2a2a2a",
                                color: "#f0e8d0",
                                borderRadius: 4,
                                padding: "13px 14px",
                                fontSize: 15,
                                outline: "none",
                                boxSizing: "border-box",
                              },
                            }),
                          ],
                        }),
                        (0, t.jsxs)("div", {
                          style: { marginBottom: 16 },
                          children: [
                            (0, t.jsx)("label", {
                              style: {
                                fontSize: 11,
                                letterSpacing: 2,
                                color: "#5a5040",
                                display: "block",
                                marginBottom: 8,
                                textTransform: "uppercase",
                              },
                              children: "Email Address *",
                            }),
                            (0, t.jsx)("input", {
                              value: o.email,
                              onChange: (e) =>
                                r((t) => ({ ...t, email: e.target.value })),
                              type: "email",
                              placeholder: "you@example.com",
                              style: {
                                width: "100%",
                                background: "#1a1a1a",
                                border: "1px solid #2a2a2a",
                                color: "#f0e8d0",
                                borderRadius: 4,
                                padding: "13px 14px",
                                fontSize: 15,
                                outline: "none",
                                boxSizing: "border-box",
                              },
                            }),
                          ],
                        }),
                      ],
                    }),
                    ((e, a, i = "text", l = "") =>
                      (0, t.jsxs)("div", {
                        style: { marginBottom: 16 },
                        children: [
                          (0, t.jsx)("label", {
                            style: {
                              fontSize: 11,
                              letterSpacing: 2,
                              color: "#5a5040",
                              display: "block",
                              marginBottom: 8,
                              textTransform: "uppercase",
                            },
                            children: a,
                          }),
                          (0, t.jsx)("input", {
                            type: i,
                            value: o[e],
                            placeholder: l,
                            onChange: (t) =>
                              r((a) => ({ ...a, [e]: t.target.value })),
                            style: {
                              width: "100%",
                              background: "#1a1a1a",
                              border: "1px solid #2a2a2a",
                              color: "#f0e8d0",
                              borderRadius: 4,
                              padding: "13px 16px",
                              fontSize: 15,
                              outline: "none",
                              boxSizing: "border-box",
                            },
                          }),
                        ],
                      }))(
                      "subject",
                      "Subject (Optional)",
                      "text",
                      "e.g. Membership question",
                    ),
                    (0, t.jsxs)("div", {
                      style: { marginBottom: 16 },
                      children: [
                        (0, t.jsx)("label", {
                          style: {
                            fontSize: 11,
                            letterSpacing: 2,
                            color: "#5a5040",
                            display: "block",
                            marginBottom: 8,
                            textTransform: "uppercase",
                          },
                          children: "Message *",
                        }),
                        (0, t.jsx)("textarea", {
                          value: o.message,
                          onChange: (e) =>
                            r((t) => ({ ...t, message: e.target.value })),
                          placeholder: "Describe your question or issue...",
                          rows: 6,
                          style: {
                            width: "100%",
                            background: "#1a1a1a",
                            border: "1px solid #2a2a2a",
                            color: "#f0e8d0",
                            borderRadius: 4,
                            padding: "13px 16px",
                            fontSize: 15,
                            outline: "none",
                            resize: "vertical",
                            boxSizing: "border-box",
                            fontFamily: "Georgia,serif",
                          },
                        }),
                      ],
                    }),
                    (0, t.jsxs)("div", {
                      style: { marginBottom: 24 },
                      children: [
                        (0, t.jsx)("label", {
                          style: {
                            fontSize: 11,
                            letterSpacing: 2,
                            color: "#5a5040",
                            display: "block",
                            marginBottom: 8,
                            textTransform: "uppercase",
                          },
                          children: "Attachment (Optional · Max 5MB)",
                        }),
                        (0, t.jsxs)("div", {
                          style: {
                            display: "flex",
                            gap: 10,
                            alignItems: "center",
                          },
                          children: [
                            (0, t.jsxs)("button", {
                              type: "button",
                              onClick: () => x.current?.click(),
                              style: {
                                background: "transparent",
                                border: "1px solid #2a2a2a",
                                color: "#c0b080",
                                padding: "10px 18px",
                                fontSize: 12,
                                cursor: "pointer",
                                borderRadius: 4,
                              },
                              children: ["📎 ", i ? i.name : "Choose File"],
                            }),
                            i &&
                              (0, t.jsx)("button", {
                                type: "button",
                                onClick: () => l(null),
                                style: {
                                  background: "none",
                                  border: "none",
                                  color: "#5a5040",
                                  cursor: "pointer",
                                  fontSize: 12,
                                },
                                children: "✕ Remove",
                              }),
                          ],
                        }),
                        (0, t.jsx)("input", {
                          ref: x,
                          type: "file",
                          onChange: (e) => {
                            let t = e.target.files?.[0];
                            if (!t) return;
                            if (t.size > 5242880)
                              return void m("File must be under 5MB.");
                            let a = new FileReader();
                            ((a.onload = () =>
                              l({ base64: a.result, name: t.name })),
                              a.readAsDataURL(t));
                          },
                          style: { display: "none" },
                          accept: "image/*,.pdf,.doc,.docx,.txt",
                        }),
                      ],
                    }),
                    p &&
                      (0, t.jsx)("p", {
                        style: {
                          fontSize: 13,
                          color: "#b91c1c",
                          marginBottom: 16,
                        },
                        children: p,
                      }),
                    (0, t.jsx)("button", {
                      type: "button",
                      onClick: b,
                      disabled: n,
                      style: {
                        width: "100%",
                        background: n ? "#6a5820" : e,
                        color: "#0a0a0a",
                        padding: "16px",
                        fontSize: 12,
                        letterSpacing: 3,
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        border: "none",
                        borderRadius: 2,
                        cursor: n ? "not-allowed" : "pointer",
                      },
                      children: n ? "Sending..." : "Send Message",
                    }),
                    (0, t.jsxs)("p", {
                      style: {
                        fontSize: 12,
                        color: "#3a3020",
                        textAlign: "center",
                        marginTop: 14,
                      },
                      children: [
                        "Or email directly: ",
                        (0, t.jsx)("a", {
                          href: "mailto:support@clubwallen.site",
                          style: { color: e },
                          children: "support@clubwallen.site",
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
