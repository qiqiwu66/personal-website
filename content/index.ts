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
            "/images/gathering/cozy-sundays/1.jpg",
            "/images/gathering/cozy-sundays/2.jpg",
            "/images/gathering/cozy-sundays/3.jpg",
            "/images/gathering/cozy-sundays/4.png",
            "/images/gathering/cozy-sundays/5.jpg",
            "/images/gathering/cozy-sundays/6.jpg",
            "/images/gathering/cozy-sundays/7.jpeg",
            "/images/gathering/cozy-sundays/8.webp",
          ],
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
        title: "Reading club",
        subtitle: "Weekly, with friends",
        detail: {
          description: "A weekly reading club with friends.",
        },
      },
      {
        title: "Discussions on how to gather people",
        detail: {
          images: ["/images/gathering/gathering-discussion.jpg"],
        },
      },
      {
        title: "Design workshops & discussions",
        detail: {
          images: [
            "/images/gathering/design-discussions.jpeg",
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
        title: "Sticky note questions in public spaces",
        detail: {
          images: Array.from({ length: 16 }, (_, i) => `/images/questions/sticky-questions/${i + 1}.jpeg`),
        },
      },
      {
        title: "What's a thought you've had about someone but never told them?",
        detail: {
          images: Array.from({ length: 7 }, (_, i) => `/images/questions/thought-you-had/${i + 1}.jpeg`),
        },
      },
      {
        title: "NYC participatory experiments",
        detail: {
          images: Array.from({ length: 5 }, (_, i) => `/images/questions/nyc-public/${i + 1}.jpeg`),
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
    label: "Photographing people",
    contentType: "gallery",
    natural: true,
    items: Array.from({ length: 38 }, (_, i) => ({
      src: `/images/peoplewatching/${i + 1}.jpeg`,
      caption: "",
    })),
  },
  {
    slug: "photography-travel",
    label: "Photographing the world",
    contentType: "gallery",
    natural: true,
    items: Array.from({ length: 23 }, (_, i) => ({
      src: `/images/travel/${i + 1}.jpeg`,
      caption: "",
    })),
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
    natural: true,
    items: [
      { src: "/images/making/1.jpeg", caption: "" },
      { src: "/images/making/2.jpeg", caption: "" },
      { src: "/images/making/3.jpeg", caption: "" },
      { src: "/images/making/4.jpeg", caption: "" },
      { src: "/images/making/5.jpeg", caption: "" },
      { src: "/images/making/6.5.jpeg", caption: "" },
      { src: "/images/making/7.jpeg", caption: "" },
      { src: "/images/making/8.jpeg", caption: "" },
      { src: "/images/making/9.jpeg", caption: "" },
      { src: "/images/making/10.jpeg", caption: "" },
      { src: "/images/making/11.jpeg", caption: "" },
      { src: "/images/making/12.jpeg", caption: "" },
      { src: "/images/making/13.jpeg", caption: "" },
      { src: "/images/making/15.jpeg", caption: "" },
      { src: "/images/making/14.jpeg", caption: "" },
    ],
  },
  {
    slug: "my-life",
    label: "My life",
    contentType: "gallery",
    natural: true,
    items: [
      { src: "/images/life/1.jpg", caption: "Me & my family" },
      { src: "/images/life/2.jpg", caption: "Sunset in Jordan" },
      { src: "/images/life/3.jpg", caption: "Half ironman" },
      { src: "/images/life/4.jpg", caption: "Our washing machine" },
      { src: "/images/life/5.jpg", caption: "Me & my brothers" },
      { src: "/images/life/6.jpg", caption: "Improv classes" },
      { src: "/images/life/7.jpg", caption: "Growing cucumbers on my fire escape" },
      { src: "/images/life/8.jpg", caption: "Hiking 100 miles in Scotland" },
      { src: "/images/life/9.jpg", caption: "Buzzing my head" },
      { src: "/images/life/10.jpg", caption: "Teaching my brother ballet in a parking lot" },
      { src: "/images/life/11.jpg", caption: "Cooking with friends" },
      { src: "/images/life/12.jpg", caption: "Graduation shenanigans" },
      { src: "/images/life/13.jpg", caption: "Me & my brothers, yet again" },
      { src: "/images/life/14.jpg", caption: "Turkey trot half marathon" },
      { src: "/images/life/15.jpg", caption: "Me & my family, floating in water yet again" },
    ],
  },
]
