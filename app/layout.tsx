import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { GSAP_RemotePluginsProviders } from "./providers";
import { Footer } from "@/src/widgets/footer";
import Link from "next/link";

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic']
})

export const metadata: Metadata = {
  title: 'Продвижение-групп',
  description: 'Описание приложения для "Продвижение групп"',
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${montserrat.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GSAP_RemotePluginsProviders>
          <Link href="/">Home</Link>
          <Link href="/policy">Policy</Link>

          <main>
            {children}
          </main>

          <Footer backgroundColorClassName={'bg-accent-foreground'} />
        </GSAP_RemotePluginsProviders>
      </body>
    </html>
  );
}
