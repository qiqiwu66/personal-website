import { sections } from "@/content"
import { ItemList } from "@/components/ItemList"
import { Gallery } from "@/components/Gallery"

export default function Home() {
  const home = sections.find((s) => s.slug === "")!

  return (
    <div className="py-10 px-8 md:py-14 md:px-12 max-w-2xl">
      {home.contentType === "gallery" ? (
        <Gallery items={home.items} />
      ) : (
        <ItemList items={home.items} />
      )}
    </div>
  )
}
