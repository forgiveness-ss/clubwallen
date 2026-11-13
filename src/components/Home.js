export default (e) => {
  "use strict";
  var t = e.i(40450),
    i = e.i(13742),
    o = e.i(6028);
  let a = [
      {
        icon: "✦",
        title: "Club Wallen Community",
        desc: "Your place to connect with fellow members and become part of Club Wallen.",
      },
      {
        icon: "◈",
        title: "Welcome Gift",
        desc: "Receive an exclusive Club Wallen welcome gift upon joining, before your first drop arrives.",
      },
      {
        icon: "◆",
        title: "Members-Only Drops",
        desc: "Access selected limited-edition Club Wallen releases available only inside your member portal.",
      },
      {
        icon: "✧",
        title: "Special Surprises",
        desc: "Member updates, opportunities, and surprises shared throughout the year.",
      },
    ],
    r = [
      {
        step: "01",
        title: "Choose Your Level",
        desc: "Select the Club Wallen membership that matches the experience you want.",
      },
      {
        step: "02",
        title: "Enter The Club",
        desc: "Complete your membership and gain access to your Club Wallen experience.",
      },
      {
        step: "03",
        title: "Receive Your Exclusives",
        desc: "Depending on your level, receive your welcome gift, merchandise, exclusive content, and member opportunities.",
      },
      {
        step: "04",
        title: "Experience Club Wallen",
        desc: "Stay connected throughout the year through exclusive updates, livestreams, drops, opportunities, and special experiences.",
      },
    ],
    n = [
      {
        id: "crew",
        emoji: "🥉",
        name: "The Crew",
        tagline: "Find your people.",
        price: 350,
        intro:
          "Where your Club Wallen experience begins. Step inside the community and enjoy exclusive content, updates, merchandise, and member experiences designed for fans who want more than the ordinary fan experience.",
        features: [
          "Exclusive Club Wallen Community",
          "Exclusive Updates — photos, videos & selected moments",
          "Behind-the-Scenes Content",
          "Welcome Gift",
          "Monthly Club Wallen Merch",
          "Members-Only Drops",
          "Special Surprises",
        ],
        note: "No livestream access at this level.",
        footer:
          "About belonging. Getting inside the Club. Finding your people.",
      },
      {
        id: "backroad",
        emoji: "🥈",
        name: "The Backroad Circle",
        tagline: "Take the long way in.",
        price: 650,
        intro:
          "For members who want to experience more of Club Wallen. Go deeper into the community with exclusive livestreams, enhanced content, and opportunities to get closer to the experiences surrounding Morgan Wallen.",
        features: [
          "Everything in The Crew, plus:",
          "🎥 Members-Only Community Livestreams",
          "🎤 Morgan Wallen + Special Guest Livestreams",
          "💬 Request a Direct Conversation with Morgan Wallen*",
          "Enhanced Exclusive Content",
          "Early Access to opportunities & drops",
          "Premium Member Experiences",
          "Backroad Circle Surprises",
        ],
        footer: "More access. More connection. More Club Wallen.",
        highlight: !0,
      },
      {
        id: "frontrow",
        emoji: "🥇",
        name: "The Front Row",
        tagline: "Experience more.",
        price: 900,
        intro:
          "The highest level of Club Wallen membership — the most complete experience, combining premium content, both livestream experiences, direct-conversation opportunities, and selected event experiences.",
        features: [
          "Everything in Backroad Circle, plus:",
          "🎥 Full Community Livestream Access",
          "🎤 Morgan Wallen + Surprise Guest Livestreams",
          "💬 Your Direct Conversation Request*",
          "🎟 Priority Event Opportunities",
          "Ticket Upgrade Opportunities*",
          "Selected Backstage & Post-Event Experiences*",
          "Premium Club Wallen Content",
          "Front Row Exclusives",
        ],
        footer:
          "Not just closer to the music — experiencing more of what happens around it.",
      },
    ],
    s = [
      {
        label: "Annual Membership",
        crew: "$350",
        backroad: "$650",
        frontrow: "$900",
      },
      {
        label: "Club Wallen Community",
        crew: "✓",
        backroad: "✓",
        frontrow: "✓",
      },
      { label: "Exclusive Updates", crew: "✓", backroad: "✓", frontrow: "✓" },
      { label: "Photos & Videos", crew: "✓", backroad: "✓", frontrow: "✓" },
      {
        label: "Behind-the-Scenes Content",
        crew: "✓",
        backroad: "✓",
        frontrow: "✓",
      },
      { label: "Welcome Gift", crew: "✓", backroad: "✓", frontrow: "✓" },
      {
        label: "Club Wallen Merchandise",
        crew: "✓",
        backroad: "✓",
        frontrow: "✓",
      },
      { label: "Members-Only Drops", crew: "✓", backroad: "✓", frontrow: "✓" },
      { label: "Special Surprises", crew: "✓", backroad: "✓", frontrow: "✓" },
      {
        label: "Community Livestream",
        crew: "—",
        backroad: "✓",
        frontrow: "✓",
      },
      {
        label: "Morgan Wallen + Guest Livestream",
        crew: "—",
        backroad: "✓",
        frontrow: "✓",
      },
      {
        label: "Direct Conversation Request*",
        crew: "—",
        backroad: "✓",
        frontrow: "✓",
      },
      {
        label: "Enhanced Exclusive Content",
        crew: "—",
        backroad: "✓",
        frontrow: "✓",
      },
      { label: "Early Access", crew: "—", backroad: "✓", frontrow: "✓" },
      {
        label: "Priority Experiences",
        crew: "—",
        backroad: "—",
        frontrow: "✓",
      },
      {
        label: "Ticket Upgrade Opportunities*",
        crew: "—",
        backroad: "—",
        frontrow: "✓",
      },
      {
        label: "Selected Backstage/Post-Event*",
        crew: "—",
        backroad: "—",
        frontrow: "✓",
      },
      {
        label: "Front Row Exclusives",
        crew: "—",
        backroad: "—",
        frontrow: "✓",
      },
    ],
    l = [
      {
        icon: "🎥",
        title: "The Community Livestream",
        tiers: "Backroad Circle ✓ · Front Row ✓",
        desc: "A members-only livestream created around the Club Wallen community. Community conversations. Member interaction. Discussions. Music. Stories. Special moments.",
        note: "This livestream is focused on the members and community — not hosted by Morgan Wallen.",
      },
      {
        icon: "🎤",
        title: "The Morgan Wallen Livestream",
        tiers: "Backroad Circle ✓ · Front Row ✓",
        desc: "Special livestreams hosted by Morgan Wallen alongside surprise guests. Exclusive conversations. Stories. Guest appearances. Moments from Morgan and the people joining him.",
        note: "This is the livestream experience featuring Morgan Wallen.",
      },
    ],
    c = [
      {
        user: "@countrygirlkay_tn",
        time: "2 weeks ago",
        text: "Just unboxed my Q1 Reserve box and I am SHAKING. The hoodie, the hat, the extras — this membership is 100% worth it 🤠 #cwreserve",
        image: "/community/post5.jpg",
      },
      {
        user: "@nashvillevibes22",
        time: "3 weeks ago",
        text: "Still The Problem Tour was everything. Club Wallen members got surprise early access and the best spots in the house 🙌",
        image: "/community/post1.jpg",
      },
      {
        user: "@mw.easttn.forever",
        time: "1 month ago",
        text: "#clubwallensthereserve ✨",
        image: "/community/post2.jpg",
      },
      {
        user: "@wallenforlifeee",
        time: "1 month ago",
        text: "The quality of Reserve merch is unmatched. My hoodie has been worn every single day since the box arrived 😂❤",
        image: "/community/post6.jpg",
      },
      {
        user: "@jessbelle_country",
        time: "6 weeks ago",
        text: "Nashville checked off the bucket list thanks to Club Wallen member perks. Already planning to renew for 2027 🏳",
        image: "/community/post3.jpg",
      },
      {
        user: "@walleN_pup_official",
        time: "6 weeks ago",
        text: "Even my dog approves of the Reserve welcome box 🐾 #clubwallen @clubwallen",
        image: "/community/post4.jpg",
      },
      {
        user: "@Morgan Wallen",
        time: "just now",
        text: "you learn a lot about people as you go through life. Gotta be careful who you let into your circle. 🤝 Y'all know what I mean? 🤠",
        video: "/community/post7.mp4",
      },
    ],
    d = [
      {
        q: "What is Club Wallen: The Reserve?",
        a: "The Reserve is a yearly membership for Morgan Wallen fans, available at three levels — The Crew, The Backroad Circle, and The Front Row — with exclusive content, livestreams, member drops, and special experiences throughout 2026.",
      },
      {
        q: "What's the difference between the two livestreams?",
        a: "The Community Livestream is a members-only session focused on fellow members — conversations, music, and community moments. The Morgan Wallen Livestream is hosted by Morgan himself alongside surprise guests. Both are included starting at the Backroad Circle level.",
      },
      {
        q: "How does the direct-conversation request work?",
        a: "Backroad Circle and Front Row members can submit a request for a direct conversation with Morgan Wallen. Selection depends on availability, scheduling, and approval — it isn't guaranteed for every member who requests it.",
      },
      {
        q: "Can I purchase merch without joining?",
        a: "Yes — our public shop is open to everyone. Members gain additional access to exclusive limited-edition drops not available to the general public.",
      },
    ];
  e.s([
    "default",
    0,
    function () {
      let [e, p] = (0, i.useState)(new Set()),
        [h, m] = (0, i.useState)(null),
        [g, x] = (0, i.useState)(!1);
      (0, i.useEffect)(() => {
        let e = new IntersectionObserver(
          (e) => {
            e.forEach((e) => {
              let t = e.target.getAttribute("data-observe");
              e.isIntersecting && t && p((e) => new Set([...e, t]));
            });
          },
          { threshold: 0.12 },
        );
        return (
          document
            .querySelectorAll("[data-observe]")
            .forEach((t) => e.observe(t)),
          () => e.disconnect()
        );
      }, []);
      let u = (e) => {
          let t = e.currentTarget.getBoundingClientRect(),
            i = ((e.clientX - t.left) / t.width - 0.5) * 14,
            o = -(14 * ((e.clientY - t.top) / t.height - 0.5));
          ((e.currentTarget.style.transform = `perspective(900px) rotateX(${o}deg) rotateY(${i}deg) translateZ(12px)`),
            (e.currentTarget.style.transition = "transform 0.1s ease"));
        },
        f = (e) => {
          ((e.currentTarget.style.transform =
            "perspective(900px) rotateX(0) rotateY(0) translateZ(0)"),
            (e.currentTarget.style.transition =
              "transform 0.6s cubic-bezier(0.4,0,0.2,1)"));
        },
        y = "#c8a84b";
      return (0, t.jsxs)("div", {
        style: { overflowX: "hidden", background: "#0a0a0a" },
        children: [
          (0, t.jsxs)("section", {
            style: {
              position: "relative",
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "100px 24px 80px",
            },
            children: [
              (0, t.jsx)("div", {
                style: {
                  position: "absolute",
                  inset: 0,
                  zIndex: 0,
                  overflow: "hidden",
                },
                children: (0, t.jsx)("div", {
                  style: {
                    position: "absolute",
                    inset: 0,
                    backgroundImage: "url('/hero-bg.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                    backgroundRepeat: "no-repeat",
                    transform: "translateZ(0)",
                  },
                }),
              }),
              (0, t.jsx)("div", {
                style: {
                  position: "absolute",
                  inset: 0,
                  zIndex: 1,
                  background:
                    "linear-gradient(to bottom, rgba(3,2,1,0.45) 0%, rgba(5,4,2,0.72) 50%, rgba(10,10,10,1) 100%)",
                },
              }),
              (0, t.jsx)("div", {
                style: {
                  position: "absolute",
                  inset: 0,
                  zIndex: 2,
                  pointerEvents: "none",
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px)",
                },
              }),
              (0, t.jsxs)("div", {
                style: { position: "relative", zIndex: 3 },
                children: [
                  (0, t.jsx)("p", {
                    className: "hero-fade",
                    style: {
                      fontSize: 10,
                      letterSpacing: 9,
                      color: "#6a5c3a",
                      textTransform: "uppercase",
                      marginBottom: 28,
                      animationDelay: "0.2s",
                    },
                    children: "The Experience Beyond The Stage",
                  }),
                  (0, t.jsx)("h1", {
                    className: "hero-fade",
                    style: {
                      fontSize: "clamp(52px, 12vw, 110px)",
                      lineHeight: 0.92,
                      marginBottom: 12,
                      animationDelay: "0.35s",
                    },
                    children: (0, t.jsx)("span", {
                      className: "gold-shimmer",
                      children: "Club Wallen",
                    }),
                  }),
                  (0, t.jsx)("h2", {
                    className: "hero-fade",
                    style: {
                      fontSize: "clamp(14px, 2.5vw, 22px)",
                      color: "#3a3020",
                      letterSpacing: 14,
                      textTransform: "uppercase",
                      fontWeight: "normal",
                      marginBottom: 44,
                      animationDelay: "0.5s",
                    },
                    children: "The Reserve · 2026",
                  }),
                  (0, t.jsx)("div", {
                    className: "hero-fade",
                    style: {
                      width: 50,
                      height: 1,
                      background: y,
                      margin: "0 auto 44px",
                      animationDelay: "0.65s, 2.15s",
                      animationName: "heroFadeUp, glowPulse",
                      animationDuration: "0.7s, 3s",
                      animationIterationCount: "1, infinite",
                      animationTimingFunction: "ease, ease",
                      animationFillMode: "both, none",
                    },
                  }),
                  (0, t.jsx)("p", {
                    className: "hero-fade",
                    style: {
                      maxWidth: 560,
                      fontSize: 16,
                      color: "#7a6c50",
                      lineHeight: 1.9,
                      marginBottom: 12,
                      animationDelay: "0.75s",
                    },
                    children:
                      "The music brings us together. The road keeps us moving. And Club Wallen takes you beyond simply being a fan.",
                  }),
                  (0, t.jsx)("p", {
                    className: "hero-fade",
                    style: {
                      maxWidth: 520,
                      fontSize: 14,
                      color: "#5a5040",
                      lineHeight: 1.9,
                      marginBottom: 12,
                      animationDelay: "0.82s",
                    },
                    children:
                      "The 2026 Reserve is your place inside a community built around Morgan Wallen's music, the people who make the journey special, and the experiences that happen beyond the stage.",
                  }),
                  (0, t.jsx)("p", {
                    className: "hero-fade",
                    style: {
                      maxWidth: 500,
                      fontSize: 14,
                      color: "#5a5040",
                      lineHeight: 1.9,
                      marginBottom: 56,
                      animationDelay: "0.9s",
                    },
                    children:
                      "From exclusive content and premium merchandise to members-only livestreams, special opportunities, and selected experiences — there's more waiting inside.",
                  }),
                  (0, t.jsx)("p", {
                    className: "hero-fade",
                    style: {
                      fontSize: 11,
                      letterSpacing: 5,
                      color: y,
                      textTransform: "uppercase",
                      marginBottom: 24,
                      animationDelay: "0.95s",
                    },
                    children:
                      "Three Memberships. One Club. Your Level of Access.",
                  }),
                  (0, t.jsxs)("div", {
                    className: "hero-fade",
                    style: {
                      display: "flex",
                      gap: 16,
                      flexWrap: "wrap",
                      justifyContent: "center",
                      animationDelay: "1s",
                    },
                    children: [
                      (0, t.jsx)("a", {
                        href: "#pricing",
                        className: "btn-cinematic",
                        style: {
                          background: y,
                          color: "#0a0a0a",
                          padding: "17px 48px",
                          fontSize: 12,
                          letterSpacing: 4,
                          textTransform: "uppercase",
                          fontWeight: 900,
                          borderRadius: 2,
                          display: "inline-block",
                          fontFamily: "Georgia,serif",
                        },
                        children: "Choose Your Level",
                      }),
                      (0, t.jsx)(o.default, {
                        href: "/login",
                        className: "btn-cinematic",
                        style: {
                          background: "transparent",
                          color: y,
                          padding: "17px 48px",
                          fontSize: 12,
                          letterSpacing: 4,
                          textTransform: "uppercase",
                          fontWeight: "bold",
                          borderRadius: 2,
                          border: "1px solid rgba(200,168,75,0.3)",
                          display: "inline-block",
                          fontFamily: "Georgia,serif",
                        },
                        children: "Log In",
                      }),
                    ],
                  }),
                ],
              }),
              (0, t.jsx)("div", {
                style: {
                  position: "absolute",
                  bottom: 36,
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 3,
                },
                children: (0, t.jsx)("div", {
                  style: {
                    width: 1,
                    height: 50,
                    background: `linear-gradient(to bottom, ${y}, transparent)`,
                    margin: "0 auto",
                    animation: "floatY 2s ease infinite",
                  },
                }),
              }),
            ],
          }),
          (0, t.jsx)("div", {
            style: {
              background: y,
              overflow: "hidden",
              padding: "12px 0",
              borderTop: "1px solid #b09038",
              borderBottom: "1px solid #b09038",
            },
            children: (0, t.jsx)("div", {
              style: {
                display: "flex",
                whiteSpace: "nowrap",
                animation: "ticker 28s linear infinite",
              },
              children: [void 0, void 0, void 0, void 0].map((e, i) =>
                (0, t.jsx)(
                  "span",
                  {
                    style: {
                      fontSize: 11,
                      fontWeight: 900,
                      letterSpacing: 4,
                      color: "#0a0a0a",
                    },
                    children:
                      "CLUB WALLEN · THE RESERVE · 2026 · THREE MEMBERSHIPS · ONE CLUB · YOUR LEVEL OF ACCESS · ",
                  },
                  i,
                ),
              ),
            }),
          }),
          (0, t.jsx)("section", {
            style: {
              background: "#0c0c0c",
              padding: "90px 24px",
              borderBottom: "1px solid #141414",
            },
            children: (0, t.jsx)("div", {
              style: { maxWidth: 1100, margin: "0 auto" },
              children: (0, t.jsx)("div", {
                "data-observe": "benefits",
                style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: 2,
                  opacity: +!!e.has("benefits"),
                  transform: e.has("benefits")
                    ? "translateY(0)"
                    : "translateY(40px)",
                  transition: "all 0.9s ease",
                },
                children: a.map((i, o) =>
                  (0, t.jsxs)(
                    "div",
                    {
                      className: "card-tilt",
                      onMouseMove: u,
                      onMouseLeave: f,
                      style: {
                        padding: "44px 32px",
                        background: "#111",
                        border: "1px solid #1a1a1a",
                        textAlign: "center",
                        cursor: "default",
                        animation: e.has("benefits")
                          ? `scaleIn 0.7s ${0.12 * o}s both`
                          : "none",
                      },
                      children: [
                        (0, t.jsx)("div", {
                          style: {
                            fontSize: 30,
                            color: y,
                            marginBottom: 18,
                            animation: `floatY 4s ease infinite ${0.6 * o}s`,
                          },
                          children: i.icon,
                        }),
                        (0, t.jsx)("h3", {
                          style: {
                            fontSize: 12,
                            letterSpacing: 4,
                            color: y,
                            textTransform: "uppercase",
                            marginBottom: 16,
                            fontFamily: "Georgia,serif",
                          },
                          children: i.title,
                        }),
                        (0, t.jsx)("p", {
                          style: {
                            fontSize: 13,
                            color: "#4a4030",
                            lineHeight: 1.9,
                          },
                          children: i.desc,
                        }),
                      ],
                    },
                    o,
                  ),
                ),
              }),
            }),
          }),
          (0, t.jsx)("section", {
            id: "how-it-works",
            style: { padding: "110px 24px", background: "#0a0a0a" },
            children: (0, t.jsxs)("div", {
              style: { maxWidth: 1e3, margin: "0 auto" },
              children: [
                (0, t.jsxs)("div", {
                  "data-observe": "how",
                  style: {
                    textAlign: "center",
                    marginBottom: 80,
                    opacity: +!!e.has("how"),
                    transform: e.has("how")
                      ? "translateY(0)"
                      : "translateY(30px)",
                    transition: "all 0.9s ease",
                  },
                  children: [
                    (0, t.jsx)("p", {
                      style: {
                        fontSize: 9,
                        letterSpacing: 6,
                        color: "#4a4030",
                        textTransform: "uppercase",
                        marginBottom: 16,
                      },
                      children: "How It Works",
                    }),
                    (0, t.jsx)("h2", {
                      style: {
                        fontSize: "clamp(28px, 4vw, 52px)",
                        color: "#f0e8d0",
                        fontFamily: "Georgia,serif",
                      },
                      children: "Your Place Is Waiting",
                    }),
                    (0, t.jsx)("div", {
                      style: {
                        width: 36,
                        height: 1,
                        background: y,
                        margin: "24px auto 0",
                        animation: "glowPulse 3s ease infinite",
                      },
                    }),
                  ],
                }),
                (0, t.jsx)("div", {
                  style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: 52,
                  },
                  children: r.map((i, o) => {
                    let a, r, n;
                    return (0, t.jsxs)(
                      "div",
                      {
                        "data-observe": `step-${o}`,
                        style: {
                          opacity: +((a = `step-${o}`), !!e.has(a)),
                          transform: ((r = `step-${o}`), e.has(r))
                            ? "translateY(0)"
                            : "translateY(40px)",
                          transition: `all 0.9s ${0.15 * o}s ease`,
                        },
                        children: [
                          (0, t.jsx)("div", {
                            style: {
                              fontSize: 56,
                              color: "#161208",
                              fontWeight: 900,
                              marginBottom: 18,
                              lineHeight: 1,
                              fontFamily: "Georgia,serif",
                            },
                            children: i.step,
                          }),
                          (0, t.jsx)("div", {
                            style: {
                              width: 28,
                              height: 2,
                              background: y,
                              marginBottom: 20,
                              animation: ((n = `step-${o}`), e.has(n))
                                ? "glowPulse 3s ease infinite"
                                : "none",
                            },
                          }),
                          (0, t.jsx)("h3", {
                            style: {
                              fontSize: 12,
                              color: y,
                              letterSpacing: 3,
                              textTransform: "uppercase",
                              marginBottom: 14,
                              fontFamily: "Georgia,serif",
                            },
                            children: i.title,
                          }),
                          (0, t.jsx)("p", {
                            style: {
                              fontSize: 13,
                              color: "#4a4030",
                              lineHeight: 1.9,
                            },
                            children: i.desc,
                          }),
                        ],
                      },
                      o,
                    );
                  }),
                }),
              ],
            }),
          }),
          (0, t.jsxs)("section", {
            id: "pricing",
            style: {
              position: "relative",
              padding: "110px 24px",
              overflow: "hidden",
              background:
                "linear-gradient(135deg, #0d0a04 0%, #1a1508 50%, #0d0a04 100%)",
              borderTop: "1px solid #1e1a0a",
              borderBottom: "1px solid #1e1a0a",
            },
            children: [
              (0, t.jsx)("div", {
                style: {
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  background:
                    "radial-gradient(ellipse at 50% 50%, rgba(200,168,75,0.07) 0%, transparent 65%)",
                  animation: "glowPulse 5s ease infinite",
                },
              }),
              (0, t.jsxs)("div", {
                style: {
                  position: "relative",
                  maxWidth: 1100,
                  margin: "0 auto",
                },
                children: [
                  (0, t.jsxs)("div", {
                    "data-observe": "pricing-head",
                    style: {
                      textAlign: "center",
                      marginBottom: 64,
                      opacity: +!!e.has("pricing-head"),
                      transition: "all 1s ease",
                    },
                    children: [
                      (0, t.jsx)("p", {
                        style: {
                          fontSize: 9,
                          letterSpacing: 7,
                          color: "#5a4c28",
                          textTransform: "uppercase",
                          marginBottom: 20,
                        },
                        children: "2026 Reserve",
                      }),
                      (0, t.jsx)("h2", {
                        style: {
                          fontSize: "clamp(32px, 5vw, 56px)",
                          color: "#f0e8d0",
                          marginBottom: 16,
                          fontFamily: "Georgia,serif",
                        },
                        children: "Choose Your Place In Club Wallen.",
                      }),
                      (0, t.jsx)("p", {
                        style: {
                          fontSize: 15,
                          color: "#7a6c50",
                          maxWidth: 480,
                          margin: "0 auto",
                        },
                        children:
                          "The Crew · The Backroad Circle · The Front Row",
                      }),
                    ],
                  }),
                  (0, t.jsx)("div", {
                    style: {
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(280px, 1fr))",
                      gap: 24,
                    },
                    children: n.map((i, a) => {
                      let r, n;
                      return (0, t.jsxs)(
                        "div",
                        {
                          "data-observe": `tier-${a}`,
                          className: "card-tilt",
                          onMouseMove: u,
                          onMouseLeave: f,
                          style: {
                            background: "#111",
                            border: i.highlight
                              ? `1px solid ${y}`
                              : "1px solid #2a2010",
                            padding: "40px 32px",
                            display: "flex",
                            flexDirection: "column",
                            opacity: +((r = `tier-${a}`), !!e.has(r)),
                            transform: ((n = `tier-${a}`), e.has(n))
                              ? "translateY(0)"
                              : "translateY(30px)",
                            transition: `all 0.8s ${0.12 * a}s ease`,
                            position: "relative",
                          },
                          children: [
                            i.highlight &&
                              (0, t.jsx)("div", {
                                style: {
                                  position: "absolute",
                                  top: -1,
                                  right: 24,
                                  background: y,
                                  color: "#0a0a0a",
                                  fontSize: 9,
                                  letterSpacing: 2,
                                  fontWeight: 900,
                                  padding: "4px 12px",
                                  textTransform: "uppercase",
                                },
                                children: "Most Popular",
                              }),
                            (0, t.jsx)("div", {
                              style: { fontSize: 28, marginBottom: 8 },
                              children: i.emoji,
                            }),
                            (0, t.jsx)("h3", {
                              style: {
                                fontSize: 20,
                                color: "#f0e8d0",
                                fontFamily: "Georgia,serif",
                                marginBottom: 4,
                              },
                              children: i.name,
                            }),
                            (0, t.jsx)("p", {
                              style: {
                                fontSize: 12,
                                color: y,
                                letterSpacing: 1,
                                marginBottom: 20,
                                fontStyle: "italic",
                              },
                              children: i.tagline,
                            }),
                            (0, t.jsxs)("div", {
                              style: {
                                fontSize: 40,
                                color: y,
                                fontFamily: "Georgia,serif",
                                marginBottom: 4,
                              },
                              children: ["$", i.price],
                            }),
                            (0, t.jsx)("p", {
                              style: {
                                fontSize: 10,
                                color: "#3a3020",
                                letterSpacing: 2,
                                marginBottom: 24,
                              },
                              children: "PER YEAR",
                            }),
                            (0, t.jsx)("p", {
                              style: {
                                fontSize: 13,
                                color: "#5a5040",
                                lineHeight: 1.8,
                                marginBottom: 24,
                              },
                              children: i.intro,
                            }),
                            (0, t.jsx)("div", {
                              style: { flex: 1, marginBottom: 20 },
                              children: i.features.map((e, o) =>
                                (0, t.jsxs)(
                                  "div",
                                  {
                                    style: {
                                      fontSize: 13,
                                      color: e.startsWith("Everything")
                                        ? "#7a6850"
                                        : "#c0b080",
                                      fontStyle: e.startsWith("Everything")
                                        ? "italic"
                                        : "normal",
                                      padding: "8px 0",
                                      borderBottom:
                                        o < i.features.length - 1
                                          ? "1px solid #1a1a1a"
                                          : "none",
                                      display: "flex",
                                      gap: 10,
                                      alignItems: "flex-start",
                                    },
                                    children: [
                                      !e.startsWith("Everything") &&
                                        (0, t.jsx)("span", {
                                          style: { color: y, flexShrink: 0 },
                                          children: "✓",
                                        }),
                                      (0, t.jsx)("span", { children: e }),
                                    ],
                                  },
                                  o,
                                ),
                              ),
                            }),
                            i.note &&
                              (0, t.jsx)("p", {
                                style: {
                                  fontSize: 11,
                                  color: "#5a3020",
                                  fontStyle: "italic",
                                  marginBottom: 20,
                                  textAlign: "center",
                                },
                                children: i.note,
                              }),
                            (0, t.jsx)("p", {
                              style: {
                                fontSize: 11,
                                color: "#4a3c24",
                                fontStyle: "italic",
                                marginBottom: 20,
                                textAlign: "center",
                              },
                              children: i.footer,
                            }),
                            (0, t.jsxs)(o.default, {
                              href: `/join?tier=${i.id}`,
                              className: "btn-cinematic",
                              style: {
                                display: "block",
                                textAlign: "center",
                                background: i.highlight ? y : "transparent",
                                color: i.highlight ? "#0a0a0a" : y,
                                border: i.highlight ? "none" : `1px solid ${y}`,
                                padding: "15px",
                                fontSize: 11,
                                letterSpacing: 3,
                                textTransform: "uppercase",
                                fontWeight: 900,
                                borderRadius: 2,
                                fontFamily: "Georgia,serif",
                              },
                              children: [
                                "Join ",
                                i.name.replace("The ", ""),
                                " — $",
                                i.price,
                                "/Year",
                              ],
                            }),
                          ],
                        },
                        i.id,
                      );
                    }),
                  }),
                  (0, t.jsxs)("div", {
                    "data-observe": "compare",
                    style: {
                      marginTop: 72,
                      overflowX: "auto",
                      opacity: +!!e.has("compare"),
                      transition: "all 1s ease",
                    },
                    children: [
                      (0, t.jsx)("p", {
                        style: {
                          fontSize: 9,
                          letterSpacing: 6,
                          color: "#4a4030",
                          textTransform: "uppercase",
                          marginBottom: 20,
                          textAlign: "center",
                        },
                        children: "What's Included — At A Glance",
                      }),
                      (0, t.jsxs)("table", {
                        style: {
                          width: "100%",
                          borderCollapse: "collapse",
                          minWidth: 620,
                        },
                        children: [
                          (0, t.jsx)("thead", {
                            children: (0, t.jsxs)("tr", {
                              children: [
                                (0, t.jsx)("th", {
                                  style: {
                                    textAlign: "left",
                                    padding: "12px 16px",
                                    fontSize: 11,
                                    color: "#4a4030",
                                    borderBottom: "1px solid #2a2010",
                                  },
                                }),
                                n.map((e) =>
                                  (0, t.jsxs)(
                                    "th",
                                    {
                                      style: {
                                        textAlign: "center",
                                        padding: "12px 16px",
                                        fontSize: 12,
                                        color: y,
                                        borderBottom: "1px solid #2a2010",
                                        fontFamily: "Georgia,serif",
                                      },
                                      children: [e.emoji, " ", e.name],
                                    },
                                    e.id,
                                  ),
                                ),
                              ],
                            }),
                          }),
                          (0, t.jsx)("tbody", {
                            children: s.map((e, i) =>
                              (0, t.jsxs)(
                                "tr",
                                {
                                  style: {
                                    background:
                                      i % 2 == 0
                                        ? "rgba(255,255,255,0.02)"
                                        : "transparent",
                                  },
                                  children: [
                                    (0, t.jsx)("td", {
                                      style: {
                                        padding: "12px 16px",
                                        fontSize: 12,
                                        color: "#7a6850",
                                      },
                                      children: e.label,
                                    }),
                                    (0, t.jsx)("td", {
                                      style: {
                                        textAlign: "center",
                                        padding: "12px 16px",
                                        fontSize: 13,
                                        color: "✓" === e.crew ? y : "#3a3020",
                                      },
                                      children: e.crew,
                                    }),
                                    (0, t.jsx)("td", {
                                      style: {
                                        textAlign: "center",
                                        padding: "12px 16px",
                                        fontSize: 13,
                                        color:
                                          "✓" === e.backroad ? y : "#3a3020",
                                      },
                                      children: e.backroad,
                                    }),
                                    (0, t.jsx)("td", {
                                      style: {
                                        textAlign: "center",
                                        padding: "12px 16px",
                                        fontSize: 13,
                                        color:
                                          "✓" === e.frontrow ? y : "#3a3020",
                                      },
                                      children: e.frontrow,
                                    }),
                                  ],
                                },
                                i,
                              ),
                            ),
                          }),
                        ],
                      }),
                      (0, t.jsx)("p", {
                        style: {
                          fontSize: 11,
                          color: "#2a2410",
                          marginTop: 16,
                          textAlign: "center",
                        },
                        children:
                          "* Subject to availability, scheduling, eligibility, and applicable Club Wallen terms.",
                      }),
                    ],
                  }),
                  (0, t.jsxs)("p", {
                    style: {
                      fontSize: 12,
                      color: "#2a2410",
                      marginTop: 40,
                      textAlign: "center",
                    },
                    children: [
                      "Shop without membership →",
                      " ",
                      (0, t.jsx)(o.default, {
                        href: "/shop",
                        style: {
                          color: "#5a4c28",
                          textDecoration: "underline",
                        },
                        children: "Browse Shop",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, t.jsx)("section", {
            style: { padding: "110px 24px", background: "#0a0a0a" },
            children: (0, t.jsxs)("div", {
              style: { maxWidth: 900, margin: "0 auto" },
              children: [
                (0, t.jsxs)("div", {
                  "data-observe": "livestreams-head",
                  style: {
                    textAlign: "center",
                    marginBottom: 56,
                    opacity: +!!e.has("livestreams-head"),
                    transform: e.has("livestreams-head")
                      ? "translateY(0)"
                      : "translateY(30px)",
                    transition: "all 0.9s ease",
                  },
                  children: [
                    (0, t.jsx)("p", {
                      style: {
                        fontSize: 9,
                        letterSpacing: 6,
                        color: "#4a4030",
                        textTransform: "uppercase",
                        marginBottom: 16,
                      },
                      children: "Two Livestreams. Two Different Experiences.",
                    }),
                    (0, t.jsx)("h2", {
                      style: {
                        fontSize: "clamp(24px, 4vw, 42px)",
                        color: "#f0e8d0",
                        fontFamily: "Georgia,serif",
                      },
                      children: "Know Exactly What You're Getting",
                    }),
                    (0, t.jsx)("div", {
                      style: {
                        width: 36,
                        height: 1,
                        background: y,
                        margin: "24px auto 0",
                      },
                    }),
                  ],
                }),
                (0, t.jsx)("div", {
                  style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: 24,
                    marginBottom: 48,
                  },
                  children: l.map((i, o) => {
                    let a, r;
                    return (0, t.jsxs)(
                      "div",
                      {
                        "data-observe": `ls-${o}`,
                        style: {
                          background: "#111",
                          border: "1px solid #1a1a1a",
                          padding: "36px 32px",
                          opacity: +((a = `ls-${o}`), !!e.has(a)),
                          transform: ((r = `ls-${o}`), e.has(r))
                            ? "translateY(0)"
                            : "translateY(30px)",
                          transition: `all 0.8s ${0.15 * o}s ease`,
                        },
                        children: [
                          (0, t.jsx)("div", {
                            style: { fontSize: 32, marginBottom: 14 },
                            children: i.icon,
                          }),
                          (0, t.jsx)("h3", {
                            style: {
                              fontSize: 17,
                              color: "#f0e8d0",
                              fontFamily: "Georgia,serif",
                              marginBottom: 8,
                            },
                            children: i.title,
                          }),
                          (0, t.jsx)("p", {
                            style: {
                              fontSize: 11,
                              color: y,
                              letterSpacing: 1,
                              marginBottom: 18,
                            },
                            children: i.tiers,
                          }),
                          (0, t.jsx)("p", {
                            style: {
                              fontSize: 13,
                              color: "#5a5040",
                              lineHeight: 1.8,
                              marginBottom: 14,
                            },
                            children: i.desc,
                          }),
                          (0, t.jsx)("p", {
                            style: {
                              fontSize: 12,
                              color: "#4a3c24",
                              fontStyle: "italic",
                              lineHeight: 1.7,
                            },
                            children: i.note,
                          }),
                        ],
                      },
                      o,
                    );
                  }),
                }),
                (0, t.jsxs)("div", {
                  "data-observe": "conversation",
                  style: {
                    background: "#12100a",
                    border: "1px solid #2a2010",
                    padding: "40px 36px",
                    textAlign: "center",
                    opacity: +!!e.has("conversation"),
                    transition: "all 0.9s ease",
                  },
                  children: [
                    (0, t.jsx)("p", {
                      style: { fontSize: 28, marginBottom: 12 },
                      children: "💬",
                    }),
                    (0, t.jsx)("h3", {
                      style: {
                        fontSize: 20,
                        color: y,
                        fontFamily: "Georgia,serif",
                        marginBottom: 12,
                      },
                      children: "And Then There's The Conversation.",
                    }),
                    (0, t.jsx)("p", {
                      style: {
                        fontSize: 14,
                        color: "#5a5040",
                        lineHeight: 1.9,
                        maxWidth: 520,
                        margin: "0 auto 16px",
                      },
                      children:
                        "Eligible members can submit a request for a direct conversation with Morgan Wallen through Club Wallen. Whether you're selected for a scheduled conversation depends on availability and approval.",
                    }),
                    (0, t.jsx)("p", {
                      style: {
                        fontSize: 11,
                        letterSpacing: 3,
                        color: "#4a3c24",
                        textTransform: "uppercase",
                        marginBottom: 6,
                      },
                      children: "Your Request. Your Opportunity. Your Moment.",
                    }),
                    (0, t.jsx)("p", {
                      style: {
                        fontSize: 11,
                        color: "#3a3020",
                        letterSpacing: 2,
                      },
                      children: "AVAILABLE FROM BACKROAD CIRCLE & FRONT ROW",
                    }),
                  ],
                }),
              ],
            }),
          }),
          (0, t.jsx)("section", {
            style: { padding: "110px 24px", background: "#080806" },
            children: (0, t.jsxs)("div", {
              style: { maxWidth: 900, margin: "0 auto" },
              children: [
                (0, t.jsxs)("div", {
                  "data-observe": "community",
                  style: {
                    textAlign: "center",
                    marginBottom: 64,
                    opacity: +!!e.has("community"),
                    transform: e.has("community")
                      ? "translateY(0)"
                      : "translateY(30px)",
                    transition: "all 0.9s ease",
                  },
                  children: [
                    (0, t.jsx)("p", {
                      style: {
                        fontSize: 9,
                        letterSpacing: 6,
                        color: "#4a4030",
                        textTransform: "uppercase",
                        marginBottom: 16,
                      },
                      children: "Member Community",
                    }),
                    (0, t.jsx)("h2", {
                      style: {
                        fontSize: "clamp(20px, 4vw, 36px)",
                        color: "#f0e8d0",
                        fontFamily: "Georgia,serif",
                        textTransform: "uppercase",
                        letterSpacing: 2,
                        lineHeight: 1.3,
                      },
                      children: "See What Members Are Sharing",
                    }),
                    (0, t.jsx)("p", {
                      style: {
                        fontSize: 12,
                        color: "#3a3020",
                        marginTop: 12,
                        letterSpacing: 3,
                      },
                      children:
                        "POST USING #CWRESERVE FOR A CHANCE TO BE FEATURED",
                    }),
                    (0, t.jsx)("div", {
                      style: {
                        width: 36,
                        height: 1,
                        background: y,
                        margin: "20px auto 0",
                      },
                    }),
                  ],
                }),
                (0, t.jsx)("div", {
                  style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: 16,
                  },
                  children: c.map((i, o) => {
                    let a, r, n;
                    return (0, t.jsxs)(
                      "div",
                      {
                        "data-observe": `post-${o}`,
                        className: "card-tilt",
                        onMouseMove: u,
                        onMouseLeave: f,
                        style: {
                          background: "#111",
                          border: "1px solid #1a1a1a",
                          borderRadius: 4,
                          overflow: "hidden",
                          opacity: +((a = `post-${o}`), !!e.has(a)),
                          transform: ((r = `post-${o}`), e.has(r))
                            ? "translateY(0)"
                            : "translateY(30px)",
                          transition: `all 0.8s ${0.1 * o}s ease`,
                          animation: ((n = `post-${o}`), e.has(n))
                            ? `borderPulse 4s ease infinite ${0.5 * o}s`
                            : "none",
                        },
                        children: [
                          i.video
                            ? (0, t.jsxs)("div", {
                                style: {
                                  aspectRatio: "4/3",
                                  position: "relative",
                                  background: "#000",
                                },
                                children: [
                                  (0, t.jsx)("video", {
                                    src: i.video,
                                    muted: !0,
                                    loop: !0,
                                    playsInline: !0,
                                    autoPlay: !0,
                                    style: {
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                      display: "block",
                                    },
                                  }),
                                  (0, t.jsx)("div", {
                                    style: {
                                      position: "absolute",
                                      inset: 0,
                                      background:
                                        "linear-gradient(to bottom, transparent 60%, rgba(10,10,10,0.6))",
                                      pointerEvents: "none",
                                    },
                                  }),
                                  (0, t.jsx)("span", {
                                    style: {
                                      position: "absolute",
                                      top: 10,
                                      right: 10,
                                      background: "rgba(10,10,10,0.7)",
                                      color: y,
                                      fontSize: 10,
                                      letterSpacing: 1,
                                      padding: "3px 8px",
                                      borderRadius: 2,
                                      textTransform: "uppercase",
                                    },
                                    children: "▶ Video",
                                  }),
                                ],
                              })
                            : i.image
                              ? (0, t.jsx)("div", {
                                  style: {
                                    aspectRatio: "4/3",
                                    backgroundImage: `url('${i.image}')`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    position: "relative",
                                  },
                                  children: (0, t.jsx)("div", {
                                    style: {
                                      position: "absolute",
                                      inset: 0,
                                      background:
                                        "linear-gradient(to bottom, transparent 60%, rgba(10,10,10,0.6))",
                                    },
                                  }),
                                })
                              : (0, t.jsx)("div", {
                                  style: {
                                    aspectRatio: "4/3",
                                    background:
                                      "linear-gradient(135deg, #141008 0%, #1e1a0e 100%)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  },
                                  children: (0, t.jsx)("span", {
                                    style: { fontSize: 36, opacity: 0.3 },
                                    children: "🤠",
                                  }),
                                }),
                          (0, t.jsxs)("div", {
                            style: { padding: "18px 20px" },
                            children: [
                              (0, t.jsxs)("div", {
                                style: {
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 10,
                                  marginBottom: 10,
                                },
                                children: [
                                  (0, t.jsx)("div", {
                                    style: {
                                      width: 32,
                                      height: 32,
                                      borderRadius: "50%",
                                      background: `linear-gradient(135deg, ${y}, #9a7d30)`,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      fontSize: 13,
                                      fontWeight: 900,
                                      color: "#0a0a0a",
                                      flexShrink: 0,
                                    },
                                    children: i.user[1].toUpperCase(),
                                  }),
                                  (0, t.jsxs)("div", {
                                    children: [
                                      (0, t.jsx)("p", {
                                        style: {
                                          margin: 0,
                                          fontSize: 13,
                                          fontWeight: 700,
                                          color: "#c0b080",
                                        },
                                        children: i.user,
                                      }),
                                      (0, t.jsx)("p", {
                                        style: {
                                          margin: 0,
                                          fontSize: 10,
                                          color: "#3a3020",
                                          letterSpacing: 1,
                                        },
                                        children: i.time,
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, t.jsx)("p", {
                                style: {
                                  fontSize: 13,
                                  color: "#5a5040",
                                  lineHeight: 1.7,
                                  margin: 0,
                                },
                                children: i.text,
                              }),
                            ],
                          }),
                        ],
                      },
                      o,
                    );
                  }),
                }),
                (0, t.jsx)("div", {
                  style: { textAlign: "center", marginTop: 52 },
                  children: (0, t.jsx)("p", {
                    style: { fontSize: 11, color: "#3a3020", letterSpacing: 3 },
                    children: "TAG @CLUBWALLEN WITH #CWRESERVE TO BE FEATURED",
                  }),
                }),
              ],
            }),
          }),
          (0, t.jsxs)("section", {
            style: {
              padding: "110px 24px",
              background:
                "linear-gradient(135deg, #0d0a04 0%, #121008 50%, #0d0a04 100%)",
              borderTop: "1px solid #181408",
              borderBottom: "1px solid #181408",
              position: "relative",
              overflow: "hidden",
            },
            children: [
              (0, t.jsx)("div", {
                style: {
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  background:
                    "radial-gradient(ellipse at 50% 50%, rgba(200,168,75,0.04) 0%, transparent 70%)",
                },
              }),
              (0, t.jsx)("div", {
                style: {
                  maxWidth: 860,
                  margin: "0 auto",
                  position: "relative",
                },
                children: (0, t.jsxs)("div", {
                  "data-observe": "tickets",
                  style: {
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 56,
                    alignItems: "center",
                    justifyContent: "space-between",
                    opacity: +!!e.has("tickets"),
                    transition: "all 1s ease",
                  },
                  children: [
                    (0, t.jsxs)("div", {
                      style: { maxWidth: 420 },
                      children: [
                        (0, t.jsx)("p", {
                          style: {
                            fontSize: 9,
                            letterSpacing: 7,
                            color: "#4a4030",
                            textTransform: "uppercase",
                            marginBottom: 18,
                          },
                          children: "2026 Still The Problem Tour",
                        }),
                        (0, t.jsxs)("h2", {
                          style: {
                            fontSize: "clamp(28px, 4vw, 46px)",
                            color: "#f0e8d0",
                            marginBottom: 16,
                            lineHeight: 1.05,
                            fontFamily: "Georgia,serif",
                          },
                          children: [
                            "Morgan Wallen",
                            (0, t.jsx)("span", {
                              style: { display: "block", color: y },
                              children: "Concert Tickets",
                            }),
                          ],
                        }),
                        (0, t.jsx)("div", {
                          style: {
                            width: 36,
                            height: 1,
                            background: y,
                            marginBottom: 22,
                          },
                        }),
                        (0, t.jsx)("p", {
                          style: {
                            fontSize: 14,
                            color: "#4a4030",
                            lineHeight: 1.9,
                            marginBottom: 26,
                          },
                          children:
                            "Get your tickets to the 2026 Still The Problem Tour. Shows across the country are selling fast — secure your seats now for an unforgettable night with Morgan Wallen.",
                        }),
                        [
                          "Select your show date and venue",
                          "Choose your section and quantity",
                          "Pay securely via Bitcoin or Cash App",
                          "Tickets delivered directly to your email",
                        ].map((e, i) =>
                          (0, t.jsxs)(
                            "div",
                            {
                              style: {
                                display: "flex",
                                gap: 12,
                                marginBottom: 12,
                                alignItems: "flex-start",
                              },
                              children: [
                                (0, t.jsx)("span", {
                                  style: {
                                    color: y,
                                    fontSize: 10,
                                    marginTop: 4,
                                  },
                                  children: "◆",
                                }),
                                (0, t.jsx)("span", {
                                  style: { fontSize: 13, color: "#4a4030" },
                                  children: e,
                                }),
                              ],
                            },
                            i,
                          ),
                        ),
                      ],
                    }),
                    (0, t.jsxs)("div", {
                      style: { textAlign: "center", minWidth: 220 },
                      children: [
                        (0, t.jsxs)("div", {
                          className: "card-tilt",
                          onMouseMove: u,
                          onMouseLeave: f,
                          style: {
                            background: "#111",
                            border: "1px solid #2a2010",
                            padding: "36px 44px",
                            marginBottom: 20,
                            animation: "glowPulse 4s ease infinite",
                          },
                          children: [
                            (0, t.jsx)("p", {
                              style: {
                                fontSize: 9,
                                letterSpacing: 5,
                                color: "#4a3c24",
                                marginBottom: 14,
                              },
                              children: "TICKETS FROM",
                            }),
                            (0, t.jsx)("p", {
                              style: {
                                fontSize: 56,
                                color: y,
                                marginBottom: 6,
                                fontFamily: "Georgia,serif",
                              },
                              children: "$79",
                            }),
                            (0, t.jsx)("p", {
                              style: {
                                fontSize: 10,
                                color: "#3a3020",
                                letterSpacing: 3,
                              },
                              children: "ALL SHOWS",
                            }),
                          ],
                        }),
                        (0, t.jsx)(o.default, {
                          href: "/tickets",
                          className: "btn-cinematic",
                          style: {
                            display: "block",
                            background: y,
                            color: "#0a0a0a",
                            padding: "16px 48px",
                            fontSize: 11,
                            letterSpacing: 4,
                            textTransform: "uppercase",
                            fontWeight: 900,
                            borderRadius: 2,
                            fontFamily: "Georgia,serif",
                          },
                          children: "Purchase Now",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          }),
          (0, t.jsxs)("section", {
            style: {
              padding: "110px 24px",
              background:
                "linear-gradient(135deg, #0a0a0a 0%, #12100a 50%, #0a0a0a 100%)",
              borderBottom: "1px solid #181408",
              position: "relative",
              overflow: "hidden",
            },
            children: [
              (0, t.jsx)("div", {
                style: {
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  background:
                    "radial-gradient(ellipse at 50% 100%, rgba(200,168,75,0.06) 0%, transparent 70%)",
                },
              }),
              (0, t.jsx)("div", {
                style: {
                  maxWidth: 860,
                  margin: "0 auto",
                  position: "relative",
                },
                children: (0, t.jsxs)("div", {
                  "data-observe": "sib",
                  style: {
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 56,
                    alignItems: "center",
                    justifyContent: "space-between",
                    opacity: +!!e.has("sib"),
                    transition: "all 1s ease",
                  },
                  children: [
                    (0, t.jsxs)("div", {
                      style: { maxWidth: 440 },
                      children: [
                        (0, t.jsx)("p", {
                          style: {
                            fontSize: 9,
                            letterSpacing: 7,
                            color: "#4a4030",
                            textTransform: "uppercase",
                            marginBottom: 18,
                          },
                          children: "May 21–23, 2027 · Gulf Shores, Alabama",
                        }),
                        (0, t.jsxs)("h2", {
                          style: {
                            fontSize: "clamp(28px, 4vw, 46px)",
                            color: "#f0e8d0",
                            marginBottom: 16,
                            lineHeight: 1.05,
                            fontFamily: "Georgia,serif",
                          },
                          children: [
                            "Sand In My Boots",
                            (0, t.jsx)("span", {
                              style: { display: "block", color: y },
                              children: "Passes & Hotel Stays",
                            }),
                          ],
                        }),
                        (0, t.jsx)("div", {
                          style: {
                            width: 36,
                            height: 1,
                            background: y,
                            marginBottom: 22,
                          },
                        }),
                        (0, t.jsx)("p", {
                          style: {
                            fontSize: 14,
                            color: "#4a4030",
                            lineHeight: 1.9,
                            marginBottom: 26,
                          },
                          children:
                            "Three days on the white sand beaches of Gulf Shores with Morgan Wallen, Kings of Leon, Ella Langley and more. Buy your festival passes, or bundle them with a hotel stay, shuttle passes and merch.",
                        }),
                        [
                          "Choose from GA, Party Pit, VIP, Super VIP or Livin’ The Dream",
                          "Add a 4-night hotel package for 2 to 10 guests",
                          "Keep everything in one cart and apply your promo code",
                          "Pay with crypto or Cash App",
                        ].map((e, i) =>
                          (0, t.jsxs)(
                            "div",
                            {
                              style: {
                                display: "flex",
                                gap: 12,
                                marginBottom: 12,
                                alignItems: "flex-start",
                              },
                              children: [
                                (0, t.jsx)("span", {
                                  style: {
                                    color: y,
                                    fontSize: 10,
                                    marginTop: 4,
                                  },
                                  children: "◆",
                                }),
                                (0, t.jsx)("span", {
                                  style: { fontSize: 13, color: "#4a4030" },
                                  children: e,
                                }),
                              ],
                            },
                            i,
                          ),
                        ),
                      ],
                    }),
                    (0, t.jsxs)("div", {
                      style: { textAlign: "center", minWidth: 220 },
                      children: [
                        (0, t.jsxs)("div", {
                          className: "card-tilt",
                          onMouseMove: u,
                          onMouseLeave: f,
                          style: {
                            background: "#111",
                            border: "1px solid #2a2010",
                            padding: "36px 44px",
                            marginBottom: 20,
                            animation: "glowPulse 4s ease infinite",
                          },
                          children: [
                            (0, t.jsx)("p", {
                              style: {
                                fontSize: 9,
                                letterSpacing: 5,
                                color: "#4a3c24",
                                marginBottom: 14,
                              },
                              children: "PASSES FROM",
                            }),
                            (0, t.jsx)("p", {
                              style: {
                                fontSize: 48,
                                color: y,
                                marginBottom: 6,
                                fontFamily: "Georgia,serif",
                              },
                              children: "$676.87",
                            }),
                            (0, t.jsx)("p", {
                              style: {
                                fontSize: 10,
                                color: "#3a3020",
                                letterSpacing: 3,
                              },
                              children: "3-DAY GA PASS",
                            }),
                          ],
                        }),
                        (0, t.jsx)(o.default, {
                          href: "/sand-in-my-boots",
                          className: "btn-cinematic",
                          style: {
                            display: "block",
                            background: y,
                            color: "#0a0a0a",
                            padding: "16px 48px",
                            fontSize: 11,
                            letterSpacing: 4,
                            textTransform: "uppercase",
                            fontWeight: 900,
                            borderRadius: 2,
                            fontFamily: "Georgia,serif",
                            marginBottom: 12,
                          },
                          children: "Buy Tickets",
                        }),
                        (0, t.jsx)(o.default, {
                          href: "/sand-in-my-boots/hotels",
                          className: "btn-cinematic",
                          style: {
                            display: "block",
                            background: "transparent",
                            color: y,
                            padding: "15px 48px",
                            fontSize: 11,
                            letterSpacing: 4,
                            textTransform: "uppercase",
                            fontWeight: "bold",
                            borderRadius: 2,
                            border: "1px solid rgba(200,168,75,0.3)",
                            fontFamily: "Georgia,serif",
                          },
                          children: "Hotel Packages",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          }),
          (0, t.jsx)("section", {
            style: { padding: "110px 24px", background: "#0a0a0a" },
            children: (0, t.jsxs)("div", {
              style: { maxWidth: 760, margin: "0 auto" },
              children: [
                (0, t.jsxs)("div", {
                  "data-observe": "faq",
                  style: {
                    textAlign: "center",
                    marginBottom: 64,
                    opacity: +!!e.has("faq"),
                    transform: e.has("faq")
                      ? "translateY(0)"
                      : "translateY(30px)",
                    transition: "all 0.9s ease",
                  },
                  children: [
                    (0, t.jsx)("p", {
                      style: {
                        fontSize: 9,
                        letterSpacing: 6,
                        color: "#4a4030",
                        textTransform: "uppercase",
                        marginBottom: 16,
                      },
                      children: "Questions",
                    }),
                    (0, t.jsx)("h2", {
                      style: {
                        fontSize: "clamp(22px, 4vw, 40px)",
                        color: "#f0e8d0",
                        fontFamily: "Georgia,serif",
                      },
                      children: "Club Wallen Membership — FAQ",
                    }),
                    (0, t.jsx)("div", {
                      style: {
                        width: 36,
                        height: 1,
                        background: y,
                        margin: "20px auto 0",
                      },
                    }),
                  ],
                }),
                d.map((i, o) => {
                  let a, r;
                  return (0, t.jsxs)(
                    "div",
                    {
                      "data-observe": `faq-${o}`,
                      style: {
                        borderBottom: "1px solid #141414",
                        opacity: +((a = `faq-${o}`), !!e.has(a)),
                        transform: ((r = `faq-${o}`), e.has(r))
                          ? "translateX(0)"
                          : "translateX(-30px)",
                        transition: `all 0.8s ${0.12 * o}s ease`,
                      },
                      children: [
                        (0, t.jsxs)("button", {
                          type: "button",
                          onClick: () => m(h === o ? null : o),
                          style: {
                            width: "100%",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "26px 0",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            textAlign: "left",
                            gap: 16,
                          },
                          children: [
                            (0, t.jsx)("span", {
                              style: {
                                fontSize: 15,
                                color: "#c0b080",
                                fontFamily: "Georgia,serif",
                                flex: 1,
                              },
                              children: i.q,
                            }),
                            (0, t.jsx)("span", {
                              style: {
                                color: y,
                                fontSize: 22,
                                lineHeight: 1,
                                flexShrink: 0,
                                transform:
                                  h === o ? "rotate(45deg)" : "rotate(0)",
                                transition: "transform 0.3s ease",
                              },
                              children: "+",
                            }),
                          ],
                        }),
                        (0, t.jsx)("div", {
                          style: {
                            maxHeight: 220 * (h === o),
                            overflow: "hidden",
                            transition:
                              "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
                          },
                          children: (0, t.jsx)("p", {
                            style: {
                              fontSize: 14,
                              color: "#4a4030",
                              lineHeight: 1.9,
                              paddingBottom: 24,
                              paddingLeft: 4,
                            },
                            children: i.a,
                          }),
                        }),
                      ],
                    },
                    o,
                  );
                }),
                (0, t.jsx)("div", {
                  style: { textAlign: "center", marginTop: 52 },
                  children: (0, t.jsx)(o.default, {
                    href: "/faq",
                    className: "btn-cinematic",
                    style: {
                      fontSize: 11,
                      letterSpacing: 4,
                      color: y,
                      textTransform: "uppercase",
                      borderBottom: `1px solid ${y}`,
                      paddingBottom: 4,
                      display: "inline-block",
                    },
                    children: "View All FAQs",
                  }),
                }),
              ],
            }),
          }),
          (0, t.jsx)("footer", {
            style: {
              background: "#060604",
              borderTop: "1px solid #141008",
              padding: "72px 24px 40px",
            },
            children: (0, t.jsxs)("div", {
              style: { maxWidth: 860, margin: "0 auto" },
              children: [
                (0, t.jsxs)("div", {
                  style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                    gap: 48,
                    marginBottom: 64,
                  },
                  children: [
                    (0, t.jsxs)("div", {
                      children: [
                        (0, t.jsx)("p", {
                          style: {
                            fontSize: 9,
                            letterSpacing: 5,
                            color: "#4a4030",
                            textTransform: "uppercase",
                            marginBottom: 24,
                          },
                          children: "Membership",
                        }),
                        (0, t.jsx)("div", {
                          style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 14,
                          },
                          children: [
                            { label: "Choose Your Level", href: "/#pricing" },
                            { label: "How It Works", href: "/#how-it-works" },
                            { label: "Member Portal", href: "/login" },
                            { label: "FAQ", href: "/faq" },
                          ].map((e) =>
                            (0, t.jsx)(
                              o.default,
                              {
                                href: e.href,
                                style: {
                                  fontSize: 14,
                                  color: "#5a5040",
                                  textDecoration: "none",
                                },
                                onMouseEnter: (e) =>
                                  (e.currentTarget.style.color = y),
                                onMouseLeave: (e) =>
                                  (e.currentTarget.style.color = "#5a5040"),
                                children: e.label,
                              },
                              e.label,
                            ),
                          ),
                        }),
                      ],
                    }),
                    (0, t.jsxs)("div", {
                      children: [
                        (0, t.jsx)("p", {
                          style: {
                            fontSize: 9,
                            letterSpacing: 5,
                            color: "#4a4030",
                            textTransform: "uppercase",
                            marginBottom: 24,
                          },
                          children: "Shop",
                        }),
                        (0, t.jsx)("div", {
                          style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 14,
                          },
                          children: [
                            { label: "All Merch", href: "/shop" },
                            { label: "Hoodies", href: "/shop?cat=hoodies" },
                            { label: "T-Shirts", href: "/shop?cat=tshirts" },
                            { label: "Hats & Caps", href: "/shop?cat=hats" },
                            {
                              label: "Accessories",
                              href: "/shop?cat=accessories",
                            },
                          ].map((e) =>
                            (0, t.jsx)(
                              o.default,
                              {
                                href: e.href,
                                style: {
                                  fontSize: 14,
                                  color: "#5a5040",
                                  textDecoration: "none",
                                },
                                onMouseEnter: (e) =>
                                  (e.currentTarget.style.color = y),
                                onMouseLeave: (e) =>
                                  (e.currentTarget.style.color = "#5a5040"),
                                children: e.label,
                              },
                              e.label,
                            ),
                          ),
                        }),
                      ],
                    }),
                    (0, t.jsxs)("div", {
                      children: [
                        (0, t.jsx)("p", {
                          style: {
                            fontSize: 9,
                            letterSpacing: 5,
                            color: "#4a4030",
                            textTransform: "uppercase",
                            marginBottom: 24,
                          },
                          children: "Tickets & Events",
                        }),
                        (0, t.jsx)("div", {
                          style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 14,
                          },
                          children: [
                            { label: "MW Tickets", href: "/tickets" },
                            {
                              label: "Sand In My Boots",
                              href: "/sand-in-my-boots",
                            },
                            {
                              label: "SIMB Hotel Packages",
                              href: "/sand-in-my-boots/hotels",
                            },
                          ].map((e) =>
                            (0, t.jsx)(
                              o.default,
                              {
                                href: e.href,
                                style: {
                                  fontSize: 14,
                                  color: "#5a5040",
                                  textDecoration: "none",
                                },
                                onMouseEnter: (e) =>
                                  (e.currentTarget.style.color = y),
                                onMouseLeave: (e) =>
                                  (e.currentTarget.style.color = "#5a5040"),
                                children: e.label,
                              },
                              e.label,
                            ),
                          ),
                        }),
                      ],
                    }),
                    (0, t.jsxs)("div", {
                      children: [
                        (0, t.jsx)("p", {
                          style: {
                            fontSize: 9,
                            letterSpacing: 5,
                            color: "#4a4030",
                            textTransform: "uppercase",
                            marginBottom: 24,
                          },
                          children: "Follow Club Wallen",
                        }),
                        (0, t.jsx)("div", {
                          style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 10,
                          },
                          children: [
                            {
                              label: "Instagram",
                              href: "https://instagram.com/clubwallen",
                            },
                            {
                              label: "TikTok (@clubwallen)",
                              href: "https://www.tiktok.com/@clubwallen?_r=1&_t=ZN-97X5cgXrKly",
                            },
                            {
                              label: "TikTok (@thereserve)",
                              href: "https://www.tiktok.com/@clubwallen_thereserve_?_r=1&_t=ZN-97X5fJWitc6",
                            },
                            {
                              label: "X (Twitter)",
                              href: "https://twitter.com/clubwallen",
                            },
                            {
                              label: "Facebook",
                              href: "https://facebook.com/clubwallen",
                            },
                            {
                              label: "YouTube",
                              href: "https://youtube.com/@clubwallen",
                            },
                            {
                              label: "Spotify",
                              href: "https://open.spotify.com",
                            },
                          ].map((e) =>
                            (0, t.jsx)(
                              "a",
                              {
                                href: e.href,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                style: {
                                  fontSize: 13,
                                  color: "#5a5040",
                                  textDecoration: "none",
                                },
                                onMouseEnter: (e) =>
                                  (e.currentTarget.style.color = y),
                                onMouseLeave: (e) =>
                                  (e.currentTarget.style.color = "#5a5040"),
                                children: e.label,
                              },
                              e.label,
                            ),
                          ),
                        }),
                      ],
                    }),
                  ],
                }),
                (0, t.jsx)("div", {
                  style: { height: 1, background: "#141008", marginBottom: 28 },
                }),
                (0, t.jsxs)("div", {
                  style: {
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 20,
                  },
                  children: [
                    (0, t.jsx)("p", {
                      style: { fontSize: 11, color: "#2a2410", margin: 0 },
                      children: "© 2026 Morgan Wallen Official Store",
                    }),
                    (0, t.jsxs)("div", {
                      style: {
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 24,
                        alignItems: "center",
                      },
                      children: [
                        (0, t.jsxs)("div", {
                          style: { position: "relative" },
                          children: [
                            (0, t.jsx)("button", {
                              type: "button",
                              onClick: () => x((e) => !e),
                              style: {
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                fontSize: 11,
                                color: "#5a5040",
                                padding: 0,
                                textDecoration: "underline",
                              },
                              onMouseEnter: (e) =>
                                (e.currentTarget.style.color = y),
                              onMouseLeave: (e) =>
                                (e.currentTarget.style.color = "#5a5040"),
                              children: "Help & Support",
                            }),
                            g &&
                              (0, t.jsxs)("div", {
                                style: {
                                  position: "absolute",
                                  bottom: "calc(100% + 12px)",
                                  left: 0,
                                  background: "#111",
                                  border: "1px solid #2a2010",
                                  borderRadius: 8,
                                  padding: "20px 24px",
                                  minWidth: 260,
                                  zIndex: 999,
                                  boxShadow: "0 8px 40px rgba(0,0,0,0.7)",
                                },
                                children: [
                                  (0, t.jsx)("button", {
                                    type: "button",
                                    onClick: () => x(!1),
                                    style: {
                                      position: "absolute",
                                      top: 10,
                                      right: 12,
                                      background: "none",
                                      border: "none",
                                      color: "#4a4030",
                                      cursor: "pointer",
                                      fontSize: 18,
                                      lineHeight: 1,
                                    },
                                    children: "×",
                                  }),
                                  (0, t.jsx)("p", {
                                    style: {
                                      fontSize: 10,
                                      letterSpacing: 3,
                                      color: "#4a4030",
                                      textTransform: "uppercase",
                                      marginBottom: 14,
                                    },
                                    children: "Contact Us",
                                  }),
                                  (0, t.jsx)("a", {
                                    href: "mailto:support@clubwallen.site",
                                    style: {
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 8,
                                      fontSize: 13,
                                      color: y,
                                      textDecoration: "none",
                                      marginBottom: 10,
                                    },
                                    children: "✉ support@clubwallen.site",
                                  }),
                                  (0, t.jsx)("a", {
                                    href: "mailto:info@clubwallen.site",
                                    style: {
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 8,
                                      fontSize: 13,
                                      color: y,
                                      textDecoration: "none",
                                    },
                                    children: "✉ info@clubwallen.site",
                                  }),
                                ],
                              }),
                          ],
                        }),
                        (0, t.jsx)(o.default, {
                          href: "/terms",
                          style: {
                            fontSize: 11,
                            color: "#5a5040",
                            textDecoration: "underline",
                          },
                          children: "Terms",
                        }),
                        (0, t.jsx)(o.default, {
                          href: "/privacy",
                          style: {
                            fontSize: 11,
                            color: "#5a5040",
                            textDecoration: "underline",
                          },
                          children: "Privacy",
                        }),
                        (0, t.jsx)(o.default, {
                          href: "/privacy#do-not-sell",
                          style: {
                            fontSize: 11,
                            color: "#5a5040",
                            textDecoration: "none",
                          },
                          children: "Do not sell my personal information",
                        }),
                        (0, t.jsx)("button", {
                          type: "button",
                          style: {
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: 11,
                            color: "#5a5040",
                            padding: 0,
                          },
                          children: "Cookie Choices",
                        }),
                      ],
                    }),
                  ],
                }),
                (0, t.jsx)("p", {
                  style: {
                    fontSize: 11,
                    color: "#1e1a10",
                    marginTop: 20,
                    lineHeight: 1.7,
                  },
                  children:
                    "Availability-based benefits — including direct-conversation requests with Morgan Wallen, livestream scheduling, ticket upgrades, backstage/post-event experiences, merchandise selections, and special opportunities — are subject to availability, scheduling, eligibility, and applicable Club Wallen terms.",
                }),
                (0, t.jsxs)("p", {
                  style: {
                    fontSize: 11,
                    color: "#1e1a10",
                    marginTop: 14,
                    lineHeight: 1.7,
                  },
                  children: [
                    "If you are using a screen reader and are having problems using this website, please contact us at",
                    " ",
                    (0, t.jsx)("a", {
                      href: "mailto:support@clubwallen.site",
                      style: { color: "#3a3020" },
                      children: "support@clubwallen.site",
                    }),
                    " for assistance.",
                  ],
                }),
              ],
            }),
          }),
        ],
      });
    },
  ]);
};
