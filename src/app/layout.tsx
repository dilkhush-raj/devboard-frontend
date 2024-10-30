import {DM_Sans} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/context/ThemeProvider";
import ReactQueryClientProvider from "@/components/ReactQueryClientProvider";
import {Toaster} from "react-hot-toast";
import "react-ripple-click/dist/index.css";
const dmSans = DM_Sans({subsets: ["latin"]});

export const metadata = {
  title: "DevBoard",
  description:
    "This project aims to create a platform where developers can share knowledge, ask questions, and earn recognition for their contributions.",
};

export default function RootLayout({children}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={
          dmSans.className + " select-none dark:bg-dark-900 dark:text-light-100"
        }
      >
        <ReactQueryClientProvider>
          <ThemeProvider>
            <Toaster />
            {children}
          </ThemeProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
