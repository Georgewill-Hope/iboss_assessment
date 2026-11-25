import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nook Books — An independent bookshop",
  description: "Handpicked fiction, nonfiction, and books for young readers.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en"><body>{children}</body></html>
  );
}
