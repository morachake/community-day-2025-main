import ArchiveHero from "@/components/archive/ArchiveHero";
import Footer from "@/components/layout/Footer";

export default function ArchiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div id="page">
        <ArchiveHero />
        {children}
      </div>
      <Footer />
    </>
  );
}
