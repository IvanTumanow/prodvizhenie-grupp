import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

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
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
