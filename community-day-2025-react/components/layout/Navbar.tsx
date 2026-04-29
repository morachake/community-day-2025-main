"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import SponsorModal from "@/components/sponsor/SponsorModal";

function sectionHref(sectionId: string, pathname: string | null): string {
  if (pathname === "/") return `#${sectionId}`;
  return `/#${sectionId}`;
}

export default function Navbar() {
  const pathname = usePathname();
  const [archiveMenuOpen, setArchiveMenuOpen] = useState(false);
  const [sponsorOpen, setSponsorOpen] = useState(false);
  const archiveWrapperRef = useRef<HTMLLIElement>(null);

  const closeArchive = useCallback(() => setArchiveMenuOpen(false), []);

  useEffect(() => {
    function handleDocMouseDown(ev: MouseEvent) {
      if (
        archiveWrapperRef.current &&
        !archiveWrapperRef.current.contains(ev.target as Node)
      ) {
        closeArchive();
      }
    }
    document.addEventListener("mousedown", handleDocMouseDown);
    return () => document.removeEventListener("mousedown", handleDocMouseDown);
  }, [closeArchive]);

  return (
    <div id="nav-bar">
      <p id="toggle" aria-label="Open navigation menu">
        <span></span>
      </p>
      {/* spec is a direct child of #nav-bar (not inside the ul) — matches original
          navbar.html structure that style.css flex layout depends on */}
      <li className="spec">
        <a className="buy-ticket-link button">Book a Spot</a>
      </li>
      <ul className="main_header_ul" role="menubar">
        <li role="none">
          <Link href={sectionHref("com_info", pathname)} prefetch={false}>
            About Community Day
          </Link>
        </li>
        <li role="none">
          <Link href={sectionHref("venues", pathname)} prefetch={false}>
            Venue
          </Link>
        </li>
        <li role="none">
          <Link href={sectionHref("agenda", pathname)} prefetch={false}>
            Agenda
          </Link>
        </li>
        <li role="none">
          <Link href="/badge/attending" prefetch={false}>
            I will be Attending
          </Link>
        </li>
        <li role="none">
          <Link href="/badge/volunteering" prefetch={false}>
            I will be Volunteering
          </Link>
        </li>
        <li role="none">
          <button
            type="button"
            className="nav-archive-toggle"
            onClick={() => setSponsorOpen(true)}
          >
            Sponsor Us
          </button>
        </li>
        <li role="none">
          <Link href={sectionHref("volunteers", pathname)} prefetch={false}>
            Organizing Committee
          </Link>
        </li>
        {/* Event Archive dropdown — last item */}
        <li
          ref={archiveWrapperRef}
          role="none"
          className={`has-dropdown${archiveMenuOpen ? " open" : ""}`}
          onBlur={(e) => {
            if (
              archiveWrapperRef.current &&
              !archiveWrapperRef.current.contains(
                e.relatedTarget as Node | null,
              )
            ) {
              setArchiveMenuOpen(false);
            }
          }}
        >
          <button
            type="button"
            id="archive-menu-trigger"
            className="nav-archive-toggle"
            aria-haspopup="true"
            aria-expanded={archiveMenuOpen}
            aria-controls="archive-dropdown-panel"
            onClick={() => setArchiveMenuOpen((v) => !v)}
          >
            Event Archive
          </button>
          <ul
            id="archive-dropdown-panel"
            className="archive-dropdown-menu"
            role="menu"
          >
            <li role="none">
              <Link
                role="menuitem"
                href="/"
                prefetch={false}
                className={pathname === "/" ? "active-year" : ""}
                onClick={closeArchive}
              >
                2026 · Current edition
              </Link>
            </li>
            <li role="none">
              <Link
                role="menuitem"
                href="/archive/2025"
                prefetch={false}
                className={
                  pathname?.startsWith("/archive/2025") ? "active-year" : ""
                }
                onClick={closeArchive}
              >
                2025 archive
              </Link>
            </li>
            <li role="none">
              <Link
                role="menuitem"
                href="/archive/2024"
                prefetch={false}
                className={
                  pathname?.startsWith("/archive/2024") ? "active-year" : ""
                }
                onClick={closeArchive}
              >
                2024 archive
              </Link>
            </li>
          </ul>
        </li>
      </ul>

      <SponsorModal open={sponsorOpen} onClose={() => setSponsorOpen(false)} />
    </div>
  );
}
