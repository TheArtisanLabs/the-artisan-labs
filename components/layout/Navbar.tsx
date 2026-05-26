"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme";

const NAV_LINKS = [
  { href: "#about", label: "~/about" },
  { href: "#services", label: "~/services" },
  { href: "#portfolio", label: "~/portfolio" },
  { href: "#stack", label: "~/stack" },
  { href: "#contact", label: "~/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between border-b border-(--border) bg-(--bg) px-6 transition-all duration-300",
        scrolled && "bg-(--bg)/88 backdrop-blur-md",
      )}
    >
      <div className="flex items-center gap-1.5">
        <span className="text-lg font-bold tracking-tight text-(--fg)">
          artisan-labs
        </span>
        <span className="ml-0.5 inline-block h-[1.2em] w-2.5 bg-(--accent) align-bottom" />
      </div>

      <ul
        className={cn(
          "flex items-center gap-8 max-sm:fixed max-sm:top-16 max-sm:right-0 max-sm:h-screen max-sm:w-70 max-sm:flex-col max-sm:justify-center max-sm:gap-6 max-sm:border-l max-sm:border-(--border) max-sm:bg-(--bg)/98 max-sm:backdrop-blur-[20px] max-sm:transition-all max-sm:duration-300",
          open ? "max-sm:right-0" : "max-sm:-right-full",
        )}
      >
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className={cn(
                "text-sm text-(--fg-50) transition-all duration-300 hover:text-(--accent)",
                active === link.href.slice(1) &&
                  "text-(--accent) [text-shadow:0_0_12px_var(--accent-30)]",
              )}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-(--fg-20) text-(--fg-50) transition-all duration-300 hover:border-(--accent) hover:text-(--accent)"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </li>
      </ul>

      <button
        className="hidden max-sm:flex flex-col gap-1.25 border-none bg-transparent p-2"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Menu"
      >
        <span
          className={cn(
            "block h-0.5 w-6 rounded-sm bg-(--fg) transition-all duration-300",
            open && "translate-y-[7px] rotate-45",
          )}
        />
        <span
          className={cn(
            "block h-0.5 w-6 rounded-sm bg-(--fg) transition-all duration-300",
            open && "opacity-0",
          )}
        />
        <span
          className={cn(
            "block h-0.5 w-6 rounded-sm bg-(--fg) transition-all duration-300",
            open && "-translate-y-[7px] -rotate-45",
          )}
        />
      </button>
    </nav>
  );
}
