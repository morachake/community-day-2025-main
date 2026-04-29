"use client";

import domtoimage from "dom-to-image";
import Script from "next/script";
import { useCallback, useEffect } from "react";

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
      btn.innerHTML = "Download";
    }
  }, [downloads.withPhotoFilename, downloadImageBlob]);

  const handleDownloadWithoutPhoto = useCallback(async () => {
    const cardNoPhoto = document.querySelector(".cardwop") as HTMLElement | null;
    const btn = document.querySelector("#d1_photo") as HTMLButtonElement | null;

    if (!cardNoPhoto || !btn) return;

    btn.innerHTML = "Downloading...";
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
      btn.innerHTML = "Download";
    }
  }, [downloads.withoutPhotoFilename, downloadImageBlob]);

  const toggleMobileNav = useCallback(() => {
    document.querySelector("#navbar")?.classList.toggle("navbar-mobile");
  }, []);

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
          `,
        }}
      />
      <header id="header" className="d-flex align-items-center">
        <div className="container-fluid container-xxl d-flex align-items-center">
          <div id="logo" className="me-auto">
            <a href="/" className="scrollto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/AWSKenyaLogo.png" alt="navbar-logo" />
            </a>
          </div>

          <nav id="navbar" className="navbar order-last order-lg-0">
            <ul>
              <li>
                <a className="buy-tickets scrollto navbar-top-btn" href="/">
                  <i className="fas fa-arrow-left" style={{ paddingRight: 10 }}></i> Home
                </a>
              </li>
            </ul>
            <i
              className="fas fa-bars mobile-nav-toggle"
              role="presentation"
              onClick={toggleMobileNav}
            />
          </nav>
        </div>
      </header>

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
              <div className="card bphoto-card cardwop" id="card2">
                <div className="card-body">
                  <div className="text"></div>
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

      <div className="container text-center p-4 pb-0">
        <section>
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://x.com/AwsUgpwani"
            target="_blank"
            rel="noopener noreferrer"
            role="button"
            aria-label="X / Twitter"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://www.linkedin.com/in/jacob-moracha/"
            target="_blank"
            rel="noopener noreferrer"
            role="button"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://www.instagram.com/awspwani/"
            target="_blank"
            rel="noopener noreferrer"
            role="button"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://www.youtube.com/@AwsUgPwani"
            target="_blank"
            rel="noopener noreferrer"
            role="button"
            aria-label="YouTube"
          >
            <i className="fab fa-youtube"></i>
          </a>
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://www.meetup.com/awsugpwani/"
            target="_blank"
            rel="noopener noreferrer"
            role="button"
            aria-label="Meetup"
          >
            <i className="fab fa-meetup"></i>
          </a>
        </section>
        <br />
        <strong className="text-white">Badge Inspired from</strong>
        <a className="email__link" href="https://awsugjaipur.in/">
          AWS UG Jaipur
        </a>
        <br />
        <br />
      </div>

      <div className="text-center text-white copyright-section p-3">
        © 2026 Copyright: <a className="text-white" href="/">AWS User Group Pwani</a>
        <p className="text-white">
          Made with <span className="copyright-section-text text-white">&hearts;</span> by AWS User Group Pwani
        </p>
      </div>

      <a href="#" className="back-to-top d-flex align-items-center justify-content-center">
        <i className="fas fa-arrow-up"></i>
      </a>

      {/* avoid main.js swiper/gallery init errors from missing template markup */}
      <Script src="/js/badge/aws_aos.js" strategy="afterInteractive" />
    </>
  );
}
