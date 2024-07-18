import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-2 text-xs dark:text-[#8998b1]">
      <div>&copy; {new Date().getFullYear()} All rights reserved</div>
      <div className="flex flex-wrap gap-2">
        <Link href="/legal/terms">Terms of Service</Link>
        <Link href="/legal/privacy">Privacy Policy</Link>
      </div>
    </footer>
  );
}
