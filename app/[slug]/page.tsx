import { notFound } from "next/navigation"
import { sections } from "@/content"
import { Gallery } from "@/components/Gallery"
import { ItemList } from "@/components/ItemList"
import { DetailListLayout } from "@/components/DetailListLayout"

export function generateStaticParams() {
  return sections
    .filter((s) => s.slug !== "")
    .map((s) => ({ slug: s.slug }))
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const section = sections.find((s) => s.slug === slug)

  if (!section) notFound()

  if (section.contentType === "detail-list") {
    return <DetailListLayout items={section.items} />
  }

  if (section.contentType === "gallery" && section.natural) {
    return (
      <div className="p-6">
        <Gallery items={section.items} natural />
      </div>
    )
  }

  return (
    <div className="p-6 max-w-2xl">
      {section.contentType === "gallery" ? (
        <Gallery items={section.items} />
      ) : (
        <ItemList items={section.items} />
      )}
    </div>
  )
}
