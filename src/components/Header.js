export default (e) => {
  "use strict";
  var t = e.i(40450),
    r = e.i(13742),
    n = e.i(6028),
    o = e.i(30037);
  e.s([
    "default",
    0,
    function () {
      let [e, i] = (0, r.useState)(!1),
        [a, l] = (0, r.useState)(!1),
        [s, u] = (0, r.useState)(!1),
        [c, f] = (0, r.useState)(0),
        d = (0, o.usePathname)();
      ((0, r.useEffect)(() => {
        let e = () => l(window.scrollY > 50);
        window.addEventListener("scroll", e, { passive: !0 });
        try {
          u("true" === localStorage.getItem("cw_loggedIn"));
          let e = JSON.parse(localStorage.getItem("cw_cart") || "[]");
          f(e.reduce((e, t) => e + t.quantity, 0));
        } catch {}
        return () => window.removeEventListener("scroll", e);
      }, [d]),
        (0, r.useEffect)(() => {
          let e = (e) => {
            "Escape" === e.key && i(!1);
          };
          return (
            document.addEventListener("keydown", e),
            () => document.removeEventListener("keydown", e)
          );
        }, []),
        (0, r.useEffect)(
          () => (
            (document.body.style.overflow = e ? "hidden" : ""),
            () => {
              document.body.style.overflow = "";
            }
          ),
          [e],
        ));
      let p = [
          { href: "/shop", label: "Shop" },
          { href: "/tickets", label: "MW Tickets" },
          { label: "Sand In My Boots", href: "/sand-in-my-boots" },
          { href: "/#how-it-works", label: "How It Works" },
          { href: "/support", label: "Support" },
          { href: "/faq", label: "FAQ" },
          { href: "/donate", label: "Foundation" },
          {
            href: s ? "/dashboard" : "/login",
            label: s ? "My Account" : "Log In",
          },
          { href: "/#pricing", label: "Choose Your Level" },
        ],
        h = ({ w: e }) =>
          (0, t.jsx)("span", {
            style: {
              display: "block",
              width: e,
              height: 1.5,
              background: "#c8a84b",
              borderRadius: 4,
              transition: "width 0.3s ease",
            },
          });
      return (0, t.jsxs)(t.Fragment, {
        children: [
          (0, t.jsxs)("header", {
            style: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              height: 66,
              zIndex: 500,
              background: a ? "rgba(5,4,1,0.97)" : "transparent",
              backdropFilter: a ? "blur(28px)" : "none",
              borderBottom: a ? "1px solid rgba(200,168,75,0.1)" : "none",
              transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 20px",
            },
            children: [
              (0, t.jsxs)("button", {
                type: "button",
                onClick: () => i(!0),
                "aria-label": "Open menu",
                style: {
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "10px 6px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                },
                children: [
                  (0, t.jsx)(h, { w: 26 }),
                  (0, t.jsx)(h, { w: 18 }),
                  (0, t.jsx)(h, { w: 26 }),
                ],
              }),
              (0, t.jsxs)(n.default, {
                href: "/",
                style: {
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  textAlign: "center",
                  textDecoration: "none",
                  lineHeight: 1.1,
                },
                children: [
                  (0, t.jsx)("span", {
                    style: {
                      fontSize: 8,
                      letterSpacing: 5,
                      color: "#4a3c20",
                      display: "block",
                      textTransform: "uppercase",
                      fontFamily: "Georgia,serif",
                    },
                    children: "Club Wallen",
                  }),
                  (0, t.jsx)("span", {
                    style: {
                      fontSize: 14,
                      color: "#c8a84b",
                      letterSpacing: 4,
                      fontFamily: "Georgia,serif",
                      fontWeight: "bold",
                    },
                    children: "THE RESERVE",
                  }),
                ],
              }),
              (0, t.jsxs)("div", {
                style: { display: "flex", alignItems: "center", gap: 14 },
                children: [
                  (0, t.jsxs)(n.default, {
                    href: "/checkout",
                    style: {
                      position: "relative",
                      color: "#6a5a3a",
                      display: "flex",
                      alignItems: "center",
                    },
                    children: [
                      (0, t.jsxs)("svg", {
                        width: "20",
                        height: "20",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "1.5",
                        children: [
                          (0, t.jsx)("path", {
                            d: "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z",
                          }),
                          (0, t.jsx)("line", {
                            x1: "3",
                            y1: "6",
                            x2: "21",
                            y2: "6",
                          }),
                          (0, t.jsx)("path", { d: "M16 10a4 4 0 01-8 0" }),
                        ],
                      }),
                      c > 0 &&
                        (0, t.jsx)("span", {
                          style: {
                            position: "absolute",
                            top: -5,
                            right: -5,
                            background: "#c8a84b",
                            color: "#000",
                            borderRadius: "50%",
                            width: 15,
                            height: 15,
                            fontSize: 8,
                            fontWeight: 900,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          },
                          children: c,
                        }),
                    ],
                  }),
                  (0, t.jsx)(n.default, {
                    href: "/join",
                    className: "btn-cinematic",
                    style: {
                      background: "#c8a84b",
                      color: "#0a0a0a",
                      padding: "7px 16px",
                      fontSize: 9,
                      letterSpacing: 3,
                      textTransform: "uppercase",
                      fontWeight: 900,
                      borderRadius: 2,
                      fontFamily: "Georgia,serif",
                      display: "inline-block",
                    },
                    children: "Join",
                  }),
                ],
              }),
            ],
          }),
          (0, t.jsxs)("div", {
            style: {
              position: "fixed",
              inset: 0,
              zIndex: 1e3,
              background: "rgba(3,2,1,0.99)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              opacity: +!!e,
              pointerEvents: e ? "all" : "none",
              transition: "opacity 0.45s ease",
            },
            children: [
              (0, t.jsx)("div", {
                style: {
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  opacity: 0.03,
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
                },
              }),
              (0, t.jsx)("button", {
                type: "button",
                onClick: () => i(!1),
                style: {
                  position: "absolute",
                  top: 20,
                  right: 20,
                  background: "none",
                  border: "1px solid rgba(200,168,75,0.2)",
                  color: "#c8a84b",
                  fontSize: 16,
                  cursor: "pointer",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                },
                children: "✕",
              }),
              (0, t.jsxs)("div", {
                style: {
                  textAlign: "center",
                  marginBottom: 52,
                  opacity: +!!e,
                  transition: "opacity 0.6s 0.1s ease",
                },
                children: [
                  (0, t.jsx)("p", {
                    style: {
                      fontSize: 9,
                      letterSpacing: 8,
                      color: "#3a2e18",
                      fontFamily: "Georgia,serif",
                      marginBottom: 8,
                    },
                    children: "CLUB WALLEN",
                  }),
                  (0, t.jsx)("p", {
                    style: {
                      fontSize: 20,
                      color: "#c8a84b",
                      letterSpacing: 6,
                      fontFamily: "Georgia,serif",
                    },
                    children: "THE RESERVE",
                  }),
                  (0, t.jsx)("div", {
                    style: {
                      width: 28,
                      height: 1,
                      background: "#2a2010",
                      margin: "14px auto 0",
                    },
                  }),
                ],
              }),
              (0, t.jsx)("nav", {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                },
                children: p.map((r, o) =>
                  (0, t.jsx)(
                    n.default,
                    {
                      href: r.href,
                      onClick: () => i(!1),
                      style: {
                        fontSize: "clamp(22px, 5vw, 42px)",
                        color: o === p.length - 1 ? "#c8a84b" : "#d8ccb0",
                        fontFamily: "Georgia,serif",
                        padding: "10px 40px",
                        textAlign: "center",
                        display: "block",
                        opacity: +!!e,
                        transform: e ? "translateY(0)" : "translateY(20px)",
                        transition: `opacity 0.5s ${0.12 + 0.07 * o}s ease, transform 0.5s ${0.12 + 0.07 * o}s ease, color 0.2s`,
                        letterSpacing: o === p.length - 1 ? 1 : 0.5,
                        borderBottom:
                          o === p.length - 2 ? "1px solid #1a1508" : "none",
                        paddingBottom: o === p.length - 2 ? 20 : 10,
                        marginBottom: 8 * (o === p.length - 2),
                      },
                      onMouseEnter: (e) =>
                        (e.currentTarget.style.color = "#c8a84b"),
                      onMouseLeave: (e) =>
                        (e.currentTarget.style.color =
                          o === p.length - 1 ? "#c8a84b" : "#d8ccb0"),
                      children: r.label,
                    },
                    r.href,
                  ),
                ),
              }),
              (0, t.jsx)("p", {
                style: {
                  position: "absolute",
                  bottom: 28,
                  fontSize: 9,
                  color: "#2a2010",
                  letterSpacing: 4,
                  opacity: +!!e,
                  transition: "opacity 0.5s 0.6s",
                },
                children: "© 2026 CLUB WALLEN: THE RESERVE",
              }),
            ],
          }),
        ],
      });
    },
  ]);
};
