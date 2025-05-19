import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between p-4 shadow-md">
      <div>FelixF.dev</div>
      <div className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
}
