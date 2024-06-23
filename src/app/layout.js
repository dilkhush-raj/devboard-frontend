import {Inter} from "next/font/google";
import "./globals.css";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import {ThemeProvider} from "@/context/ThemeProvider";
import ReactQueryClientProvider from "@/components/ReactQueryClientProvider";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
  title: "DevBoard",
  description:
    "This project aims to create a platform where developers can share knowledge, ask questions, and earn recognition for their contributions.",
};

export default function RootLayout({children}) {
  return (
    <ReactQueryClientProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={
            inter.className +
            " select-none bg-[#f5f5f5] dark:bg-darkColor-100 dark:text-lightColor-900"
          }
        >
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
