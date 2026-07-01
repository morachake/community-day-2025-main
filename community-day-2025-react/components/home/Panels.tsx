"use client";

import { useEffect, useState } from "react";

const SESSIONIZE_URL =
  "https://sessionize.com/api/v2/4m8c512u/view/SpeakerWall";

type Member = {
  name: string;
  roleLabel: "Host" | "Panelist";
  title?: string;
  org?: string;
  photo?: string;
};

type Panel = {
  category?: string;
  theme: string;
  members: Member[];
};

const PLACEHOLDER = "/images/person-placeholder.svg";

const panels: Panel[] = [
  {
    category: "AI / ML Panel",
    theme:
      "AI and the Real World: Building, Deploying and Getting Value from AI",
    members: [
      {
        name: "Tracy Ogolla",
        roleLabel: "Host",
        title: "Co-Founder",
        org: "Hope in the World Foundation",
        photo: "Tracy Ogolla.jpeg",
      },
      { name: "Ian Okonu", roleLabel: "Panelist" },
      { name: "Godfrey Ogembo", roleLabel: "Panelist" },
      { name: "Felix Jumason", roleLabel: "Panelist" },
      {
        name: "Emmanuel Madanga",
        roleLabel: "Panelist",
        title: "Founder",
        org: "BEYONDDATA ICT",
        photo: "Emmanuel Madanga.jpeg",
      },
    ],
  },
  {
    category: "Women in Tech Panel",
    theme:
      "Women in Tech: Building Careers, Breaking Patterns and Shaping the Next Generation",
    members: [
      {
        name: "Shamayel Karani",
        roleLabel: "Host",
        title: "Tech Entrepreneur",
        org: "Infitech Innovation",
        photo: "sham.jpeg",
      },
      { name: "Andjelka Djukic", roleLabel: "Panelist" },
      { name: "Belinda Ntinyari", roleLabel: "Panelist" },
      { name: "Pauline Namwakira", roleLabel: "Panelist" },
      {
        name: "Weddy Karanja",
        roleLabel: "Panelist",
        title: "AWS SBGL",
        org: "KCA University",
        photo: "Weddy_Karanja.jpg",
      },
    ],
  },
  {
    category: "DevOps & Cloud Engineering Panel",
    theme:
      "DevOps, Platform Engineering and the Art of Shipping Faster Without Breaking Things",
    members: [
      {
        name: "Chris Achinga",
        roleLabel: "Host",
        photo: "Chris_Achinga.jpeg",
      },
      { name: "Kelvin Kaoka", roleLabel: "Panelist" },
      { name: "Nelson Ngumo", roleLabel: "Panelist" },
      {
        name: "Mark Orina",
        roleLabel: "Panelist",
        title: "Cloud Engineer / Co-founder",
        org: "Kaya Community Network",
        photo: "Mark_Orina.jpg",
      },
      { name: "Muhammad Sumon Molla Selim", roleLabel: "Panelist" },
    ],
  },
  {
    category: "Cybersecurity Panel",
    theme: "Security, Compliance and Building Systems That Earn Trust",
    members: [
      {
        name: "Jessica Mbithi",
        roleLabel: "Host",
        title: "Social Media Manager & Content Strategist",
        org: "Mumtaz Motors (K) Ltd",
        photo: "JESSICA MBITHI.jpeg",
      },
      {
        name: "Chris Mukunya",
        roleLabel: "Panelist",
        title: "AI Security Engineer",
        org: "Innovus Tech",
        photo: "Chris Mukunya.png",
      },
      {
        name: "Blessing Mwiti",
        roleLabel: "Panelist",
        title: "Software / ML Engineer",
        org: "Innovus Tech",
        photo: "Blessing Mwiti.png",
      },
      {
        name: "Mukhtar Salim",
        roleLabel: "Panelist",
        title: "Founder & CTO",
        org: "Devseclab Solutions",
        photo: "Mukhtar Salim.jpg",
      },
      { name: "Kelvin Kaoka", roleLabel: "Panelist" },
    ],
  },
  {
    theme:
      "Startups, Academia and Industry: Who Is Building What and Are We Building It Together?",
    members: [
      {
        name: "Moreen Isaac",
        roleLabel: "Host",
        title: "Software Engineer & B2B Tech Sales",
        org: "Lebigott",
        photo: "Moreen Isaac.jpg",
      },
      { name: "Steve Biko", roleLabel: "Panelist", photo: "SteveBiko.jpg" },
      {
        name: "Titus Kapadokia",
        roleLabel: "Panelist",
        title: "Software Engineer",
        org: "VUA Solutions",
        photo: "Kapadokia_Titus.jpg",
      },
      { name: "Daniel Clement", roleLabel: "Panelist" },
      {
        name: "Salame Khamis",
        roleLabel: "Panelist",
        photo: "Salame Khamis.jpeg",
      },
    ],
  },
];

