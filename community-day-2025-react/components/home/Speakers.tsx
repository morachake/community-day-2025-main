"use client";

import { useEffect, useState } from "react";

type Speaker = {
  id?: string;
  fullName?: string;
  tagLine?: string;
  profilePicture?: string;
  isTopSpeaker?: boolean;
};

const SESSIONIZE_URL =
  "https://sessionize.com/api/v2/4m8c512u/view/SpeakerWall";

/** Confirmed speakers curated manually (shown above the live Sessionize wall). */
const FEATURED_SPEAKERS: Speaker[] = [
  {
    id: "christal-riziki",
    fullName: "Christal Riziki",
    tagLine:
      "Founder, Takabest Limited · Community & Tech Lead, Pwani Teknowgalz · Technical Lead, Angular Kenya",
    profilePicture: "/images/panelists/christal riziki.jpg",
    isTopSpeaker: true,
  },
];

export default function Speakers() {
  const [speakers, setSpeakers] = useState<Speaker[] | null>(null);
  const [message, setMessage] = useState("Loading speakers...");

  useEffect(() => {
    let cancelled = false;

    fetch(SESSIONIZE_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Sessionize returned " + response.status);
        }
        return response.json();
      })
      .then((data: Speaker[]) => {
        if (cancelled) return;
        if (!Array.isArray(data) || data.length === 0) {
          setSpeakers([]);
          setMessage("Speaker lineup will be published soon.");
          return;
        }
        const sorted = data
          .slice()
          .sort((a, b) => Number(b.isTopSpeaker) - Number(a.isTopSpeaker));
        setSpeakers(sorted);
      })
      .catch(() => {
        if (cancelled) return;
        setSpeakers([]);
        setMessage(
          "Speaker lineup is temporarily unavailable. Please check back soon."
        );
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const hasSpeakers = speakers != null && speakers.length > 0;

  const renderCard = (speaker: Speaker, index: number) => (
    <article
      className="sessionize-speaker-card"
      key={speaker.id ?? `${speaker.fullName ?? "speaker"}-${index}`}
    >
      {speaker.isTopSpeaker && (
        <span className="sessionize-speaker-badge">Featured speaker</span>
      )}
      <div className="sessionize-speaker-photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={
            speaker.profilePicture
              ? encodeURI(speaker.profilePicture)
              : "/images/community-day-logo.png"
          }
          alt={
            speaker.fullName
              ? speaker.fullName + " speaker photo"
              : "Speaker photo"
          }
          loading="lazy"
          decoding="async"
        />
      </div>
      <h5 className="sessionize-speaker-name">
        {speaker.fullName || "AWS Community Day speaker"}
      </h5>
      <p className="sessionize-speaker-tagline">{speaker.tagLine || "Speaker"}</p>
    </article>
  );

  return (
    <div className="section-8" id="speakers">
      <div className="container">
        <div className="speakers">
          <h4 className="main-heading-ttl text-center">
            2026 Speakers &amp; lineup
          </h4>
          <p
            className="text-center"
            style={{
              color: "rgba(255,255,255,0.9)",
              maxWidth: 640,
              margin: "0 auto 1.5rem",
              lineHeight: 1.6,
            }}
          >
            Meet the confirmed builders, cloud practitioners, and community
            leaders joining us at Swahilipot Hub.
          </p>

          <div
            className="sessionize-speakers-grid"
            id="sessionize-speakers"
            aria-live="polite"
          >
            {FEATURED_SPEAKERS.map((speaker, index) => renderCard(speaker, index))}
            {hasSpeakers
              ? speakers!.map((speaker, index) =>
                  renderCard(speaker, FEATURED_SPEAKERS.length + index)
                )
              : FEATURED_SPEAKERS.length === 0 && (
                  <p className="sessionize-speakers-state">{message}</p>
                )}
          </div>

          <div
            className="text-center"
            style={{ marginTop: "1rem", marginBottom: "0.5rem" }}
          >
            <a
              href="https://sessionize.com/aws-community-day-2026"
              target="_blank"
              rel="noopener noreferrer"
              className="button hover-lift"
            >
              <i className="fa fa-microphone" aria-hidden="true"></i>
              Apply to Speak
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
