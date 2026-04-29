"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const titles: Record<string, string> = {
  "2025": "AWS Community Day Kenya 2025",
  "2024": "AWS Community Day Kenya 2024",
};

export default function ArchiveYearHeader() {
  const pathname = usePathname();
  const m = pathname?.match(/^\/archive\/(\d{4})\/?$/);
  const year = m?.[1] ?? "";
  const title = titles[year] ?? `Event Archive ${year}`;

  return (
    <div className="archive-page-banner section section-1 hdr">
      <div className="container">
        <p className="headin_h4" style={{ marginBottom: "0.5rem" }}>
          Archive · {year}
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <h2 className="main-heading-ttl" style={{ margin: 0 }}>
            {title}
          </h2>
          <Link
            href="/"
            className="buy-ticket-link button"
            style={{ fontSize: "14px", paddingLeft: "1.25rem", paddingRight: "1.25rem" }}
            prefetch={false}
          >
            ← Back to 2026 home
          </Link>
        </div>
      </div>
    </div>
  );
}
