import { PhotoFan } from "@/components/PhotoFan"

const ALANA_PHOTOS = [
  "/images/alana/2.jpg",
  "/images/alana/1.jpeg",
  "/images/alana/3.jpg",
]

export default function Home() {
  return (
    <div className="p-12 flex flex-col h-full relative">
<p style={{ fontSize: 24, lineHeight: 1.6 }} className="text-stone-900">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa.
      </p>

      <div className="mt-auto pt-8">
        <PhotoFan photos={ALANA_PHOTOS} />
      </div>
    </div>
  )
}
