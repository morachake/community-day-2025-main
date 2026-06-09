"use client";

import domtoimage from "dom-to-image";
import Script from "next/script";
import type { ChangeEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import AttendingBadgeCanvas from "@/components/badge/AttendingBadgeCanvas";
import type { AttendingBadgeLayout } from "@/lib/badge/attendingBadgeCanvas";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export type BadgePageProps = {
  /** HTML snippet for `#paragraphToCopy` (supports `<br>`). */
  paragraphHtml: string;
  backgrounds: {
    withPhoto: string;
    withoutPhoto?: string;
  };
  downloads: {
    withPhotoFilename: string;
    withoutPhotoFilename?: string;
  };
  showWithoutPhotoCard?: boolean;
  /** Pwani attending badge rendered on canvas instead of legacy DOM overlay. */
  useCanvasBuilder?: boolean;
  canvasDefaults?: {
    name?: string;
    title?: string;
  };
  canvasLayout?: AttendingBadgeLayout;
};

export default function BadgePage({
  paragraphHtml,
  backgrounds,
  downloads,
  showWithoutPhotoCard = true,
  useCanvasBuilder = false,
  canvasDefaults,
  canvasLayout,
}: BadgePageProps) {
  const cardWithPhotoRef = useRef<HTMLDivElement>(null);
  const cardNoPhotoRef = useRef<HTMLDivElement>(null);
  const userImageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const downloadWithPhotoBtnRef = useRef<HTMLButtonElement>(null);
  const downloadWithoutPhotoBtnRef = useRef<HTMLButtonElement>(null);
  const [photoSrc, setPhotoSrc] = useState("");
  const [photoName, setPhotoName] = useState("");
  const canShowWithoutPhotoCard =
    showWithoutPhotoCard && Boolean(backgrounds.withoutPhoto && downloads.withoutPhotoFilename);

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

  const handlePhotoUpload = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPhotoSrc(reader.result as string);
      setPhotoName(file.name);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleResetPhoto = useCallback(() => {
    setPhotoSrc("");
    setPhotoName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleDownloadWithPhoto = useCallback(async () => {
    const cardWithPhoto = cardWithPhotoRef.current;
    const btn = downloadWithPhotoBtnRef.current;
    const imgEl = userImageRef.current;
    if (!cardWithPhoto || !btn || !imgEl || !photoSrc) {
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
  }, [downloads.withPhotoFilename, downloadImageBlob, photoSrc]);

  const handleDownloadWithoutPhoto = useCallback(async () => {
    const cardNoPhoto = cardNoPhotoRef.current;
    const btn = downloadWithoutPhotoBtnRef.current;
    const filename = downloads.withoutPhotoFilename;

    if (!cardNoPhoto || !btn || !filename) return;

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
      downloadImageBlob(dataUrl, filename);
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
            ${
              backgrounds.withoutPhoto
                ? `#card2 {
                    background-image: url("${backgrounds.withoutPhoto}");
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                  }`
                : ""
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
            .badge-builder-panel {
              max-width: 540px;
            }
            .badge-upload-panel {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 14px;
              margin-top: 18px;
            }
            .badge-upload-actions {
              display: flex;
              align-items: center;
              justify-content: center;
              flex-wrap: wrap;
              gap: 10px;
            }
            .badge-upload-label,
            .badge-reset-photo {
              min-width: 148px;
              margin: 0;
              padding: 12px 18px;
              border-radius: 6px;
              font-family: "Roboto", "Open Sans", sans-serif;
              font-weight: 700;
              line-height: 1;
              cursor: pointer;
              transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
            }
            .badge-upload-label {
              background: #ffffff;
              border: 2px solid #ffffff;
              color: #1a2530;
            }
            .badge-upload-label:hover,
            .badge-upload-label:focus-within {
              background: #cad0db;
              border-color: #cad0db;
            }
            .badge-reset-photo {
              background: transparent;
              border: 2px solid rgba(255, 255, 255, 0.34);
              color: #ffffff;
            }
            .badge-reset-photo:hover,
            .badge-reset-photo:focus {
              border-color: #ffffff;
            }
            .badge-file-input {
              clip: rect(0 0 0 0);
              clip-path: inset(50%);
              height: 1px;
              overflow: hidden;
              position: absolute;
              white-space: nowrap;
              width: 1px;
            }
            .badge-upload-status {
              min-height: 22px;
              margin: 0;
              color: #cad0db;
              font-size: 14px;
              line-height: 1.45;
            }
            .badge-upload-status strong {
              color: #ffffff;
              font-weight: 700;
            }
            .badge-photo-placeholder {
              width: 142px;
              height: 136px;
              margin-top: -107px;
              margin-left: 0;
              border-radius: 50%;
              border: 2px dashed rgba(255, 255, 255, 0.82);
              background: rgba(17, 24, 39, 0.58);
              color: #ffffff;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 12px;
              text-align: center;
              font-size: 13px;
              line-height: 1.25;
            }
            .badge-photo-help {
              max-width: 340px;
              margin: 0;
              color: rgba(255, 255, 255, 0.72);
              font-size: 13px;
              line-height: 1.45;
            }
            .attending-badge-canvas {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 18px;
            }
            .attending-badge-frame {
              position: relative;
              width: min(100%, var(--badge-preview-width, 500px));
              aspect-ratio: 819 / 1024;
              margin: 0 auto;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
              background: #0b1018;
            }
            .attending-badge-preview {
              display: block;
              width: 100%;
              height: 100%;
              pointer-events: none;
            }
            .attending-badge-hitarea {
              display: block;
              width: 100%;
              height: 100%;
              padding: 0;
              border: 0;
              background: transparent;
              cursor: pointer;
            }
            .attending-badge-hitarea:focus-visible {
              outline: 2px solid #ff9900;
              outline-offset: 3px;
            }
            .attending-badge-rendering {
              position: absolute;
              right: 10px;
              bottom: 10px;
              padding: 4px 8px;
              border-radius: 999px;
              background: rgba(0, 0, 0, 0.55);
              color: #fff;
              font-size: 11px;
            }
            .badge-field-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: 12px;
              width: min(100%, 420px);
            }
            .badge-field {
              display: flex;
              flex-direction: column;
              gap: 6px;
              text-align: left;
            }
            .badge-field span {
              color: #cad0db;
              font-size: 13px;
              font-weight: 600;
            }
            .badge-field input {
              width: 100%;
              padding: 11px 12px;
              border: 1px solid rgba(255, 255, 255, 0.18);
              border-radius: 6px;
              background: rgba(17, 24, 39, 0.72);
              color: #fff;
              font-family: "Roboto", "Open Sans", sans-serif;
              font-size: 14px;
            }
            .badge-field input::placeholder {
              color: rgba(255, 255, 255, 0.42);
            }
            .badge-field input:focus {
              outline: none;
              border-color: #ff9900;
            }

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
            #d_photo:disabled {
              cursor: not-allowed;
              opacity: 0.56;
              box-shadow: none;
            }
            #d_photo:disabled:hover {
              background-color: #ff9900;
              border-color: #ff9900;
              color: #1a2530;
            }

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
              .badge-upload-actions { width: 100%; }
              .badge-upload-label,
              .badge-reset-photo,
              #d_photo,
              #d1_photo { width: min(100%, 260px); }

              .attending-badge-frame {
                width: min(calc(100vw - 32px), var(--badge-preview-width, 500px));
              }

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
            <div id="bphoto" className="badge-builder-panel">
              <h2>
                <b>Create your photobooth badge</b>
              </h2>
              {useCanvasBuilder ? (
                <AttendingBadgeCanvas
                  downloadFilename={downloads.withPhotoFilename}
                  defaultName={canvasDefaults?.name}
                  defaultTitle={canvasDefaults?.title}
                  layout={canvasLayout}
                />
              ) : (
                <>
                  <div className="badge-card-frame">
                    <div className="card bphoto-card cardwp" id="card1" ref={cardWithPhotoRef}>
                      <div className="card-body">
                        <div className="user">
                          {photoSrc ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              ref={userImageRef}
                              src={photoSrc}
                              alt="Uploaded attendee"
                              className="userImg"
                              id="userImage"
                            />
                          ) : (
                            <div className="badge-photo-placeholder" aria-hidden="true">
                              Upload your photo
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="badge-upload-panel">
                    <div className="badge-upload-actions">
                      <label className="badge-upload-label" htmlFor="mypht">
                        Upload Photo
                        <input
                          ref={fileInputRef}
                          type="file"
                          id="mypht"
                          className="badge-file-input"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                        />
                      </label>
                      {photoSrc ? (
                        <button type="button" className="badge-reset-photo" onClick={handleResetPhoto}>
                          Remove Photo
                        </button>
                      ) : null}
                    </div>
                    <p className="badge-upload-status" aria-live="polite">
                      {photoName ? (
                        <>
                          Selected: <strong>{photoName}</strong>
                        </>
                      ) : (
                        "Choose a clear square or portrait photo for the best result."
                      )}
                    </p>
                    <button
                      type="button"
                      id="d_photo"
                      ref={downloadWithPhotoBtnRef}
                      disabled={!photoSrc}
                      aria-disabled={!photoSrc}
                      onClick={() => void handleDownloadWithPhoto()}
                    >
                      Download
                    </button>
                    <p className="badge-photo-help">
                      Your photo stays in this browser and is only used to generate your downloadable badge.
                    </p>
                  </div>
                </>
              )}
            </div>
            {canShowWithoutPhotoCard ? (
              <div id="bnophoto">
                <h2>
                  <b>Without your Photo</b>
                </h2>
                <div className="badge-card-frame">
                  <div className="card bphoto-card cardwop" id="card2" ref={cardNoPhotoRef}>
                    <div className="card-body">
                      <div className="text"></div>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    id="d1_photo"
                    ref={downloadWithoutPhotoBtnRef}
                    onClick={() => void handleDownloadWithoutPhoto()}
                  >
                    Download
                  </button>
                </div>
              </div>
            ) : null}
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
