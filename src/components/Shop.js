export default (e) => {
  "use strict";
  var t = e.i(40450),
    r = e.i(13742),
    i = e.i(30037);
  let a = [
      {
        id: "reserve-hoodie",
        name: "Reserve Hoodie",
        category: "hoodies",
        price: 69.99,
        image: "/merch/reserve-hoodie.jpg",
        sizes: ["S", "M", "L", "XL", "XXL"],
        tag: "BESTSELLER",
        description:
          "Premium heavyweight pullover hoodie in black with gold embroidered Reserve logo.",
      },
      {
        id: "mw-tour2026-signed-guitar",
        name: "Morgan Wallen Tour 2026 Limited Collector Acoustic Guitar",
        category: "instruments",
        price: 620.99,
        image: "/merch/mw-tour2026-signed-guitar.jpg",
        sizes: ["newcollection"],
        tag: "Collector's Item",
        description:
          "Celebrate the 'Still The Problem' Tour 2026 with this exclusive Morgan Wallen collector acoustic guitar. Showcasing custom full-body artwork, signature-inspired detailing, and a handcrafted natural wood design, this limited-edition piece comes complete with a Certificate of Authenticity. A standout display item and keepsake created for serious collectors and Morgan Wallen fans.",
      },
      {
        id: "mw-collector-turntable",
        name: "Morgan Wallen Collector's Edition Bluetooth Turntable",
        category: "newcollection",
        price: 150.99,
        image: "/merch/mw-collector-turntable.jpg",
        sizes: ["Standard"],
        tag: "Limited Edition",
        description:
          "Exclusive Morgan Wallen collector's edition portable Bluetooth turntable featuring custom artwork, built-in stereo speakers, wireless streaming, rechargeable battery, and 33/45 RPM vinyl playback. Crafted for music lovers and collectors seeking a unique listening experience.",
      },
      {
        id: "mw-clemson",
        name: "Morgan Wallen Norris Bear Shirt",
        category: "newcollection",
        price: 50.99,
        image: "/merch/norris-bear-t-shirt.jpg",
        sizes: ["S", "M", "L", "XL", "XXL"],
        tag: "Limited Edition",
        description: "Norris bear t-shirt.",
      },
      {
        id: "mw-cl",
        name: "Morgan Wallen Norris Bear Hat",
        category: "hats",
        price: 35.99,
        image: "/merch/norris-bear-hat.jpg",
        sizes: ["One Size"],
        tag: "Limited Edition",
        description: "Norris bear hat.",
      },
      {
        id: "ls-tee",
        name: "I Am The Problem Long Sleeve Baby Tee",
        category: "tees",
        price: 44.99,
        image: "/merch/i-am-the-problem.jpg",
        sizes: ["S", "M", "L", "XL", "XXL"],
        tag: "",
        description:
          "Natural micro rib long sleeve baby tee featuring screen printed graphics on front, back, and sleeves.",
      },
      {
        id: "mw-been-bynow-tshirt",
        name: "Been By Now T Shirt",
        category: "tees",
        price: 50.99,
        image: "/merch/bbt.jpg",
        sizes: ["S", "M", "L", "XL", "XXL"],
        tag: "LIMITED",
        description:
          "Blue garment dyed pocket t-shirt featuring a printed logo on the front pocket and screen printed graphics on the back.",
      },
      {
        id: "ty-tee",
        name: "Thank Yew T Shirt",
        category: "hats",
        price: 39.99,
        image: "/merch/thank-yew-t-shirt.jpg",
        sizes: ["One Size"],
        tag: "LIMITED",
        description:
          "Espresso garment dyed t-shirt featuring screen printed graphics on front and sleeve.",
      },
      {
        id: "dwzu-hoodie",
        name: "Dont We Zip Up Hoodie",
        category: "jackets",
        price: 80.99,
        image: "/merch/dont-we-zip-up-hopdie.jpg",
        sizes: ["S", "M", "L", "XL"],
        tag: "NEW",
        description:
          "Army green midweight full zip hoodie featuring screen printed graphics on front and back.",
      },
      {
        id: "wallen-hunting-hat",
        name: "Hunting Hat",
        category: "hats",
        price: 44.99,
        image: "/merch/wallen-hunting-hat.jpg",
        sizes: ["One Size"],
        tag: "",
        description:
          "Natural and black two tone hat featuring embroidered graphics on front.",
      },
      {
        id: "bl-tee",
        name: "Blue Jersey",
        category: "newcollection",
        price: 99.99,
        image: "/merch/bl-tee.jpg",
        sizes: ["S", "M", "L", "XL"],
        tag: "NEW",
        description:
          "Custom Order Morgan Wallen Tennessee Vols Football Jersey.",
      },
      {
        id: "bla-tee",
        name: "Grey Jersey",
        category: "newcollection",
        price: 99.99,
        image: "/merch/g-shirt.jpg",
        sizes: ["S", "M", "L", "XL"],
        tag: "NEW",
        description:
          "Morgan Wallen 16 Tennessee Volunteers Charcoal Grey Jersey, Stitched, All Sizes.",
      },
      {
        id: "ball-tee",
        name: "Baseball Jersey",
        category: "newcollection",
        price: 199.99,
        image: "/merch/ball-shirt.jpg",
        sizes: ["S", "M", "L", "XL"],
        tag: "NEW",
        description:
          "Morgan Wallen Still The Problem Tour Official Merch Baseball Jersey.",
      },
      {
        id: "tee-graphic",
        name: "Still The Problem Tee",
        category: "tees",
        price: 49.99,
        image: "/merch/still-the-problem-tee.jpg",
        sizes: ["S", "M", "L", "XL", "XXL"],
        tag: "NEW",
        description:
          "Graphic tee inspired by the Still the Problem Tour. Vintage wash finish.",
      },
      {
        id: "ns-graphic",
        name: "Noris Bear Morgan Wallen Shirt",
        category: "newcollection",
        price: 160.99,
        image: "/merch/noris-tee.jpg",
        sizes: ["S", "M", "L", "XL", "XXL"],
        tag: "NEW",
        description: "Norris Bear Morgan Wallen Shirt with 2026 Tour Bag.",
      },
      {
        id: "hoodie-cream",
        name: "Reserve Hoodie (Cream)",
        category: "hoodies",
        price: 89.99,
        image: "/merch/reserve-hoodie-cream.jpg",
        sizes: ["S", "M", "L", "XL"],
        tag: "",
        description:
          "Same premium pullover hoodie in a warm cream colorway with gold detailing.",
      },
      {
        id: "mw-hat",
        name: "Morgan Wallen x Field & Stream Camo Hat",
        category: "hats",
        price: 36.99,
        image: "/merch/mw-camo-hat.jpg",
        sizes: ["One Size"],
        tag: "",
        description:
          "Camo trucker hat featuring an embroidered patch sewn onto the front.",
      },
    ],
    o = ["All", "hoodies", "tees", "hats", "jackets", "newcollection"];
  e.s([
    "default",
    0,
    function () {
      let e = (0, i.useRouter)(),
        [n, s] = (0, r.useState)("All"),
        [l, c] = (0, r.useState)({}),
        d = "All" === n ? a : a.filter((e) => e.category === n);
      return (0, t.jsx)("div", {
        style: {
          minHeight: "100vh",
          background: "#0a0a0a",
          padding: "60px 24px 100px",
        },
        children: (0, t.jsxs)("div", {
          style: { maxWidth: 1200, margin: "0 auto" },
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
                    marginBottom: 12,
                  },
                  children: "Official Merch",
                }),
                (0, t.jsx)("h1", {
                  style: {
                    fontSize: "clamp(28px, 4vw, 48px)",
                    color: "#f0e8d0",
                  },
                  children: "The Reserve Shop",
                }),
                (0, t.jsx)("div", {
                  style: {
                    width: 40,
                    height: 1,
                    background: "#c8a84b",
                    margin: "20px auto 0",
                  },
                }),
              ],
            }),
            (0, t.jsx)("div", {
              style: {
                display: "flex",
                justifyContent: "center",
                gap: 8,
                marginBottom: 48,
                flexWrap: "wrap",
              },
              children: o.map((e) =>
                (0, t.jsx)(
                  "button",
                  {
                    type: "button",
                    onClick: () => s(e),
                    style: {
                      padding: "8px 20px",
                      background: n === e ? "#c8a84b" : "transparent",
                      color: n === e ? "#0a0a0a" : "#5a5040",
                      border: `1px solid ${n === e ? "#c8a84b" : "#2a2a2a"}`,
                      fontSize: 11,
                      letterSpacing: 3,
                      textTransform: "uppercase",
                      borderRadius: 2,
                      cursor: "pointer",
                      transition: "all 0.15s",
                    },
                    children:
                      "All" === e
                        ? "All Items"
                        : e.charAt(0).toUpperCase() + e.slice(1),
                  },
                  e,
                ),
              ),
            }),
            (0, t.jsx)("div", {
              style: {
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 24,
              },
              children: d.map((r) =>
                (0, t.jsxs)(
                  "div",
                  {
                    style: {
                      background: "#111",
                      border: "1px solid #1a1a1a",
                      borderRadius: 2,
                      overflow: "hidden",
                      transition: "border-color 0.2s",
                    },
                    onMouseEnter: (e) =>
                      (e.currentTarget.style.borderColor = "#3a3020"),
                    onMouseLeave: (e) =>
                      (e.currentTarget.style.borderColor = "#1a1a1a"),
                    children: [
                      (0, t.jsxs)("div", {
                        style: {
                          background: "#1a1a1a",
                          aspectRatio: "1/1",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          position: "relative",
                          overflow: "hidden",
                        },
                        children: [
                          (0, t.jsx)("img", {
                            src: r.image,
                            alt: r.name,
                            style: {
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            },
                            onError: (e) => {
                              e.currentTarget.style.display = "none";
                              let t = e.currentTarget.parentElement;
                              t && (t.style.background = "#1a1a1a");
                            },
                          }),
                          r.tag &&
                            (0, t.jsx)("div", {
                              style: {
                                position: "absolute",
                                top: 12,
                                left: 12,
                                background: "#c8a84b",
                                color: "#0a0a0a",
                                padding: "4px 10px",
                                fontSize: 9,
                                letterSpacing: 2,
                                fontWeight: "bold",
                              },
                              children: r.tag,
                            }),
                        ],
                      }),
                      (0, t.jsxs)("div", {
                        style: { padding: "20px 20px 24px" },
                        children: [
                          (0, t.jsx)("h3", {
                            style: {
                              fontSize: 15,
                              color: "#c0b080",
                              marginBottom: 6,
                              letterSpacing: 0.5,
                            },
                            children: r.name,
                          }),
                          (0, t.jsx)("p", {
                            style: {
                              fontSize: 12,
                              color: "#3a3020",
                              marginBottom: 16,
                              lineHeight: 1.6,
                            },
                            children: r.description,
                          }),
                          (0, t.jsxs)("div", {
                            style: {
                              fontSize: 20,
                              color: "#c8a84b",
                              marginBottom: 16,
                            },
                            children: ["$", r.price],
                          }),
                          r.sizes.length > 1
                            ? (0, t.jsx)("select", {
                                value: l[r.id] || r.sizes[0],
                                onChange: (e) =>
                                  c((t) => ({ ...t, [r.id]: e.target.value })),
                                style: {
                                  marginBottom: 12,
                                  fontSize: 12,
                                  letterSpacing: 1,
                                },
                                children: r.sizes.map((e) =>
                                  (0, t.jsx)(
                                    "option",
                                    { value: e, children: e },
                                    e,
                                  ),
                                ),
                              })
                            : (0, t.jsx)("p", {
                                style: {
                                  fontSize: 11,
                                  color: "#3a3020",
                                  letterSpacing: 2,
                                  marginBottom: 12,
                                },
                                children: "ONE SIZE",
                              }),
                          (0, t.jsx)("button", {
                            type: "button",
                            onClick: () => {
                              let t, i, a;
                              return (
                                (t = l[r.id] || r.sizes[0]),
                                void ((a = (i = JSON.parse(
                                  localStorage.getItem("cw_cart") || "[]",
                                )).findIndex(
                                  (e) => e.id === r.id && e.size === t,
                                )) > -1
                                  ? (i[a].quantity += 1)
                                  : i.push({ ...r, size: t, quantity: 1 }),
                                localStorage.setItem(
                                  "cw_cart",
                                  JSON.stringify(i),
                                ),
                                e.push("/checkout"))
                              );
                            },
                            style: {
                              width: "100%",
                              background: "transparent",
                              border: "1px solid #c8a84b",
                              color: "#c8a84b",
                              padding: "11px",
                              fontSize: 11,
                              letterSpacing: 3,
                              textTransform: "uppercase",
                              fontWeight: "bold",
                              borderRadius: 2,
                              cursor: "pointer",
                              transition: "all 0.15s",
                            },
                            onMouseEnter: (e) => {
                              ((e.currentTarget.style.background = "#c8a84b"),
                                (e.currentTarget.style.color = "#0a0a0a"));
                            },
                            onMouseLeave: (e) => {
                              ((e.currentTarget.style.background =
                                "transparent"),
                                (e.currentTarget.style.color = "#c8a84b"));
                            },
                            children: "Add to Cart",
                          }),
                        ],
                      }),
                    ],
                  },
                  r.id,
                ),
              ),
            }),
          ],
        }),
      });
    },
  ]);
};
