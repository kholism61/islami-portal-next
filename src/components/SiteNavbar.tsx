import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Tentang" },
  { href: "/faq", label: "FAQ" },
  { href: "/donasi", label: "Donasi" },
  { href: "/articles", label: "Artikel" },
];

export default function SiteNavbar() {
  return (
    <header className="border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <Link href="/" className="flex items-center gap-2 font-extrabold tracking-tight text-zinc-900">
          <span aria-hidden>📚</span>
          <span className="text-sm sm:text-base">Portal Literasi Islam</span>
        </Link>

        <nav className="flex flex-wrap items-center gap-2">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
