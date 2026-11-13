export default (e) => {
  "use strict";
  var a = e.i(40450),
    i = e.i(13742),
    o = e.i(30037),
    t = e.i(6028),
    r = e.i(20755);
  e.s([
    "default",
    0,
    function () {
      let e = (0, o.useRouter)(),
        [n, s] = (0, i.useState)({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirm: "",
        }),
        [l, d] = (0, i.useState)(null),
        [c, p] = (0, i.useState)(!1),
        u = async () => {
          if (!n.firstName || !n.email || !n.password)
            return void d("Please fill in all required fields.");
          if (n.password.length < 8)
            return void d("Password must be at least 8 characters.");
          if (n.password !== n.confirm)
            return void d("Passwords do not match.");
          (p(!0), d(null));
          let a = (0, r.getSupabaseBrowserClient)(),
            { data: i, error: o } = await a.auth.signUp({
              email: n.email.toLowerCase().trim(),
              password: n.password,
              options: {
                data: { first_name: n.firstName, last_name: n.lastName },
              },
            });
          if (o) {
            (d(`Account error: ${o.message}`), p(!1));
            return;
          }
          if (!i?.user) {
            (d(
              "DEBUG: signUp() returned no error but also no user object. Something is misconfigured.",
            ),
              p(!1));
            return;
          }
          (d(`Demo account created. Opening the demo sign-in page...`),
            p(!1),
            setTimeout(() => {
              e.push("/login?status=pending_signup");
            }, 3e3));
        };
      return (0, a.jsx)("div", {
        style: {
          minHeight: "100vh",
          background: "#0a0a0a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 24px",
        },
        children: (0, a.jsxs)("div", {
          style: { width: "100%", maxWidth: 460 },
          children: [
            (0, a.jsxs)("div", {
              style: { textAlign: "center", marginBottom: 48 },
              children: [
                (0, a.jsx)("p", {
                  style: {
                    fontSize: 10,
                    letterSpacing: 6,
                    color: "#5a5040",
                    textTransform: "uppercase",
                    marginBottom: 16,
                    fontFamily: "Georgia,serif",
                  },
                  children: "Club Wallen",
                }),
                (0, a.jsx)("h1", {
                  style: {
                    fontSize: 36,
                    color: "#c8a84b",
                    fontFamily: "Georgia,serif",
                  },
                  children: "Create Account",
                }),
                (0, a.jsx)("div", {
                  style: {
                    width: 40,
                    height: 1,
                    background: "#c8a84b",
                    margin: "20px auto 0",
                  },
                }),
              ],
            }),
            (0, a.jsxs)("div", {
              style: {
                background: "#111",
                border: "1px solid #1a1a1a",
                padding: "40px 36px",
                borderRadius: 2,
              },
              children: [
                (0, a.jsxs)("div", {
                  style: {
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                    marginBottom: 0,
                  },
                  children: [
                    (0, a.jsxs)("div", {
                      children: [
                        (0, a.jsx)("label", {
                          style: {
                            fontSize: 11,
                            letterSpacing: 2,
                            color: "#5a5040",
                            display: "block",
                            marginBottom: 8,
                          },
                          children: "First Name *",
                        }),
                        (0, a.jsx)("input", {
                          value: n.firstName,
                          onChange: (e) =>
                            s((a) => ({ ...a, firstName: e.target.value })),
                          placeholder: "Morgan",
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
                            marginBottom: 16,
                          },
                        }),
                      ],
                    }),
                    (0, a.jsxs)("div", {
                      children: [
                        (0, a.jsx)("label", {
                          style: {
                            fontSize: 11,
                            letterSpacing: 2,
                            color: "#5a5040",
                            display: "block",
                            marginBottom: 8,
                          },
                          children: "Last Name",
                        }),
                        (0, a.jsx)("input", {
                          value: n.lastName,
                          onChange: (e) =>
                            s((a) => ({ ...a, lastName: e.target.value })),
                          placeholder: "Wallen",
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
                            marginBottom: 16,
                          },
                        }),
                      ],
                    }),
                  ],
                }),
                (0, a.jsxs)("div", {
                  style: { marginBottom: 16 },
                  children: [
                    (0, a.jsx)("label", {
                      style: {
                        fontSize: 11,
                        letterSpacing: 2,
                        color: "#5a5040",
                        display: "block",
                        marginBottom: 8,
                      },
                      children: "Email Address *",
                    }),
                    (0, a.jsx)("input", {
                      type: "email",
                      value: n.email,
                      onChange: (e) =>
                        s((a) => ({ ...a, email: e.target.value })),
                      placeholder: "you@example.com",
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
                }),
                (0, a.jsxs)("div", {
                  style: { marginBottom: 16 },
                  children: [
                    (0, a.jsx)("label", {
                      style: {
                        fontSize: 11,
                        letterSpacing: 2,
                        color: "#5a5040",
                        display: "block",
                        marginBottom: 8,
                      },
                      children: "Password *",
                    }),
                    (0, a.jsx)("input", {
                      type: "password",
                      value: n.password,
                      onChange: (e) =>
                        s((a) => ({ ...a, password: e.target.value })),
                      placeholder: "Min 8 characters",
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
                }),
                (0, a.jsxs)("div", {
                  style: { marginBottom: 16 },
                  children: [
                    (0, a.jsx)("label", {
                      style: {
                        fontSize: 11,
                        letterSpacing: 2,
                        color: "#5a5040",
                        display: "block",
                        marginBottom: 8,
                      },
                      children: "Confirm Password *",
                    }),
                    (0, a.jsx)("input", {
                      type: "password",
                      value: n.confirm,
                      onChange: (e) =>
                        s((a) => ({ ...a, confirm: e.target.value })),
                      placeholder: "Repeat your password",
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
                }),
                l &&
                  (0, a.jsx)("p", {
                    style: { fontSize: 13, color: "#b91c1c", marginBottom: 16 },
                    children: l,
                  }),
                (0, a.jsx)("button", {
                  type: "button",
                  onClick: u,
                  disabled: c,
                  style: {
                    width: "100%",
                    background: "#c8a84b",
                    color: "#0a0a0a",
                    padding: "15px",
                    fontSize: 12,
                    letterSpacing: 3,
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    border: "none",
                    borderRadius: 2,
                    marginTop: 8,
                    cursor: c ? "not-allowed" : "pointer",
                    opacity: c ? 0.7 : 1,
                    fontFamily: "Georgia,serif",
                  },
                  children: c ? "Creating Account..." : "Create Account",
                }),
                (0, a.jsxs)("p", {
                  style: {
                    fontSize: 13,
                    color: "#3a3020",
                    textAlign: "center",
                    marginTop: 20,
                  },
                  children: [
                    "Already have an account?",
                    " ",
                    (0, a.jsx)(t.default, {
                      href: "/login",
                      style: { color: "#c8a84b" },
                      children: "Log In",
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
