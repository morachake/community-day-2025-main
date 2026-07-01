import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Code of Conduct | AWS Community Day Kenya 2026",
  description:
    "The Code of Conduct for AWS Community Day Kenya 2026 — our commitment to a safe, welcoming, harassment-free experience for every attendee, speaker, sponsor, volunteer, and organizer.",
  alternates: { canonical: "/code-of-conduct" },
  openGraph: {
    title: "Code of Conduct | AWS Community Day Kenya 2026",
    description:
      "Our commitment to a safe, welcoming, and inclusive event for everyone at AWS Community Day Kenya 2026.",
    url: "https://awsusergroupkenya.co.ke/code-of-conduct",
    type: "article",
  },
};

const REPORT_EMAIL = "awspwaniug@gmail.com";

export default function CodeOfConductPage() {
  return (
    <>
      <div id="page">
        <main className="coc-page">
          {/* Hero */}
          <header className="coc-hero">
            <div className="container">
              <p className="coc-eyebrow">AWS Community Day Kenya 2026</p>
              <h1 className="coc-title">Code of Conduct</h1>
              <p className="coc-subtitle">
                AWS Community Day Kenya is dedicated to providing a safe,
                inclusive, and harassment-free experience for everyone. This Code
                of Conduct applies to all attendees, speakers, sponsors,
                exhibitors, volunteers, organizers, and staff — before, during,
                and after the event, both in person and online.
              </p>
              <p className="coc-updated">Last updated: July 2026</p>
            </div>
          </header>

          {/* Body */}
          <div className="container coc-body">
            <section className="coc-section" id="our-pledge">
              <h2>1. Our Pledge</h2>
              <p>
                We believe that community is built on respect, curiosity, and
                collaboration. We are committed to making participation in AWS
                Community Day Kenya a welcoming and rewarding experience for
                everyone, regardless of age, gender, gender identity and
                expression, sexual orientation, disability, physical appearance,
                body size, ethnicity, nationality, race, religion (or lack
                thereof), socioeconomic status, level of experience, or
                technology choices.
              </p>
              <p>
                We do not tolerate harassment of participants in any form.
                Everyone is expected to help create a friendly, professional
                environment where all people feel safe to learn, share, and
                connect.
              </p>
            </section>

            <section className="coc-section" id="expected-behavior">
              <h2>2. Expected Behavior</h2>
              <p>All participants are expected to:</p>
              <ul>
                <li>
                  Be respectful, considerate, and kind in all interactions —
                  whether in sessions, workshops, hallways, or online channels.
                </li>
                <li>
                  Communicate openly and thoughtfully, and be mindful of differing
                  viewpoints and experiences.
                </li>
                <li>
                  Give credit where it is due and support the growth of others in
                  the community.
                </li>
                <li>
                  Respect the venue, staff, volunteers, and fellow attendees, and
                  follow all venue rules and safety instructions.
                </li>
                <li>
                  Be inclusive — actively seek to welcome and involve people who
                  are new or under-represented.
                </li>
                <li>
                  Respect people&apos;s boundaries, personal space, and requests
                  to stop any behavior.
                </li>
              </ul>
            </section>

            <section className="coc-section" id="unacceptable-behavior">
              <h2>3. Unacceptable Behavior</h2>
              <p>
                Harassment and other unacceptable behavior will not be tolerated.
                This includes, but is not limited to:
              </p>
              <ul>
                <li>
                  Offensive, discriminatory, or derogatory comments related to any
                  of the personal characteristics listed in our pledge.
                </li>
                <li>
                  Intimidation, stalking, following, or unwanted photography or
                  recording.
                </li>
                <li>
                  Sexual language, imagery, or unwelcome sexual attention or
                  advances of any kind.
                </li>
                <li>
                  Verbal, physical, or written abuse, threats, or deliberate
                  disruption of talks, workshops, or other events.
                </li>
                <li>
                  Sustained interruption, heckling, or disrespect toward speakers,
                  volunteers, or attendees.
                </li>
                <li>
                  Inappropriate physical contact or invasion of personal space.
                </li>
                <li>
                  Advocating for, encouraging, or coordinating any of the above
                  behavior.
                </li>
                <li>
                  Possession or use of weapons, illegal substances, or any
                  activity that endangers the safety of others.
                </li>
              </ul>
            </section>

            <section className="coc-section" id="scope">
              <h2>4. Scope</h2>
              <p>
                This Code of Conduct applies to all event spaces and channels,
                including talks, workshops, panels, networking sessions, social
                events, sponsor and exhibitor areas, official communication
                platforms (such as WhatsApp, Slack, Discord, X/Twitter, LinkedIn),
                and any other space managed in connection with AWS Community Day
                Kenya. It also applies to conduct outside these spaces when it has
                the potential to adversely affect the safety and well-being of
                community members.
              </p>
            </section>

            <section className="coc-section" id="sponsors">
              <h2>5. Sponsors, Exhibitors &amp; Speakers</h2>
              <p>
                Sponsors, exhibitors, and speakers are also subject to this Code of
                Conduct. In particular:
              </p>
              <ul>
                <li>
                  Booths, stands, and promotional materials must not use sexualized
                  images, activities, or other material that creates a hostile
                  environment.
                </li>
                <li>
                  Staff (including volunteers) should not use sexualized clothing,
                  uniforms, or costumes, or otherwise create a sexualized
                  environment.
                </li>
                <li>
                  Talks, slides, demos, and other presentation materials must be
                  free of discriminatory or harassing content.
                </li>
              </ul>
            </section>

            <section className="coc-section" id="reporting">
              <h2>6. Reporting an Incident</h2>
              <p>
                If you experience or witness a violation of this Code of Conduct,
                or have any other concerns, please report it as soon as possible.
                You will be taken seriously, treated with respect, and your report
                will be handled confidentially.
              </p>
              <p>You can reach the organizing team by:</p>
              <ul>
                <li>
                  Emailing us at{" "}
                  <a href={`mailto:${REPORT_EMAIL}`}>{REPORT_EMAIL}</a>.
                </li>
                <li>
                  Approaching any organizer or volunteer on-site — look for staff
                  badges or the registration/help desk.
                </li>
              </ul>
              <p>
                When reporting, it helps (but is not required) to share what
                happened, who was involved, when and where it occurred, and
                whether anyone else witnessed it. If you are in immediate danger,
                please contact local emergency services or venue security first.
              </p>
            </section>

            <section className="coc-section" id="enforcement">
              <h2>7. Enforcement &amp; Consequences</h2>
              <p>
                Participants asked to stop any unacceptable behavior are expected
                to comply immediately. The organizing team may take any action
                deemed appropriate, including but not limited to:
              </p>
              <ul>
                <li>A formal warning to the individual involved.</li>
                <li>
                  Expulsion from the event without refund, where applicable.
                </li>
                <li>
                  Removal from official community channels and future events.
                </li>
                <li>
                  Involving venue security or local law enforcement where
                  necessary.
                </li>
              </ul>
              <p>
                The organizing team retains full discretion in determining the
                appropriate response to a given situation, with the safety of the
                community as the highest priority.
              </p>
            </section>

            <section className="coc-section" id="safety">
              <h2>8. Health, Safety &amp; Accessibility</h2>
              <p>
                We want everyone to participate fully and comfortably. If you have
                accessibility requirements, dietary needs, or any concerns that
                would help us support your attendance, please contact us in advance
                at <a href={`mailto:${REPORT_EMAIL}`}>{REPORT_EMAIL}</a>. Please
                also follow all venue safety guidance and the directions of event
                staff and volunteers during the event.
              </p>
            </section>

            <section className="coc-section" id="acknowledgements">
              <h2>9. Acknowledgements &amp; License</h2>
              <p>
                This Code of Conduct is inspired by community best practices,
                including the AWS Community guidelines, the Conference Code of
                Conduct, and the Contributor Covenant. We are grateful to the
                broader community for setting the standard for safe and inclusive
                events.
              </p>
            </section>

            <div className="coc-cta">
              <p>
                By participating in AWS Community Day Kenya 2026, you agree to
                uphold this Code of Conduct and help us keep our community safe and
                welcoming for all.
              </p>
              <Link href="/" className="coc-back" prefetch={false}>
                ← Back to Home
              </Link>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
