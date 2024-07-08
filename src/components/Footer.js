import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-2 text-xs">
      <div className="flex flex-wrap gap-2">
        <Link href="/legal/terms">Terms of Service</Link>
        <Link href="/legal/privacy">Privacy Policy</Link>
      </div>
      {/* <div>Developed by Dilkhush Raj</div> */}
    </footer>
  );
}
