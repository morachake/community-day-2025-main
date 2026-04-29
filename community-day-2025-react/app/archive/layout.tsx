import ArchiveHero from "@/components/archive/ArchiveHero";

export default function ArchiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="page">
      <ArchiveHero />
      {children}
    </div>
  );
}
