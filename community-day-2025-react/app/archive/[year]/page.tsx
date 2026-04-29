import SectionHtml from "@/components/shared/SectionHtml";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [{ year: "2025" }, { year: "2024" }];
}

export default function ArchiveYearPage({
  params,
}: {
  params: { year: string };
}) {
  const { year } = params;

  if (year === "2025") {
    return (
      <main className="archive-year-main">
        <section
          className="previous-events-showcase archive-year-page archive-year-page-2025"
          aria-label="AWS Community Day Kenya 2025 archive"
        >
          <div className="container">
            <SectionHtml file="archive-2025-panel.html" />
          </div>
          <SectionHtml file="archive-2025-speakers-lineup.html" />
        </section>
      </main>
    );
  }

  if (year === "2024") {
    return (
      <main className="archive-year-main">
        <section
          className="previous-events-showcase archive-year-page archive-year-page-2024"
          aria-label="AWS Community Day Kenya 2024 archive"
        >
          <div className="container">
            <SectionHtml file="archive-2024-panel.html" />
          </div>
        </section>
      </main>
    );
  }

  notFound();
}
