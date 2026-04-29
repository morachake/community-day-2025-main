import Navbar from "@/components/layout/Navbar";
import SectionHtml from "@/components/shared/SectionHtml";

export default function Hero() {
  return (
    <div className="section section-1 hdr" id="home">
      <SectionHtml file="hero-content.html" />
      <Navbar />
    </div>
  );
}
