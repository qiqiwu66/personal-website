import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Sidebar } from "@/components/Sidebar"
import "./globals.css"

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Alana Wu",
  description: "Personal site",
  icons: { icon: "/wu-logo.png" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="h-full flex flex-col md:flex-row font-[family-name:var(--font-geist-sans)] antialiased overscroll-none">
        <Sidebar />
        <main className="flex-1 md:overflow-y-auto overscroll-none">
          {children}
        </main>
      </body>
    </html>
  )
}
