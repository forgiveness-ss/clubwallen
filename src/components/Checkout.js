export default (e) => {
  "use strict";
  var t = e.i(40450),
    a = e.i(13742),
    i = e.i(30037),
    s = e.i(20755);
  let n = { DMY: 0.8, MWM: 0.4, DAY1: 0.9 };
  function r() {
    let e = (0, i.useSearchParams)(),
      r = (0, i.useRouter)(),
      [o, l] = (0, a.useState)([]),
      [d, c] = (0, a.useState)({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "US",
      }),
      [p, u] = (0, a.useState)(null),
      [m, h] = (0, a.useState)(!1),
      [x, y] = (0, a.useState)(!1),
      [g, f] = (0, a.useState)(!1),
      [j, b] = (0, a.useState)(""),
      [S, v] = (0, a.useState)(null),
      [w, C] = (0, a.useState)(null),
      z = e.get("type"),
      B = e.get("name"),
      I = parseFloat(e.get("price") || "0"),
      T = e.get("size"),
      k = "membership" === z;
    ((0, a.useEffect)(() => {
      let e = () => f(window.innerWidth < 800);
      return (
        e(),
        window.addEventListener("resize", e),
        () => window.removeEventListener("resize", e)
      );
    }, []),
      (0, a.useEffect)(() => {
        z
          ? l([
              {
                id: z,
                name: B || "",
                price: I,
                size: T || void 0,
                quantity: 1,
              },
            ])
          : l(JSON.parse(localStorage.getItem("cw_cart") || "[]"));
      }, []));
    let N = (e) => {
        (l(e), z || localStorage.setItem("cw_cart", JSON.stringify(e)));
      },
      R = (e, t) => {
        N(
          o
            .map((a, i) => (i !== e ? a : { ...a, quantity: a.quantity + t }))
            .filter((e) => e.quantity > 0),
        );
      },
      P = o.reduce((e, t) => e + t.price * t.quantity, 0),
      F = k || P > 100 ? 0 : 9.99,
      A = () => {
        let e = j.trim().toUpperCase();
        k
          ? e
            ? e in n
              ? (v(e), C(null))
              : (v(null), C("Invalid promo code."))
            : C("Enter a code first.")
          : C("This code only applies to membership orders.");
      },
      $ = () => {
        (v(null), b(""), C(null));
      },
      O = S ? n[S] : 0,
      W = S && k ? P * O : 0,
      _ = P - W + F,
      M = () =>
        0 === o.length
          ? (u("Your cart is empty."), !1)
          : d.firstName && d.lastName && d.email && d.address && d.city && d.zip
            ? !d.password || d.password.length < 8
              ? (u("Password must be at least 8 characters."), !1)
              : d.password === d.confirmPassword ||
                (u("Passwords do not match."), !1)
            : (u("Please fill in all required fields."), !1),
      J = async () => {
        let e = (0, s.getSupabaseBrowserClient)(),
          { data: t, error: a } = await e.auth.signUp({
            email: d.email.toLowerCase().trim(),
            password: d.password,
            options: {
              data: { first_name: d.firstName, last_name: d.lastName },
            },
          });
        if (a)
          return (
            !!a.message.toLowerCase().includes("already registered") ||
            (u(a.message), !1)
          );
        try {
          await fetch("/api/notify-admin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "new_signup",
              data: {
                email: d.email,
                firstName: d.firstName,
                lastName: d.lastName,
              },
            }),
          });
        } catch {}
        return !0;
      },
      U = async () => {
        if (M()) {
          if ((h(!0), u(null), !(await J()))) return void h(!1);
          try {
            let e = `CW${Date.now()}`,
              t = await fetch("/api/nowpayments/create-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  amount: _,
                  orderDescription: k
                    ? `Club Wallen: The Reserve — 2026 Membership${S ? ` (Promo: ${S})` : ""}`
                    : `Club Wallen Shop — ${o.map((e) => e.name).join(", ")}`,
                  orderId: e,
                  orderType: k ? "membership" : "shop",
                  customerName: d.firstName,
                  promoCode: S || void 0,
                  discount: W || void 0,
                }),
              }),
              a = await t.json(),
              i = a.invoiceUrl || a.paymentUrl;
            if (!t.ok || !i) {
              (u(a.error || "Payment setup failed. Please try again."), h(!1));
              return;
            }
            (localStorage.removeItem("cw_cart"),
              localStorage.setItem("cw_pending_email", d.email),
              (window.location.href = i));
          } catch {
            (u("Something went wrong. Please try again."), h(!1));
          }
        }
      },
      D = async () => {
        if (!M()) return;
        if ((y(!0), u(null), !(await J()))) return void y(!1);
        let e = {
          items: o,
          total: _,
          subtotal: P,
          discount: W,
          promoCode: S || void 0,
          form: {
            firstName: d.firstName,
            lastName: d.lastName,
            email: d.email,
            address: d.address,
            city: d.city,
            state: d.state,
            zip: d.zip,
            country: d.country,
          },
          type: k ? "membership" : "shop",
          orderId: `CW_CA_${Date.now()}`,
        };
        (localStorage.setItem("cw_cashapp_order", JSON.stringify(e)),
          localStorage.removeItem("cw_cart"),
          setTimeout(() => {
            r.push("/checkout/cashapp");
          }, 400));
      },
      E = {
        width: "100%",
        background: "#1c1c1c",
        border: "1px solid #2e2e2e",
        color: "#f0e8d0",
        borderRadius: 4,
        padding: "14px 16px",
        fontSize: 16,
        outline: "none",
        boxSizing: "border-box",
        WebkitAppearance: "none",
        fontFamily: "Georgia, serif",
      },
      q = {
        fontSize: 11,
        letterSpacing: 2,
        color: "#5a5040",
        display: "block",
        marginBottom: 8,
        textTransform: "uppercase",
        fontFamily: "Georgia, serif",
      },
      Z = () =>
        (0, t.jsxs)("div", {
          style: {
            background: "#111",
            border: "1px solid #2a2010",
            padding: g ? "24px 20px" : "32px",
            borderRadius: 2,
          },
          children: [
            (0, t.jsx)("h3", {
              style: {
                fontSize: 11,
                letterSpacing: 3,
                color: "#7a6850",
                textTransform: "uppercase",
                marginBottom: 24,
              },
              children: "Order Summary",
            }),
            0 === o.length &&
              (0, t.jsx)("p", {
                style: { fontSize: 13, color: "#4a4030", marginBottom: 20 },
                children: "Your cart is empty.",
              }),
            o.map((e, a) =>
              (0, t.jsxs)(
                "div",
                {
                  style: {
                    borderBottom: "1px solid #1a1a1a",
                    paddingBottom: 16,
                    marginBottom: 16,
                  },
                  children: [
                    (0, t.jsxs)("div", {
                      style: {
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 12,
                        marginBottom: 6,
                      },
                      children: [
                        (0, t.jsx)("span", {
                          style: { fontSize: 14, color: "#c0b080", flex: 1 },
                          children: e.name,
                        }),
                        (0, t.jsxs)("span", {
                          style: {
                            fontSize: 14,
                            color: "#c8a84b",
                            whiteSpace: "nowrap",
                          },
                          children: ["$", (e.price * e.quantity).toFixed(2)],
                        }),
                      ],
                    }),
                    e.size &&
                      (0, t.jsxs)("p", {
                        style: {
                          fontSize: 11,
                          color: "#4a3c24",
                          letterSpacing: 1,
                          marginBottom: 10,
                        },
                        children: ["Size: ", e.size],
                      }),
                    !k &&
                      (0, t.jsxs)("div", {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: 8,
                        },
                        children: [
                          (0, t.jsxs)("div", {
                            style: { display: "flex", alignItems: "center" },
                            children: [
                              (0, t.jsx)("button", {
                                type: "button",
                                onClick: () => R(a, -1),
                                style: {
                                  width: 30,
                                  height: 30,
                                  background: "#1a1a1a",
                                  border: "1px solid #2a2a2a",
                                  color: "#c8a84b",
                                  fontSize: 16,
                                  cursor: "pointer",
                                  borderRadius: "3px 0 0 3px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                },
                                children: "−",
                              }),
                              (0, t.jsx)("span", {
                                style: {
                                  width: 36,
                                  height: 30,
                                  background: "#1a1a1a",
                                  borderTop: "1px solid #2a2a2a",
                                  borderBottom: "1px solid #2a2a2a",
                                  color: "#f0e8d0",
                                  fontSize: 13,
                                  fontWeight: "bold",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                },
                                children: e.quantity,
                              }),
                              (0, t.jsx)("button", {
                                type: "button",
                                onClick: () => R(a, 1),
                                style: {
                                  width: 30,
                                  height: 30,
                                  background: "#1a1a1a",
                                  border: "1px solid #2a2a2a",
                                  color: "#c8a84b",
                                  fontSize: 16,
                                  cursor: "pointer",
                                  borderRadius: "0 3px 3px 0",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                },
                                children: "+",
                              }),
                            ],
                          }),
                          (0, t.jsx)("button", {
                            type: "button",
                            onClick: () => N(o.filter((e, t) => t !== a)),
                            style: {
                              background: "none",
                              border: "none",
                              color: "#5a3020",
                              fontSize: 11,
                              letterSpacing: 1,
                              textTransform: "uppercase",
                              cursor: "pointer",
                              textDecoration: "underline",
                              padding: 0,
                            },
                            children: "Remove",
                          }),
                        ],
                      }),
                  ],
                },
                a,
              ),
            ),
            k &&
              o.length > 0 &&
              (0, t.jsxs)("div", {
                style: { marginBottom: 20 },
                children: [
                  (0, t.jsx)("label", { style: q, children: "Promo Code" }),
                  S
                    ? (0, t.jsxs)("div", {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          background: "#12200f",
                          border: "1px solid #234d1a",
                          borderRadius: 4,
                          padding: "10px 14px",
                        },
                        children: [
                          (0, t.jsxs)("span", {
                            style: { fontSize: 13, color: "#7ec97a" },
                            children: [
                              "“",
                              S,
                              "” applied — ",
                              Math.round(100 * O),
                              "% off",
                            ],
                          }),
                          (0, t.jsx)("button", {
                            type: "button",
                            onClick: $,
                            style: {
                              background: "none",
                              border: "none",
                              color: "#5a3020",
                              fontSize: 11,
                              letterSpacing: 1,
                              textTransform: "uppercase",
                              cursor: "pointer",
                              textDecoration: "underline",
                              padding: 0,
                            },
                            children: "Remove",
                          }),
                        ],
                      })
                    : (0, t.jsxs)("div", {
                        style: { display: "flex", gap: 8 },
                        children: [
                          (0, t.jsx)("input", {
                            value: j,
                            onChange: (e) => b(e.target.value),
                            onKeyDown: (e) => {
                              "Enter" === e.key && (e.preventDefault(), A());
                            },
                            placeholder: "Enter code",
                            style: { ...E, padding: "10px 14px", fontSize: 14 },
                          }),
                          (0, t.jsx)("button", {
                            type: "button",
                            onClick: A,
                            style: {
                              background: "#1a1a1a",
                              border: "1px solid #2a2a2a",
                              color: "#c8a84b",
                              fontSize: 11,
                              letterSpacing: 1,
                              textTransform: "uppercase",
                              padding: "0 18px",
                              borderRadius: 4,
                              cursor: "pointer",
                              whiteSpace: "nowrap",
                            },
                            children: "Apply",
                          }),
                        ],
                      }),
                  w &&
                    (0, t.jsx)("p", {
                      style: { fontSize: 12, color: "#b91c1c", marginTop: 8 },
                      children: w,
                    }),
                ],
              }),
            (0, t.jsxs)("div", {
              style: {
                marginBottom: 8,
                display: "flex",
                justifyContent: "space-between",
              },
              children: [
                (0, t.jsx)("span", {
                  style: { fontSize: 13, color: "#4a4030" },
                  children: "Subtotal",
                }),
                (0, t.jsxs)("span", {
                  style: { fontSize: 13, color: "#7a6850" },
                  children: ["$", P.toFixed(2)],
                }),
              ],
            }),
            W > 0 &&
              (0, t.jsxs)("div", {
                style: {
                  marginBottom: 8,
                  display: "flex",
                  justifyContent: "space-between",
                },
                children: [
                  (0, t.jsxs)("span", {
                    style: { fontSize: 13, color: "#7ec97a" },
                    children: ["Discount (", Math.round(100 * O), "%)"],
                  }),
                  (0, t.jsxs)("span", {
                    style: { fontSize: 13, color: "#7ec97a" },
                    children: ["−$", W.toFixed(2)],
                  }),
                ],
              }),
            (0, t.jsxs)("div", {
              style: {
                marginBottom: 16,
                display: "flex",
                justifyContent: "space-between",
              },
              children: [
                (0, t.jsx)("span", {
                  style: { fontSize: 13, color: "#4a4030" },
                  children: "Shipping",
                }),
                (0, t.jsx)("span", {
                  style: { fontSize: 13, color: "#7a6850" },
                  children: 0 === F ? "Included" : `$${F.toFixed(2)}`,
                }),
              ],
            }),
            (0, t.jsxs)("div", {
              style: {
                borderTop: "1px solid #1a1a1a",
                paddingTop: 16,
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 28,
              },
              children: [
                (0, t.jsx)("span", {
                  style: { fontSize: 16, color: "#f0e8d0" },
                  children: "Total",
                }),
                (0, t.jsxs)("span", {
                  style: { fontSize: 20, color: "#c8a84b" },
                  children: ["$", _.toFixed(2)],
                }),
              ],
            }),
            p &&
              (0, t.jsx)("p", {
                style: {
                  fontSize: 13,
                  color: "#b91c1c",
                  marginBottom: 16,
                  lineHeight: 1.5,
                },
                children: p,
              }),
            (0, t.jsxs)("button", {
              type: "button",
              onClick: U,
              disabled: m || x || 0 === o.length,
              style: {
                width: "100%",
                background: m ? "#6a5820" : "#c8a84b",
                color: "#0a0a0a",
                padding: "16px",
                fontSize: 12,
                letterSpacing: 3,
                textTransform: "uppercase",
                fontWeight: "bold",
                border: "none",
                borderRadius: 2,
                cursor: m || x || 0 === o.length ? "not-allowed" : "pointer",
                transition: "background 0.2s",
                marginBottom: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                opacity: x ? 0.5 : 1,
              },
              children: [
                (0, t.jsx)("span", { style: { fontSize: 16 }, children: "₿" }),
                m ? "Redirecting..." : `Pay $${_.toFixed(2)} with Bitcoin`,
              ],
            }),
            (0, t.jsxs)("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 10,
                margin: "4px 0 10px",
              },
              children: [
                (0, t.jsx)("div", {
                  style: { flex: 1, height: 1, background: "#2a2a2a" },
                }),
                (0, t.jsx)("span", {
                  style: { fontSize: 11, color: "#3a3020", letterSpacing: 2 },
                  children: "OR",
                }),
                (0, t.jsx)("div", {
                  style: { flex: 1, height: 1, background: "#2a2a2a" },
                }),
              ],
            }),
            (0, t.jsxs)("button", {
              type: "button",
              onClick: D,
              disabled: m || x || 0 === o.length,
              style: {
                width: "100%",
                background: x ? "#009933" : "#00D54B",
                color: "#000000",
                padding: "16px",
                fontSize: 12,
                letterSpacing: 3,
                textTransform: "uppercase",
                fontWeight: "bold",
                border: "none",
                borderRadius: 2,
                cursor: m || x || 0 === o.length ? "not-allowed" : "pointer",
                transition: "all 0.2s",
                marginBottom: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                opacity: m ? 0.5 : 1,
              },
              children: [
                (0, t.jsx)("span", {
                  style: { fontSize: 16, fontWeight: 900 },
                  children: "$",
                }),
                x ? "Redirecting..." : `Pay $${_.toFixed(2)} with Cash App`,
              ],
            }),
            (0, t.jsxs)("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 8,
                justifyContent: "center",
              },
              children: [
                (0, t.jsx)("span", {
                  style: { fontSize: 14, color: "#4a4030" },
                  children: "₿",
                }),
                (0, t.jsx)("p", {
                  style: { fontSize: 11, color: "#3a3020" },
                  children: "Bitcoin · Cash App · Secure checkout",
                }),
              ],
            }),
          ],
        });
    return (0, t.jsx)("div", {
      style: {
        minHeight: "100vh",
        background: "#0a0a0a",
        padding: g ? "40px 16px 80px" : "60px 24px 100px",
      },
      children: (0, t.jsxs)("div", {
        style: { maxWidth: 1e3, margin: "0 auto" },
        children: [
          (0, t.jsxs)("div", {
            style: { textAlign: "center", marginBottom: 40 },
            children: [
              (0, t.jsx)("p", {
                style: {
                  fontSize: 10,
                  letterSpacing: 6,
                  color: "#5a5040",
                  textTransform: "uppercase",
                  marginBottom: 12,
                },
                children: "Secure Checkout",
              }),
              (0, t.jsx)("h1", {
                style: {
                  fontSize: 32,
                  color: "#c8a84b",
                  fontFamily: "Georgia, serif",
                },
                children: "Club Wallen",
              }),
            ],
          }),
          g &&
            (0, t.jsx)("div", {
              style: { marginBottom: 24 },
              children: (0, t.jsx)(Z, {}),
            }),
          (0, t.jsxs)("div", {
            style: {
              display: g ? "block" : "grid",
              gridTemplateColumns: "1fr 380px",
              gap: 32,
              alignItems: "start",
            },
            children: [
              (0, t.jsxs)("div", {
                children: [
                  (0, t.jsxs)("div", {
                    style: {
                      background: "#111",
                      border: "1px solid #1a1a1a",
                      padding: g ? "24px 20px" : "32px",
                      marginBottom: 16,
                      borderRadius: 2,
                    },
                    children: [
                      (0, t.jsx)("h3", {
                        style: {
                          fontSize: 11,
                          letterSpacing: 3,
                          color: "#7a6850",
                          textTransform: "uppercase",
                          marginBottom: 24,
                          fontFamily: "Georgia, serif",
                        },
                        children: "Contact Information",
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
                            children: [
                              (0, t.jsx)("label", {
                                style: q,
                                children: "First Name *",
                              }),
                              (0, t.jsx)("input", {
                                value: d.firstName,
                                onChange: (e) =>
                                  c((t) => ({
                                    ...t,
                                    firstName: e.target.value,
                                  })),
                                placeholder: "First name",
                                style: E,
                              }),
                            ],
                          }),
                          (0, t.jsxs)("div", {
                            children: [
                              (0, t.jsx)("label", {
                                style: q,
                                children: "Last Name *",
                              }),
                              (0, t.jsx)("input", {
                                value: d.lastName,
                                onChange: (e) =>
                                  c((t) => ({
                                    ...t,
                                    lastName: e.target.value,
                                  })),
                                placeholder: "Last name",
                                style: E,
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, t.jsxs)("div", {
                        children: [
                          (0, t.jsx)("label", {
                            style: q,
                            children: "Email Address *",
                          }),
                          (0, t.jsx)("input", {
                            value: d.email,
                            onChange: (e) =>
                              c((t) => ({ ...t, email: e.target.value })),
                            placeholder: "your@email.com",
                            type: "email",
                            style: E,
                          }),
                        ],
                      }),
                      (0, t.jsxs)("div", {
                        style: {
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: 12,
                          marginTop: 16,
                        },
                        children: [
                          (0, t.jsxs)("div", {
                            children: [
                              (0, t.jsx)("label", {
                                style: q,
                                children: "Password *",
                              }),
                              (0, t.jsx)("input", {
                                value: d.password,
                                onChange: (e) =>
                                  c((t) => ({
                                    ...t,
                                    password: e.target.value,
                                  })),
                                placeholder: "Min 8 characters",
                                type: "password",
                                style: E,
                              }),
                            ],
                          }),
                          (0, t.jsxs)("div", {
                            children: [
                              (0, t.jsx)("label", {
                                style: q,
                                children: "Confirm Password *",
                              }),
                              (0, t.jsx)("input", {
                                value: d.confirmPassword,
                                onChange: (e) =>
                                  c((t) => ({
                                    ...t,
                                    confirmPassword: e.target.value,
                                  })),
                                placeholder: "Repeat password",
                                type: "password",
                                style: E,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, t.jsxs)("div", {
                    style: {
                      background: "#111",
                      border: "1px solid #1a1a1a",
                      padding: g ? "24px 20px" : "32px",
                      borderRadius: 2,
                      marginBottom: 24 * !!g,
                    },
                    children: [
                      (0, t.jsx)("h3", {
                        style: {
                          fontSize: 11,
                          letterSpacing: 3,
                          color: "#7a6850",
                          textTransform: "uppercase",
                          marginBottom: 24,
                          fontFamily: "Georgia, serif",
                        },
                        children: "Shipping Address",
                      }),
                      (0, t.jsxs)("div", {
                        style: { marginBottom: 16 },
                        children: [
                          (0, t.jsx)("label", {
                            style: q,
                            children: "Street Address *",
                          }),
                          (0, t.jsx)("input", {
                            value: d.address,
                            onChange: (e) =>
                              c((t) => ({ ...t, address: e.target.value })),
                            placeholder: "123 Main Street",
                            style: E,
                          }),
                        ],
                      }),
                      (0, t.jsxs)("div", {
                        style: {
                          display: "grid",
                          gridTemplateColumns: "2fr 1fr 1fr",
                          gap: 12,
                          marginBottom: 16,
                        },
                        children: [
                          (0, t.jsxs)("div", {
                            children: [
                              (0, t.jsx)("label", {
                                style: q,
                                children: "City *",
                              }),
                              (0, t.jsx)("input", {
                                value: d.city,
                                onChange: (e) =>
                                  c((t) => ({ ...t, city: e.target.value })),
                                placeholder: "Nashville",
                                style: E,
                              }),
                            ],
                          }),
                          (0, t.jsxs)("div", {
                            children: [
                              (0, t.jsx)("label", {
                                style: q,
                                children: "State",
                              }),
                              (0, t.jsx)("input", {
                                value: d.state,
                                onChange: (e) =>
                                  c((t) => ({ ...t, state: e.target.value })),
                                placeholder: "TN",
                                style: E,
                              }),
                            ],
                          }),
                          (0, t.jsxs)("div", {
                            children: [
                              (0, t.jsx)("label", {
                                style: q,
                                children: "ZIP *",
                              }),
                              (0, t.jsx)("input", {
                                value: d.zip,
                                onChange: (e) =>
                                  c((t) => ({ ...t, zip: e.target.value })),
                                placeholder: "37201",
                                style: E,
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, t.jsxs)("div", {
                        children: [
                          (0, t.jsx)("label", {
                            style: q,
                            children: "Country",
                          }),
                          (0, t.jsxs)("select", {
                            value: d.country,
                            onChange: (e) =>
                              c((t) => ({ ...t, country: e.target.value })),
                            style: { ...E, cursor: "pointer" },
                            children: [
                              (0, t.jsx)("option", {
                                value: "US",
                                children: "United States",
                              }),
                              (0, t.jsx)("option", {
                                value: "CA",
                                children: "Canada",
                              }),
                              (0, t.jsx)("option", {
                                value: "GB",
                                children: "United Kingdom",
                              }),
                              (0, t.jsx)("option", {
                                value: "AU",
                                children: "Australia",
                              }),
                              (0, t.jsx)("option", {
                                value: "NZ",
                                children: "New Zealand",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              !g &&
                (0, t.jsx)("div", {
                  style: { position: "sticky", top: 90 },
                  children: (0, t.jsx)(Z, {}),
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
      return (0, t.jsx)(a.Suspense, { children: (0, t.jsx)(r, {}) });
    },
  ]);
};
