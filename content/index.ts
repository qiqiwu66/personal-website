export type GalleryItem = {
  src: string
  caption: string
}

export type ListItem = {
  title: string
  description?: string
  href?: string
  year?: string
}

export type DetailContent = {
  description?: string
  bodyText?: string
  images?: string[]
}

export type DetailItem = {
  title: string
  subtitle?: string
  year?: string
  detail: DetailContent
}

export type Section =
  | { slug: string; label: string; contentType: "gallery"; items: GalleryItem[]; natural?: boolean }
  | { slug: string; label: string; contentType: "list"; items: ListItem[] }
  | { slug: string; label: string; contentType: "detail-list"; items: DetailItem[] }

export const sections: Section[] = [
  {
    slug: "",
    label: "Home",
    contentType: "list",
    items: [
      {
        title: "Alana Wu",
        description:
          "I gather people, ask questions in public, make random things, watch strangers, travel with a camera, paint surfaces, and build with my hands. This is where I keep it all.",
      },
      { title: "Brooklyn, NY" },
      { title: "qiqiwu66@gmail.com", href: "mailto:qiqiwu66@gmail.com" },
    ],
  },
  {
    slug: "gathering-people",
    label: "Gathering people",
    contentType: "detail-list",
    items: [
      {
        title: "Cozy Sundays",
        subtitle: "Biweekly, work on things you love",
        detail: {
          description: "A biweekly gathering to work on things you love but struggle to make time for.",
          images: [
            "/images/gathering/cozy-sundays/1.jpeg",
            "/images/gathering/cozy-sundays/2.jpeg",
            "/images/gathering/cozy-sundays/3.jpeg",
            "/images/gathering/cozy-sundays/4.webp",
            "/images/gathering/cozy-sundays/5.webp",
            "/images/gathering/cozy-sundays/6.webp",
            "/images/gathering/cozy-sundays/7.webp",
            "/images/gathering/cozy-sundays/8.webp",
          ],
        },
      },
      {
        title: "Reading club",
        subtitle: "Weekly, with friends",
        detail: {
          description: "A weekly reading club with friends.",
        },
      },
      {
        title: "Food for thought & other dinner parties",
        subtitle: "One question per course",
        detail: {
          description: "A dinner party, one question per course.",
          images: [
            "/images/gathering/dinner-parties/1.jpg",
            "/images/gathering/dinner-parties/2.jpg",
            "/images/gathering/dinner-parties/3.jpg",
            "/images/gathering/dinner-parties/4.jpeg",
            "/images/gathering/dinner-parties/5.jpg",
            "/images/gathering/dinner-parties/6.jpeg",
          ],
        },
      },
      {
        title: "No phone Saturdays",
        detail: {},
      },
      {
        title: "Capture the flag",
        detail: {
          images: [
            "/images/gathering/capture-the-flag/1.jpg",
            "/images/gathering/capture-the-flag/2.jpg",
          ],
        },
      },
      {
        title: "Discussions on how to gather people",
        detail: {
          images: ["/images/gathering/gathering-discussion.jpg"],
        },
      },
      {
        title: "Making flower bouquets",
        detail: {
          images: [
            "/images/gathering/flower/1.jpeg",
            "/images/gathering/flower/2.jpeg",
            "/images/gathering/flower/3.jpg",
            "/images/gathering/flower/4.jpeg",
          ],
        },
      },
      {
        title: "Writing letters to family & friends",
        detail: {
          images: [
            "/images/gathering/writing-letters/1.jpeg",
            "/images/gathering/writing-letters/2.jpeg",
          ],
        },
      },
      {
        title: "Discussions on the future of design",
        detail: {
          images: ["/images/gathering/design-discussions.jpeg"],
        },
      },
      {
        title: "Making silly cookies",
        detail: {
          images: [
            "/images/gathering/silly-cookies/1.jpeg",
            "/images/gathering/silly-cookies/2.jpeg",
            "/images/gathering/silly-cookies/3.jpeg",
            "/images/gathering/silly-cookies/4.jpeg",
          ],
        },
      },
      {
        title: "Crab night",
        detail: {
          images: [
            "/images/gathering/crab-night/1.jpeg",
            "/images/gathering/crab-night/2.jpeg",
            "/images/gathering/crab-night/3.jpeg",
          ],
        },
      },
      {
        title: "Bento swap picnic",
        detail: {
          images: [
            "/images/gathering/bento/1.jpeg",
            "/images/gathering/bento/2.jpeg",
            "/images/gathering/bento/3.jpeg",
            "/images/gathering/bento/4.jpeg",
            "/images/gathering/bento/5.jpeg",
          ],
        },
      },
      {
        title: "Build a giant newsprint city",
        detail: {
          images: ["/images/gathering/newsprint.jpeg"],
        },
      },
      {
        title: "Make Valentine's day cards",
        detail: {
          images: [
            "/images/gathering/valentines/1.jpeg",
            "/images/gathering/valentines/2.jpeg",
          ],
        },
      },
      {
        title: "Design hackathon",
        detail: {
          images: [
            "/images/gathering/hackathon/1.jpg",
            "/images/gathering/hackathon/2.jpg",
          ],
        },
      },
    ],
  },
  {
    slug: "people-questions-public",
    label: "People & questions in public",
    contentType: "detail-list",
    items: [
      {
        title: "What changed your mind recently?",
        subtitle: "40 strangers, the High Line",
        year: "2024",
        detail: {
          description:
            "Asked 40 strangers at the High Line over three Saturdays in October. The most common answer: something small.",
          bodyText:
            "A man said he used to hate jazz. A woman changed her mind about her mother. Someone reconsidered a job offer they'd already turned down. One person said the question itself changed their mind about something.",
        },
      },
      {
        title: "What do you do when you can't sleep?",
        subtitle: "Late night diner, East Village",
        year: "2024",
        detail: {
          description: "Late night diner, East Village. I stayed until 2am asking everyone who came in.",
          bodyText:
            "Walk to the kitchen. Count backwards. Watch nature documentaries. Lie there and accept it. One person said they always call their sister, wherever she is in the world.",
        },
      },
      {
        title: "What would you do if you weren't afraid?",
        subtitle: "Prospect Park bench, summer",
        year: "2023",
        detail: {
          description: "Prospect Park, summer. I sat on a bench with a sign and waited.",
          bodyText:
            "Move to a different city. Tell someone the truth. Quit and try the thing. Rest. The last one surprised me the most.",
        },
      },
      {
        title: "What did you learn from a stranger?",
        subtitle: "Three airports, layover project",
        year: "2023",
        detail: {
          description: "Three airports, a layover project. Asked everyone waiting at gates.",
          bodyText:
            "That garlic belongs in everything. That you should always carry a pen. That grief is strange and you have to let it be strange. One man said: be careful who you become when you're tired.",
        },
      },
      {
        title: "What are you looking forward to?",
        subtitle: "Canal Street platform",
        year: "2022",
        detail: {
          description: "Subway platform, Canal Street. The train was always delayed.",
          bodyText:
            "Friday. Fall. The person I'm meeting. Getting home. Something I haven't thought of yet.",
        },
      },
    ],
  },
  {
    slug: "make-random-things",
    label: "Make random things",
    contentType: "detail-list",
    items: [
      {
        title: "Paper lamp shade",
        subtitle: "Newspaper + starch, three attempts",
        year: "2024",
        detail: {
          images: ["/images/random/01.jpg"],
          description:
            "Newspaper and liquid starch, layered over an inflated balloon. Let dry, pop the balloon. Took three tries to get the shape right.",
        },
      },
      {
        title: "Seed packets",
        subtitle: "Balcony garden, paper envelopes",
        year: "2024",
        detail: {
          images: ["/images/random/02.jpg"],
          description:
            "Collected seeds from whatever grew on the balcony that summer. Made little folded paper envelopes, labeled them in pencil. Gave most of them away.",
        },
      },
      {
        title: "Hand-bound sketchbook",
        subtitle: "Coptic binding, found paper",
        year: "2023",
        detail: {
          images: ["/images/random/03.jpg"],
          description:
            "Coptic binding, found paper, watercolor cover. The spine is a little crooked. I use it anyway.",
        },
      },
      {
        title: "Beeswax candles",
        subtitle: "Local beekeeper, first attempt",
        year: "2023",
        detail: {
          images: ["/images/random/04.jpg"],
          description:
            "Got the wax from a local beekeeper at the farmer's market. First attempt. The scent is unbelievably good.",
        },
      },
      {
        title: "Marbled paper",
        subtitle: "Shaving cream method, 40 sheets",
        year: "2023",
        detail: {
          images: ["/images/random/05.jpg"],
          description:
            "Shaving cream method. Made forty sheets over a weekend. I still don't understand why some patterns work and others don't.",
        },
      },
      {
        title: "Block print tote",
        subtitle: "Linocut, canvas, dark green ink",
        year: "2022",
        detail: {
          images: ["/images/random/06.jpg"],
          description:
            "Carved a linocut of a plant I can't identify. Printed on canvas totes in dark green ink. Made eight, kept one.",
        },
      },
    ],
  },
  {
    slug: "people-watching",
    label: "Observing people",
    contentType: "gallery",
    natural: true,
    items: Array.from({ length: 38 }, (_, i) => ({
      src: `/images/peoplewatching/${i + 1}.jpeg`,
      caption: "",
    })),
  },
  {
    slug: "photography-travel",
    label: "Photography & travel",
    contentType: "gallery",
    items: [
      { src: "/images/travel/01.jpg", caption: "Tokyo, rainy season, 2024" },
      { src: "/images/travel/02.jpg", caption: "Oaxaca market, early morning, 2023" },
      { src: "/images/travel/03.jpg", caption: "Lisbon, Alfama, afternoon light, 2023" },
      { src: "/images/travel/04.jpg", caption: "Hudson Valley, peak fall, 2023" },
      { src: "/images/travel/05.jpg", caption: "Marrakech medina, 2022" },
      { src: "/images/travel/06.jpg", caption: "Brooklyn Bridge Park, January 2024" },
      { src: "/images/travel/07.jpg", caption: "Seoul street food, 2022" },
      { src: "/images/travel/08.jpg", caption: "Upstate New York, winter, 2024" },
    ],
  },
  {
    slug: "painting-surfaces",
    label: "Painting surfaces",
    contentType: "gallery",
    natural: true,
    items: [
      { src: "/images/painting/1.jpeg", caption: "" },
      { src: "/images/painting/2.jpeg", caption: "" },
      { src: "/images/painting/3.jpeg", caption: "" },
      { src: "/images/painting/4.jpeg", caption: "" },
      { src: "/images/painting/5.jpeg", caption: "" },
      { src: "/images/painting/6.jpeg", caption: "" },
      { src: "/images/painting/7.jpeg", caption: "" },
      { src: "/images/painting/8.jpeg", caption: "" },
      { src: "/images/painting/9.jpg", caption: "" },
      { src: "/images/painting/10.jpg", caption: "" },
      { src: "/images/painting/11.jpeg", caption: "" },
      { src: "/images/painting/12.jpeg", caption: "" },
      { src: "/images/painting/13.jpeg", caption: "" },
      { src: "/images/painting/14.jpeg", caption: "" },
      { src: "/images/painting/15.jpeg", caption: "" },
    ],
  },
  {
    slug: "making-things-hands",
    label: "Making things with my hands",
    contentType: "gallery",
    items: [
      { src: "/images/making/01.jpg", caption: "Ceramic mug, wheel-thrown, 2024" },
      { src: "/images/making/02.jpg", caption: "Woven wall hanging, natural dyes, 2024" },
      { src: "/images/making/03.jpg", caption: "Sourdough bread, long ferment, 2023" },
      { src: "/images/making/04.jpg", caption: "Macramé plant holder, 2023" },
      { src: "/images/making/05.jpg", caption: "Patchwork quilt, in progress, 2024" },
      { src: "/images/making/06.jpg", caption: "Pressed flower frame, garden finds, 2022" },
    ],
  },
  {
    slug: "my-life",
    label: "My life",
    contentType: "list",
    items: [
      {
        title: "Currently reading",
        description: "Braiding Sweetgrass — Robin Wall Kimmerer",
      },
      {
        title: "Currently listening to",
        description: "Mk.gee, Sudan Archives, old Fiona Apple",
      },
      {
        title: "Currently obsessed with",
        description: "Fermenting things. Kimchi, hot sauce, kombucha.",
      },
      {
        title: "Recent win",
        description: "Finally got a sourdough starter that consistently rises.",
      },
      {
        title: "Recent failure",
        description: "Tried to grow tomatoes on a north-facing balcony. Very sad tomatoes.",
      },
      {
        title: "Places I want to go",
        description: "Oaxaca again, Vietnam, somewhere with good mountains",
      },
      {
        title: "Things I believe",
        description:
          "Strangers are mostly interesting. Doing things badly is fine. Food tastes better outside.",
      },
    ],
  },
]
