"use client";

import domtoimage from "dom-to-image";
import Script from "next/script";
import { useCallback, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export type BadgePageProps = {
  /** HTML snippet for `#paragraphToCopy` (supports `<br>`). */
  paragraphHtml: string;
  backgrounds: {
    withPhoto: string;
    withoutPhoto: string;
  };
  downloads: {
    withPhotoFilename: string;
    withoutPhotoFilename: string;
  };
};

export default function BadgePage({
  paragraphHtml,
  backgrounds,
  downloads,
}: BadgePageProps) {
  useEffect(() => {
    const t = window.setTimeout(() => {
      window.AOS?.init({
        duration: 1000,
        easing: "ease-in-out",
        once: true,
        mirror: false,
      });
    }, 120);
    return () => window.clearTimeout(t);
  }, []);

  const handleCopy = useCallback(() => {
    const el = document.getElementById("paragraphToCopy");
    if (!el) return;
    let text = el.innerHTML.replace(/<br\s*\/?>/gi, "\n");
    text = text.replace(/<[^>]+>/g, "");
    navigator.clipboard.writeText(text).catch(() => {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    });
  }, []);

  const downloadImageBlob = useCallback((uri: string, name: string) => {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const handleDownloadWithPhoto = useCallback(async () => {
    const cardWithPhoto = document.querySelector(".cardwp") as HTMLElement | null;
    const btn = document.querySelector("#d_photo") as HTMLButtonElement | null;
    const imgEl = document.getElementById("userImage") as HTMLElement | null;
    const inputEl = document.getElementById("mypht") as HTMLInputElement | null;
    const file = inputEl?.files?.[0];
    if (!cardWithPhoto || !btn || !imgEl || !file) {
      alert("Please upload a photo");
      return;
    }

    btn.innerHTML = "Downloading...";

    // Neutralise the responsive scale + frame clipping so the capture is
    // the full 1080px card regardless of viewport size.
    const frame = cardWithPhoto.parentElement;
    if (frame) {
      frame.style.width = "auto";
      frame.style.height = "auto";
      frame.style.overflow = "visible";
    }
    cardWithPhoto.style.transform = "none";
    cardWithPhoto.style.margin = "0";
    cardWithPhoto.style.width = "1080px";
    cardWithPhoto.style.height = "1080px";
    imgEl.classList.add("download-img");

    try {
      const dataUrl = await domtoimage.toPng(cardWithPhoto);
      imgEl.classList.remove("download-img");
      downloadImageBlob(dataUrl, downloads.withPhotoFilename);
    } catch (e) {
      console.error(e);
      imgEl.classList.remove("download-img");
    } finally {
      cardWithPhoto.style.width = "400px";
      cardWithPhoto.style.height = "400px";
      cardWithPhoto.style.transform = "";
      cardWithPhoto.style.margin = "";
      if (frame) {
        frame.style.width = "";
        frame.style.height = "";
        frame.style.overflow = "";
      }
      btn.innerHTML = "Download";
    }
  }, [downloads.withPhotoFilename, downloadImageBlob]);

  const handleDownloadWithoutPhoto = useCallback(async () => {
    const cardNoPhoto = document.querySelector(".cardwop") as HTMLElement | null;
    const btn = document.querySelector("#d1_photo") as HTMLButtonElement | null;

    if (!cardNoPhoto || !btn) return;

    btn.innerHTML = "Downloading...";
    const frame = cardNoPhoto.parentElement;
    if (frame) {
      frame.style.width = "auto";
      frame.style.height = "auto";
      frame.style.overflow = "visible";
    }
    cardNoPhoto.style.transform = "none";
    cardNoPhoto.style.margin = "0";
    cardNoPhoto.style.width = "1080px";
    cardNoPhoto.style.height = "1080px";

    try {
      const dataUrl = await domtoimage.toPng(cardNoPhoto);
      downloadImageBlob(dataUrl, downloads.withoutPhotoFilename);
    } catch (e) {
      console.error(e);
    } finally {
      cardNoPhoto.style.width = "400px";
      cardNoPhoto.style.height = "400px";
      cardNoPhoto.style.transform = "";
      cardNoPhoto.style.margin = "";
      if (frame) {
        frame.style.width = "";
        frame.style.height = "";
        frame.style.overflow = "";
      }
      btn.innerHTML = "Download";
    }
  }, [downloads.withoutPhotoFilename, downloadImageBlob]);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .bphoto-card .card {
              margin: auto;
              box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
              overflow: hidden;
              width: 22em;
              height: 28em;
              display: flex;
              justify-content: space-between;
              flex-direction: column;
              color: #fff !important;
              z-index: 100;
            }
            .user>img {
              width: 142px;
              height: 136px;
              margin-top: -107px;
              margin-left: 0px;
            }
            .user>.download-img {
              width: 377px;
              height: 376px;
              margin-top: -294px;
              margin-left: 2px;
            }
            #card1 {
              background-image: url("${backgrounds.withPhoto}");
              background-position: center;
              background-repeat: no-repeat;
              background-size: 100% 100%;
            }
            #card2 {
              background-image: url("${backgrounds.withoutPhoto}");
              background-position: center;
              background-repeat: no-repeat;
              background-size: 100% 100%;
            }

            /* ── Match site theme: navy (#232f3f / #1a2530) + AWS orange (#ff9900) ── */
            body { background: #1a2530 !important; }

            /* Navbar wrapper: collapse the full-height hero so only the bar shows */
            .badge-navwrap.section-1 {
              min-height: 0;
              background: #232f3f;
            }

            /* Hero overlay → brand navy gradient + spacing so the heading
               clears the navbar and content never crowds the copy block */
            #phero {
              background-attachment: fixed;
              padding: 40px 0 60px;
            }
            #phero:before {
              background: linear-gradient(45deg, #232f3f, #1a2530);
              opacity: 0.92;
            }
            #phero .phero-container { margin-top: 0; padding: 0 15px; }
            #phero h1 {
              font-family: "Goldman", "Exo", "Roboto", sans-serif;
              color: #fff;
              text-shadow: none;
              letter-spacing: 1px;
              line-height: 1.08;
              margin-bottom: 1rem;
            }
            #phero h1 span { color: #ff9900; text-shadow: none; }

            /* Copy-to-clipboard block — generous padding so the button can
               never clip out of its rounded container */
            .copy-text-wrapper { width: 100%; margin-bottom: 2.5rem; }
            .copy-text-wrapper .copy-text-heading {
              font-family: "Roboto", "Open Sans", sans-serif;
              max-width: 720px;
              margin: 0 auto 18px;
              line-height: 1.4;
            }
            .copy-text-wrapper .inner-text-content-full .copy-content-inner-wrapper {
              background-color: rgba(35, 47, 63, 0.65);
              border: 1px solid rgba(255, 255, 255, 0.12);
              border-radius: 12px;
              padding: 24px 22px;
            }
            .copy-text-wrapper #paragraphToCopy {
              margin: 0 0 18px;
              line-height: 1.6;
              word-break: break-word;
            }
            .copy-text-wrapper #copyButton {
              margin: 0;
              border: 1px solid #ff9900;
              color: #ff9900;
            }
            .copy-text-wrapper #copyButton:hover,
            .copy-text-wrapper #copyButton:focus {
              background-color: #ff9900;
              color: #1a2530;
            }

            /* Badge builder cards + headings */
            #bphoto h2, #bnophoto h2 {
              font-family: "Goldman", "Exo", "Roboto", sans-serif;
              color: #fff;
            }
            .bphoto-card {
              background: #232f3f;
              box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
            }
            .photo_upload { gap: 1rem; padding: 1.5rem 1rem 2rem; }
            #d1_photo { margin-top: 20px; }

            /* Download buttons → AWS orange pills */
            #d_photo, #d1_photo {
              font-family: "Roboto", "Open Sans", sans-serif;
              background-color: #ff9900;
              color: #1a2530;
              border: 2px solid #ff9900;
              box-shadow: 0 6px 18px rgba(255, 153, 0, 0.25);
            }
            #d_photo:hover, #d1_photo:hover {
              background-color: #e08a00;
              border-color: #e08a00;
              color: #fff;
            }

            /* File input label colour on dark bg */
            #mypht { color: #cad0db; max-width: 100%; }

            /* Inspired-by credit + back-to-top accent */
            .badge-credit { color: rgba(255, 255, 255, 0.75); }
            .badge-credit .email__link { color: #ff9900; }
            .back-to-top { background: #ff9900; }
            .back-to-top i { color: #1a2530; }

            /* ── Responsive ─────────────────────────────────────────── */
            /* Tablet & below: leave room for the fixed bottom nav bar */
            @media (max-width: 991px) {
              #page { padding-bottom: 80px; }
              #phero { padding: 30px 0 50px; }
              #phero h1 { font-size: 40px; }
            }

            /* Phones: shrink hero text + copy box, and scale the fixed-size
               400px badge cards down as a unit so they fit the screen while
               keeping the photo overlay perfectly aligned. The scale is reset
               during PNG capture (see download handlers) so downloads stay
               full 1080px resolution. */
            /* The badge card is a fixed 400px with a pixel-positioned photo
               overlay. On phones we scale the whole card as a unit (so the
               overlay stays aligned) inside a frame whose REAL size matches
               the scaled card — using overflow:hidden so the 400px card no
               longer expands the page width (which was clipping the layout).
               The scale is reset during PNG capture (download handlers). */
            .badge-card-frame { margin: 0 auto; }

            @media (max-width: 600px) {
              #phero { padding: 24px 0 40px; background-attachment: scroll; }
              #phero h1 { font-size: 30px; letter-spacing: 0.5px; }
              .copy-text-wrapper .copy-text-heading { font-size: 19px; }
              .copy-text-wrapper .inner-text-content-full .copy-content-inner-wrapper { padding: 18px 14px; }

              .photo_upload { flex-direction: column; align-items: center; }
              .photo_upload > div { margin: 1rem 0; padding-top: 8px; }

              .badge-card-frame { width: 320px; height: 320px; overflow: hidden; }
              .cardwp, .cardwop {
                transform: scale(0.8);
                transform-origin: top left;
                margin: 0;
              }
            }

            /* Very small phones */
            @media (max-width: 360px) {
              #phero h1 { font-size: 26px; }
              .badge-card-frame { width: 272px; height: 272px; }
              .cardwp, .cardwop { transform: scale(0.68); }
            }
          `,
        }}
      />
      <div id="page">
      <div className="section-1 badge-navwrap" id="home">
        <Navbar />
      </div>

      <section id="phero">
        <div className="phero-container" data-aos="zoom-in" data-aos-delay="100">
          <h1 className="mb-4 pb-0">
            SPREAD
            <br />
            THE WORD
            <br />
          </h1>

          <div className="copy-text-wrapper">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8 inner-text-content-full">
                  <h2 className="copy-text-heading">
                    Copy below content and share it with your customized badge on your social media posts
                  </h2>
                  <div className="copy-content-inner-wrapper">
                    <p
                      id="paragraphToCopy"
                      dangerouslySetInnerHTML={{ __html: paragraphHtml }}
                    />
                    <button id="copyButton" type="button" onClick={handleCopy}>
                      <i className="fa fa-clone"></i> Copy to Clipboard
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="photo_upload">
            <div id="bphoto">
              <h2>
                <b>With your Photo</b>
              </h2>
              <div className="badge-card-frame">
                <div className="card bphoto-card cardwp" id="card1">
                  <div className="card-body">
                    <div className="user">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="https://awsugjaipur.in/assets/img/Badges/badgeempty.png"
                        alt="user"
                        className="userImg"
                        id="userImage"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <input
                  type="file"
                  id="mypht"
                  style={{ paddingTop: 18 }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    const image = document.querySelector(".userImg") as HTMLImageElement | null;
                    if (!file || !image) return;
                    const reader = new FileReader();
                    reader.onload = () => image.setAttribute("src", reader.result as string);
                    reader.readAsDataURL(file);
                  }}
                />
                <br />
                <button type="button" id="d_photo" onClick={() => void handleDownloadWithPhoto()}>
                  Download
                </button>
              </div>
            </div>
            <div id="bnophoto">
              <h2>
                <b>Without your Photo</b>
              </h2>
              <div className="badge-card-frame">
                <div className="card bphoto-card cardwop" id="card2">
                  <div className="card-body">
                    <div className="text"></div>
                  </div>
                </div>
              </div>
              <div>
                <button type="button" id="d1_photo" onClick={() => void handleDownloadWithoutPhoto()}>
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

        <div className="badge-credit container text-center p-4 pb-0">
          <strong>Badge inspired from</strong>{" "}
          <a className="email__link" href="https://awsugjaipur.in/">
            AWS UG Jaipur
          </a>
        </div>
      </div>

      <Footer />

      <a href="#" className="back-to-top d-flex align-items-center justify-content-center">
        <i className="fas fa-arrow-up"></i>
      </a>

      {/* avoid main.js swiper/gallery init errors from missing template markup */}
      <Script src="/js/badge/aws_aos.js" strategy="afterInteractive" />
    </>
  );
}
