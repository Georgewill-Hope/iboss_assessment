import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import SiteFooter from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Nook Books — An independent bookshop",
  description: "Handpicked fiction, nonfiction, and books for young readers.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <div className="mx-auto max-w-360 bg-[#f7f6f0] px-[6%] text-[#27372d] md:px-[7.1%]">
          <Navbar />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
