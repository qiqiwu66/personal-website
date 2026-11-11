import { PhotoFan } from "@/components/PhotoFan"
import { HoverImage } from "@/components/HoverImage"

const ALANA_PHOTOS = [
  "/images/alana/1.jpeg",
  "/images/alana/2.jpg",
  "/images/alana/3.jpg",
]

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="underline hover:text-stone-900 transition-colors">
      {children}
    </a>
  )
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="text-body flex items-baseline gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/star.svg" alt="" className="w-2.5 h-2.5 shrink-0 relative top-px" />
      <span>{children}</span>
    </li>
  )
}

export default function Home() {
  return (
    <div className="p-6 flex items-end">
      <div className="flex-1 max-w-xl space-y-5">
        <div>
          <h1 style={{ fontSize: 36, lineHeight: 1.15 }} className="text-stone-900">Hi traveler! I&apos;m Alana.</h1>
          <p className="text-body-muted whitespace-nowrap mt-1">product design | gatherer of people | asker of random questions</p>
        </div>

        <div>
          <p className="text-xs font-semibold text-stone-500 mb-1.5">Current lives</p>
          <ul className="space-y-1">
            <Li>founding product designer at <A href="https://yuzu.health/">Yuzu Health</A></Li>
            <Li>hosting <A href="https://luma.com/cozy-sundays">Cozy Sundays</A> and other gatherings of people</Li>
            <Li>citibiking across NYC</Li>
            <Li>collecting <HoverImage src="/images/business-cards-wall.png" rotate={2.5}>business cards &amp; train stubs</HoverImage> from around the world</Li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold text-stone-500 mb-1.5">Past lives</p>
          <ul className="space-y-1">
            <Li>product design at Palantir</Li>
            <Li>training for a <HoverImage src="/images/ironman.jpg" rotate={-2.5}>half Ironman</HoverImage></Li>
            <Li>Decision Science &amp; HCI at Carnegie Mellon</Li>
            <Li><HoverImage src="/images/dance.jpeg" rotate={2.5}>dancing</HoverImage> for 20 hrs a week</Li>
          </ul>
        </div>

        <p className="text-body">
          <A href="https://alanawu.substack.com/">Some random thoughts &amp; musings.</A>
        </p>
      </div>

      <div className="ml-auto mr-6">
        <PhotoFan photos={ALANA_PHOTOS} />
      </div>
    </div>
  )
}
