export default (e) => {
  "use strict";
  function t(e) {
    return e
      .toLowerCase()
      .replace(/['’‘]/g, "")
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  let a = [
    "AVERY ANNA",
    "BLAKE WHITEN",
    "CARTER FAITH",
    "COLE SWINDELL",
    "COREY KENT",
    "COREY SMITH",
    "ELLA LANGLEY",
    "EMPIRE OF THE SUN",
    "FLO RIDA",
    "GAVIN ADCOCK",
    "GIRL TALK",
    "GUCCI MANE",
    "HUDSON WESTBROOK",
    "JACOB HACKWORTH",
    "JASON SCOTT & THE HIGH HEAT",
    "JUICY J",
    "KAMERON MARLOWE",
    "KASHUS CULPEPPER",
    "KENNY WHITMIRE",
    "KINGS OF LEON",
    "KOE WETZEL",
    "KYGO",
    "MIDLAND",
    "MORGAN WALLEN",
    "NELLY",
    "PHIL KANE",
    "PROJECT PAT",
    "RICK ROSS",
    "THIRD EYE BLIND",
    "VINCENT MASON",
    "WAYLON WYATT",
    "YING YANG TWINS",
    "ZACH JOHN KING",
  ].map((e) => ({ name: e, img: `/sib/lineup/${t(e)}.jpeg` }));
  function i(e, t, a) {
    return [
      {
        key: "single",
        title: `Single 3-Day ${"GA" === e ? "" : e + " "}Pass`.replace(
          "  ",
          " ",
        ),
        desc: "One wristband for all three days, May 21–23, 2027.",
        price: t,
        qty: 1,
      },
      {
        key: "4pack",
        title: `${e} 4-Pack`,
        desc: `This is a 3-Day ${e} pass x 4 with just 1 click. Price shown x 4`,
        price: t,
        qty: 4,
      },
      {
        key: "bundle",
        title: `${e} + Shuttle Bundle`,
        desc: `Single ${e} Pass + Single Shuttle Pass Bundle and save $10!`,
        price: a,
        qty: 1,
        shuttleMap: !0,
      },
    ];
  }
  let o = [
      "– Sand In My Boots merchandise bundles will ship to the address provided at checkout if purchased by May 1, 2027. If purchased after May 1, 2027, merchandise bundles will be available for pick up at Festival Merchandise at the Event.",
      "– Please note, merchandise bundles will ship separately from festival passes.",
    ],
    n = [
      {
        id: "ga",
        name: "GENERAL ADMISSION PASS",
        short: "GA",
        price: 676.87,
        intro:
          "Includes one (1) 3-Day pass with access to all general admission areas of the festival, all weekend long. Enjoy tons of food & beverage vendors, activities, swimming and beach club access and more. Bundle your GA admission with a shuttle pass to save!",
        variants: i("GA", 676.87, 742.87),
      },
      {
        id: "party-pit",
        name: "PARTY PIT PASS",
        short: "Party Pit",
        price: 1354.87,
        intro:
          "Includes one (1) 3-Day Party Pit pass. Lean in a little closer than GA with weekend access to a front-of-stage, standing-room-only Party Pit viewing area at the Main Stage.",
        mapKind: "party-pit",
        learnMore: {
          bullets: [
            "Exclusive access to the Party Pit for the final three Main Stage performances each day.",
            "Access to dedicated bar and restrooms located within the Party Pit viewing area",
            "Admission to all general admission areas of the festival all weekend long, plus tons of food & beverage vendors, daytime activities, swimming and beach club access and more",
          ],
        },
        variants: i("Party Pit", 1354.87, 1420.87),
      },
      {
        id: "vip",
        name: "VIP PASS",
        short: "VIP",
        price: 2484.87,
        intro:
          "One (1) 3-Day VIP pass with elevated amenities and perks to boost your comfort, views, and access for the best weekend on the beach.",
        mapKind: "vip-areas",
        learnMore: {
          bullets: [
            "Admission to all general admission areas of the festival",
            "Access to front of stage standing room only VIP viewing areas at both stages",
            "Access to This Beach Club featuring:",
            "– Dipping pools and poolside loungers with views of the Main Stage",
            "– Complimentary bar with hand-poured cocktails, beer, seltzer and wine from festival partners",
            "– Complimentary VIP buffet with options for all types of diets and cravings open from 2pm - 7pm (up to 2 meal redemptions per person, per day)",
            "– Late night grub and snack drops",
            "– Rejuvenation amenities to keep you feeling your best",
            "– Private air-conditioned restrooms",
            "– Shaded areas to relax with seating, loungers and misting coolers",
            "– Private WiFi network to keep you connected",
            "– Dedicated charging lockers available for purchase",
            "– Concierge service to ensure you have the time of your life",
            "Dedicated VIP entry lane at every festival entrance",
            "Exclusive Sand In My Boots merchandise bundle including:",
            "– Quick-dry Nylon Embroidered Norris Bear Hat",
            "– Dashboard Norris Bear",
            "– Rechargeable Hand Fan",
            ...o,
          ],
        },
        variants: i("VIP", 2484.87, 2550.87),
      },
      {
        id: "super-vip",
        name: "SUPER VIP PASS",
        short: "Super VIP",
        price: 3614.87,
        intro:
          "Includes one (1) 3-Day Super VIP pass. All the perks of VIP plus exclusive access to the private 7 Summers Sandbar and Super VIP Dining Room, upfront viewing areas, dedicated entry, and so much more for the ultimate elevated experience.",
        mapKind: "vip-areas",
        learnMore: {
          lead: "All of the perks of VIP as well as:",
          bullets: [
            "Access to the private 7 Summers Sandbar featuring:",
            "– Elevated, unobstructed views of Main Stage",
            "– Complimentary bar with hand-poured cocktails, beer, seltzer and wine from festival partners",
            "– Shaded area to relax in, with comfortable seating, loungers and phone charging",
            "– Private WiFi network to keep you connected",
            "– Private air-conditioned restrooms",
            "– Dedicated Super VIP concierge service to ensure you have the time of your life",
            "Access to the air-conditioned Super VIP Dining Room featuring:",
            "– Complimentary gourmet lunch and dinner service with unique offerings each day",
            "– Family-style tables and communal seating to enjoy your meal with friends & family",
            "– Complimentary bar with hand-poured cocktails, beer, seltzer and wine from festival partners",
            "Access to dedicated Super VIP up front viewing at both stages",
            "Dedicated Super VIP entry lane at the West festival entrance that provides direct access to the Main Stage VIP area",
            "Exclusive Sand In My Boots merchandise bundle including:",
            "– Quick-dry Nylon Embroidered Norris Bear Hat",
            "– Dashboard Norris Bear",
            "– Rechargeable Hand Fan",
            "– 100% Cotton Towel & Carrier",
            ...o,
          ],
        },
        variants: i("Super VIP", 3614.87, 3680.87),
      },
      {
        id: "livin-the-dream",
        name: "LIVIN' THE DREAM PASS",
        short: "Livin’ The Dream",
        price: 7698.9,
        intro:
          "The name says it all. Live your dream weekend with one (1) 3-Day Livin’ The Dream pass.",
        mapKind: "vip-areas",
        learnMore: {
          lead: "All of the perks of Super VIP as well as:",
          bullets: [
            "Access to dedicated up front Livin’ The Dream Viewing Areas at both stages",
            "Access to the Livin’ The Dream Lounge featuring:",
            "– Elevated, unobstructed views of the Main Stage, with quick access to all VIP and Super VIP amenities",
            "– Shaded area to relax in, with comfortable seating and phone charging",
            "– Private WiFi network to keep you connected",
            "– Complimentary charging lockers (1 per person)",
            "– Complimentary bar with hand-poured cocktails, beer, seltzer and wine from festival partners",
            "– Delicious small bites and snacks throughout the day",
            "– Dedicated Livin’ The Dream concierge service",
            "On-stage photo opportunity at the Main Stage before the music starts",
            "Limited edition Sand In My Boots screenprinted poster",
            "Beach buggy shuttle service between the festival stages",
            "Exclusive Sand In My Boots merchandise bundle including:",
            "– Quick-dry Nylon Embroidered Norris Bear Hat",
            "– Dashboard Norris Bear",
            "– Rechargeable Hand Fan",
            "– 100% Cotton Towel & Carrier",
            "– Beach Tote",
            ...o,
          ],
        },
        variants: [
          {
            key: "single",
            title: "Livin’ The Dream",
            desc: "One (1) 3-Day Livin’ The Dream pass.",
            price: 7698.9,
            qty: 1,
          },
        ],
      },
    ],
    s = "accesshelp@clubwallen.site",
    r = [
      {
        group: "EVENT INFORMATION",
        items: [
          {
            title: "General Info",
            body: [
              "All ages welcome.",
              "Fans 17 years and under must be accompanied by a ticket-holding adult over the age of 21.",
              "Children aged 5 and under are admitted FREE if accompanied by a pass-holding parent or guardian. For the safety of all attendees, we cannot admit more than 2 children per supervising parent or guardian.",
              "Sand In My Boots is a cashless festival.",
              "Festival will take place rain or shine.",
              "Lineup, set times, festival hours and venue schedule subject to change.",
              "There is no parking at Sand In My Boots, so you’ll need to park where you are staying, or hop on the local shuttle for show day transportation.",
              "A valid, physical government-issued photo ID is required for entry where applicable and for the purchase of alcohol. School IDs, expired IDs, photos or photocopies of IDs, and digital IDs will not be accepted for event entry or alcohol purchases.",
            ],
          },
          {
            title: "Hours & Location",
            body: [
              "Sand In My Boots is located at 101 E Beach Blvd, Gulf Shores, AL 36542.",
              "Venue opens at 12 PM CT*",
              "*Lineup, set times, festival hours and venue schedule subject to change.",
            ],
          },
          {
            title: "What Can I Bring?",
            body: [
              "Check our list of permitted items on the official festival site before you head to the venue.",
            ],
          },
        ],
      },
      {
        group: "ACCESSIBILITY, SAFETY & MOBILITY",
        items: [
          {
            title: "Accessibility",
            body: [
              "Sand In My Boots welcomes all people including those with disabilities. We are dedicated to continually improving our efforts to ensure attendees have the opportunity to access all event goods and services at an equitable level. We strive to provide accessible experiences for our patrons, bearing in mind that some resources are finite. We ask that patrons are mindful when requesting accommodations.",
            ],
          },
          {
            title: "Safety",
            body: [
              `Please review the allowed and prohibited items for the venue as well as the code of conduct and the bag policy. If you have any questions about these policies, as it pertains to a reasonable accommodation as a person with a disability, please email our Accessibility Director at ${s}`,
            ],
          },
          {
            title: "Our Venue & Mobility Devices",
            body: [
              "Our venue is set against the beautiful beachfront of Alabama’s Gulf Coast. Accessible routes have been established throughout the venue with the intention of making getting around easier for patrons using mobility devices. These routes offer access to accessible parking, venue entrances, accessible stage viewing areas, restrooms, merchandise, and food & beverage vendors.",
              "Guests will need to traverse our beachy venue independently or with the assistance of their companion. Our staff cannot provide personal assistance. Mobility devices and aides are welcome without question at our event. We encourage guests to consider the beachy terrain when planning to attend using personal mobility devices, including wheelchairs and mobility scooters. Mobility Aides such as crutches, walkers and canes are also welcome.",
              "Mobility devices that can pose a public safety risk, including but not limited to golf carts, bicycles, electric bikes and/or all terrain vehicles, are prohibited.",
              `Please note: mobility devices will not be available to rent or borrow at this show. Any patron who requires a mobility device must bring their own. If you have a question about your mobility device, please email the Accessibility Director at ${s}`,
              "Charging for mobility devices will be available at the Access Center. Patrons must bring their own charging cords/equipment. These devices must be compatible with a 110-volt, 20 amp circuit. Please note: The Access Team cannot secure mobility devices when charging, these devices should not be left unattended.",
            ],
          },
          {
            title: "Accessible Parking",
            body: [
              "There will be an Accessible Drop-Off & Pick-Up located at the Accessible Parking lot. Patrons with disabilities can be dropped off by friends and family here. Entry to the Accessible Parking lot for drop-off and pick-up will require a valid, government-issued Accessible Parking placard, permit, or license plate. Please follow directional signage and traffic attendant instructions.",
              `If you anticipate being dropped-off or picked-up in a vehicle that does have a government issued Accessible Parking placard or plate and you have questions about the drop-off & pick-up, please email our Accessibility Director at ${s}`,
              "Accessible parking location details will be available prior to the event, closer to show days.",
            ],
          },
          {
            title: "Offsite Accessible Shuttles",
            body: [
              "Sand In My Boots Shuttles provide accessible transportation to and from the venue. Please visit the getting here page for more information. There will not be an Accessible Shuttle for transportation inside the festival.",
            ],
          },
          {
            title: "Access Lane at Entrances",
            body: [
              "There will be an Access Lane available at each entrance to the venue. This lane is intended for patrons with disabilities and those that may have a pre-approved accommodation. Please look for the universal symbol for accessibility, the wheelchair.",
              "All patrons will be subject to security screening prior to entering the venue. If you are unable to undergo a traditional security screening, please alert a security guard for assistance.",
            ],
          },
          {
            title: "Service Animals",
            body: [
              "Sand In My Boots does not support pets being misrepresented by their owners as trained service animals. Pets must stay at home, no exceptions. This is for the safety of all our fans and trained service animals. A rocking music event is frightening and stressful for an untrained animal.",
              "A Service Animal is a canine or miniature-pony that has been trained to perform one (or more) specific task(s) for the person with a disability that it serves. Emotional Support Animals or Therapy Animals are not considered Service Animals as defined by the Americans with Disabilities Act and therefore are not allowed into our venue.",
              "If you are bringing a trained service animal (as defined above) into the venue, use the Access Lane and inform the security staff that you have a working animal with you. A member of the Access Team will meet you at the gate and you will receive a short screening by a member of the Access Team. A band will then be placed on the collar or harness of your Service Animal. This band is purely a visual alert to all our staff that you have already been screened and ensure that you are not stopped and asked multiple times in the different areas of the event. This tag is only for your ease of movement throughout the venue and is not a credential to get you into the festival. You must have a ticket to enter the show.",
              "Please note, you will not be asked for any documentation for your service animal to gain entry. All canine service animals must have proof of current and valid rabies vaccination on them or with their handlers at all times in public places, this is in accordance with local regulations. This is for the safety of all of our valued fans and service animals working at our event.",
              "During the event, your Service Animal must:",
              "1. Remain with you at all times",
              "2. Be under your control at all times",
              "3. Have a collar or harness and lead",
              "If for any reason your Service Animal displays unsafe behavior of any kind, we reserve the right to ask you to remove the animal from the event. There will be Service Animal Relief Areas around the event. Please stop by the Access Center for locations. Handlers are responsible for cleaning up after their Service Animal. We reserve the right to facilitate removal and/or refuse access to any animal from the parking lots or venue if that animal is deemed to be a health or safety threat to fans, staff, or other service animals, or in violation of our policies.",
              `Please note: It is a crime in the state of Alabama for a person to misrepresent an animal in a person's possession as a service animal. [Alabama Code \xa7 21-7-5] If you have any other further inquiries regarding your Service Animal, please email our Accessibility Director at ${s}`,
            ],
          },
          {
            title: "Access Center",
            body: [
              "The Access Center is conveniently located next to Guest Services inside the North festival entrance on Gulf Shores Parkway. There is no accessibility pre-registration required before the event. Our Access Team members will be able to assist you when you arrive with a variety of accommodations:",
              "• Accommodations in-place",
              "• Access Program wristband",
              "• ASL Interpreting & Effective Communication info",
              "• Accessible Shuttle Information for offsite shuttles",
            ],
          },
          {
            title: "Access Wristbands",
            body: [
              "We will provide a wristband to our patrons with disabilities and their companion who is utilizing the accommodations in-place at the festival. This wristband is available at the Access Center. This is not your ticket to the festival. You must have a valid ticket to enter the event.",
              "The Access Program wristband is a discreet visual alert to all staff on-site that you have completed the appropriate procedure to utilize the provided accommodations. Please do not remove your wristband for the duration of the event. We ask that all our Access Program patrons are mindful with their companion as space is limited and we aim to serve as many patrons with disabilities as possible.",
            ],
          },
          {
            title: "Access Patron Text Support",
            body: [
              "If you have a question while you are at the festival and would like to text a member of the Access Team (a person, not AI or a Bot), text “SIMB” to 844-556-6998.",
              "We will be able to provide information and support via text on show days. This texting line will be open one-hour prior to the gates opening and one-hour after the show ends on festival dates only.",
              `Any questions that you may have prior to attending Sand In My Boots and the accommodations in-place can be answered by our Accessibility Director, please email: ${s}`,
            ],
          },
          {
            title: "Accessible Viewing",
            body: [
              "There will be accessible viewing areas made available to guests with mobility disabilities at designated stages. Patrons who require the use of a reserved accessible viewing area as a reasonable accommodation should stop at the Access Center upon entry to the festival. Patrons are required to have an Access Program wristband to be allowed into the Accessible Viewing Areas.",
              "Accessible Viewing Area Guidelines:",
              "• You and your companion must have a wristband to utilize this accommodation.",
              "• These areas are first come, first served. When capacity for these areas is reached, our Access Team will no longer seat patrons or companions - this is for the safety of all patrons we serve.",
              "• Seats that have been vacant for 30 minutes or more will be considered available and staff may seat or place other patrons in these spots.",
              "• These are shared spaces for patrons with disabilities, therefore there is: no reserving or saving seats for patrons who are not present; no smoking and no vaping in these areas; standing allowed in the back only.",
              "We ask that you respect our staff and the posted capacity limits - this is for the safety of all patrons.",
            ],
          },
          {
            title: "ASL Interpreting",
            body: [
              `Requests for ASL interpretation services must be submitted at least 30 days prior to the festival to allow for sufficient preparation. The deadline for Sand In My Boots is April 23, 2027. To submit a request, please email ${s}`,
            ],
          },
          {
            title: "Medication & Dietary Concerns",
            body: [
              "For patrons needing to bring medication with them to the show, medication will be allowed in daily amounts only and must be in the original manufacturer container with your name that matches your government issued ID. You may be asked to show ID at the gate and/or a member of the medical staff will verify the medication prior to entering the venue.",
              "Patrons with dietary concerns will find that our food vendors provide gluten-free, vegan and dairy-free dietary options.",
              `If you have additional questions or concerns regarding medication or dietary needs, please email our Accessibility Director at ${s}`,
            ],
          },
          {
            title: "Additional Accommodations or Requests",
            body: [
              "Sand in My Boots will consider any request by an attendee with a disability for a reasonable accommodation, including modification of its policies, practices or procedures or for auxiliary aids and services that will permit the attendee equal enjoyment of the goods and services offered at the venue. We encourage you to make any such request as far in advance as possible to enhance our ability to evaluate and fulfill the request.",
              `In continually trying to make our venue more accessible, we encourage you to contact us for any of your accessibility-related needs. Additionally, if you have any questions about Accessible policies or our services, please reach out to the Accessibility Director at ${s}`,
              "Please note that it may take up to two business days (weekends not included) to receive a response. During the week of the event, you can expect a response within 24 hours.",
              "If you are already onsite at the venue and require assistance, please visit the Access Center to receive direct assistance or text the Access Team: text “SIMB” to 844-556-6998 for assistance.",
            ],
          },
        ],
      },
      {
        group: "HEALTH & SAFETY",
        items: [
          {
            title: "Health & Safety",
            body: [
              "The event shall be presented in accordance with applicable public health conditions as of the date of the event and which may change at any time as determined by federal, state or local government agencies or instrumentalities, artists or the promoter; such requirements may include, without limitation, changes to capacity, attendance procedures and attendance requirements, such as proof of vaccination and/or negative COVID-19 test, and other protective measures such as requiring attendees to wear face coverings.",
              "If any ticket holder does not comply with any laws, mandates, health orders or directives, promoter or event terms, conditions or rules, then the promoter or event operator may refuse admission to the event or require the ticket holder to leave the venue and such ticket holder will not be entitled to a refund.",
            ],
          },
          {
            title: "COVID-19 Warning",
            body: [
              "COVID-19 is an extremely contagious disease that can lead to severe illness and death. There is an inherent and elevated risk of exposure to COVID-19 in any public place or place where people are present and there is no guarantee, express or implied, that those attending the event will not be exposed to COVID-19.",
            ],
          },
          {
            title: "Attendee Promise & Health Acknowledgment",
            body: [
              "All attendees agree to follow event policies (including health and safety policies) and posted instructions while at the event. All attendees should evaluate their risk in determining whether to attend the event. By entering the event, attendees voluntarily assume all risks related to exposure to viruses (including, without limitation, COVID-19) and confirm that they will adhere to federal, state and local mandates and/or any quarantine or isolation recommendations.",
            ],
          },
          {
            title: "Public Safety",
            body: [
              "Safety and security are of utmost importance. We are unable to comment on specific safety and security measures. The venue works in partnership with law enforcement and other public safety agencies to help ensure the safety of patrons. Some of the security measures you might notice may include bag checks, walk-through screenings and canine detection.",
              "All event attendees are subject to non-invasive screening prior to entry. Please arrive early and note the prohibited items list. Prohibited items will not be allowed on the event premises.",
              "In the event of an emergency, information may be relayed to you via video screens, audio broadcast system, and/or through mobile notifications. If you, or a friend, require medical assistance please locate your nearest medical tent or alert a staff member.",
              "If you see something, say something. Notify a member of law enforcement, a security team member or event personnel if you witness suspicious behavior or activity.",
            ],
          },
        ],
      },
    ],
    l = (e, a, i) => ({
      title: e,
      text: a,
      img: `/sib/experiences/${t(e)}.jpeg`,
      ...(i ? { link: i } : {}),
    }),
    d = [
      l(
        "Sand In My Boots Stage",
        "The picture-perfect backdrop for your core Sand In My Boots memories, all the way until the last note.",
      ),
      l(
        "Dangerous Stage",
        "Twist the top off another round and stay right here tonight 'cause leaving this stage could be dangerous.",
      ),
      l(
        "Sand In My Boots Pre-Game",
        "Kick off the weekend at the Sand In My Boots Pre-Game, featuring exclusive performances by Stella Lefty and more, early access to event merch, and an early start to the biggest weekend of the year.",
        { href: "#passes", label: "Visit our passes page" },
      ),
      l(
        "White Sand, Blue Water",
        "Snag a lounge chair on the legendary white sand beach, or jump right in and cool off in the Gulf between sets.",
      ),
      l(
        "‘98 Braves Park",
        "Where tailgate meets festival, join us at ’98 Braves Park for shade, games and friendly hangs alongside incredible music from Whiskey Jam and second sets from Sand In My Boots artists.",
      ),
      l(
        "7 Summers Sandbar",
        "Overlooking the Sand In My Boots Stage the 7 Summers Sandbar treats Super VIP passholders to shaded views of the performances with comfortable seating, private WiFi and more.",
      ),
      l(
        "Dipping Pools",
        "Relax poolside in the dipping pools at This Beach Club. That's right... VIP and Super VIP passholders can watch Morgan Wallen from the beach, with a beer in hand and toes in the pool. Life is good.",
      ),
      l(
        "This Beach Club",
        "VIP passholders can immerse themselves in luxury at This Beach Club, featuring shade, misting, private air-conditioned restrooms, a complimentary bar and more!",
      ),
      l(
        "Sunset Salon",
        "We love you more than a Gulf Shores sunset, so take a minute for yourself at the Sunset Salon offering braids, space buns, beard trims and more.",
      ),
      l(
        "Spin You Around Ferris Wheel",
        "Don't miss the best views of Sand In My Boots from the Ferris Wheel. There is no better photo op to capture the most incredible weekend of your life.",
      ),
      l(
        "Love Somebody Lane",
        "Let's get hitched! Whether you've been knocking boots for years, or just met over a beer on the beach, take your love to the next level at Love Somebody Lane!",
      ),
    ],
    c = (e) => n.find((t) => t.id === e),
    h = [
      {
        id: "ga",
        name: "GENERAL ADMISSION HOTEL PACKAGE",
        fromNight: 300.91,
        taxedFrom: c("ga").price,
        lead: "Access to all general admission areas of the festival, all weekend long. Enjoy tons of food & beverage vendors, activities, swimming and beach club access and more.",
        perks: [],
        prices: {
          "phoenix-east": 2433.37,
          "phoenix-all-suites-west": 2719.37,
          "embassy-suites-gulf-shores": 2939.89,
          "phoenix-gulf-towers": 3159.37,
          "beach-village-resort": 3190.63,
        },
      },
      {
        id: "party-pit",
        name: "PARTY PIT HOTEL PACKAGE",
        fromNight: 564.11,
        taxedFrom: c("party-pit").price,
        lead: "Lean in a little closer than GA with weekend access to a front-of-stage, standing-room-only Party Pit viewing area at the Main Stage.",
        perks: c("party-pit").learnMore?.bullets ?? [],
        prices: {
          "phoenix-east": 3222.97,
          "phoenix-all-suites-west": 3508.97,
          "embassy-suites-gulf-shores": 3729.49,
          "phoenix-gulf-towers": 3948.97,
        },
      },
      {
        id: "vip",
        name: "VIP HOTEL PACKAGE",
        fromNight: 960.11,
        taxedFrom: c("vip").price,
        lead: "Elevated amenities and perks to boost your comfort, views, and access for the best weekend on the beach.",
        perks: c("vip").learnMore?.bullets ?? [],
        prices: {
          "phoenix-east": 4410.97,
          "phoenix-all-suites-west": 4696.97,
          "hideaway-phoenix-all-suites": 4889.23,
          "embassy-suites-gulf-shores": 4917.49,
          "phoenix-gulf-towers": 5136.97,
          "beach-village-resort": 5168.23,
        },
      },
      {
        id: "super-vip",
        name: "SUPER VIP HOTEL PACKAGE",
        dark: !0,
        fromNight: 1542.94,
        taxedFrom: c("super-vip").price,
        lead: "All the perks of VIP plus exclusive access to the private 7 Summers Sandbar and Super VIP Dining Room, upfront viewing areas, dedicated entry, and so much more for the ultimate elevated experience.",
        perksIntro: "All the perks of VIP as well as:",
        perks: c("super-vip").learnMore?.bullets ?? [],
        prices: {
          "phoenix-east": 5598.97,
          "phoenix-all-suites-west": 5884.97,
          "hideaway-phoenix-all-suites": 6077.23,
          "embassy-suites-gulf-shores": 6105.49,
          "phoenix-gulf-towers": 6324.97,
          "beach-village-resort": 6356.23,
        },
      },
      {
        id: "livin-the-dream",
        name: "LIVIN' THE DREAM HOTEL PACKAGE",
        dark: !0,
        fromNight: 2787.58,
        taxedFrom: c("livin-the-dream").price,
        lead: "The name says it all.",
        perksIntro: "All of the perks of Super VIP as well as:",
        perks: c("livin-the-dream").learnMore?.bullets ?? [],
        prices: {
          "phoenix-east": 9893.4,
          "phoenix-all-suites-west": 10179.4,
          "hideaway-phoenix-all-suites": 10371.66,
          "embassy-suites-gulf-shores": 10399.92,
          "phoenix-gulf-towers": 10619.4,
          "beach-village-resort": 10650.66,
        },
      },
    ];
  e.s([
    "ALL_PASSES_INCLUDE",
    0,
    [
      "A single wristband granting access to the festival for all three (3) days (No single-day tickets will be available)",
      "Invitation to wander from stage to stage, swim in the Gulf at designated beach access spots, and participate in other activities as you please",
      "There are various shaded areas with places to sit down and enjoy a meal or rest from roaming throughout the day",
      "Free water refill stations",
      "A variety of food vendors",
      "Wide beer selection & full bars",
      "Extensive restroom facilities including flushing toilets",
    ],
    "CABANAS",
    0,
    {
      intro:
        "Discover the ultimate beachside retreat with a Sand In My Boots Cabana reservation. Kick back in comfort as you and your guests create unforgettable memories on the white sand beaches of Gulf Shores, AL.",
      includes: [
        "An exclusive, private luxury Cabana for up to 25 guests per day (guests can change daily)",
        "Elevated, unobstructed views of the Main Stage",
        "All-inclusive private bar with dedicated servers & full beverage service",
        "Chef-prepared dishes provided throughout the day",
        "Concierge service",
        "Comfortable, upscale seating and shade",
        "Access to all VIP amenities",
        "Access to SUPER VIP restrooms",
      ],
      outro:
        "Want to make the experience even more incredible? You can enhance your Cabana package by adding on a Super VIP dining package featuring exclusive dining experiences with gourmet meals, customizing your Cabana decor to match your group’s desired vibes, or adding Shuttle Passes for easy and convenient transportation to and from the festival grounds.",
      contact: "concierge@clubwallen.site",
    },
    "EXPERIENCES",
    0,
    d,
    "EXPERIENCE_INTRO",
    0,
    "Don't miss a minute of all that Sand In My Boots has to offer, with experiences curated by Wallen himself that reflect the things he loves and highlight the one-of-a-kind white sand beaches of Gulf Shores, AL.",
    "FESTIVAL_INFO",
    0,
    r,
    "FESTIVAL_INTRO",
    0,
    "Get ready for an unforgettable weekend in Gulf Shores! Find everything you need to know about Sand In My Boots, including festival details, accessibility information, and more.",
    "HOTEL_COMMON_INCLUDE",
    0,
    [
      "A single wristband granting access to the festival for all three (3) days (No single day tickets will be available)",
      "Invitation to wander from stage to stage, swim in the Gulf at designated beach access spots and participate in other activities as you please",
      "There are various shaded areas with places to sit down and enjoy a meal or rest from roaming throughout the day",
      "Free water refill stations",
      "A variety of food vendors",
      "Wide beer selection & full bars",
      "Extensive restroom facilities including flushing toilets",
    ],
    "HOTEL_IMPORTANT",
    0,
    [
      "Fans 17 years and under must be accompanied by a ticket-holding adult over the age of 21",
      "Children aged 5 and under are admitted FREE if accompanied by a ticket holding parent or guardian",
      "– For the safety of all attendees, we cannot admit more than 2 children per supervising parent or guardian",
    ],
    "HOTEL_PACKAGES",
    0,
    h,
    "HOTEL_TEASER",
    0,
    {
      title: "HOTEL PACKAGES",
      from: "Starting at $500 per guest, per night",
      sub: "For 2 to 10 guests. On sale now, no registration required. Plan less, enjoy even more. Book a hotel package to secure your festival passes and accommodations all in one go.",
      included: [
        "3 or 4 Night Stay (Check In Thursday 5/20 or Friday 5/21 and Check Out Monday 5/24)",
        "Your choice of Passes to Sand In My Boots, granting your group access to all days of the festival taking place May 21-23, 2027",
        "Daily roundtrip shuttle transportation to Sand In My Boots",
        "Vacation Package exclusive merchandise item (1 per guest)",
        "On Call Vacation Package Guest Services Line",
      ],
      note: "*Hotel package check-in requires guests to be 21+, or 25+ at Beach Village Resort, Turquoise Place, and The Lodge. Younger guests may stay, but the person checking in must meet the age requirement and present valid photo ID. Check your hotel’s specific age policy before booking.",
    },
    "LINEUP",
    0,
    a,
    "ORDER_INFO",
    0,
    [
      {
        title: "Immediately after purchasing",
        lines: [
          "You will receive an order confirmation by email.",
          "Your purchase information will be sent to your email and will also be linked to your AXS FanAccount.",
          "You can log in to your account to view your order, or check your email for the information we send you to follow your order process.",
        ],
      },
      {
        title: "When will you receive the actual ticket?",
        lines: [
          "Physical wristbands will begin shipping in April 2027.",
          "They will be shipped to the delivery address you provide during checkout, so please make sure it is correct.",
          "You can track and manage your order through your AXS FanAccount or the email that will be sent to you.",
        ],
      },
      {
        title: "Purchasing from outside the United States?",
        lines: [
          "The festival provides international shipping through UPS, beginning in April 2027.",
          "Please select an appropriate international shipping address during checkout and confirm that UPS can deliver to your location.",
        ],
      },
      {
        title: "What happens when you arrive at the festival?",
        lines: [
          "You will present your physical wristband at the entrance. It grants you access for all three days, May 21–23, 2027.",
        ],
      },
    ],
    "PASS_RULES",
    0,
    [
      "Fans 17 years and under must be accompanied by a ticket-holding adult over the age of 21.",
      "Children aged 5 and under are admitted FREE if accompanied by a pass-holding parent or guardian",
      "– For the safety of all attendees, we cannot admit more than 2 children per supervising parent or guardian",
    ],
    "PASS_TIERS",
    0,
    n,
    "PROPERTIES",
    0,
    [
      {
        id: "phoenix-east",
        name: "PHOENIX EAST",
        desc: "A beachfront condominium located on the eastern end of Orange Beach.",
      },
      {
        id: "phoenix-all-suites-west",
        name: "PHOENIX ALL SUITES WEST",
        desc: "Every suite looks straight out over the Gulf Shores Beach.",
      },
      {
        id: "hideaway-phoenix-all-suites",
        name: "THE HIDEAWAY AT PHOENIX ALL SUITES",
        desc: "Every suite looks straight out over the Gulf Shores Beach.",
        passLine:
          "Your Choice of VIP, Super VIP or Livin the Dream 3-day Sand In My Boots Festival Passes",
      },
      {
        id: "embassy-suites-gulf-shores",
        name: "EMBASSY SUITES BY HILTON GULF SHORES BEACH RESORT",
        desc: "Enjoy an unforgettable getaway with spacious suites, beachfront relaxation, and all the comforts of home just steps from the sand.",
      },
      {
        id: "phoenix-gulf-towers",
        name: "PHOENIX GULF TOWERS",
        desc: "A modern Gulf front condominium community in Orange Beach.",
      },
      {
        id: "beach-village-resort",
        name: "BEACH VILLAGE RESORT",
        desc: "A coastal lifestyle community nestled in the heart of Orange Beach on Alabama’s beautiful Gulf Coast.",
      },
    ],
    "STAY_LINES",
    0,
    [
      "4 Night Stay (Check In Thursday 5/20 and Check Out Monday 5/24)",
      "Your Choice of 3-day Sand In My Boots Festival Passes",
      "Exclusive Hotel Package Merchandise for each member of your group",
      "Shuttle Pass for daily roundtrip transportation for each member of your group",
      "On Call Hotel Package Guest Services Line",
    ],
    "T",
    0,
    {
      navy: "#212640",
      slate: "#4a557a",
      sky: "#cfe0f3",
      cream: "#fbebb5",
      pink: "#e38d90",
      font: "'Bebas Neue', 'Oswald', 'Arial Narrow', Impact, sans-serif",
      body: "'Inter', 'Helvetica Neue', Arial, sans-serif",
    },
    "slugify",
    0,
    t,
  ]);
};
