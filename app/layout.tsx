import type { Metadata } from "next"
import { Mukta } from "next/font/google"
import { Sidebar } from "@/components/Sidebar"
import "./globals.css"

const mukta = Mukta({
  variable: "--font-mukta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Alana Wu",
  description: "Personal site",
  icons: { icon: "/wu-logo.png" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mukta.variable} h-full`}>
      <body className="h-full flex flex-col md:flex-row font-[family-name:var(--font-mukta)] antialiased overscroll-none">
        <Sidebar />
        <main className="flex-1 md:overflow-y-auto overscroll-none">
          {children}
        </main>
      </body>
    </html>
  )
}
