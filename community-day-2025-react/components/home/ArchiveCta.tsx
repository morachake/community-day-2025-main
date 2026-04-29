import Link from "next/link";

export default function ArchiveCta() {
  return (
    <section id="event-archive" className="section section-3 inv">
      <div className="container">
        <h4 className="main-heading-ttl text-center">Event Archive</h4>
        <p style={{ margin: "16px auto 32px auto", fontSize: "1.0625rem" }}>
          Browse each AWS Community Day Kenya edition — event snapshot, lineup,
          galleries, sponsors, and more.
        </p>
        <div className="previous-events-selector" style={{ justifyContent: "center" }}>
          <Link href="/" className="event-year-card archive-cta-card" prefetch={false}>
            <span className="event-year-card-tag">2026 edition</span>
            <h5>AWS Community Day Kenya 2026 · Current</h5>
            <p>Mombasa · July 4, 2026</p>
          </Link>
          <Link
            href="/archive/2025"
            className="event-year-card archive-cta-card"
            prefetch={false}
          >
            <span className="event-year-card-tag">2025 archive</span>
            <h5>AWS Community Day Kenya 2025</h5>
            <p>June 14, 2025 • KCA University, Nairobi</p>
          </Link>
          <Link
            href="/archive/2024"
            className="event-year-card archive-cta-card"
            prefetch={false}
          >
            <span className="event-year-card-tag">2024 archive</span>
            <h5>AWS Community Day Kenya 2024</h5>
            <p>April 20, 2024 • KCA University, Nairobi</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
