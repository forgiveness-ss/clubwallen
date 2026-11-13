export default (e) => {
  "use strict";
  var t = e.i(40450),
    i = e.i(13742),
    a = e.i(30037),
    r = e.i(6028),
    o = e.i(20755);
  function s() {
    let e = (0, a.useRouter)(),
      s = (0, a.useSearchParams)(),
      [n, l] = (0, i.useState)({ email: "", password: "" }),
      [d, c] = (0, i.useState)(null),
      [p, u] = (0, i.useState)(null),
      [g, m] = (0, i.useState)(!1);
    (0, i.useEffect)(() => {
      ("pending_signup" === s.get("status") &&
        u(
          "Demo account created. Use the demo sign-in details shown above; no confirmation email is sent.",
        ),
        "approved" === s.get("status") &&
          u("Your account has been approved! Please sign in below."));
    }, []);
    let h = async () => {
        if (!n.email || !n.password)
          return void c("Please enter your email and password.");
        (m(!0), c(null));
        let t = (0, o.getSupabaseBrowserClient)(),
          { data: i, error: a } = await t.auth.signInWithPassword({
            email: n.email.toLowerCase().trim(),
            password: n.password,
          });
        if (a) {
          (c("Incorrect email or password."), m(!1));
          return;
        }
        let { data: r } = await t
          .from("accounts")
          .select("status")
          .eq("auth_user_id", i.user.id)
          .single();
        if (r?.status === "rejected") {
          (c(
            "Your membership application was not approved. Please contact support@clubwallen.site for more information.",
          ),
            await t.auth.signOut(),
            m(!1));
          return;
        }
        (m(!1), e.push("/dashboard"));
      },
      x = "#c8a84b";
    return (0, t.jsx)("div", {
      style: {
        minHeight: "100vh",
        background: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px",
      },
      children: (0, t.jsxs)("div", {
        style: { width: "100%", maxWidth: 420 },
        children: [
          (0, t.jsxs)("div", {
            style: { textAlign: "center", marginBottom: 48 },
            children: [
              (0, t.jsx)("p", {
                style: {
                  fontSize: 10,
                  letterSpacing: 6,
                  color: "#5a5040",
                  textTransform: "uppercase",
                  marginBottom: 16,
                  fontFamily: "Georgia,serif",
                },
                children: "Members",
              }),
              (0, t.jsx)("h1", {
                style: { fontSize: 36, color: x, fontFamily: "Georgia,serif" },
                children: "Log In",
              }),
              (0, t.jsx)("div", {
                style: {
                  width: 40,
                  height: 1,
                  background: x,
                  margin: "20px auto 0",
                },
              }),
            ],
          }),
          p &&
            (0, t.jsx)("div", {
              style: {
                background: "#0d1a0d",
                border: "1px solid #2a5a2a",
                borderRadius: 8,
                padding: "16px 20px",
                marginBottom: 24,
              },
              children: (0, t.jsx)("p", {
                style: {
                  fontSize: 13,
                  color: "#c0e8c0",
                  margin: 0,
                  lineHeight: 1.7,
                },
                children: p,
              }),
            }),
          (0, t.jsxs)("div", {
            style: {
              background: "#111",
              border: "1px solid #1a1a1a",
              padding: "40px 36px",
              borderRadius: 2,
            },
            children: [
              (0, t.jsxs)("div", {
                style: { marginBottom: 20 },
                children: [
                  (0, t.jsx)("label", {
                    style: {
                      fontSize: 11,
                      letterSpacing: 2,
                      color: "#5a5040",
                      display: "block",
                      marginBottom: 8,
                    },
                    children: "Email Address",
                  }),
                  (0, t.jsx)("input", {
                    value: n.email,
                    onChange: (e) =>
                      l((t) => ({ ...t, email: e.target.value })),
                    type: "email",
                    placeholder: "you@example.com",
                    style: {
                      width: "100%",
                      background: "#1a1a1a",
                      border: "1px solid #2a2a2a",
                      color: "#f0e8d0",
                      borderRadius: 4,
                      padding: "14px 16px",
                      fontSize: 16,
                      outline: "none",
                      boxSizing: "border-box",
                    },
                  }),
                ],
              }),
              (0, t.jsxs)("div", {
                style: { marginBottom: 28 },
                children: [
                  (0, t.jsx)("label", {
                    style: {
                      fontSize: 11,
                      letterSpacing: 2,
                      color: "#5a5040",
                      display: "block",
                      marginBottom: 8,
                    },
                    children: "Password",
                  }),
                  (0, t.jsx)("input", {
                    value: n.password,
                    onChange: (e) =>
                      l((t) => ({ ...t, password: e.target.value })),
                    type: "password",
                    placeholder: "••••••••",
                    style: {
                      width: "100%",
                      background: "#1a1a1a",
                      border: "1px solid #2a2a2a",
                      color: "#f0e8d0",
                      borderRadius: 4,
                      padding: "14px 16px",
                      fontSize: 16,
                      outline: "none",
                      boxSizing: "border-box",
                    },
                  }),
                ],
              }),
              d &&
                (0, t.jsx)("p", {
                  style: {
                    fontSize: 13,
                    color: "#b91c1c",
                    marginBottom: 16,
                    lineHeight: 1.5,
                  },
                  children: d,
                }),
              (0, t.jsx)("button", {
                type: "button",
                onClick: h,
                disabled: g,
                style: {
                  width: "100%",
                  background: x,
                  color: "#0a0a0a",
                  padding: "15px",
                  fontSize: 12,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  border: "none",
                  borderRadius: 2,
                  cursor: g ? "not-allowed" : "pointer",
                  opacity: g ? 0.7 : 1,
                  fontFamily: "Georgia,serif",
                },
                children: g ? "Signing In..." : "Sign In",
              }),
              (0, t.jsxs)("div", {
                style: { textAlign: "center", marginTop: 20 },
                children: [
                  (0, t.jsxs)("p", {
                    style: { fontSize: 13, color: "#3a3020" },
                    children: [
                      "Not a member?",
                      " ",
                      (0, t.jsx)(r.default, {
                        href: "/join",
                        style: { color: x },
                        children: "Join The Reserve",
                      }),
                    ],
                  }),
                  (0, t.jsxs)("p", {
                    style: { fontSize: 13, color: "#2a2020", marginTop: 10 },
                    children: [
                      "New to Club Wallen?",
                      " ",
                      (0, t.jsx)(r.default, {
                        href: "/signup",
                        style: { color: "#6a5840" },
                        children: "Create an account",
                      }),
                    ],
                  }),
                ],
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
      return (0, t.jsx)(i.Suspense, { children: (0, t.jsx)(s, {}) });
    },
  ]);
};
