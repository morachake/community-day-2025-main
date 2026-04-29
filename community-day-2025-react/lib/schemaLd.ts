export const eventLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "AWS Community Day Kenya 2026",
  description:
    "Kenya's AWS Community Day 2026 in Mombasa: keynotes, technical sessions, hands-on workshops, and networking. Theme: The Builder's Blueprint—Architecting for Tomorrow.",
  startDate: "2026-07-04T07:00:00+03:00",
  endDate: "2026-07-04T17:00:00+03:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Mombasa, Kenya",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mombasa",
      addressRegion: "Mombasa County",
      addressCountry: "KE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "-4.0435",
      longitude: "39.6682",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "AWS User Group Kenya",
    url: "https://awsusergroupkenya.co.ke",
    sameAs: [
      "https://www.linkedin.com/company/aws-user-group-kenya",
      "https://twitter.com/aws_UGkenya",
      "https://www.meetup.com/aws-user-group-nairobi/",
    ],
  },
  offers: {
    "@type": "Offer",
    url: "https://awsusergroupkenya.co.ke#subscribe",
    priceCurrency: "KES",
    availability: "https://schema.org/PreOrder",
    validFrom: "2026-01-01",
  },
  image: ["https://awsusergroupkenya.co.ke/images/AWS_CommunityDay_Kenya-2025.jpeg"],
  url: "https://awsusergroupkenya.co.ke",
};

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AWS User Group Kenya",
  url: "https://awsusergroupkenya.co.ke",
  logo: "https://awsusergroupkenya.co.ke/images/AWSKenyaLogo.png",
  description:
    "Kenya's largest AWS community group united by community-led learning and cloud innovation. We organize events, workshops, and networking opportunities for AWS users across Kenya.",
  foundingDate: "2018",
  location: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "Kenya",
    },
  },
  sameAs: [
    "https://www.linkedin.com/company/aws-user-group-kenya",
    "https://twitter.com/aws_UGkenya",
    "https://www.meetup.com/aws-user-group-nairobi/",
    "https://youtube.com/@awsusergroupkenya3057",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "awsusergroup.kenya@gmail.com",
    contactType: "customer service",
  },
};

export const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "When is AWS Community Day Kenya 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AWS Community Day Kenya 2026 is on July 4, 2026, from 7:00 AM in Mombasa, Kenya. Venue details will be announced—subscribe for updates.",
      },
    },
    {
      "@type": "Question",
      name: "Who are the keynote speakers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Keynote speakers and the full lineup will be announced closer to the event. Past editions featured AWS and industry leaders—see the Event Archive for 2024 and 2025.",
      },
    },
    {
      "@type": "Question",
      name: "How do I register or get tickets?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Registration and ticket information will be shared on this site and via the newsletter. Join the mailing list in the subscribe section to be notified.",
      },
    },
  ],
};

export const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "AWS User Group Kenya",
      item: "https://awsusergroupkenya.co.ke",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Events",
      item: "https://awsusergroupkenya.co.ke#events",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "AWS Community Day Kenya 2026",
      item: "https://awsusergroupkenya.co.ke",
    },
  ],
};
