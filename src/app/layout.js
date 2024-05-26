import { Inter } from "next/font/google";
import "./globals.css";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { ThemeProvider } from "@/context/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DevBoard",
  description:
    "This project aims to create a platform where developers can share knowledge, ask questions, and earn recognition for their contributions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-color-mode="dark">
      <body className={inter.className + " dark:bg-darkColor-100 select-none dark:text-lightColor-900 "}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