/** Normalise a name for loose matching against the Sessionize speaker list. */
function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function photoSrc(member: Member, sessionizePhotos: Map<string, string>): string {
  // Prefer a curated local photo when we have one.
  if (member.photo) return encodeURI(`/images/panelists/${member.photo}`);
  // Otherwise use the speaker's Sessionize profile picture if they're listed.
  const fromSessionize = sessionizePhotos.get(normalizeName(member.name));
  if (fromSessionize) return fromSessionize;
  return PLACEHOLDER;
}

function subtitle(member: Member): string {
  const parts = [member.title, member.org].filter(Boolean);
  return parts.length > 0 ? parts.join(" · ") : member.roleLabel;
}

type SessionizeSpeaker = {
  fullName?: string;
  profilePicture?: string;
};

export default function Panels() {
  const [sessionizePhotos, setSessionizePhotos] = useState<Map<string, string>>(
    new Map()
  );

  useEffect(() => {
    let cancelled = false;

    fetch(SESSIONIZE_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Sessionize returned " + response.status);
        }
        return response.json();
      })
      .then((data: SessionizeSpeaker[]) => {
        if (cancelled || !Array.isArray(data)) return;
        const map = new Map<string, string>();
        data.forEach((speaker) => {
          if (speaker.fullName && speaker.profilePicture) {
            map.set(normalizeName(speaker.fullName), speaker.profilePicture);
          }
        });
        setSessionizePhotos(map);
      })
      .catch(() => {
        /* Keep curated photos / placeholders if Sessionize is unavailable. */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="section-8 panels-section" id="panels">
      <div className="container">
        <h4 className="main-heading-ttl text-center">Panels &amp; Discussions</h4>
        <p
          className="text-center"
          style={{
            color: "rgba(255,255,255,0.9)",
            maxWidth: 660,
            margin: "0 auto 2rem",
            lineHeight: 1.6,
          }}
        >
          Join our moderated panels across AI/ML, Women in Tech, DevOps,
          Cybersecurity and more &mdash; featuring builders and community leaders
          from across the Kenyan coast and beyond.
        </p>

        {panels.map((panel) => (
          <div className="panel-group" key={panel.theme}>
            <div className="panel-group-head">
              {panel.category && (
                <span className="panel-group-tag">{panel.category}</span>
              )}
              <h5 className="panel-group-title">{panel.theme}</h5>
            </div>
            <div className="panel-members-grid">
              {panel.members.map((member, index) => (
                <article
                  className="panel-member-card"
                  key={`${panel.theme}-${member.name}-${index}`}
                >
                  <span
                    className={
                      member.roleLabel === "Host"
                        ? "panel-role-badge host"
                        : "panel-role-badge"
                    }
                  >
                    {member.roleLabel}
                  </span>
                  <div className="panel-member-photo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photoSrc(member, sessionizePhotos)}
                      alt={member.name}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <h6 className="panel-member-name">{member.name}</h6>
                  <p className="panel-member-role">{subtitle(member)}</p>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
