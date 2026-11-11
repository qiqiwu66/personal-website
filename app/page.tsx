import { sections } from "@/content"
import { ItemList } from "@/components/ItemList"
import { Gallery } from "@/components/Gallery"

export default function Home() {
  const home = sections.find((s) => s.slug === "")!

  return (
    <div className="p-6 max-w-2xl">
      {home.contentType === "gallery" ? (
        <Gallery items={home.items} />
      ) : (
        <ItemList items={home.items} />
      )}
    </div>
  )
}
