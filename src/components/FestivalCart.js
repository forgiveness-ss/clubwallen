export default (e) => {
  "use strict";
  var t = e.i(40450),
    a = e.i(13742),
    i = e.i(6028),
    o = e.i(55411);
  let n = { MOWA1: 0.5 },
    s = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    r = (e) => Math.round(100 * e) / 100,
    l = "sib-cart-v1",
    d = { items: [], promo: null, ready: !1 },
    c = d,
    h = !1,
    u = new Set();
  function p(e) {
    c = e;
    try {
      window.localStorage.setItem(
        l,
        JSON.stringify({ items: c.items, promo: c.promo }),
      );
    } catch {}
    u.forEach((e) => e());
  }
  function m() {
    try {
      let e = window.localStorage.getItem(l);
      if (!e) return null;
      let t = JSON.parse(e),
        a = Array.isArray(t.items)
          ? t.items.filter(
              (e) =>
                e &&
                "string" == typeof e.id &&
                "number" == typeof e.unitPrice &&
                e.qty > 0,
            )
          : [],
        i = "string" == typeof t.promo && null != n[t.promo] ? t.promo : null;
      return { items: a, promo: i };
    } catch {
      return null;
    }
  }
  function y(e) {
    return (
      u.add(e),
      !(function () {
        if (h) return;
        h = !0;
        let e = m();
        ((c = { ...c, ...(e ?? {}), ready: !0 }),
          window.addEventListener("storage", (e) => {
            e.key === l &&
              ((c = {
                ...c,
                ...(m() ?? { items: [], promo: null }),
                ready: !0,
              }),
              u.forEach((e) => e()));
          }),
          u.forEach((e) => e()));
      })(),
      () => {
        u.delete(e);
      }
    );
  }
  let f = () => c,
    g = () => d;
  function b(e) {
    let t = Math.max(1, Math.floor(e.qty ?? 1)),
      a = c.items.some((t) => t.id === e.id);
    p({
      ...c,
      items: a
        ? c.items.map((a) => (a.id === e.id ? { ...a, qty: a.qty + t } : a))
        : [...c.items, { ...e, qty: t }],
    });
  }
  function v(e) {
    p({ ...c, items: c.items.filter((t) => t.id !== e) });
  }
  function x(e, t) {
    if (t <= 0) return v(e);
    p({
      ...c,
      items: c.items.map((a) =>
        a.id === e ? { ...a, qty: Math.floor(t) } : a,
      ),
    });
  }
  function w() {
    p({ ...c, items: [], promo: null });
  }
  function S(e) {
    let t = e.trim().toUpperCase();
    return null != n[t] && (p({ ...c, promo: t }), !0);
  }
  function T() {
    p({ ...c, promo: null });
  }
  function k() {
    window.dispatchEvent(new Event("sib-open-cart"));
  }
  function A() {
    let e = (0, a.useSyncExternalStore)(y, f, g),
      t = e.items.reduce((e, t) => e + t.qty, 0),
      i = r(e.items.reduce((e, t) => e + t.unitPrice * t.qty, 0)),
      o = e.promo ? (n[e.promo] ?? 0) : 0,
      s = r(i * o),
      l = { subtotal: i, rate: o, discount: s, total: r(Math.max(0, i - s)) };
    return {
      items: e.items,
      promo: e.promo,
      ready: e.ready,
      count: t,
      totals: l,
      addItem: b,
      removeItem: v,
      setQty: x,
      clear: w,
      applyPromo: S,
      removePromo: T,
    };
  }
  function I({ src: e, alt: a, style: i }) {
    return (0, t.jsx)("img", {
      src: e,
      alt: a,
      loading: "lazy",
      style: i,
      onError: (e) => {
        e.currentTarget.style.visibility = "hidden";
      },
    });
  }
  (e.s(
    [
      "money",
      0,
      function (e) {
        return s.format(Number.isFinite(e) ? e : 0);
      },
      "openSibCart",
      0,
      k,
      "useSibCart",
      0,
      A,
    ],
    17652,
  ),
    e.s(["default", 0, I], 56226));
  let P = [
    { label: "Lineup", href: "/sand-in-my-boots#lineup" },
    { label: "Passes", href: "/sand-in-my-boots#passes" },
    { label: "Hotel Packages", href: "/sand-in-my-boots/hotels" },
    { label: "Festival Info", href: "/sand-in-my-boots#festival-info" },
    { label: "Experience", href: "/sand-in-my-boots#experience" },
  ];
  e.s(
    [
      "default",
      0,
      function () {
        let [e, n] = (0, a.useState)(!1),
          { count: s } = A();
        return (0, t.jsxs)("header", {
          style: {
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: o.T.navy,
            fontFamily: o.T.body,
          },
          children: [
            (0, t.jsx)("style", {
              children:
                "html{scroll-behavior:smooth} [id]{scroll-margin-top:130px}",
            }),
            (0, t.jsxs)("div", {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 20px 6px",
                gap: 12,
              },
              children: [
                (0, t.jsxs)(i.default, {
                  href: "/sand-in-my-boots",
                  onClick: () => n(!1),
                  style: { textDecoration: "none" },
                  children: [
                    (0, t.jsx)(I, {
                      src: "/sib/logo.png",
                      alt: "Sand In My Boots",
                      style: { height: 38, display: "block" },
                    }),
                    (0, t.jsx)("span", {
                      style: {
                        fontFamily: o.T.font,
                        color: o.T.cream,
                        fontSize: 18,
                        letterSpacing: 1,
                      },
                      children: "SAND in my BOOTS",
                    }),
                  ],
                }),
                (0, t.jsx)("span", {
                  style: { color: o.T.cream, fontSize: 15 },
                  children: "May 21 - 23, 2027",
                }),
              ],
            }),
            (0, t.jsxs)("div", {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 20px 14px",
                gap: 10,
              },
              children: [
                (0, t.jsx)(i.default, {
                  href: "/sand-in-my-boots#passes",
                  onClick: () => n(!1),
                  style: {
                    background: o.T.pink,
                    color: o.T.navy,
                    fontFamily: o.T.font,
                    fontSize: 13,
                    padding: "12px 18px",
                    borderRadius: 6,
                    textDecoration: "none",
                    letterSpacing: 0.5,
                  },
                  children: "BUY TICKETS",
                }),
                (0, t.jsxs)("div", {
                  style: { display: "flex", gap: 10, alignItems: "center" },
                  children: [
                    (0, t.jsxs)("button", {
                      type: "button",
                      onClick: () => {
                        (n(!1), k());
                      },
                      "aria-label": "Open cart",
                      style: {
                        background: "transparent",
                        border: `2px solid ${o.T.cream}`,
                        color: o.T.cream,
                        borderRadius: 6,
                        padding: "9px 14px",
                        fontFamily: o.T.font,
                        fontSize: 12,
                        cursor: "pointer",
                      },
                      children: ["CART ", s],
                    }),
                    (0, t.jsx)("button", {
                      type: "button",
                      onClick: () => n((e) => !e),
                      "aria-label": e ? "Close menu" : "Open menu",
                      style: {
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: o.T.cream,
                        fontSize: 30,
                        lineHeight: 1,
                        padding: "0 6px",
                      },
                      children: e ? "✕" : "☰",
                    }),
                  ],
                }),
              ],
            }),
            e &&
              (0, t.jsx)("nav", {
                style: {
                  position: "fixed",
                  top: 112,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: o.T.navy,
                  padding: "40px 20px",
                  overflowY: "auto",
                  zIndex: 99,
                },
                children: (0, t.jsxs)("div", {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: 30,
                    alignItems: "center",
                  },
                  children: [
                    P.map((e) =>
                      (0, t.jsx)(
                        i.default,
                        {
                          href: e.href,
                          onClick: () => n(!1),
                          style: {
                            color: o.T.cream,
                            fontSize: 28,
                            letterSpacing: 2,
                            textDecoration: "none",
                          },
                          children: e.label,
                        },
                        e.label,
                      ),
                    ),
                    (0, t.jsx)(i.default, {
                      href: "/",
                      onClick: () => n(!1),
                      style: {
                        color: o.T.pink,
                        fontSize: 14,
                        letterSpacing: 2,
                        textDecoration: "none",
                        marginTop: 20,
                      },
                      children: "← Back to Club Wallen",
                    }),
                  ],
                }),
              }),
          ],
        });
      },
    ],
    29150,
  );
};
