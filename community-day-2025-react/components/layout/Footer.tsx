"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function sectionHref(id: string, pathname: string | null) {
  return pathname === "/" ? `#${id}` : `/#${id}`;
}

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #1a2530 0%, #232f3f 100%)",
        color: "rgba(255,255,255,0.85)",
        paddingTop: "60px",
        paddingBottom: "0",
        marginTop: "0",
      }}
    >
      <div className="container">
        {/* Top grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "48px",
            paddingBottom: "48px",
          }}
        >
          {/* Brand */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/community-day-logo.png"
              alt="AWS Community Day Kenya"
              style={{ maxWidth: "180px", marginBottom: "16px", display: "block" }}
            />
            <p style={{ fontSize: "14px", lineHeight: 1.7, opacity: 0.7, margin: "0 0 16px" }}>
              The annual gathering of AWS builders, architects, and cloud enthusiasts in Kenya.
            </p>
            <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
              <a
                href="https://x.com/aws_UGkenya"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="AWS UG Kenya on X / Twitter"
                style={iconLinkStyle}
              >
                <i className="fa fa-twitter" />
              </a>
              <a
                href="https://www.linkedin.com/company/aws-user-group-kenya/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="AWS UG Kenya on LinkedIn"
                style={iconLinkStyle}
              >
                <i className="fa fa-linkedin" />
              </a>
              <a
                href="mailto:awsusergroup.kenya@gmail.com"
                aria-label="Email AWS UG Kenya"
                style={iconLinkStyle}
              >
                <i className="fa fa-envelope" />
              </a>
            </div>
          </div>

          {/* Upcoming Event */}
          <div>
            <h6 style={colHeadingStyle}>Upcoming Event</h6>
            <ul style={listStyle}>
              <li>
                <span style={accentStyle}>AWS Community Day Kenya 2026</span>
              </li>
              <li>📅 4th July, 2026</li>
              <li>📍 Mombasa, Kenya</li>
              <li style={{ marginTop: "12px" }}>
                <a href={sectionHref("tickets", pathname)} style={linkStyle}>
                  Get Your Ticket →
                </a>
              </li>
              <li>
                <a href="/sponsor" style={linkStyle}>
                  Become a Sponsor →
                </a>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h6 style={colHeadingStyle}>Quick Links</h6>
            <ul style={listStyle}>
              <li>
                <Link href={sectionHref("com_info", pathname)} style={linkStyle} prefetch={false}>
                  About Community Day
                </Link>
              </li>
              <li>
                <Link href={sectionHref("speakers", pathname)} style={linkStyle} prefetch={false}>
                  Speakers
                </Link>
              </li>
              <li>
                <Link href={sectionHref("agenda", pathname)} style={linkStyle} prefetch={false}>
                  Agenda
                </Link>
              </li>
              <li>
                <Link href={sectionHref("workshop", pathname)} style={linkStyle} prefetch={false}>
                  Workshops
                </Link>
              </li>
              <li>
                <Link href={sectionHref("venues", pathname)} style={linkStyle} prefetch={false}>
                  Venue
                </Link>
              </li>
              <li>
                <Link href={sectionHref("volunteers", pathname)} style={linkStyle} prefetch={false}>
                  Organizing Committee
                </Link>
              </li>
            </ul>
          </div>

          {/* Archive */}
          <div>
            <h6 style={colHeadingStyle}>Event Archive</h6>
            <ul style={listStyle}>
              <li>
                <Link href="/" style={linkStyle} prefetch={false}>
                  2026 · Current edition
                </Link>
              </li>
              <li>
                <Link href="/archive/2025" style={linkStyle} prefetch={false}>
                  2025 · KCA University, Nairobi
                </Link>
              </li>
              <li>
                <Link href="/archive/2024" style={linkStyle} prefetch={false}>
                  2024 · KCA University, Nairobi
                </Link>
              </li>
            </ul>
            <h6 style={{ ...colHeadingStyle, marginTop: "24px" }}>Badges</h6>
            <ul style={listStyle}>
              <li>
                <Link href="/badge/attending" style={linkStyle} prefetch={false}>
                  I&apos;m Attending
                </Link>
              </li>
              <li>
                <Link href="/badge/volunteering" style={linkStyle} prefetch={false}>
                  I&apos;m Volunteering
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact strip */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            padding: "20px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            fontSize: "14px",
            opacity: 0.65,
            flexWrap: "wrap",
          }}
        >
          <i className="icon ion-md-mail" style={{ color: "#ff9900" }} />
          <span>Questions?</span>
          <a
            href="mailto:awsusergroup.kenya@gmail.com"
            style={{ color: "#ff9900", textDecoration: "none" }}
          >
            awsusergroup.kenya@gmail.com
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          background: "rgba(0,0,0,0.3)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          padding: "18px 0",
          textAlign: "center",
          fontSize: "13px",
          opacity: 0.55,
        }}
      >
        <div className="container">
          © {year} AWS User Group Kenya · AWS Community Day Kenya is a community-organized event
          and is not officially affiliated with Amazon Web Services, Inc.
        </div>
      </div>
    </footer>
  );
}

const colHeadingStyle: React.CSSProperties = {
  color: "#ff9900",
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  marginBottom: "16px",
};

const listStyle: React.CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  fontSize: "14px",
  lineHeight: 1.5,
};

const linkStyle: React.CSSProperties = {
  color: "rgba(255,255,255,0.75)",
  textDecoration: "none",
  transition: "color 0.2s",
};

const iconLinkStyle: React.CSSProperties = {
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  border: "1px solid rgba(255,255,255,0.2)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "rgba(255,255,255,0.7)",
  textDecoration: "none",
  fontSize: "14px",
  transition: "border-color 0.2s, color 0.2s",
};

const accentStyle: React.CSSProperties = {
  color: "#ff9900",
  fontWeight: 600,
  fontSize: "13px",
};
