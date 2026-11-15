export default (e) => {
  "use strict";
  var t = e.i(40450),
    i = e.i(13742),
    n = e.i(30037);
  let o = "#D4AF37",
    r = "#181818",
    l = "#222222",
    a = "#e05c5c",
    s = "#4caf7d",
    d = "#777",
    c = "#f0ece4",
    p = "MOWA101",
    h = (e, t) => Array.from({ length: t - e + 1 }, (t, i) => String(e + i)),
    g = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").concat(["AA", "BB", "CC", "DD"]),
    x = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    u = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    m = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
    f = (e) => String(e).padStart(2, "0"),
    y = (e) => `$${Math.round(e).toLocaleString()}`,
    b = (e) =>
      `$${e.toLocaleString(void 0, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    v = (e) => {
      let [t, i] = e.split("T"),
        [n, o, r] = t.split("-").map(Number),
        [l, a] = i.slice(0, 5).split(":").map(Number),
        s = new Date(Date.UTC(n, o - 1, r)).getUTCDay();
      return { y: n, m: o, da: r, hh: l, mm: a, dow: s };
    },
    S = (e, t) => `${((e + 11) % 12) + 1}:${f(t)}${e >= 12 ? "pm" : "am"}`,
    j = (e) => {
      let t = v(e);
      return `${m[t.dow].charAt(0)}${m[t.dow].slice(1).toLowerCase()}, ${u[t.m - 1]} ${t.da}, ${t.y} at ${S(t.hh, t.mm)}`;
    },
    k = (e) => {
      let t = 0x811c9dc5;
      for (let i = 0; i < e.length; i++)
        ((t ^= e.charCodeAt(i)), (t = Math.imul(t, 0x1000193)));
      return t >>> 0;
    },
    z = (e, t, i, n, o, r, l, a, s, d = {}) => ({
      key: e,
      name: t,
      color: i,
      prefix: n,
      sections: o,
      rows: r,
      f0: l,
      f1: a,
      weight: s,
      ...d,
    }),
    C = () =>
      z(
        "pit",
        "GA Pit",
        "#e09b50",
        "",
        ["GA Pit 1", "GA Pit 2", "GA Pit 3", "GA Pit 4"],
        [],
        0.3,
        0.85,
        8,
        { ga: !0 },
      ),
    w = (e, t = "Floor") =>
      z("floor", "Floor", "#e08a8a", t, e, h(1, 14), 0.45, 1, 7),
    T = {
      tampa: {
        name: "Raymond James Stadium",
        city: "Tampa, FL",
        address: "4201 North Dale Mabry Highway, Tampa, FL 33607",
        tz: "-04:00",
        map: "tampa-raymond-james",
        zones: [
          z(
            "upper",
            "Upper Level",
            "#5b8dd6",
            "Upper Level",
            ["302 - Family Section", ...h(303, 312), ...h(334, 344)],
            g,
            0,
            0.14,
            38,
          ),
          z(
            "middle",
            "Middle Level",
            "#2fc4a0",
            "Middle Level",
            ["201", "202", "203", "242", "243", "244", "245"],
            g,
            0.045,
            0.22,
            10,
          ),
          z(
            "club",
            "Club Level",
            "#5aa75a",
            "Club Level",
            ["205", "206", "207", "208", "209", "235", "239", "240", "241"],
            g,
            0.06,
            0.42,
            14,
          ),
          z(
            "lower",
            "Lower Level",
            "#d65aa0",
            "Lower Level",
            [
              "102",
              "103",
              "106",
              "107",
              "108",
              "140",
              "143",
              "144",
              "146",
              "149",
              "150",
              "151",
            ],
            g,
            0.058,
            0.58,
            22,
          ),
          w(["A", "B", "C", "D", "E", "F", "G", "H", "J"]),
          C(),
        ],
      },
      foxborough: {
        name: "Gillette Stadium",
        city: "Foxborough, MA",
        address: "1 Patriot Place, Foxborough, MA 02035",
        tz: "-04:00",
        map: "foxborough-gillette",
        zones: [
          z(
            "upper",
            "Upper Level",
            "#5b8dd6",
            "Upper Level",
            h(301, 340),
            h(5, 28),
            0,
            0.1,
            36,
          ),
          z(
            "mezz",
            "Mezzanine",
            "#5aa75a",
            "Mezzanine",
            [
              "201",
              "202",
              "203",
              "204",
              "205",
              "214",
              "215",
              "216",
              "217",
              "218",
              "223",
              "224",
              "225",
              "226",
              "227",
              "238",
              "239",
              "240",
            ],
            h(5, 28),
            0.03,
            0.14,
            10,
          ),
          z(
            "lower",
            "Lower Level",
            "#d65aa0",
            "Lower Level",
            h(101, 143),
            h(1, 40),
            0.07,
            0.6,
            28,
          ),
          z(
            "club",
            "Club Level",
            "#2fc4e0",
            "Club Level",
            [
              "CL6",
              "CL7",
              "CL8",
              "CL9",
              "CL10",
              "CL11",
              "CL12",
              "CL13",
              "CL28",
              "CL29",
              "CL30",
              "CL31",
              "CL32",
              "CL33",
              "CL34",
              "CL35",
            ],
            h(1, 20),
            0.08,
            0.4,
            10,
          ),
          w(["A1", "A2", "A3", "A4", "A5", "B2", "B3", "B4", "C3"]),
          C(),
        ],
      },
      athens: {
        name: "Sanford Stadium",
        city: "Athens, GA",
        address: "100 Sanford Drive, Athens, GA 30602",
        tz: "-04:00",
        map: "athens-sanford",
        zones: [
          z(
            "upper",
            "Upper Level",
            "#2fc4a0",
            "Upper Level",
            h(301, 337),
            h(8, 26),
            0,
            0.16,
            28,
          ),
          z(
            "six",
            "600 Level",
            "#5b8dd6",
            "Upper Level",
            h(601, 611),
            h(10, 22),
            0,
            0.06,
            10,
          ),
          z(
            "club",
            "Club Level",
            "#d6c04a",
            "Club Level",
            h(201, 237),
            h(1, 14),
            0.06,
            0.22,
            8,
          ),
          z(
            "lower",
            "Lower Level",
            "#d65aa0",
            "Lower Level",
            h(101, 144),
            h(8, 70),
            0.08,
            0.55,
            30,
          ),
          z(
            "floor",
            "Floor",
            "#e08a8a",
            "",
            ["Floor 1", "Floor 2", "Floor 3", "Floor 4"],
            [],
            0.4,
            1,
            10,
            { ga: !0 },
          ),
        ],
      },
      orchard: {
        name: "Highmark Stadium",
        city: "Orchard Park, NY",
        address: "1 Bills Drive, Orchard Park, NY 14127",
        tz: "-04:00",
        map: "orchard-park-highmark",
        zones: [
          z(
            "upper",
            "Upper Level",
            "#5b8dd6",
            "Section",
            h(400, 451),
            h(14, 40),
            0,
            0.1,
            40,
            { naRow: !0 },
          ),
          z(
            "middle",
            "Middle Level",
            "#5aa75a",
            "Section",
            h(301, 346),
            h(10, 30),
            0.08,
            0.3,
            14,
          ),
          z(
            "lower",
            "Lower Level",
            "#d65aa0",
            "Section",
            h(101, 151),
            h(10, 40),
            0.1,
            0.65,
            24,
          ),
          z(
            "club",
            "Lower Level - Club",
            "#2fc4e0",
            "Section",
            [
              "C109",
              "C110",
              "C111",
              "C118",
              "C119",
              "C127",
              "C128",
              "C21",
              "C22",
              "C23",
              "C24",
              "C25",
              "C31",
              "C32",
              "C33",
              "C34",
            ],
            h(1, 12),
            0.15,
            0.5,
            6,
          ),
          w(["A", "B", "C", "D", "E", "F", "G", "H", "J"]),
          C(),
        ],
      },
      columbus: {
        name: "Ohio Stadium",
        city: "Columbus, OH",
        address: "411 Woody Hayes Drive, Columbus, OH 43210",
        tz: "-04:00",
        map: "columbus-ohio-stadium",
        zones: [
          z(
            "c",
            "Level C",
            "#5b8dd6",
            "Section",
            h(1, 30).map((e) => `${e}C`),
            h(11, 41),
            0,
            0.1,
            38,
          ),
          z(
            "b",
            "Level B",
            "#5aa75a",
            "Section",
            h(1, 30).map((e) => `${e}B`),
            h(8, 36),
            0.05,
            0.22,
            12,
          ),
          z(
            "a",
            "Level A",
            "#d6c04a",
            "Section",
            h(1, 30).map((e) => `${e}A`),
            h(5, 36),
            0.05,
            0.45,
            22,
          ),
          z(
            "aa",
            "Level AA",
            "#d65aa0",
            "Section",
            h(3, 30).map((e) => `${e}AA`),
            h(1, 20),
            0.12,
            0.7,
            12,
          ),
          z(
            "club",
            "Club Seating",
            "#2fc4e0",
            "Club Seats",
            ["C1", "C2", "C3", "C4", "C5"],
            h(1, 8),
            0.2,
            0.55,
            4,
          ),
          w(["A", "B", "C", "D", "E", "F", "G", "H", "J"]),
          C(),
        ],
      },
      arlington: {
        name: "AT&T Stadium",
        city: "Arlington, TX",
        address: "1 AT&T Way, Arlington, TX 76011",
        tz: "-05:00",
        map: "arlington-att",
        zones: [
          z(
            "upper",
            "Upper Concourse",
            "#7b86e8",
            "Upper Concourse",
            h(401, 454),
            h(5, 30),
            0,
            0.13,
            40,
          ),
          z(
            "mezz",
            "Mezzanine",
            "#5b8dd6",
            "Mezzanine",
            h(301, 350),
            h(1, 20),
            0.06,
            0.25,
            14,
          ),
          z(
            "main",
            "Main",
            "#5aa75a",
            "Main",
            h(201, 250),
            h(1, 30),
            0.08,
            0.3,
            12,
          ),
          z(
            "hof",
            "Hall of Fame",
            "#d65aa0",
            "Hall of Fame",
            h(101, 150),
            h(1, 25),
            0.1,
            0.6,
            16,
          ),
          z(
            "chof",
            "Club Hall of Fame",
            "#2fc4e0",
            "Club Hall of Fame",
            [...h(106, 115), ...h(132, 139)],
            h(1, 25),
            0.15,
            0.5,
            4,
          ),
          z(
            "cmezz",
            "Club Mezzanine",
            "#27b5b5",
            "Club Mezzanine",
            [...h(307, 314), ...h(332, 339)],
            h(1, 20),
            0.12,
            0.4,
            4,
          ),
          w(["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"]),
          C(),
        ],
      },
      nashville: {
        name: "Nissan Stadium",
        city: "Nashville, TN",
        address: "1 Titans Way, Nashville, TN 37213",
        tz: "-05:00",
        map: "nashville-nissan",
        zones: [
          z(
            "upper",
            "Upper Level",
            "#5b8dd6",
            "Upper Level",
            h(401, 448),
            ["H", "I", "K", "L", "M", "N", "P", "R"],
            0,
            0.12,
            36,
            { naRow: !0 },
          ),
          z(
            "loge",
            "Loge Level",
            "#5aa75a",
            "Loge Level",
            h(301, 354),
            ["F", "G", "J", "K", "L", "M", "N", "O", "Q"],
            0.04,
            0.2,
            18,
          ),
          z(
            "club",
            "Club Level",
            "#2fc4e0",
            "Club Level",
            h(201, 230),
            ["H", "J", "K", "L", "N", "Q", "R", "T", "V"],
            0.1,
            0.35,
            8,
          ),
          z(
            "lower",
            "Lower Level",
            "#d65aa0",
            "Lower Level",
            h(101, 146),
            [
              "AA",
              "CC",
              "HH",
              "LL",
              "MM",
              "OO",
              "PP",
              "QQ",
              "S",
              "W",
              "Z",
              "J",
            ],
            0.1,
            0.6,
            22,
          ),
          z(
            "floor",
            "Floor",
            "#e08a8a",
            "Field",
            ["A", "B", "C", "D", "E", "F", "G", "H", "J"],
            h(1, 20),
            0.4,
            1,
            6,
          ),
          C(),
        ],
      },
    },
    L = [
      {
        id: "tampa-0611",
        venue: "tampa",
        start: "2027-06-11T17:30:00",
        badge: "1% of tickets left",
        listFrom: 464,
        min: 291,
        max: 3744,
        listings: 348,
      },
      {
        id: "tampa-0612",
        venue: "tampa",
        start: "2027-06-12T17:30:00",
        badge: "96 tickets left",
        listFrom: 950,
        min: 291,
        max: 3852,
        listings: 648,
      },
      {
        id: "fox-0625",
        venue: "foxborough",
        start: "2027-06-25T19:00:00",
        badge: "96 tickets left",
        listFrom: 950,
        min: 308,
        max: 3864,
        listings: 218,
      },
      {
        id: "fox-0626",
        venue: "foxborough",
        start: "2027-06-26T19:00:00",
        badge: "96 tickets left",
        listFrom: 950,
        min: 315,
        max: 3864,
        listings: 230,
      },
      {
        id: "athens-0716",
        venue: "athens",
        start: "2027-07-16T17:30:00",
        badge: "1% of tickets left",
        deals: !0,
        listFrom: 1131,
        min: 274,
        max: 2426,
        listings: 310,
        alert: "Don't miss out! Only 3% of tickets left",
        lineup: [
          "Morgan Wallen",
          "Thomas Rhett",
          "Cole Swindell",
          "Stella Lefty",
        ],
      },
      {
        id: "athens-0717",
        venue: "athens",
        start: "2027-07-17T17:30:00",
        badge: "82 tickets left",
        listFrom: 1154,
        min: 279,
        max: 2480,
        listings: 290,
      },
      {
        id: "orch-0723",
        venue: "orchard",
        start: "2027-07-23T17:30:00",
        badge: "96 tickets left",
        listFrom: 1001,
        min: 275,
        max: 4104,
        listings: 661,
      },
      {
        id: "orch-0724",
        venue: "orchard",
        start: "2027-07-24T17:30:00",
        badge: "96 tickets left",
        listFrom: 1001,
        min: 260,
        max: 4392,
        listings: 649,
      },
      {
        id: "orch-0727",
        venue: "orchard",
        start: "2027-07-27T19:00:00",
        badge: "1% of tickets left",
        deals: !0,
        listFrom: 1129,
        min: 933,
        max: 3551,
        listings: 56,
        alert: "Don't miss out! Less than 1% of tickets left",
      },
      {
        id: "col-0806",
        venue: "columbus",
        start: "2027-08-06T16:30:00",
        badge: "96 tickets left",
        listFrom: 1003,
        min: 299,
        max: 3916,
        listings: 375,
        alert: "Don't miss out! Only 3% of tickets left",
      },
      {
        id: "col-0807",
        venue: "columbus",
        start: "2027-08-07T16:30:00",
        badge: "96 tickets left",
        listFrom: 1003,
        min: 282,
        max: 4092,
        listings: 427,
        alert: "Don't miss out! Only 3% of tickets left",
      },
      {
        id: "arl-0813",
        venue: "arlington",
        start: "2027-08-13T17:30:00",
        badge: "96 tickets left",
        listFrom: 950,
        min: 268,
        max: 3808,
        listings: 640,
      },
      {
        id: "arl-0814",
        venue: "arlington",
        start: "2027-08-14T17:30:00",
        badge: "96 tickets left",
        listFrom: 950,
        min: 313,
        max: 3552,
        listings: 636,
      },
      {
        id: "nash-0827",
        venue: "nashville",
        start: "2027-08-27T17:30:00",
        badge: "80 tickets left",
        listFrom: 1899,
        min: 254,
        max: 3284,
        listings: 360,
      },
      {
        id: "nash-0828",
        venue: "nashville",
        start: "2027-08-28T17:30:00",
        badge: "80 tickets left",
        listFrom: 1899,
        min: 280,
        max: 3284,
        listings: 358,
      },
    ],
    $ = [
      {
        id: "p-yyz",
        venue: "Rogers Centre",
        city: "Toronto, ON",
        start: "2026-08-22T19:00:00",
      },
      {
        id: "p1",
        venue: "Acrisure Stadium",
        city: "Pittsburgh, PA",
        start: "2026-06-05T19:00:00",
      },
      {
        id: "p2",
        venue: "Acrisure Stadium",
        city: "Pittsburgh, PA",
        start: "2026-06-06T19:00:00",
      },
      {
        id: "p3",
        venue: "Soldier Field",
        city: "Chicago, IL",
        start: "2026-06-19T19:00:00",
      },
      {
        id: "p4",
        venue: "Soldier Field",
        city: "Chicago, IL",
        start: "2026-06-20T19:00:00",
      },
      {
        id: "p5",
        venue: "Clemson Memorial Stadium",
        city: "Clemson, SC",
        start: "2026-06-26T19:00:00",
      },
      {
        id: "p6",
        venue: "Clemson Memorial Stadium",
        city: "Clemson, SC",
        start: "2026-06-27T19:00:00",
      },
      {
        id: "p7",
        venue: "M&T Bank Stadium",
        city: "Baltimore, MD",
        start: "2026-07-17T19:00:00",
      },
      {
        id: "p8",
        venue: "M&T Bank Stadium",
        city: "Baltimore, MD",
        start: "2026-07-18T19:00:00",
      },
      {
        id: "p9",
        venue: "Michigan Stadium",
        city: "Ann Arbor, MI",
        start: "2026-07-24T19:00:00",
      },
      {
        id: "p10",
        venue: "Michigan Stadium",
        city: "Ann Arbor, MI",
        start: "2026-07-25T19:00:00",
      },
      {
        id: "p11",
        venue: "Lincoln Financial Field",
        city: "Philadelphia, PA",
        start: "2026-07-31T19:00:00",
      },
      {
        id: "p12",
        venue: "Lincoln Financial Field",
        city: "Philadelphia, PA",
        start: "2026-08-01T19:00:00",
      },
    ],
    A = {};
  e.s([
    "default",
    0,
    function () {
      let e,
        g,
        z = (0, n.useRouter)(),
        C = (0, i.useRef)(null),
        [w, M] = (0, i.useState)(0);
      (0, i.useEffect)(() => {
        M(Date.now());
        let e = setInterval(() => M(Date.now()), 1e3);
        return () => clearInterval(e);
      }, []);
      let [F, W] = (0, i.useState)("tour"),
        [R, B] = (0, i.useState)(null),
        [D, P] = (0, i.useState)(null),
        [I, N] = (0, i.useState)("ALL"),
        [O, H] = (0, i.useState)(null),
        [U, E] = (0, i.useState)("asc"),
        [J, G] = (0, i.useState)(25),
        [K, Y] = (0, i.useState)(null),
        [_, Q] = (0, i.useState)(!1),
        [V, X] = (0, i.useState)(!0),
        [q, Z] = (0, i.useState)(!1),
        [ee, et] = (0, i.useState)(1),
        [ei, en] = (0, i.useState)(2),
        [eo, er] = (0, i.useState)(""),
        [el, ea] = (0, i.useState)(!1),
        [es, ed] = (0, i.useState)("idle"),
        [ec, ep] = (0, i.useState)(""),
        [eh, eg] = (0, i.useState)(""),
        [ex, eu] = (0, i.useState)(""),
        [em, ef] = (0, i.useState)(""),
        [ey, eb] = (0, i.useState)(""),
        [ev, eS] = (0, i.useState)(!1),
        [ej, ek] = (0, i.useState)(null),
        ez = (e) => {
          let t, i;
          return (
            (t = e.start),
            (i = T[e.venue].tz),
            new Date(`${t}${i}`).getTime()
          );
        },
        eC = L.filter((e) => ez(e) > w).sort((e, t) => ez(e) - ez(t)),
        ew = [
          ...L.filter((e) => ez(e) <= w).map((e) => ({
            id: e.id,
            venue: T[e.venue].name,
            city: T[e.venue].city,
            start: e.start,
          })),
          ...$,
        ].sort((e, t) => t.start.localeCompare(e.start)),
        eT = eC[0],
        eL = eT ? Math.max(0, ez(eT) - w) : 0,
        e$ = {
          d: Math.floor(eL / 864e5),
          h: Math.floor((eL % 864e5) / 36e5),
          m: Math.floor((eL % 36e5) / 6e4),
          s: Math.floor((eL % 6e4) / 1e3),
        },
        eA = (0, i.useMemo)(
          () =>
            R
              ? (function (e) {
                  let t;
                  if (A[e.id]) return A[e.id];
                  let i = T[e.venue],
                    n =
                      ((t = k(e.id)),
                      () => {
                        t |= 0;
                        let e = Math.imul(
                          (t = (t + 0x6d2b79f5) | 0) ^ (t >>> 15),
                          1 | t,
                        );
                        return (
                          (((e = (e + Math.imul(e ^ (e >>> 7), 61 | e)) ^ e) ^
                            (e >>> 14)) >>>
                            0) /
                          0x100000000
                        );
                      }),
                    o = e.max - e.min,
                    r = i.zones.reduce((e, t) => e + t.weight, 0),
                    l = [],
                    a = 0,
                    s = i.zones.reduce(
                      (e, t) => (t.f0 < e.f0 ? t : e),
                      i.zones[0],
                    ),
                    d = i.zones.reduce(
                      (e, t) => (t.f1 > e.f1 ? t : e),
                      i.zones[0],
                    );
                  i.zones.forEach((t) => {
                    let i = Math.max(
                      2,
                      Math.round((e.listings * t.weight) / r),
                    );
                    e.listings >= 300 && (i = Math.max(i, t.sections.length));
                    let c = t.sections.map(() => n()),
                      p = c.indexOf(Math.min(...c));
                    for (let r = 0; r < i; r++) {
                      let i =
                          r < t.sections.length && e.listings >= 300
                            ? r
                            : Math.floor(n() * t.sections.length),
                        h = t.rows.length ? Math.floor(n() * t.rows.length) : 0,
                        g = t.rows.length
                          ? 1 + (1 - h / t.rows.length) * 0.3 * n()
                          : 1 + 0.2 * n(),
                        x = Math.min(
                          1,
                          Math.pow(c[i], 1.5) * g * 0.85 + 0.15 * n(),
                        ),
                        u = Math.round(e.min + o * (t.f0 + (t.f1 - t.f0) * x));
                      (t === s && 0 === r && ((i = p), (u = e.min)),
                        t === d && 1 === r && (u = e.max),
                        (u = Math.min(e.max, Math.max(e.min, u))));
                      let m = n(),
                        f = 2,
                        y = 2;
                      m >= 0.3 && m < 0.55
                        ? ((f = 1), (y = 4))
                        : m >= 0.55 && m < 0.75
                          ? ((f = 2), (y = 6))
                          : m >= 0.75 && m < 0.9
                            ? ((f = 1), (y = 6))
                            : m >= 0.9 && ((f = 1), (y = t.ga ? 10 : 8));
                      let b = t.sections[i];
                      l.push({
                        id: `${e.id}-${a++}`,
                        zoneKey: t.key,
                        zoneName: t.name,
                        color: t.color,
                        section: b,
                        title: t.prefix ? `${t.prefix} ${b}` : b,
                        row: t.rows.length ? t.rows[h] : null,
                        ga: !!t.ga || 0 === t.rows.length,
                        lo: f,
                        hi: y,
                        price: u,
                        seatStart: 1 + Math.floor(30 * n()),
                        verified: 0.4 > n(),
                        saver: 0.55 > n(),
                      });
                    }
                  });
                  let c = {};
                  l.forEach((e) => {
                    (c[`${e.zoneKey}|${e.section}`] ||= []).push(e);
                  });
                  let p = new Set(
                    i.zones.filter((e) => e.naRow).map((e) => e.key),
                  );
                  return (
                    Object.values(c).forEach((t) => {
                      t.sort((e, t) => e.price - t.price);
                      let i = t[0];
                      ((i.tag = "Lowest Price in Section"),
                        p.has(i.zoneKey) &&
                          ((i.row = "NA"),
                          (i.lo = Math.min(i.lo, 1)),
                          (i.hi = Math.max(i.hi, 4))),
                        e.listings < 100 && 1 === t.length
                          ? (i.tag = "Last Ticket in Section")
                          : 0.08 > n() && (i.tag = "Section Selling Fast"));
                    }),
                    i.zones.forEach((e) => {
                      let t = Object.keys(c).filter((t) =>
                        t.startsWith(`${e.key}|`),
                      );
                      if (t.length) {
                        let e = c[t[Math.floor(n() * t.length)]];
                        "Lowest Price in Section" === e[0].tag &&
                          (e[0].tag = "Best Selling Section");
                      }
                    }),
                    l.sort((e, t) => e.price - t.price),
                    (A[e.id] = l),
                    l
                  );
                })(R)
              : [],
          [R],
        ),
        eM = (0, i.useMemo)(() => {
          if (!R || null === D) return [];
          let e = eA.filter((e) => D >= e.lo && D <= e.hi);
          return (
            "ALL" !== I && (e = e.filter((e) => e.zoneKey === I)),
            O && (e = e.filter((e) => `${e.zoneKey}|${e.section}` === O)),
            [...e].sort((e, t) =>
              "asc" === U ? e.price - t.price : t.price - e.price,
            )
          );
        }, [eA, R, D, I, O, U]),
        eF = R ? T[R.venue] : null,
        eW = eF ? `/maps/${eF.map}.png` : "",
        eR = () => {
          window.scrollTo({ top: 0 });
        },
        eB = (e) => {
          (B(e),
            P(null),
            N("ALL"),
            H(null),
            E("asc"),
            G(25),
            Y(null),
            Z(!1),
            X(!0),
            W("event"),
            eR());
        },
        eD = () => {
          (W("tour"), B(null), P(null), Y(null), Z(!1), eR());
        },
        eP = (e) => {
          (Y(e),
            en(Math.min(e.hi, Math.max(e.lo, D ?? 2))),
            Z(!1),
            et(1),
            er(""),
            ea(!1),
            ed("idle"),
            ep(""),
            eb(""),
            ek(null),
            W("listing"),
            eR());
        },
        eI = () => {
          (W("event"), Z(!1), eR());
        },
        eN = K ? K.price * ei : 0,
        eO = el ? 0.3 * eN : 0,
        eH = eN - eO,
        eU = 0 * eH,
        eE = Math.round((eH + eU + (eH + eU) * 0) * 100) / 100,
        eJ = (e, t) =>
          e.ga
            ? "General admission · standing"
            : `Row ${e.row}${"NA" === e.row ? "" : ` \xb7 Seats ${e.seatStart}–${e.seatStart + t - 1}`}`,
        eG = () =>
          K && R && eF
            ? `Morgan Wallen — ${eF.name}, ${eF.city} \xb7 ${K.title}${K.row ? ` \xb7 Row ${K.row}` : ""}`
            : "Morgan Wallen",
        eK = (e, t) =>
          fetch("/api/tickets/payment-selected", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            keepalive: !0,
            body: JSON.stringify({
              name: `${eh} ${ex}`.trim(),
              email: em,
              method: e,
              total: eE,
              orderId: t,
              qty: ei,
              description: `${eG()} \xb7 ${j(R.start)}`,
            }),
          }).catch(() => {}),
        eY = async () => {
          if (!K || !R || !eF) return;
          (eS(!0), ek(null));
          let e = `CW_${R.id}_${Date.now()}`;
          await eK("bitcoin", e);
          try {
            let t = await fetch("/api/nowpayments/create-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  amount: eE,
                  currency: "USD",
                  orderDescription: `${eG()} \xb7 ${ei}x \xb7 ${j(R.start)}`,
                  orderId: e,
                  orderType: "tickets",
                  customerName: `${eh} ${ex}`.trim() || "Ticket Buyer",
                }),
              }),
              i = await t.json(),
              n = i.invoiceUrl || i.paymentUrl;
            if (!t.ok || !n) {
              (ek(i.error || "Payment failed."), eS(!1));
              return;
            }
            window.location.href = n;
          } catch {
            (ek("Something went wrong. Please try again."), eS(!1));
          }
        },
        e_ = {
          background: o,
          color: "#000",
          border: "none",
          borderRadius: 6,
          padding: "11px 26px",
          fontSize: 14,
          fontWeight: 700,
          cursor: "pointer",
        },
        eQ = {
          background: "#1a1a1a",
          border: `1px solid ${l}`,
          color: d,
          borderRadius: 6,
          padding: "11px 20px",
          fontSize: 13,
          cursor: "pointer",
        },
        eV = (e, i, n, o = "text") =>
          (0, t.jsx)("input", {
            type: o,
            value: e,
            onChange: (e) => i(e.target.value),
            placeholder: n,
            style: {
              width: "100%",
              boxSizing: "border-box",
              background: "#1a1a1a",
              border: `1px solid ${l}`,
              color: c,
              borderRadius: 6,
              padding: "12px 14px",
              fontSize: 16,
              outline: "none",
              fontFamily: "inherit",
            },
          }),
        eX = (e) =>
          (0, t.jsx)("label", {
            style: {
              fontSize: 11,
              color: d,
              letterSpacing: 1,
              textTransform: "uppercase",
              display: "block",
              marginBottom: 6,
            },
            children: e,
          }),
        eq = ({ onClick: e }) =>
          (0, t.jsx)("button", {
            type: "button",
            onClick: e,
            "aria-label": "Back",
            style: {
              width: 42,
              height: 42,
              borderRadius: 8,
              background: r,
              border: `1px solid ${l}`,
              color: c,
              fontSize: 20,
              cursor: "pointer",
              flexShrink: 0,
            },
            children: "←",
          }),
        eZ = () =>
          (0, t.jsx)("div", {
            style: {
              background: "#0d0d0d",
              borderRadius: 10,
              border: `1px solid ${l}`,
              padding: 8 * !!V,
              marginBottom: 16 * !!V,
            },
            children:
              V &&
              (0, t.jsx)("img", {
                src: eW,
                alt: `${eF?.name} seating map`,
                onError: () => X(!1),
                style: {
                  width: "100%",
                  maxHeight: 360,
                  objectFit: "contain",
                  display: "block",
                  borderRadius: 6,
                  background: "#f4f4f8",
                },
              }),
          });
      return (0, t.jsxs)("div", {
        style: {
          background: "#080808",
          minHeight: "100vh",
          paddingTop: 66,
          fontFamily: "system-ui,-apple-system,sans-serif",
          color: c,
        },
        children: [
          "tour" === F &&
            (0, t.jsxs)(t.Fragment, {
              children: [
                (0, t.jsxs)("div", {
                  style: {
                    position: "relative",
                    overflow: "hidden",
                    background:
                      "linear-gradient(160deg,#1a1200 0%,#0d0800 45%,#080808 100%)",
                  },
                  children: [
                    (0, t.jsx)("div", {
                      style: {
                        position: "absolute",
                        inset: 0,
                        backgroundImage:
                          "radial-gradient(ellipse 80% 60% at 50% 10%,rgba(212,175,55,0.14) 0%,transparent 70%)",
                        pointerEvents: "none",
                      },
                    }),
                    (0, t.jsxs)("div", {
                      style: {
                        position: "relative",
                        maxWidth: 1e3,
                        margin: "0 auto",
                        padding: "48px 20px 36px",
                      },
                      children: [
                        (0, t.jsx)("p", {
                          style: {
                            fontSize: 12,
                            letterSpacing: 4,
                            color: o,
                            textTransform: "uppercase",
                            margin: "0 0 10px",
                          },
                          children: "Tickets on sale now",
                        }),
                        (0, t.jsxs)("h1", {
                          style: {
                            fontFamily: "Georgia,serif",
                            fontSize: "clamp(36px,7vw,72px)",
                            lineHeight: 0.98,
                            margin: "0 0 14px",
                            fontWeight: 700,
                          },
                          children: [
                            "Morgan Wallen ",
                            (0, t.jsx)("span", {
                              style: { color: o },
                              children: "2027 Stadium Tour",
                            }),
                          ],
                        }),
                        (0, t.jsxs)("p", {
                          style: {
                            fontSize: 15,
                            color: "#c0b070",
                            margin: "0 0 24px",
                          },
                          children: [
                            L.length,
                            " shows · Jun 11 – Aug 28, 2027 · Tampa to Nashville",
                          ],
                        }),
                        eT &&
                          (0, t.jsxs)("div", {
                            style: {
                              display: "flex",
                              gap: 12,
                              alignItems: "center",
                              flexWrap: "wrap",
                            },
                            children: [
                              (0, t.jsx)("span", {
                                style: { fontSize: 12, color: d },
                                children: "Next show in",
                              }),
                              [
                                ["d", "days"],
                                ["h", "hrs"],
                                ["m", "min"],
                                ["s", "sec"],
                              ].map(([e, i]) =>
                                (0, t.jsxs)(
                                  "div",
                                  {
                                    style: {
                                      textAlign: "center",
                                      minWidth: 54,
                                      background: "rgba(212,175,55,0.08)",
                                      border: "1px solid rgba(212,175,55,0.2)",
                                      borderRadius: 6,
                                      padding: "8px 10px",
                                    },
                                    children: [
                                      (0, t.jsx)("div", {
                                        style: {
                                          fontFamily: "monospace",
                                          fontSize: 24,
                                          fontWeight: 700,
                                          color: o,
                                          lineHeight: 1,
                                        },
                                        children: f(e$[e]),
                                      }),
                                      (0, t.jsx)("div", {
                                        style: {
                                          fontSize: 10,
                                          color: d,
                                          marginTop: 3,
                                        },
                                        children: i,
                                      }),
                                    ],
                                  },
                                  e,
                                ),
                              ),
                            ],
                          }),
                      ],
                    }),
                  ],
                }),
                (0, t.jsxs)("div", {
                  style: {
                    maxWidth: 1e3,
                    margin: "0 auto",
                    padding: "28px 16px 80px",
                  },
                  children: [
                    eC.map((e) => {
                      let i = v(e.start),
                        n = T[e.venue];
                      return (0, t.jsxs)(
                        "div",
                        {
                          role: "button",
                          tabIndex: 0,
                          onClick: () => eB(e),
                          onKeyDown: (t) => {
                            "Enter" === t.key && eB(e);
                          },
                          style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 16,
                            padding: "16px 18px",
                            background: r,
                            border: `1px solid ${l}`,
                            borderRadius: 10,
                            marginBottom: 10,
                            cursor: "pointer",
                          },
                          children: [
                            (0, t.jsxs)("div", {
                              style: {
                                width: 70,
                                textAlign: "center",
                                flexShrink: 0,
                                borderRight: `1px solid ${l}`,
                                paddingRight: 14,
                              },
                              children: [
                                (0, t.jsx)("div", {
                                  style: { fontSize: 12, fontWeight: 800 },
                                  children: m[i.dow],
                                }),
                                (0, t.jsxs)("div", {
                                  style: {
                                    fontSize: 15,
                                    fontWeight: 800,
                                    color: o,
                                    lineHeight: 1.25,
                                  },
                                  children: [
                                    u[i.m - 1],
                                    " ",
                                    i.da,
                                    (0, t.jsx)("br", {}),
                                    i.y,
                                  ],
                                }),
                                (0, t.jsx)("div", {
                                  style: { fontSize: 12, color: "#bbb" },
                                  children: S(i.hh, i.mm),
                                }),
                              ],
                            }),
                            (0, t.jsxs)("div", {
                              style: { flex: 1, minWidth: 0 },
                              children: [
                                (0, t.jsxs)("div", {
                                  style: {
                                    display: "flex",
                                    gap: 6,
                                    flexWrap: "wrap",
                                    marginBottom: 6,
                                  },
                                  children: [
                                    (0, t.jsxs)("span", {
                                      style: {
                                        background: "rgba(214,56,154,0.15)",
                                        color: "#f08ac8",
                                        fontSize: 11,
                                        padding: "3px 9px",
                                        borderRadius: 12,
                                      },
                                      children: ["🔥 ", e.badge],
                                    }),
                                    e.deals &&
                                      (0, t.jsx)("span", {
                                        style: {
                                          background: "rgba(47,196,160,0.15)",
                                          color: "#5fd8bb",
                                          fontSize: 11,
                                          padding: "3px 9px",
                                          borderRadius: 12,
                                        },
                                        children: "💰 Deals Available",
                                      }),
                                  ],
                                }),
                                (0, t.jsx)("div", {
                                  style: { fontSize: 16, fontWeight: 700 },
                                  children: "Morgan Wallen",
                                }),
                                (0, t.jsxs)("div", {
                                  style: { fontSize: 13, color: "#999" },
                                  children: [n.name, " • ", n.city],
                                }),
                              ],
                            }),
                            (0, t.jsxs)("div", {
                              style: {
                                border: `1px solid ${o}`,
                                color: o,
                                borderRadius: 6,
                                padding: "8px 12px",
                                fontSize: 13,
                                fontWeight: 700,
                                whiteSpace: "nowrap",
                              },
                              children: ["From ", y(e.min)],
                            }),
                          ],
                        },
                        e.id,
                      );
                    }),
                    (0, t.jsxs)("div", {
                      style: { marginTop: 36 },
                      children: [
                        (0, t.jsxs)("button", {
                          type: "button",
                          onClick: () => Q((e) => !e),
                          style: {
                            width: "100%",
                            background: "#0f0f0f",
                            border: `1px solid ${l}`,
                            borderRadius: 8,
                            padding: "16px 20px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            cursor: "pointer",
                            color: c,
                          },
                          children: [
                            (0, t.jsxs)("span", {
                              style: {
                                fontSize: 13,
                                color: d,
                                fontWeight: 700,
                              },
                              children: ["Past shows — ", ew.length, " closed"],
                            }),
                            (0, t.jsx)("span", {
                              style: { color: d },
                              children: _ ? "▲" : "▼",
                            }),
                          ],
                        }),
                        _ &&
                          (0, t.jsxs)("div", {
                            style: {
                              border: `1px solid ${l}`,
                              borderTop: "none",
                              borderRadius: "0 0 8px 8px",
                              overflow: "hidden",
                            },
                            children: [
                              (0, t.jsx)("p", {
                                style: {
                                  fontSize: 12,
                                  color: d,
                                  padding: "12px 20px",
                                  margin: 0,
                                  background: "#0a0a0a",
                                },
                                children:
                                  "These shows have ended. Tickets are no longer available.",
                              }),
                              ew.map((e) => {
                                let i = v(e.start);
                                return (0, t.jsxs)(
                                  "div",
                                  {
                                    style: {
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      gap: 12,
                                      padding: "14px 20px",
                                      borderTop: `1px solid ${l}`,
                                      background: "#0d0d0d",
                                      opacity: 0.75,
                                    },
                                    children: [
                                      (0, t.jsxs)("div", {
                                        children: [
                                          (0, t.jsx)("div", {
                                            style: {
                                              fontSize: 14,
                                              fontWeight: 600,
                                              color: "#888",
                                            },
                                            children: e.venue,
                                          }),
                                          (0, t.jsxs)("div", {
                                            style: { fontSize: 12, color: d },
                                            children: [
                                              e.city,
                                              " · ",
                                              x[i.m - 1],
                                              " ",
                                              i.da,
                                              ", ",
                                              i.y,
                                            ],
                                          }),
                                        ],
                                      }),
                                      (0, t.jsx)("span", {
                                        style: {
                                          background: "#1a1a1a",
                                          border: `1px solid ${l}`,
                                          color: "#666",
                                          fontSize: 11,
                                          fontWeight: 700,
                                          padding: "4px 10px",
                                          borderRadius: 4,
                                        },
                                        children: "Closed",
                                      }),
                                    ],
                                  },
                                  e.id,
                                );
                              }),
                            ],
                          }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          "event" === F &&
            R &&
            eF &&
            (0, t.jsxs)("div", {
              style: {
                maxWidth: 1e3,
                margin: "0 auto",
                padding: "16px 16px 80px",
              },
              children: [
                (0, t.jsx)("div", {
                  style: {
                    background: "#0a0e24",
                    color: "#aab",
                    fontSize: 12,
                    textAlign: "center",
                    padding: "10px",
                    borderRadius: 6,
                    marginBottom: 14,
                  },
                  children:
                    "All resale ticket prices may be above or below face value.",
                }),
                (0, t.jsxs)("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    marginBottom: 14,
                  },
                  children: [
                    (0, t.jsx)(eq, { onClick: eD }),
                    (0, t.jsxs)("div", {
                      children: [
                        (0, t.jsx)("div", {
                          style: { fontSize: 20, fontWeight: 800 },
                          children: "Morgan Wallen",
                        }),
                        (0, t.jsxs)("div", {
                          style: { fontSize: 13, color: "#aaa" },
                          children: [eF.name, " in ", eF.city],
                        }),
                        (0, t.jsx)("div", {
                          style: { fontSize: 13, color: "#aaa" },
                          children: j(R.start),
                        }),
                      ],
                    }),
                  ],
                }),
                (0, t.jsx)("div", {
                  style: {
                    background: R.alert
                      ? "rgba(214,56,154,0.14)"
                      : "rgba(80,130,220,0.14)",
                    color: R.alert ? "#f08ac8" : "#8fb4f5",
                    textAlign: "center",
                    fontSize: 14,
                    fontWeight: 600,
                    padding: "11px",
                    borderRadius: 8,
                    marginBottom: 14,
                  },
                  children: R.alert
                    ? `⏳ ${R.alert}`
                    : `👁 ${(1100 + (k(R.id) % 900)).toLocaleString()} fans shopping for these tickets`,
                }),
                R.lineup &&
                  (0, t.jsx)("div", {
                    style: {
                      display: "flex",
                      gap: 8,
                      flexWrap: "wrap",
                      marginBottom: 14,
                    },
                    children: R.lineup.map((e) =>
                      (0, t.jsx)(
                        "span",
                        {
                          style: {
                            border: "1px solid rgba(212,175,55,0.3)",
                            background: "rgba(212,175,55,0.08)",
                            borderRadius: 6,
                            padding: "6px 12px",
                            fontSize: 13,
                          },
                          children: e,
                        },
                        e,
                      ),
                    ),
                  }),
                (0, t.jsx)(eZ, {}),
                (0, t.jsxs)("div", {
                  style: {
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap",
                    marginBottom: 12,
                  },
                  children: [
                    (0, t.jsxs)("div", {
                      style: {
                        flex: "1 1 200px",
                        background: r,
                        border: `1px solid ${l}`,
                        borderRadius: 8,
                        padding: "12px 16px",
                        fontSize: 14,
                        textAlign: "center",
                      },
                      children: [y(R.min), " – ", y(R.max), "+"],
                    }),
                    (0, t.jsxs)("button", {
                      type: "button",
                      onClick: () => P(null),
                      style: {
                        flex: "1 1 160px",
                        background: "rgba(212,175,55,0.1)",
                        border: `1px solid ${o}`,
                        color: o,
                        borderRadius: 8,
                        padding: "12px 16px",
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: "pointer",
                      },
                      children: [D ?? "–", " Ticket", 1 === D ? "" : "s", " ▾"],
                    }),
                  ],
                }),
                (0, t.jsx)("div", {
                  style: {
                    display: "flex",
                    gap: 8,
                    overflowX: "auto",
                    paddingBottom: 6,
                    marginBottom: 10,
                  },
                  children: [
                    { key: "ALL", name: "All", color: o },
                    ...eF.zones,
                  ].map((e) =>
                    (0, t.jsxs)(
                      "button",
                      {
                        type: "button",
                        onClick: () => {
                          (N(e.key), H(null), G(25));
                        },
                        style: {
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                          gap: 7,
                          background: I === e.key ? "rgba(212,175,55,0.14)" : r,
                          border: `1px solid ${I === e.key ? o : l}`,
                          color: c,
                          borderRadius: 20,
                          padding: "8px 14px",
                          fontSize: 13,
                          cursor: "pointer",
                        },
                        children: [
                          (0, t.jsx)("span", {
                            style: {
                              width: 10,
                              height: 10,
                              borderRadius: "50%",
                              background: e.color,
                            },
                          }),
                          e.name,
                        ],
                      },
                      e.key,
                    ),
                  ),
                }),
                O &&
                  (0, t.jsxs)("button", {
                    type: "button",
                    onClick: () => H(null),
                    style: {
                      background: "transparent",
                      border: `1px solid ${l}`,
                      color: o,
                      borderRadius: 16,
                      padding: "5px 12px",
                      fontSize: 12,
                      marginBottom: 10,
                      cursor: "pointer",
                    },
                    children: [O.split("|")[1], " ✕"],
                  }),
                (0, t.jsxs)("div", {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "10px 0",
                  },
                  children: [
                    (0, t.jsxs)("div", {
                      style: { fontWeight: 800 },
                      children: [
                        eM.length,
                        " listing",
                        1 === eM.length ? "" : "s",
                      ],
                    }),
                    (0, t.jsxs)("select", {
                      value: U,
                      onChange: (e) => E(e.target.value),
                      style: {
                        background: r,
                        color: c,
                        border: `1px solid ${l}`,
                        borderRadius: 6,
                        padding: "8px 10px",
                        fontSize: 13,
                      },
                      children: [
                        (0, t.jsx)("option", {
                          value: "asc",
                          children: "Lowest Price",
                        }),
                        (0, t.jsx)("option", {
                          value: "desc",
                          children: "Highest Price",
                        }),
                      ],
                    }),
                  ],
                }),
                null !== D &&
                  0 === eM.length &&
                  (0, t.jsxs)("div", {
                    style: {
                      background: r,
                      border: `1px solid ${l}`,
                      borderRadius: 10,
                      padding: 28,
                      textAlign: "center",
                      color: d,
                    },
                    children: [
                      "No listings for ",
                      D,
                      " ticket",
                      1 === D ? "" : "s",
                      " here. Try a different quantity or zone.",
                    ],
                  }),
                eM.slice(0, J).map((e) =>
                  (0, t.jsxs)(
                    "div",
                    {
                      role: "button",
                      tabIndex: 0,
                      onClick: () => eP(e),
                      onKeyDown: (t) => {
                        "Enter" === t.key && eP(e);
                      },
                      style: {
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        background: r,
                        border: `1px solid ${l}`,
                        borderLeft: `5px solid ${e.color}`,
                        borderRadius: 8,
                        padding: "14px 16px",
                        marginBottom: 8,
                        cursor: "pointer",
                      },
                      children: [
                        (0, t.jsxs)("div", {
                          style: { flex: 1, minWidth: 0 },
                          children: [
                            (0, t.jsx)("div", {
                              style: { fontSize: 16, fontWeight: 700 },
                              children: e.title,
                            }),
                            (0, t.jsxs)("div", {
                              style: {
                                fontSize: 13,
                                color: "#aaa",
                                marginTop: 2,
                              },
                              children: [
                                e.row ? `Row ${e.row} | ` : "",
                                e.lo === e.hi
                                  ? `${e.hi} tickets`
                                  : `${e.lo}–${e.hi} tickets`,
                                e.verified &&
                                  (0, t.jsx)("span", {
                                    style: { color: "#2fc4e0", marginLeft: 6 },
                                    children: "✔",
                                  }),
                                e.saver &&
                                  (0, t.jsx)("span", {
                                    style: { color: s, marginLeft: 6 },
                                    children: "◉",
                                  }),
                              ],
                            }),
                            e.tag &&
                              (0, t.jsx)("div", {
                                style: {
                                  fontSize: 12,
                                  marginTop: 3,
                                  color:
                                    "Lowest Price in Section" === e.tag
                                      ? s
                                      : "#f08ac8",
                                },
                                children: e.tag,
                              }),
                          ],
                        }),
                        (0, t.jsxs)("div", {
                          style: { textAlign: "right", flexShrink: 0 },
                          children: [
                            (0, t.jsx)("div", {
                              style: { fontSize: 11, color: d },
                              children: "Fees Incl.",
                            }),
                            (0, t.jsxs)("div", {
                              style: { fontSize: 20, fontWeight: 800 },
                              children: [
                                y(e.price),
                                (0, t.jsx)("span", {
                                  style: {
                                    fontSize: 11,
                                    color: d,
                                    fontWeight: 400,
                                  },
                                  children: " ea",
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    },
                    e.id,
                  ),
                ),
                eM.length > J &&
                  (0, t.jsx)("button", {
                    type: "button",
                    onClick: () => G((e) => e + 25),
                    style: {
                      ...eQ,
                      width: "100%",
                      marginTop: 8,
                      color: o,
                      borderColor: o,
                    },
                    children: "Show more listings",
                  }),
                null === D &&
                  (0, t.jsx)("div", {
                    style: {
                      position: "fixed",
                      inset: 0,
                      background: "rgba(0,0,0,0.78)",
                      zIndex: 200,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 20,
                    },
                    children: (0, t.jsxs)("div", {
                      style: {
                        background: "#fff",
                        color: "#111",
                        borderRadius: 14,
                        padding: "28px 22px",
                        width: "100%",
                        maxWidth: 440,
                      },
                      children: [
                        (0, t.jsx)("h2", {
                          style: {
                            textAlign: "center",
                            fontSize: 26,
                            margin: "0 0 6px",
                          },
                          children: "How many tickets?",
                        }),
                        (0, t.jsx)("p", {
                          style: {
                            textAlign: "center",
                            color: "#666",
                            margin: "0 0 20px",
                            fontSize: 15,
                          },
                          children: "🛋 You’ll be seated together.",
                        }),
                        (0, t.jsx)("div", {
                          style: {
                            display: "grid",
                            gridTemplateColumns: "repeat(4,1fr)",
                            gap: 10,
                          },
                          children: [1, 2, 3, 4, 5, 6, 7, 8].map((e) =>
                            (0, t.jsx)(
                              "button",
                              {
                                type: "button",
                                onClick: () => {
                                  (P(e), G(25));
                                },
                                style: {
                                  padding: "16px 0",
                                  fontSize: 18,
                                  background: "#fff",
                                  border: "2px solid #d5d8e3",
                                  borderRadius: 8,
                                  cursor: "pointer",
                                  color: "#111",
                                },
                                children: 8 === e ? "8+" : e,
                              },
                              e,
                            ),
                          ),
                        }),
                        (0, t.jsxs)("div", {
                          style: {
                            background: "#e8f9ec",
                            color: "#1f7a3a",
                            borderRadius: 8,
                            padding: "14px",
                            marginTop: 20,
                            textAlign: "center",
                          },
                          children: [
                            (0, t.jsx)("div", {
                              style: { fontWeight: 700, fontSize: 16 },
                              children:
                                "🎉 All-In Prices! What you see is what you pay.",
                            }),
                            (0, t.jsx)("div", {
                              style: { fontSize: 13, marginTop: 4 },
                              children:
                                "(Taxes & delivery not included, where applicable)",
                            }),
                          ],
                        }),
                        (0, t.jsx)("button", {
                          type: "button",
                          onClick: eD,
                          style: {
                            display: "block",
                            margin: "14px auto 0",
                            background: "none",
                            border: "none",
                            color: "#777",
                            textDecoration: "underline",
                            cursor: "pointer",
                            fontSize: 13,
                          },
                          children: "Back to all shows",
                        }),
                      ],
                    }),
                  }),
              ],
            }),
          "listing" === F &&
            R &&
            eF &&
            K &&
            (0, t.jsxs)("div", {
              style: {
                maxWidth: 760,
                margin: "0 auto",
                padding: "16px 16px 120px",
              },
              children: [
                (0, t.jsx)("div", {
                  style: { marginBottom: 12 },
                  children: (0, t.jsx)(eq, { onClick: eI }),
                }),
                (0, t.jsx)(eZ, {}),
                (0, t.jsxs)("div", {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 14,
                    alignItems: "flex-start",
                    marginBottom: 14,
                  },
                  children: [
                    (0, t.jsxs)("div", {
                      children: [
                        K.tag &&
                          (0, t.jsx)("div", {
                            style: {
                              fontSize: 13,
                              color: "#f08ac8",
                              marginBottom: 2,
                            },
                            children:
                              "Lowest Price in Section" === K.tag
                                ? "Lowest price in this section"
                                : K.tag,
                          }),
                        (0, t.jsx)("h1", {
                          style: { fontSize: 22, margin: 0, fontWeight: 800 },
                          children: K.title,
                        }),
                        !K.ga &&
                          (0, t.jsxs)("div", {
                            style: {
                              fontSize: 15,
                              color: "#bbb",
                              marginTop: 2,
                            },
                            children: ["Row ", K.row],
                          }),
                        (0, t.jsx)("button", {
                          type: "button",
                          onClick: () => {
                            (H(`${K.zoneKey}|${K.section}`), N("ALL"), eI());
                          },
                          style: {
                            background: "none",
                            border: "none",
                            color: o,
                            padding: 0,
                            marginTop: 6,
                            fontSize: 14,
                            cursor: "pointer",
                            textAlign: "left",
                          },
                          children: "See all tickets in this section",
                        }),
                      ],
                    }),
                    (0, t.jsxs)("div", {
                      style: { textAlign: "right", flexShrink: 0 },
                      children: [
                        (0, t.jsx)("div", {
                          style: { fontSize: 11, color: d },
                          children: "Estimated fees included",
                        }),
                        (0, t.jsxs)("div", {
                          style: { fontSize: 26, fontWeight: 800 },
                          children: [
                            y(K.price),
                            (0, t.jsx)("span", {
                              style: {
                                fontSize: 12,
                                color: d,
                                fontWeight: 400,
                              },
                              children: " ea",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, t.jsxs)("div", {
                  style: { borderTop: `1px solid ${l}`, padding: "16px 0" },
                  children: [
                    (0, t.jsx)("div", {
                      style: { fontWeight: 700 },
                      children: "Morgan Wallen",
                    }),
                    (0, t.jsx)("div", {
                      style: { fontSize: 14, color: "#aaa", marginBottom: 12 },
                      children: j(R.start),
                    }),
                    (0, t.jsx)("div", {
                      style: { fontWeight: 700 },
                      children: eF.name,
                    }),
                    (0, t.jsx)("div", {
                      style: { fontSize: 14, color: "#aaa" },
                      children: eF.address,
                    }),
                    (0, t.jsx)("div", {
                      style: { fontSize: 14, color: "#aaa", marginTop: 8 },
                      children: eJ(K, ei),
                    }),
                  ],
                }),
                (0, t.jsxs)("div", {
                  style: { borderTop: `1px solid ${l}`, padding: "16px 0" },
                  children: [
                    (0, t.jsx)("h3", {
                      style: {
                        fontSize: 16,
                        letterSpacing: 1,
                        margin: "0 0 12px",
                      },
                      children: "DELIVERY",
                    }),
                    (0, t.jsx)("div", {
                      style: { fontWeight: 700 },
                      children: "Mobile Transfer",
                    }),
                    (0, t.jsx)("div", {
                      style: { fontSize: 14, color: "#aaa", marginBottom: 12 },
                      children:
                        "When your tickets are ready, we’ll send a ticket transfer offer to your email.",
                    }),
                    (0, t.jsx)("div", {
                      style: { fontWeight: 700 },
                      children: "In Hand Date",
                    }),
                    (0, t.jsxs)("div", {
                      style: { fontSize: 14, color: "#aaa" },
                      children: [
                        "Tickets delivered by ",
                        ((g = new Date(
                          Date.UTC((e = v(R.start)).y, e.m - 1, e.da - 1),
                        )),
                        `${x[g.getUTCMonth()]} ${g.getUTCDate()}, ${g.getUTCFullYear()}`),
                      ],
                    }),
                  ],
                }),
                (K.saver || ei > 1) &&
                  (0, t.jsxs)("div", {
                    style: { borderTop: `1px solid ${l}`, padding: "16px 0" },
                    children: [
                      (0, t.jsx)("h3", {
                        style: {
                          fontSize: 16,
                          letterSpacing: 1,
                          margin: "0 0 12px",
                        },
                        children: "SEAT FEATURES",
                      }),
                      K.saver &&
                        (0, t.jsxs)(t.Fragment, {
                          children: [
                            (0, t.jsx)("div", {
                              style: { fontWeight: 700, color: s },
                              children: "◉ Seat Saver",
                            }),
                            (0, t.jsx)("div", {
                              style: {
                                fontSize: 14,
                                color: "#aaa",
                                margin: "2px 0 10px",
                              },
                              children:
                                "This Seat Saver listing is a service backed by our 100% buyer guarantee in which the seller is offering to buy tickets for you for a fixed price in the listed section.",
                            }),
                          ],
                        }),
                      ei > 1 &&
                        (0, t.jsx)("div", {
                          style: { fontSize: 14, color: "#aaa" },
                          children: "You’ll be seated together.",
                        }),
                    ],
                  }),
                (0, t.jsxs)("div", {
                  style: { borderTop: `1px solid ${l}`, padding: "16px 0" },
                  children: [
                    (0, t.jsx)("h3", {
                      style: {
                        fontSize: 16,
                        letterSpacing: 1,
                        margin: "0 0 12px",
                      },
                      children: "NOTES",
                    }),
                    (0, t.jsxs)("div", {
                      style: { fontSize: 14, color: "#aaa", lineHeight: 1.6 },
                      children: [
                        "Please note that you will need to use an iOS or Android mobile device to gain entry to your event.",
                        K.saver &&
                          " This Seat Saver listing is a service backed by our buyer guarantee in which the seller is offering to buy tickets for you for a fixed price in the listed section.",
                      ],
                    }),
                  ],
                }),
                (0, t.jsx)("div", {
                  ref: C,
                  children:
                    q &&
                    (0, t.jsxs)("div", {
                      style: {
                        background: "#111111",
                        border: `1px solid ${o}55`,
                        borderRadius: 12,
                        padding: "26px 20px",
                        marginTop: 10,
                      },
                      children: [
                        (0, t.jsx)("h2", {
                          style: { fontSize: 18, color: o, margin: "0 0 18px" },
                          children: [
                            "",
                            "Your details",
                            "Review order",
                            "Payment",
                          ][ee],
                        }),
                        (0, t.jsx)("div", {
                          style: { display: "flex", gap: 4, marginBottom: 22 },
                          children: [1, 2, 3].map((e) =>
                            (0, t.jsx)(
                              "div",
                              {
                                style: {
                                  flex: 1,
                                  height: 3,
                                  borderRadius: 2,
                                  background: ee >= e ? o : "#2a2a2a",
                                },
                              },
                              e,
                            ),
                          ),
                        }),
                        1 === ee &&
                          (0, t.jsxs)("div", {
                            children: [
                              (0, t.jsx)("p", {
                                style: {
                                  fontSize: 13,
                                  color: d,
                                  margin: "0 0 16px",
                                },
                                children:
                                  "Your tickets will be sent to your email after payment confirmation.",
                              }),
                              (0, t.jsxs)("div", {
                                style: {
                                  display: "grid",
                                  gridTemplateColumns: "1fr 1fr",
                                  gap: 12,
                                  marginBottom: 12,
                                },
                                children: [
                                  (0, t.jsxs)("div", {
                                    children: [
                                      eX("First name *"),
                                      eV(eh, eg, "First name"),
                                    ],
                                  }),
                                  (0, t.jsxs)("div", {
                                    children: [
                                      eX("Last name *"),
                                      eV(ex, eu, "Last name"),
                                    ],
                                  }),
                                ],
                              }),
                              (0, t.jsxs)("div", {
                                style: { marginBottom: 16 },
                                children: [
                                  eX("Email * (ticket delivery)"),
                                  eV(em, ef, "your@email.com", "email"),
                                ],
                              }),
                              ey &&
                                (0, t.jsx)("p", {
                                  style: {
                                    fontSize: 12,
                                    color: a,
                                    margin: "0 0 12px",
                                  },
                                  children: ey,
                                }),
                              (0, t.jsx)("button", {
                                type: "button",
                                style: e_,
                                onClick: () => {
                                  eh &&
                                  ex &&
                                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)
                                    ? (eb(""), et(2))
                                    : eb(
                                        "Please fill in all fields with a valid email.",
                                      );
                                },
                                children: "Review order",
                              }),
                            ],
                          }),
                        2 === ee &&
                          (0, t.jsxs)("div", {
                            children: [
                              (0, t.jsxs)("div", {
                                style: {
                                  background: r,
                                  border: `1px solid ${l}`,
                                  borderRadius: 8,
                                  padding: "18px 20px",
                                  marginBottom: 16,
                                },
                                children: [
                                  (0, t.jsxs)("div", {
                                    style: {
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 10,
                                      paddingBottom: 14,
                                      marginBottom: 6,
                                      borderBottom: `1px solid ${l}`,
                                    },
                                    children: [
                                      (0, t.jsx)("div", {
                                        style: {
                                          width: 12,
                                          height: 12,
                                          borderRadius: 2,
                                          background: K.color,
                                        },
                                      }),
                                      (0, t.jsxs)("div", {
                                        children: [
                                          (0, t.jsxs)("div", {
                                            style: {
                                              fontSize: 14,
                                              fontWeight: 700,
                                            },
                                            children: [
                                              K.title,
                                              K.row ? ` \xb7 Row ${K.row}` : "",
                                            ],
                                          }),
                                          (0, t.jsxs)("div", {
                                            style: { fontSize: 12, color: d },
                                            children: [
                                              eF.name,
                                              " · ",
                                              eF.city,
                                              " · ",
                                              j(R.start),
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  [
                                    ["Ticket holder", `${eh} ${ex}`],
                                    ["Email delivery", em],
                                    ["Seats", eJ(K, ei)],
                                    [
                                      "Quantity",
                                      `${ei} ticket${ei > 1 ? "s" : ""}`,
                                    ],
                                    ["Price per ticket", y(K.price)],
                                    ["Subtotal", b(eN)],
                                  ].map(([e, i]) =>
                                    (0, t.jsxs)(
                                      "div",
                                      {
                                        style: {
                                          display: "flex",
                                          justifyContent: "space-between",
                                          gap: 12,
                                          padding: "8px 0",
                                          fontSize: 13,
                                          borderBottom: "1px solid #1a1a1a",
                                        },
                                        children: [
                                          (0, t.jsx)("span", {
                                            style: { color: d },
                                            children: e,
                                          }),
                                          (0, t.jsx)("span", {
                                            style: {
                                              fontWeight: 600,
                                              textAlign: "right",
                                            },
                                            children: i,
                                          }),
                                        ],
                                      },
                                      e,
                                    ),
                                  ),
                                  el &&
                                    (0, t.jsxs)("div", {
                                      style: {
                                        display: "flex",
                                        justifyContent: "space-between",
                                        padding: "8px 0",
                                        fontSize: 13,
                                        color: s,
                                      },
                                      children: [
                                        (0, t.jsxs)("span", {
                                          children: [
                                            "Promo ",
                                            p,
                                            " (",
                                            30,
                                            "% off)",
                                          ],
                                        }),
                                        (0, t.jsxs)("span", {
                                          children: ["−", b(eO)],
                                        }),
                                      ],
                                    }),
                                  !1,
                                  !1,
                                  (0, t.jsxs)("div", {
                                    style: {
                                      display: "flex",
                                      justifyContent: "space-between",
                                      paddingTop: 14,
                                      fontSize: 19,
                                      fontWeight: 800,
                                    },
                                    children: [
                                      (0, t.jsx)("span", { children: "Total" }),
                                      (0, t.jsx)("span", {
                                        style: { color: o },
                                        children: b(eE),
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, t.jsxs)("div", {
                                style: {
                                  display: "flex",
                                  gap: 8,
                                  marginBottom: 6,
                                  flexWrap: "wrap",
                                },
                                children: [
                                  (0, t.jsx)("input", {
                                    value: eo,
                                    onChange: (e) => {
                                      er(e.target.value.toUpperCase());
                                      ea(!1);
                                      ed("");
                                      ep("");
                                    },
                                    placeholder: "PROMO CODE",
                                    maxLength: 8,
                                    style: {
                                      background: r,
                                      border: `1px solid ${"ok" === es ? s : "error" === es ? a : l}`,
                                      borderRadius: 6,
                                      padding: "11px 14px",
                                      color: "ok" === es ? s : c,
                                      fontFamily: "monospace",
                                      fontSize: 16,
                                      width: 160,
                                      outline: "none",
                                    },
                                  }),
                                  (0, t.jsx)("button", {
                                    type: "button",
                                    onClick: () => {
                                      if (eo.trim().toUpperCase() !== p) {
                                        (ed("error"),
                                          ep("Invalid promo code."),
                                          ea(!1));
                                        return;
                                      }
                                      (ed("ok"),
                                        ep("✓ 30% discount applied!"),
                                        ea(!0));
                                    },
                                    style: eQ,
                                    children: "Apply",
                                  }),
                                ],
                              }),
                              ec &&
                                (0, t.jsx)("p", {
                                  style: {
                                    fontSize: 12,
                                    color: "ok" === es ? s : a,
                                    margin: "0 0 12px",
                                  },
                                  children: ec,
                                }),
                              (0, t.jsxs)("div", {
                                style: {
                                  display: "flex",
                                  gap: 10,
                                  marginTop: 14,
                                },
                                children: [
                                  (0, t.jsx)("button", {
                                    type: "button",
                                    style: eQ,
                                    onClick: () => et(1),
                                    children: "Back",
                                  }),
                                  (0, t.jsx)("button", {
                                    type: "button",
                                    style: e_,
                                    onClick: () => {
                                      (ek(null), et(3));
                                    },
                                    children: "Proceed to payment",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        3 === ee &&
                          (0, t.jsxs)("div", {
                            children: [
                              (0, t.jsxs)("div", {
                                style: {
                                  background: r,
                                  border: `1px solid ${l}`,
                                  borderRadius: 8,
                                  padding: "14px 18px",
                                  marginBottom: 18,
                                  display: "flex",
                                  justifyContent: "space-between",
                                  gap: 12,
                                  alignItems: "center",
                                },
                                children: [
                                  (0, t.jsxs)("div", {
                                    children: [
                                      (0, t.jsx)("div", {
                                        style: {
                                          fontSize: 13,
                                          fontWeight: 700,
                                        },
                                        children: K.title,
                                      }),
                                      (0, t.jsxs)("div", {
                                        style: { fontSize: 11, color: d },
                                        children: [
                                          eF.name,
                                          " · ",
                                          ei,
                                          " ticket",
                                          ei > 1 ? "s" : "",
                                          " · ",
                                          em,
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, t.jsx)("div", {
                                    style: {
                                      fontFamily: "monospace",
                                      fontWeight: 800,
                                      color: o,
                                      fontSize: 20,
                                    },
                                    children: b(eE),
                                  }),
                                ],
                              }),
                              ej &&
                                (0, t.jsx)("p", {
                                  style: {
                                    fontSize: 12,
                                    color: a,
                                    margin: "0 0 12px",
                                  },
                                  children: ej,
                                }),
                              (0, t.jsx)("p", {
                                style: {
                                  fontSize: 12,
                                  color: d,
                                  margin: "0 0 12px",
                                },
                                children: "Choose your payment method:",
                              }),
                              (0, t.jsxs)("div", {
                                style: {
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: 10,
                                  marginBottom: 16,
                                },
                                children: [
                                  (0, t.jsxs)("button", {
                                    type: "button",
                                    onClick: () => {
                                      if (!K || !R || !eF) return;
                                      let e = `CW_CA_${R.id}_${Date.now()}`;
                                      (eK("cashapp", e),
                                        localStorage.setItem(
                                          "cw_cashapp_order",
                                          JSON.stringify({
                                            items: [
                                              {
                                                name: eG(),
                                                price: K.price,
                                                size: j(R.start),
                                                quantity: ei,
                                              },
                                            ],
                                            total: eE,
                                            form: {
                                              firstName: eh,
                                              lastName: ex,
                                              email: em,
                                            },
                                            type: "tickets",
                                            orderId: e,
                                          }),
                                        ),
                                        z.push("/checkout/cashapp"));
                                    },
                                    style: {
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      gap: 10,
                                      padding: 16,
                                      borderRadius: 8,
                                      background: "#00D54B",
                                      color: "#000",
                                      border: "none",
                                      fontSize: 15,
                                      fontWeight: 700,
                                      cursor: "pointer",
                                    },
                                    children: [
                                      (0, t.jsx)("span", {
                                        style: {
                                          fontSize: 20,
                                          fontWeight: 900,
                                        },
                                        children: "$",
                                      }),
                                      " Pay with Cash App — ",
                                      b(eE),
                                    ],
                                  }),
                                  (0, t.jsxs)("button", {
                                    type: "button",
                                    onClick: eY,
                                    disabled: ev,
                                    style: {
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      gap: 10,
                                      padding: 16,
                                      borderRadius: 8,
                                      background: "#F7931A",
                                      color: "#000",
                                      border: "none",
                                      fontSize: 15,
                                      fontWeight: 700,
                                      cursor: ev ? "not-allowed" : "pointer",
                                      opacity: ev ? 0.7 : 1,
                                    },
                                    children: [
                                      (0, t.jsx)("span", {
                                        style: { fontSize: 20 },
                                        children: "₿",
                                      }),
                                      " ",
                                      ev
                                        ? "Redirecting..."
                                        : "Pay with Bitcoin",
                                      " — ",
                                      b(eE),
                                    ],
                                  }),
                                ],
                              }),
                              (0, t.jsx)("button", {
                                type: "button",
                                onClick: () => et(2),
                                style: {
                                  background: "none",
                                  border: "none",
                                  color: d,
                                  cursor: "pointer",
                                  fontSize: 12,
                                  textDecoration: "underline",
                                },
                                children: "Back to review",
                              }),
                              (0, t.jsxs)("p", {
                                style: {
                                  fontSize: 11,
                                  color: d,
                                  marginTop: 14,
                                  lineHeight: 1.6,
                                },
                                children: [
                                  "Tickets will be emailed to ",
                                  (0, t.jsx)("strong", {
                                    style: { color: c },
                                    children: em,
                                  }),
                                  " once payment is confirmed.",
                                ],
                              }),
                            ],
                          }),
                      ],
                    }),
                }),
                (0, t.jsx)("div", {
                  style: {
                    position: "fixed",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 100,
                    background: "#0c0c0c",
                    borderTop: `1px solid ${l}`,
                    padding: "12px 16px",
                  },
                  children: (0, t.jsxs)("div", {
                    style: {
                      maxWidth: 760,
                      margin: "0 auto",
                      display: "flex",
                      gap: 12,
                    },
                    children: [
                      (0, t.jsx)("select", {
                        value: ei,
                        onChange: (e) => {
                          (en(Number(e.target.value)),
                            ea(!1),
                            ed("idle"),
                            ep(""));
                        },
                        style: {
                          flex: "0 0 40%",
                          background: r,
                          color: c,
                          border: `1px solid ${l}`,
                          borderRadius: 8,
                          padding: "0 12px",
                          fontSize: 16,
                          height: 50,
                        },
                        children: h(K.lo, K.hi).map((e) =>
                          (0, t.jsxs)(
                            "option",
                            {
                              value: e,
                              children: [e, " ticket", "1" === e ? "" : "s"],
                            },
                            e,
                          ),
                        ),
                      }),
                      (0, t.jsxs)("button", {
                        type: "button",
                        onClick: () => {
                          (Z(!0),
                            et(1),
                            setTimeout(
                              () =>
                                C.current?.scrollIntoView({
                                  behavior: "smooth",
                                  block: "start",
                                }),
                              80,
                            ));
                        },
                        style: {
                          flex: 1,
                          height: 50,
                          background: "#d6389a",
                          color: "#fff",
                          border: "none",
                          borderRadius: 8,
                          fontSize: 17,
                          fontWeight: 700,
                          cursor: "pointer",
                        },
                        children: [
                          "Checkout",
                          q ? "" : ` \xb7 ${b(K.price * ei)}`,
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            }),
        ],
      });
    },
  ]);
};
