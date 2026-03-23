import Link from "next/link";
import Image from "next/image";

const NAV_ITEMS = [
  { href: "/", label: "Beranda" },
  { href: "/tools/mawaris", label: "Hitung Mawaris" },
  { href: "/haid", label: "Kalkulator Haid" },
  { href: "/nifas", label: "Kalkulator Nifas" },
  { href: "/suci", label: "Masa Suci" },
  { href: "/iddah", label: "Kalkulator Iddah" },
  { href: "/istihadhah", label: "Istihadhah" }
];

type FiqhWanitaNavProps = {
  currentPath: string;
};

export default function FiqhWanitaNav({ currentPath }: FiqhWanitaNavProps) {
  return (
    <nav className="navbar">
      <Link href="/" className="nav-brand" aria-label="Portal Literasi Islam">
        <span className="nav-brand-mark" aria-hidden="true">
          <Image
            src="/assets/images/logo.png"
            alt=""
            className="nav-brand-icon"
            width={22}
            height={22}
            loading="eager"
          />
        </span>
        <span className="nav-brand-text">Portal Literasi Islam</span>
      </Link>

      <div className="nav-links">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={currentPath === item.href ? "active" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
