export default (e) => {
  "use strict";
  var t = e.i(40450),
    r = e.i(13742),
    a = e.i(30037),
    i = e.i(6028),
    s = e.i(20755);
  let o = [
    { label: "Shop", sub: "Merch & members-only drops", href: "/shop" },
    { label: "MW Tickets", sub: "Still The Problem Tour", href: "/tickets" },
    {
      label: "How It Works",
      sub: "Your membership, step by step",
      href: "/#how-it-works",
    },
    {
      label: "Sand In My Boots",
      sub: "Passes, hotel stays & lineup",
      href: "/sand-in-my-boots",
    },
  ];
  e.s([
    "default",
    0,
    function () {
      let e = (0, a.useRouter)(),
        [n, l] = (0, r.useState)(null),
        [d, p] = (0, r.useState)("loading"),
        [c, u] = (0, r.useState)("portal"),
        [x, m] = (0, r.useState)([]),
        g = (0, s.getSupabaseBrowserClient)();
      (0, r.useEffect)(() => {
        (async () => {
          let {
            data: { user: t },
          } = await g.auth.getUser();
          if (!t) return e.push("/login");
          let { data: r } = await g
            .from("accounts")
            .select("email, first_name, status")
            .eq("auth_user_id", t.id)
            .single();
          if (!r) return e.push("/login");
          (l({ email: r.email, firstName: r.first_name }), p(r.status));
          let { data: a } = await g
            .from("support_messages")
            .select("id, subject, body, attachment, read, created_at")
            .eq("email", r.email)
            .order("created_at", { ascending: !1 });
          if (a && a.length > 0) {
            let e = a.map((e) => e.id),
              { data: t } = await g
                .from("message_replies")
                .select(
                  "id, message_id, from_who, body, attachment, created_at",
                )
                .in("message_id", e)
                .order("created_at", { ascending: !0 });
            m(
              a.map((e) => ({
                ...e,
                replies: (t || []).filter((t) => t.message_id === e.id),
              })),
            );
          }
        })();
      }, []);
      let h = async () => {
          (await g.auth.signOut(), e.push("/login"));
        },
        b = async () => {
          let {
            data: { user: e },
          } = await g.auth.getUser();
          if (!e) return;
          let { data: t } = await g
            .from("accounts")
            .select("status")
            .eq("auth_user_id", e.id)
            .single();
          t?.status === "active"
            ? p("active")
            : alert(
                "Your payment is still under review. Please check back shortly.",
              );
        },
        y = "#c8a84b",
        f = x.filter((e) => !e.read).length;
      return "loading" === d
        ? null
        : "rejected" === d
          ? (0, t.jsx)("div", {
              style: {
                minHeight: "100vh",
                background: "#0a0a0a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "60px 24px",
              },
              children: (0, t.jsxs)("div", {
                style: { width: "100%", maxWidth: 480, textAlign: "center" },
                children: [
                  (0, t.jsxs)("p", {
                    style: {
                      fontSize: 14,
                      color: "#b91c1c",
                      lineHeight: 1.7,
                      marginBottom: 24,
                    },
                    children: [
                      "Your membership application was not approved. Please contact",
                      " ",
                      (0, t.jsx)("a", {
                        href: "mailto:support@clubwallen.site",
                        style: { color: y },
                        children: "support@clubwallen.site",
                      }),
                      " for more information.",
                    ],
                  }),
                  (0, t.jsx)("button", {
                    type: "button",
                    onClick: h,
                    style: {
                      background: "transparent",
                      border: "1px solid #2a2010",
                      color: "#5a5040",
                      padding: "12px 32px",
                      fontSize: 11,
                      letterSpacing: 3,
                      textTransform: "uppercase",
                      cursor: "pointer",
                      borderRadius: 2,
                      width: "100%",
                    },
                    children: "Sign Out",
                  }),
                ],
              }),
            })
          : "pending" === d
            ? (0, t.jsx)("div", {
                style: {
                  minHeight: "100vh",
                  background: "#0a0a0a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "60px 24px",
                },
                children: (0, t.jsxs)("div", {
                  style: { width: "100%", maxWidth: 520, textAlign: "center" },
                  children: [
                    (0, t.jsx)("div", {
                      style: { fontSize: 48, marginBottom: 24 },
                      children: "⏳",
                    }),
                    (0, t.jsx)("p", {
                      style: {
                        fontSize: 10,
                        letterSpacing: 6,
                        color: "#5a5040",
                        textTransform: "uppercase",
                        marginBottom: 16,
                      },
                      children: "Membership Pending",
                    }),
                    (0, t.jsx)("h1", {
                      style: {
                        fontSize: 32,
                        color: y,
                        fontFamily: "Georgia, serif",
                        marginBottom: 16,
                      },
                      children: "Payment Under Review",
                    }),
                    (0, t.jsxs)("div", {
                      style: {
                        background: "#111",
                        border: "1px solid #2a2010",
                        padding: "32px 28px",
                        borderRadius: 2,
                        marginBottom: 32,
                        textAlign: "left",
                      },
                      children: [
                        (0, t.jsxs)("p", {
                          style: {
                            fontSize: 14,
                            color: "#7a6850",
                            lineHeight: 1.85,
                            marginBottom: 20,
                          },
                          children: [
                            "Hi ",
                            (0, t.jsx)("strong", {
                              style: { color: y },
                              children: n?.firstName,
                            }),
                            ", your Cash App payment is currently being reviewed by the Club Wallen support team.",
                          ],
                        }),
                        (0, t.jsxs)("div", {
                          style: {
                            borderTop: "1px solid #1a1a1a",
                            paddingTop: 20,
                            marginBottom: 20,
                          },
                          children: [
                            (0, t.jsx)("p", {
                              style: {
                                fontSize: 11,
                                letterSpacing: 3,
                                color: "#4a3c24",
                                textTransform: "uppercase",
                                marginBottom: 14,
                              },
                              children: "What happens next",
                            }),
                            [
                              {
                                icon: "📧",
                                text: "Make sure you emailed your Cash App receipt to support@clubwallen.site",
                              },
                              {
                                icon: "⏱",
                                text: "Our team reviews payments within 1 hour during business hours",
                              },
                              {
                                icon: "✅",
                                text: "Once approved, your portal will unlock automatically — just log back in",
                              },
                            ].map((e, r) =>
                              (0, t.jsxs)(
                                "div",
                                {
                                  style: {
                                    display: "flex",
                                    gap: 12,
                                    marginBottom: 14,
                                    alignItems: "flex-start",
                                  },
                                  children: [
                                    (0, t.jsx)("span", {
                                      style: { fontSize: 16, flexShrink: 0 },
                                      children: e.icon,
                                    }),
                                    (0, t.jsx)("p", {
                                      style: {
                                        fontSize: 13,
                                        color: "#5a5040",
                                        lineHeight: 1.7,
                                        margin: 0,
                                      },
                                      children: e.text,
                                    }),
                                  ],
                                },
                                r,
                              ),
                            ),
                          ],
                        }),
                        (0, t.jsxs)("div", {
                          style: {
                            background: "#0d0d0d",
                            border: "1px solid #1a1a1a",
                            borderRadius: 4,
                            padding: "14px 18px",
                          },
                          children: [
                            (0, t.jsx)("p", {
                              style: {
                                fontSize: 11,
                                color: "#3a3020",
                                margin: "0 0 4px",
                                letterSpacing: 2,
                                textTransform: "uppercase",
                              },
                              children: "Questions?",
                            }),
                            (0, t.jsx)("a", {
                              href: "mailto:support@clubwallen.site",
                              style: {
                                fontSize: 13,
                                color: y,
                                textDecoration: "none",
                              },
                              children: "support@clubwallen.site",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, t.jsx)("button", {
                      type: "button",
                      onClick: b,
                      style: {
                        background: "transparent",
                        border: `1px solid ${y}`,
                        color: y,
                        padding: "12px 32px",
                        fontSize: 11,
                        letterSpacing: 3,
                        textTransform: "uppercase",
                        cursor: "pointer",
                        borderRadius: 2,
                        marginBottom: 16,
                        display: "block",
                        width: "100%",
                      },
                      children: "Check Approval Status",
                    }),
                    (0, t.jsx)("button", {
                      type: "button",
                      onClick: h,
                      style: {
                        background: "transparent",
                        border: "1px solid #2a2010",
                        color: "#5a5040",
                        padding: "12px 32px",
                        fontSize: 11,
                        letterSpacing: 3,
                        textTransform: "uppercase",
                        cursor: "pointer",
                        borderRadius: 2,
                        display: "block",
                        width: "100%",
                      },
                      children: "Sign Out",
                    }),
                  ],
                }),
              })
            : (0, t.jsx)("div", {
                style: {
                  minHeight: "100vh",
                  background: "#0a0a0a",
                  padding: "60px 24px 100px",
                },
                children: (0, t.jsxs)("div", {
                  style: { maxWidth: 1e3, margin: "0 auto" },
                  children: [
                    (0, t.jsxs)("div", {
                      style: {
                        marginBottom: 56,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                        gap: 20,
                      },
                      children: [
                        (0, t.jsxs)("div", {
                          children: [
                            (0, t.jsx)("p", {
                              style: {
                                fontSize: 10,
                                letterSpacing: 6,
                                color: "#5a5040",
                                textTransform: "uppercase",
                                marginBottom: 12,
                              },
                              children: "Member Portal",
                            }),
                            (0, t.jsxs)("h1", {
                              style: {
                                fontSize: "clamp(28px, 4vw, 48px)",
                                color: y,
                              },
                              children: [
                                "Welcome",
                                n?.firstName ? `, ${n.firstName}` : " Back",
                              ],
                            }),
                            (0, t.jsx)("p", {
                              style: {
                                fontSize: 14,
                                color: "#4a4030",
                                marginTop: 8,
                              },
                              children: "2026 Reserve Member",
                            }),
                            (0, t.jsx)("div", {
                              style: {
                                width: 40,
                                height: 1,
                                background: y,
                                marginTop: 20,
                              },
                            }),
                          ],
                        }),
                        (0, t.jsx)("button", {
                          type: "button",
                          onClick: h,
                          style: {
                            background: "transparent",
                            border: "1px solid #2a2010",
                            color: "#5a5040",
                            padding: "10px 24px",
                            fontSize: 11,
                            letterSpacing: 2,
                            textTransform: "uppercase",
                            cursor: "pointer",
                            borderRadius: 2,
                            fontFamily: "Georgia, serif",
                            marginTop: 4,
                          },
                          onMouseEnter: (e) => {
                            ((e.currentTarget.style.borderColor = y),
                              (e.currentTarget.style.color = y));
                          },
                          onMouseLeave: (e) => {
                            ((e.currentTarget.style.borderColor = "#2a2010"),
                              (e.currentTarget.style.color = "#5a5040"));
                          },
                          children: "Sign Out",
                        }),
                      ],
                    }),
                    (0, t.jsxs)("div", {
                      style: {
                        display: "flex",
                        gap: 2,
                        marginBottom: 40,
                        borderBottom: "1px solid #141414",
                      },
                      children: [
                        (0, t.jsx)("button", {
                          type: "button",
                          onClick: () => u("portal"),
                          style: {
                            padding: "12px 24px",
                            background: "none",
                            border: "none",
                            borderBottom:
                              "portal" === c
                                ? `2px solid ${y}`
                                : "2px solid transparent",
                            color: "portal" === c ? y : "#5a5040",
                            fontSize: 12,
                            letterSpacing: 2,
                            cursor: "pointer",
                            textTransform: "uppercase",
                          },
                          children: "My Portal",
                        }),
                        (0, t.jsxs)("button", {
                          type: "button",
                          onClick: () => u("messages"),
                          style: {
                            padding: "12px 24px",
                            background: "none",
                            border: "none",
                            borderBottom:
                              "messages" === c
                                ? `2px solid ${y}`
                                : "2px solid transparent",
                            color: "messages" === c ? y : "#5a5040",
                            fontSize: 12,
                            letterSpacing: 2,
                            cursor: "pointer",
                            textTransform: "uppercase",
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          },
                          children: [
                            "Messages",
                            f > 0 &&
                              (0, t.jsx)("span", {
                                style: {
                                  background: y,
                                  color: "#000",
                                  borderRadius: "50%",
                                  width: 18,
                                  height: 18,
                                  fontSize: 10,
                                  fontWeight: 900,
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                },
                                children: f,
                              }),
                          ],
                        }),
                      ],
                    }),
                    "portal" === c &&
                      (0, t.jsxs)(t.Fragment, {
                        children: [
                          (0, t.jsx)("div", {
                            style: {
                              display: "grid",
                              gridTemplateColumns:
                                "repeat(auto-fit, minmax(200px, 1fr))",
                              gap: 2,
                              marginBottom: 48,
                            },
                            children: [
                              {
                                label: "Membership Status",
                                value: "Active",
                                sub: "Valid through Dec 31, 2026",
                              },
                              {
                                label: "Bundles Received",
                                value: "1 of 4",
                                sub: "Next bundle: Q2 2026",
                              },
                              {
                                label: "Member Since",
                                value: "2026",
                                sub: "Reserve founding member",
                              },
                              {
                                label: "Exclusive Drops",
                                value: "2 Active",
                                sub: "Available in your portal",
                              },
                            ].map((e, r) =>
                              (0, t.jsxs)(
                                "div",
                                {
                                  style: {
                                    background: "#111",
                                    border: "1px solid #1a1a1a",
                                    padding: "28px 24px",
                                  },
                                  children: [
                                    (0, t.jsx)("p", {
                                      style: {
                                        fontSize: 10,
                                        letterSpacing: 3,
                                        color: "#4a3c24",
                                        textTransform: "uppercase",
                                        marginBottom: 10,
                                      },
                                      children: e.label,
                                    }),
                                    (0, t.jsx)("p", {
                                      style: {
                                        fontSize: 22,
                                        color: y,
                                        marginBottom: 4,
                                      },
                                      children: e.value,
                                    }),
                                    (0, t.jsx)("p", {
                                      style: { fontSize: 12, color: "#3a3020" },
                                      children: e.sub,
                                    }),
                                  ],
                                },
                                r,
                              ),
                            ),
                          }),
                          (0, t.jsxs)("div", {
                            style: { marginBottom: 48 },
                            children: [
                              (0, t.jsx)("h2", {
                                style: {
                                  fontSize: 13,
                                  letterSpacing: 4,
                                  color: "#7a6850",
                                  textTransform: "uppercase",
                                  marginBottom: 24,
                                },
                                children: "Explore",
                              }),
                              (0, t.jsx)("div", {
                                style: {
                                  display: "grid",
                                  gridTemplateColumns:
                                    "repeat(auto-fit, minmax(210px, 1fr))",
                                  gap: 2,
                                },
                                children: o.map((e) =>
                                  (0, t.jsxs)(
                                    i.default,
                                    {
                                      href: e.href,
                                      style: {
                                        background: "#111",
                                        border: "1px solid #1a1a1a",
                                        padding: "24px 22px",
                                        display: "block",
                                        textDecoration: "none",
                                      },
                                      children: [
                                        (0, t.jsx)("p", {
                                          style: {
                                            fontSize: 15,
                                            color: y,
                                            margin: "0 0 6px",
                                            fontFamily: "Georgia, serif",
                                          },
                                          children: e.label,
                                        }),
                                        (0, t.jsx)("p", {
                                          style: {
                                            fontSize: 12,
                                            color: "#3a3020",
                                            margin: 0,
                                            lineHeight: 1.6,
                                          },
                                          children: e.sub,
                                        }),
                                      ],
                                    },
                                    e.label,
                                  ),
                                ),
                              }),
                            ],
                          }),
                          (0, t.jsxs)("div", {
                            style: { marginBottom: 48 },
                            children: [
                              (0, t.jsx)("h2", {
                                style: {
                                  fontSize: 13,
                                  letterSpacing: 4,
                                  color: "#7a6850",
                                  textTransform: "uppercase",
                                  marginBottom: 24,
                                },
                                children: "Upcoming Bundles & Drops",
                              }),
                              (0, t.jsx)("div", {
                                style: { display: "grid", gap: 2 },
                                children: [
                                  {
                                    date: "Q2 2026",
                                    title: "Spring Bundle",
                                    status: "Shipping Soon",
                                    desc: "Premium spring hoodie, exclusive tee, and members-only cap included.",
                                  },
                                  {
                                    date: "Q3 2026",
                                    title: "Summer Drop",
                                    status: "Coming",
                                    desc: "Details dropping for Reserve members before the general public.",
                                  },
                                  {
                                    date: "Q4 2026",
                                    title: "Holiday Bundle",
                                    status: "Coming",
                                    desc: "The biggest bundle of the year — holiday exclusive surprise items.",
                                  },
                                ].map((e, r) =>
                                  (0, t.jsxs)(
                                    "div",
                                    {
                                      style: {
                                        background: "#111",
                                        border: "1px solid #1a1a1a",
                                        padding: "24px 28px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        gap: 24,
                                        flexWrap: "wrap",
                                      },
                                      children: [
                                        (0, t.jsxs)("div", {
                                          children: [
                                            (0, t.jsx)("span", {
                                              style: {
                                                fontSize: 10,
                                                letterSpacing: 3,
                                                color: "#4a3c24",
                                                textTransform: "uppercase",
                                                display: "block",
                                                marginBottom: 8,
                                              },
                                              children: e.date,
                                            }),
                                            (0, t.jsx)("h3", {
                                              style: {
                                                fontSize: 16,
                                                color: "#c0b080",
                                                marginBottom: 6,
                                              },
                                              children: e.title,
                                            }),
                                            (0, t.jsx)("p", {
                                              style: {
                                                fontSize: 13,
                                                color: "#3a3020",
                                              },
                                              children: e.desc,
                                            }),
                                          ],
                                        }),
                                        (0, t.jsx)("div", {
                                          style: {
                                            background:
                                              "Shipping Soon" === e.status
                                                ? "#1a2010"
                                                : "#111",
                                            border: `1px solid ${"Shipping Soon" === e.status ? "#4a6020" : "#2a2a2a"}`,
                                            color:
                                              "Shipping Soon" === e.status
                                                ? "#8cb040"
                                                : "#3a3020",
                                            padding: "6px 16px",
                                            fontSize: 10,
                                            letterSpacing: 2,
                                            textTransform: "uppercase",
                                            borderRadius: 2,
                                            whiteSpace: "nowrap",
                                          },
                                          children: e.status,
                                        }),
                                      ],
                                    },
                                    r,
                                  ),
                                ),
                              }),
                            ],
                          }),
                          (0, t.jsxs)("div", {
                            style: {
                              background: "#12100a",
                              border: "1px solid #2a2010",
                              padding: "40px 36px",
                              textAlign: "center",
                            },
                            children: [
                              (0, t.jsx)("p", {
                                style: {
                                  fontSize: 10,
                                  letterSpacing: 5,
                                  color: "#6a5c3a",
                                  textTransform: "uppercase",
                                  marginBottom: 14,
                                },
                                children: "Exclusive Access",
                              }),
                              (0, t.jsx)("h2", {
                                style: {
                                  fontSize: 22,
                                  color: "#f0e8d0",
                                  marginBottom: 12,
                                },
                                children: "Members-Only Drops",
                              }),
                              (0, t.jsx)("p", {
                                style: {
                                  fontSize: 14,
                                  color: "#5a5040",
                                  marginBottom: 32,
                                  maxWidth: 480,
                                  margin: "0 auto 32px",
                                },
                                children:
                                  "As a 2026 Reserve member, you have exclusive access to limited-edition products not available to the general public.",
                              }),
                              (0, t.jsx)(i.default, {
                                href: "/shop",
                                style: {
                                  display: "inline-block",
                                  background: y,
                                  color: "#0a0a0a",
                                  padding: "14px 40px",
                                  fontSize: 12,
                                  letterSpacing: 3,
                                  textTransform: "uppercase",
                                  fontWeight: "bold",
                                  borderRadius: 2,
                                },
                                children: "Browse Exclusive Shop",
                              }),
                            ],
                          }),
                        ],
                      }),
                    "messages" === c &&
                      (0, t.jsxs)("div", {
                        children: [
                          (0, t.jsx)("h2", {
                            style: {
                              fontSize: 13,
                              letterSpacing: 4,
                              color: "#7a6850",
                              textTransform: "uppercase",
                              marginBottom: 24,
                            },
                            children: "Messages from Support",
                          }),
                          0 === x.length
                            ? (0, t.jsxs)("div", {
                                style: {
                                  background: "#111",
                                  border: "1px solid #1a1a1a",
                                  padding: "40px",
                                  textAlign: "center",
                                  color: "#3a3020",
                                },
                                children: [
                                  "No messages yet. Need help?",
                                  " ",
                                  (0, t.jsx)("a", {
                                    href: "/support",
                                    style: { color: y },
                                    children: "Contact Support",
                                  }),
                                ],
                              })
                            : (0, t.jsx)("div", {
                                style: {
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: 2,
                                },
                                children: x.map((e) =>
                                  (0, t.jsxs)(
                                    "div",
                                    {
                                      style: {
                                        background: "#111",
                                        border: "1px solid #1a1a1a",
                                        padding: "20px 24px",
                                        borderLeft: e.read
                                          ? "3px solid transparent"
                                          : `3px solid ${y}`,
                                      },
                                      onClick: async () => {
                                        e.read ||
                                          (await g
                                            .from("support_messages")
                                            .update({ read: !0 })
                                            .eq("id", e.id),
                                          m((t) =>
                                            t.map((t) =>
                                              t.id === e.id
                                                ? { ...t, read: !0 }
                                                : t,
                                            ),
                                          ));
                                      },
                                      children: [
                                        (0, t.jsxs)("div", {
                                          style: {
                                            display: "flex",
                                            justifyContent: "space-between",
                                            marginBottom: 6,
                                          },
                                          children: [
                                            (0, t.jsxs)("span", {
                                              style: {
                                                fontSize: 14,
                                                fontWeight: e.read ? 400 : 700,
                                                color: e.read ? "#c0b080" : y,
                                              },
                                              children: [
                                                "📤 You — ",
                                                e.subject,
                                              ],
                                            }),
                                            (0, t.jsx)("span", {
                                              style: {
                                                fontSize: 11,
                                                color: "#3a3020",
                                              },
                                              children: new Date(
                                                e.created_at,
                                              ).toLocaleDateString(),
                                            }),
                                          ],
                                        }),
                                        (0, t.jsx)("p", {
                                          style: {
                                            fontSize: 13,
                                            color: "#5a5040",
                                            lineHeight: 1.7,
                                            margin: "0 0 8px",
                                            whiteSpace: "pre-wrap",
                                          },
                                          children: e.body,
                                        }),
                                        e.attachment &&
                                          (0, t.jsxs)("p", {
                                            style: {
                                              fontSize: 11,
                                              color: "#3a3020",
                                            },
                                            children: ["📎 ", e.attachment],
                                          }),
                                        e.replies.map((e) =>
                                          (0, t.jsxs)(
                                            "div",
                                            {
                                              style: {
                                                marginTop: 12,
                                                paddingTop: 12,
                                                borderTop: "1px solid #1a1a1a",
                                              },
                                              children: [
                                                (0, t.jsxs)("div", {
                                                  style: {
                                                    display: "flex",
                                                    justifyContent:
                                                      "space-between",
                                                    marginBottom: 6,
                                                  },
                                                  children: [
                                                    (0, t.jsx)("span", {
                                                      style: {
                                                        fontSize: 13,
                                                        color: y,
                                                      },
                                                      children:
                                                        "🏷 Support Team",
                                                    }),
                                                    (0, t.jsx)("span", {
                                                      style: {
                                                        fontSize: 11,
                                                        color: "#3a3020",
                                                      },
                                                      children: new Date(
                                                        e.created_at,
                                                      ).toLocaleDateString(),
                                                    }),
                                                  ],
                                                }),
                                                (0, t.jsx)("p", {
                                                  style: {
                                                    fontSize: 13,
                                                    color: "#5a5040",
                                                    lineHeight: 1.7,
                                                    margin: "0 0 8px",
                                                    whiteSpace: "pre-wrap",
                                                  },
                                                  children: e.body,
                                                }),
                                                e.attachment &&
                                                  (0, t.jsxs)("p", {
                                                    style: {
                                                      fontSize: 11,
                                                      color: "#3a3020",
                                                    },
                                                    children: [
                                                      "📎 ",
                                                      e.attachment,
                                                    ],
                                                  }),
                                              ],
                                            },
                                            e.id,
                                          ),
                                        ),
                                      ],
                                    },
                                    e.id,
                                  ),
                                ),
                              }),
                          (0, t.jsx)("div", {
                            style: { marginTop: 24 },
                            children: (0, t.jsx)("a", {
                              href: "/support",
                              style: {
                                display: "inline-block",
                                border: `1px solid ${y}`,
                                color: y,
                                padding: "12px 28px",
                                fontSize: 11,
                                letterSpacing: 3,
                                textTransform: "uppercase",
                                textDecoration: "none",
                                borderRadius: 2,
                              },
                              children: "Send New Message",
                            }),
                          }),
                        ],
                      }),
                  ],
                }),
              });
    },
  ]);
};
