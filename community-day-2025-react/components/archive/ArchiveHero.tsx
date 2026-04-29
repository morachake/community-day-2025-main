"use client";

import Navbar from "@/components/layout/Navbar";
import { usePathname } from "next/navigation";

const YEAR_DATA: Record<string, {
  badge: string;
  title: string;
  description: string;
  statLine: string;
  rightCaption: string;
}> = {
  "2025": {
    badge: "June 14, 2025 · KCA University, Nairobi",
    title: "AWS Community Day Kenya 2025",
    description:
      "A full day of keynotes, technical sessions, hands-on workshops, and community networking at KCA University, Nairobi. Over 500 builders, architects, and cloud enthusiasts came together.",
    statLine: "500+ Attendees · 20+ Speakers · KCA University",
    rightCaption: "Relive the 2025 edition — sessions, speakers, and community moments.",
  },
  "2024": {
    badge: "April 20, 2024 · KCA University, Nairobi",
    title: "AWS Community Day Kenya 2024",
    description:
      "The inaugural full-scale AWS Community Day Kenya — the foundation edition that set the blueprint for annual cloud community events in the region.",
    statLine: "300+ Attendees · 12 Speakers · KCA University",
    rightCaption: "The foundation edition — discover the 2024 speakers, workshops, and highlights.",
  },
};

export default function ArchiveHero() {
  const pathname = usePathname();
  const m = pathname?.match(/^\/archive\/(\d{4})\/?$/);
  const year = m?.[1] ?? "2025";
  const d = YEAR_DATA[year] ?? YEAR_DATA["2025"];

  return (
    <div className="section section-1 hdr" id="home">
      {/* Mirrors hero-content.html structure exactly so style.css rules apply */}
      <div
        className="content"
        style={{ background: "linear-gradient(45deg, #232f3f, #1a2530)" }}
      >
        <div className="container">
          <div>
            {/* LEFT — info panels */}
            <div wid="50%" className="left">
              <div
                className="left_in"
                style={{ padding: "40px 0", maxWidth: "90%", margin: "0 auto" }}
              >
                {/* Logo */}
                <img
                  src="/images/community-day-logo.png"
                  alt="AWS Community Day Kenya"
                  style={{
                    maxWidth: "320px",
                    margin: "0 auto 40px",
                    filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.15))",
                    display: "block",
                  }}
                />

                {/* Event info box */}
                <div
                  className="txt"
                  style={{
                    border: "solid 1px rgba(255,255,255,0.3)",
                    padding: "40px 35px",
                    borderRadius: "12px",
                    boxShadow: "0 15px 35px rgba(0,0,0,0.12)",
                    background: "rgba(35,47,63,0.65)",
                    marginBottom: "35px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "0px",
                      left: 0,
                      right: 0,
                      textAlign: "center",
                    }}
                  >
                    <h4
                      className="headin-ttl"
                      style={{
                        background: "#ff9900",
                        padding: "8px 22px",
                        borderRadius: "30px",
                        display: "inline-block",
                        fontWeight: 600,
                        letterSpacing: "0.5px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                        color: "#fff",
                        fontSize: "16px",
                        margin: 0,
                      }}
                    >
                      {d.badge}
                    </h4>
                  </div>
                  <h4
                    className="headin_h4"
                    style={{
                      fontSize: "32px",
                      margin: "4rem 0 0px",
                      color: "#ff9900",
                      fontWeight: 700,
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {d.title}
                  </h4>
                  <p
                    style={{
                      fontSize: "17px",
                      lineHeight: 1.7,
                      margin: 0,
                      color: "rgba(255,255,255,0.95)",
                      fontWeight: 300,
                    }}
                  >
                    {d.description}
                  </p>
                </div>

                {/* Stats / highlight box */}
                <div
                  className="txt"
                  style={{
                    border: "solid 1px rgba(255,255,255,0.3)",
                    padding: "35px 30px 25px",
                    borderRadius: "12px",
                    boxShadow: "0 15px 35px rgba(0,0,0,0.12)",
                    background: "rgba(35,47,63,0.65)",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "0px",
                      left: 0,
                      right: 0,
                      textAlign: "center",
                    }}
                  >
                    <h4
                      className="headin-ttl"
                      style={{
                        background: "#ff9900",
                        padding: "8px 22px",
                        borderRadius: "30px",
                        display: "inline-block",
                        fontWeight: 600,
                        letterSpacing: "0.5px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                        color: "#fff",
                        fontSize: "16px",
                        margin: 0,
                      }}
                    >
                      Event Highlights
                    </h4>
                  </div>
                  <h6
                    style={{
                      color: "#fff",
                      fontSize: "20px",
                      margin: "15px 0 0",
                      fontWeight: 600,
                      letterSpacing: "0.5px",
                      textAlign: "center",
                    }}
                  >
                    {d.statLine}
                  </h6>
                </div>
              </div>
            </div>

            {/* RIGHT — photo gallery */}
            <div wid="50%" className="right">
              <div
                className="gal flex-it col"
                style={{ filter: "brightness(0.85)" }}
              >
                <div className="top f1 flex-it">
                  <div
                    className="f2 ims im1"
                    style={{
                      backgroundImage: "url('/images/aws2024/activity1.webp')",
                      transition: "all 0.3s ease",
                    }}
                  />
                  <div
                    className="f1 ims im2"
                    style={{
                      backgroundImage: "url('/images/aws2024/activity2.webp')",
                      transition: "all 0.3s ease",
                    }}
                  />
                </div>
                <div className="bot f1 flex-it">
                  <div
                    className="f1 ims im3"
                    style={{
                      backgroundImage: "url('/images/aws2024/activity3.jpeg')",
                      transition: "all 0.3s ease",
                    }}
                  />
                  <div className="f2 flex-it col">
                    <div className="f1 flex-it">
                      <div
                        className="f1 ims im4"
                        style={{
                          backgroundImage: "url('/images/aws2024/activity4.webp')",
                          transition: "all 0.3s ease",
                        }}
                      />
                      <div
                        className="f1 ims im5"
                        style={{
                          backgroundImage: "url('/images/aws2024/activity5.webp')",
                          transition: "all 0.3s ease",
                        }}
                      />
                    </div>
                    <div
                      className="f1 ims im6"
                      style={{
                        backgroundImage: "url('/images/aws2024/activity6.jpeg')",
                        transition: "all 0.3s ease",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="right_in" style={{ zIndex: 10, position: "relative" }}>
                <p className="awsug_logo">
                  <img
                    src="/images/AWSKenyaLogo.png"
                    height={180}
                    width={180}
                    alt="AWS User Group Kenya"
                    style={{
                      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
                      marginBottom: "10px",
                    }}
                  />
                </p>
                <p
                  className="enlarge"
                  style={{
                    fontSize: "22px",
                    lineHeight: 1.5,
                    color: "#fff",
                    textShadow: "0 2px 4px rgba(0,0,0,0.4)",
                    marginBottom: "25px",
                  }}
                >
                  {d.rightCaption}
                </p>
                <a
                  href="/"
                  className="white icon-grp rt"
                  style={{
                    borderRadius: "50px",
                    padding: "0px 25px",
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                    boxShadow: "rgba(0,0,0,0.2) 0px 4px 15px",
                    display: "inline-flex",
                    alignItems: "center",
                    textDecoration: "none",
                    height: "50px",
                    color: "#ff9900",
                    background: "#fff",
                    fontSize: "15px",
                  }}
                >
                  ← Back to AWS 2026
                  <i
                    className="icon large ion-md-home"
                    style={{ color: "#ff9900", marginLeft: "10px" }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
}
