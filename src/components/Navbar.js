"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/home", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/transport", label: "Transport" },
  { href: "/stays", label: "Stays" },
  { href: "/food", label: "Food" },
  { href: "/trips", label: "My Trips" },
  { href: "/budget", label: "Budget" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="navbar">
      <Link className="logo" href="/home" aria-label="TripMate home">
        Trip<span>Mate</span>
      </Link>
      <nav className="nav-links" aria-label="Main navigation">
        {links.map((link) => (
          <Link
            href={link.href}
            className={pathname === link.href ? "active" : ""}
            aria-current={pathname === link.href ? "page" : undefined}
            key={link.href}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <Link className="nav-plan-button" href="/create-trip">
        Plan a trip <span aria-hidden="true">+</span>
      </Link>
    </header>
  );
}