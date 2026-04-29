"use client";

import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { useState } from "react";

const PROSPECTUS_URL = "/docs/sponsorship-prospectus.pdf";

export default function SponsorPage() {
  const [pdfError, setPdfError] = useState(false);

  return (
    <div id="page">
      {/* Hero / header — matches .section-1 pattern used across the site */}
      <div className="section section-1 hdr" id="home">
        <Navbar />
      </div>

      {/* PDF Viewer section */}
      <div
        style={{
          background: "#f5f5f5",
          padding: "60px 20px",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {/* Section heading */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#232f3f",
                margin: "0 0 10px",
              }}
            >
              Sponsorship Prospectus
            </h2>
            <p style={{ color: "#666", fontSize: "16px", margin: 0 }}>
              AWS Community Day Kenya 2026 &mdash; Partnership Opportunities
            </p>
          </div>

          {/* PDF embed card */}
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
              overflow: "hidden",
            }}
          >
            {/* Toolbar */}
            <div
              style={{
                background: "#232f3f",
                padding: "14px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <span
                style={{
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                }}
              >
                AWS Community Day Kenya 2026 — Sponsorship Prospectus
              </span>
              <div style={{ display: "flex", gap: "10px" }}>
                <a
                  href={PROSPECTUS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    color: "#fff",
                    padding: "7px 16px",
                    borderRadius: "6px",
                    textDecoration: "none",
                    fontSize: "13px",
                    fontWeight: 600,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "background 0.2s",
                  }}
                >
                  <i className="icon ion-md-open" />
                  Open in new tab
                </a>
                <a
                  href={PROSPECTUS_URL}
                  download="AWS-CommunityDay-Kenya-2026-Sponsorship-Prospectus.pdf"
                  style={{
                    background: "#ff9900",
                    color: "#232f3f",
                    padding: "7px 16px",
                    borderRadius: "6px",
                    textDecoration: "none",
                    fontSize: "13px",
                    fontWeight: 700,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <i className="icon ion-md-download" />
                  Download
                </a>
              </div>
            </div>

            {/* PDF embed */}
            {pdfError ? (
              <div
                style={{
                  padding: "60px 30px",
                  textAlign: "center",
                  color: "#555",
                }}
              >
                <i
                  className="icon ion-md-document"
                  style={{ fontSize: "64px", color: "#ff9900", display: "block", marginBottom: "20px" }}
                />
                <h3 style={{ margin: "0 0 12px", color: "#232f3f" }}>
                  Unable to display PDF in browser
                </h3>
                <p style={{ margin: "0 0 24px" }}>
                  Your browser may not support inline PDF viewing.
                </p>
                <a
                  href={PROSPECTUS_URL}
                  download="AWS-CommunityDay-Kenya-2026-Sponsorship-Prospectus.pdf"
                  style={{
                    background: "#ff9900",
                    color: "#232f3f",
                    padding: "12px 28px",
                    borderRadius: "50px",
                    textDecoration: "none",
                    fontWeight: 700,
                    fontSize: "15px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <i className="icon ion-md-download" />
                  Download Prospectus
                </a>
              </div>
            ) : (
              <object
                data={PROSPECTUS_URL}
                type="application/pdf"
                style={{ width: "100%", height: "85vh", display: "block", border: "none" }}
                onError={() => setPdfError(true)}
              >
                {/* Fallback for browsers without PDF object support */}
                <iframe
                  src={`${PROSPECTUS_URL}#toolbar=1&navpanes=0`}
                  style={{ width: "100%", height: "85vh", border: "none" }}
                  title="AWS Community Day Kenya 2026 Sponsorship Prospectus"
                  onError={() => setPdfError(true)}
                />
              </object>
            )}
          </div>

          {/* Contact prompt */}
          <div
            style={{
              marginTop: "40px",
              background: "#232f3f",
              borderRadius: "16px",
              padding: "36px 40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div>
              <h3
                style={{
                  margin: "0 0 8px",
                  color: "#ff9900",
                  fontSize: "22px",
                  fontWeight: 700,
                }}
              >
                Ready to partner with us?
              </h3>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.85)", fontSize: "15px" }}>
                Reach out to the AWS User Group Kenya organising team to secure
                your sponsorship package.
              </p>
            </div>
            <a
              href="mailto:sponsors@awsusergroupkenya.co.ke"
              style={{
                background: "#ff9900",
                color: "#232f3f",
                padding: "14px 32px",
                borderRadius: "50px",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "15px",
                whiteSpace: "nowrap",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              }}
            >
              <i className="icon ion-md-mail" />
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
