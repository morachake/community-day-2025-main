"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const PROSPECTUS_URL = "/docs/sponsorship-prospectus.pdf";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SponsorModal({ open, onClose }: Props) {
  const [pdfError, setPdfError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  // Restore scroll and handle Escape
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Sponsorship Prospectus"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px",
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.72)",
          backdropFilter: "blur(4px)",
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: "relative",
          width: "min(1380px, 96vw)",
          height: "96vh",
          background: "#f5f5f5",
          borderRadius: "16px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 24px 80px rgba(0,0,0,0.45)",
        }}
      >
        {/* Modal header */}
        <div
          style={{
            background: "#232f3f",
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              color: "#fff",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.4px",
            }}
          >
            AWS Community Day Kenya 2026 — Sponsorship Prospectus
          </span>

          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <a
              href={PROSPECTUS_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => { e.stopPropagation(); window.open(PROSPECTUS_URL, "_blank", "noopener,noreferrer"); e.preventDefault(); }}
              style={{
                background: "rgba(255,255,255,0.12)",
                color: "#fff",
                padding: "6px 14px",
                borderRadius: "6px",
                textDecoration: "none",
                fontSize: "12px",
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                cursor: "pointer",
              }}
            >
              <i className="icon ion-md-open" />
              New tab
            </a>
            <a
              href={PROSPECTUS_URL}
              download="AWS-CommunityDay-Kenya-2026-Sponsorship-Prospectus.pdf"
              style={{
                background: "#ff9900",
                color: "#232f3f",
                padding: "6px 14px",
                borderRadius: "6px",
                textDecoration: "none",
                fontSize: "12px",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <i className="icon ion-md-download" />
              Download
            </a>
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "none",
                color: "#fff",
                width: "32px",
                height: "32px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 1,
                flexShrink: 0,
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* PDF viewer */}
        <div style={{ flex: 1, minHeight: 0, position: "relative" }}>
          {pdfError ? (
            <div
              style={{
                padding: "48px 30px",
                textAlign: "center",
                color: "#555",
                background: "#fff",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
              }}
            >
              <i
                className="icon ion-md-document"
                style={{ fontSize: "56px", color: "#ff9900" }}
              />
              <h3 style={{ margin: 0, color: "#232f3f" }}>
                PDF preview unavailable
              </h3>
              <p style={{ margin: 0 }}>
                Your browser doesn&apos;t support inline PDF viewing.
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
            <iframe
              src={`${PROSPECTUS_URL}#toolbar=1&navpanes=0&scrollbar=1`}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                border: "none",
                display: "block",
              }}
              title="Sponsorship Prospectus"
              onError={() => setPdfError(true)}
            />
          )}
        </div>

        {/* Contact footer */}
        <div
          style={{
            background: "#232f3f",
            padding: "20px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "14px",
            flexShrink: 0,
          }}
        >
          <div>
            <p
              style={{
                margin: "0 0 4px",
                color: "#ff9900",
                fontSize: "16px",
                fontWeight: 700,
              }}
            >
              Ready to partner with us?
            </p>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.8)", fontSize: "13px" }}>
              Reach out to the AWS User Group Kenya organising team to secure your package.
            </p>
          </div>
          <a
            href="mailto:sponsors@awsusergroupkenya.co.ke"
            style={{
              background: "#ff9900",
              color: "#232f3f",
              padding: "11px 24px",
              borderRadius: "50px",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "14px",
              whiteSpace: "nowrap",
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            <i className="icon ion-md-mail" />
            sponsors@awsusergroupkenya.co.ke
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}
