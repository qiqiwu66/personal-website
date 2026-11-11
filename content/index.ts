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
  bodyTextBold?: string
  bodyTextLink?: { text: string; href: string }
  images?: string[]
  imageCaptions?: string[]
  intro?: string
  introLink?: { text: string; href: string }
}

export type DetailItem = {
  title: string
  subtitle?: string
  year?: string
  detail: DetailContent
}

export type Section =
  | { slug: string; label: string; contentType: "gallery"; items: GalleryItem[]; natural?: boolean; intro?: string }
  | { slug: string; label: string; contentType: "list"; items: ListItem[] }
  | { slug: string; label: string; contentType: "detail-list"; items: DetailItem[] }

export const sections: Section[] = [
  {
    slug: "gathering-people",
    label: "Gathering people",
    contentType: "detail-list",
    items: [
      {
        title: "Cozy Sundays",
        subtitle: "Biweekly, work on things you love",
        detail: {
          description: "A biweekly gathering to work on things you love but struggle to make time for",
          intro: "I host Cozy Sundays, a biweekly gathering to work on the things you love but struggle to make time for.",
          introLink: { text: "Cozy Sundays", href: "https://luma.com/cozy-sundays" },
          bodyText: "Cozy Sundays is a Socratica node.",
          bodyTextLink: { text: "Socratica", href: "https://socratica.info/" },
          images: [
            "/images/gathering/cozy-sundays/1.jpg",
            "/images/gathering/cozy-sundays/2.jpg",
            "/images/gathering/cozy-sundays/2.5.jpg",
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
        title: "Dinner parties",
        detail: {
          description: "A question per course, blindfolded, and more",
          intro: "I love to host dinner parties with my friends. Some are coursed, some are casual, some include a question with every dish, and some are blindfolded.",
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
          description: "A weekly reading club with friends",
          intro: "I host a weekly reading club with friends. The amount of reading vs conversing varies by day.",
          bodyText: "I keep forgetting to take photos of us. We're too busy reading. Here's some bread I made for us instead.",
          images: ["/images/gathering/reading-club/1.jpeg"],
        },
      },
      {
        title: "Design workshops & discussions",
        detail: {
          intro: "At Carnegie Mellon, I was the co-president of the User Experience Association (UXA). We hosted hackathons, career workshops, discussions on the future of design, panel talks, creative coworking sessions, and more.",
          introLink: { text: "User Experience Association (UXA)", href: "https://cmu-uxa.framer.website/" },
          images: [
            "/images/gathering/design/1.jpg",
            "/images/gathering/design/2.jpg",
            "/images/gathering/design/3.jpg",
            "/images/gathering/design/4.jpg",
            "/images/gathering/design/5.jpg",
            "/images/gathering/design/6.jpg",
            "/images/gathering/design/7.jpg",
            "/images/gathering/design/9.jpg",
            "/images/gathering/design/8.jpg",
          ],
        },
      },
      {
        title: "Discussions on how to gather people",
        detail: {
          intro: "Building community is hard, no one teaches you how to do this in school. I ran discussions to help NYC community builders learn from one another.",
          images: ["/images/gathering/gathering-discussion.jpg"],
        },
      },
      {
        title: "No phone Saturdays",
        detail: {
          intro: "Organizing days to be free from our phones, and be fully present in the world.",
          bodyText: "I don't have photos of these because I don't have my phone.",
          bodyTextBold: "I don't have my phone.",
        },
      },
      {
        title: "Making flower bouquets",
        detail: {
          intro: "Buying an expensive amount of flowers, bringing a bunch of people together, and making bouquets for one another.",
          images: [
            "/images/gathering/flower/1.jpeg",
            "/images/gathering/flower/2.jpeg",
            "/images/gathering/flower/3.jpg",
            "/images/gathering/flower/4.jpeg",
          ],
        },
      },
      {
        title: "Capture the flag",
        detail: {
          intro: "We forgot how fun it is to run back and forth within a grassy box, so we brought it back.",
          images: [
            "/images/gathering/capture-the-flag/2.jpg",
            "/images/gathering/capture-the-flag/1.jpg",
          ],
        },
      },
      {
        title: "Writing letters to family & friends",
        detail: {
          intro: "Bringing people together to share our favorite childhood snacks & write letters to our loved ones…",
          images: [
            "/images/gathering/writing-letters/1.jpeg",
            "/images/gathering/writing-letters/2.jpeg",
          ],
        },
      },
      {
        title: "Making silly cookies",
        detail: {
          intro: "Because why not. It's like adult Play-Doh.",
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
          intro: "I realized I hadn't had fresh crab in 6 years, so I bought live crabs and cooked them with friends.",
          images: [
            "/images/gathering/crab-night/3.jpeg",
            "/images/gathering/crab-night/1.jpeg",
            "/images/gathering/crab-night/2.jpeg",
          ],
        },
      },
      {
        title: "Bento swap picnic",
        detail: {
          intro: "Friends & I made bentos Secret Santa style, swapped them, and picniced in the park. I don't have photos of us, but here are some other lovely folks that were in Central Park.",
          images: [
            "/images/gathering/bento/1.jpeg",
            "/images/gathering/bento/2.jpeg",
            "/images/gathering/bento/3.jpeg",
            "/images/gathering/bento/4.jpeg",
          ],
        },
      },
      {
        title: "Build a giant newsprint city",
        detail: {
          intro: "I had a bunch of newsprint so I wanted to build something with friends. Alas, the scale was not what I expected it to be.",
          images: ["/images/gathering/newsprint.jpeg"],
        },
      },
      {
        title: "Make Valentine's day cards",
        detail: {
          intro: "Making Valentine's Day cards for loved ones.",
          images: [
            "/images/gathering/valentines/1.jpeg",
            "/images/gathering/valentines/2.jpeg",
            "/images/gathering/valentines/5.jpeg",
            "/images/gathering/valentines/3.jpeg",
            "/images/gathering/valentines/4.jpeg",
          ],
        },
      },
    ],
  },
  {
    slug: "people-questions-public",
    label: "Experimenting in public spaces",
    contentType: "detail-list",
    items: [
      {
        title: "Sticky note questions in public spaces",
        detail: {
          intro: "For several years, I've put up questions in public spaces & left sticky notes for people to respond with.\nThe answers have been beautiful, hilarious, and sad.",
          images: Array.from({ length: 16 }, (_, i) => `/images/questions/sticky-questions/${i + 1}.jpeg`),
        },
      },
      {
        title: "What's a thought you've had about someone but never told them?",
        detail: {
          intro: "We have many thoughts about others, but often keep them to ourselves. Here are some of those thoughts.",
          images: Array.from({ length: 7 }, (_, i) => `/images/questions/thought-you-had/${i + 1}.jpeg`),
        },
      },
      {
        title: "NYC participatory experiments",
        detail: {
          intro: "A series of experiments to encourage strangers to interact with one another.",
          images: [
            "/images/questions/nyc-public/1.jpeg",
            "/images/questions/nyc-public/2.jpeg",
            "/images/questions/nyc-public/3.jpeg",
            "/images/questions/nyc-public/4.jpeg",
            "/images/questions/nyc-public/5.jpeg",
          ],
          imageCaptions: [
            "Draw a smiley face & give it to a stranger.",
            "Look around, draw someone that you see.",
            "A kid drawing in Washington Square Park.",
            "Give this smiley face to someone.",
            "Say hello to the next person that'll sit at this table.",
          ],
        },
      },
    ],
  },
  {
    slug: "people-watching",
    label: "Photographing people",
    contentType: "gallery",
    natural: true,
    intro: "I love, love, love observing people. They're the most fascinating, surprising, and wondrous creatures in the world.\nShot on iPhone",
    items: Array.from({ length: 39 }, (_, i) => ({
      src: `/images/peoplewatching/${i + 1}.jpeg`,
      caption: "",
    })),
  },
  {
    slug: "photography-travel",
    label: "Photographing the world",
    contentType: "gallery",
    natural: true,
    intro: "I'm obsessed with the world. It's ridiculously beautiful.\nShot on iPhone",
    items: Array.from({ length: 36 }, (_, i) => ({
      src: `/images/travel/${i + 1}.jpeg`,
      caption: "",
    })),
  },
  {
    slug: "make-random-things",
    label: "Making random things",
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
    slug: "making-things-hands",
    label: "Making things with my hands",
    contentType: "gallery",
    natural: true,
    intro: "I like making things with my hands: jewelry, ceramics, paper lamps, sourdough, and the occassional DIY furniture.",
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
      { src: "/images/making/14.jpeg", caption: "" },
      { src: "/images/making/15.jpeg", caption: "" },
    ],
  },
  {
    slug: "painting-surfaces",
    label: "Painting surfaces",
    contentType: "gallery",
    natural: true,
    intro: "I love to paint on paper, walls, and the random objects that I find on the NYC streets.",
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
    slug: "my-life",
    label: "Living life",
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
