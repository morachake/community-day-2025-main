"use client";

import type { ChangeEvent, MouseEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ATTENDING_BADGE_HEIGHT,
  ATTENDING_BADGE_WIDTH,
  ATTENDING_PWANI_LAYOUT,
  type AttendingBadgeLayout,
  drawAttendingBadge,
  renderAttendingBadgeBlob,
} from "@/lib/badge/attendingBadgeCanvas";

type AttendingBadgeCanvasProps = {
  downloadFilename: string;
  defaultName?: string;
  defaultTitle?: string;
  layout?: AttendingBadgeLayout;
};

export const ATTENDING_BADGE_PREVIEW_WIDTH = 500;

export default function AttendingBadgeCanvas({
  downloadFilename,
  defaultName = "",
  defaultTitle = "",
  layout = ATTENDING_PWANI_LAYOUT,
}: AttendingBadgeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const downloadBtnRef = useRef<HTMLButtonElement>(null);
  const [photoSrc, setPhotoSrc] = useState("");
  const [photoName, setPhotoName] = useState("");
  const [name, setName] = useState(defaultName);
  const [title, setTitle] = useState(defaultTitle);
  const [isRendering, setIsRendering] = useState(false);

  const renderPreview = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsRendering(true);
    try {
      await drawAttendingBadge(canvas, { photoSrc, name, title }, layout);
    } catch (error) {
      console.error(error);
    } finally {
      setIsRendering(false);
    }
  }, [layout, name, photoSrc, title]);

  useEffect(() => {
    void renderPreview();
  }, [renderPreview]);

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

  const openPhotoPicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleCanvasUploadClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const scaleX = ATTENDING_BADGE_WIDTH / rect.width;
      const scaleY = ATTENDING_BADGE_HEIGHT / rect.height;
      const x = (event.clientX - rect.left) * scaleX;
      const y = (event.clientY - rect.top) * scaleY;
      const { photo } = layout;

      const insidePhoto =
        x >= photo.x &&
        x <= photo.x + photo.width &&
        y >= photo.y &&
        y <= photo.y + photo.height;

      if (insidePhoto) {
        openPhotoPicker();
      }
    },
    [layout, openPhotoPicker],
  );

  const handleDownload = useCallback(async () => {
    if (!photoSrc) {
      alert("Please upload a photo");
      return;
    }

    const btn = downloadBtnRef.current;
    if (btn) btn.textContent = "Downloading...";

    try {
      const blob = await renderAttendingBadgeBlob({ photoSrc, name, title }, layout);
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = downloadFilename;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    } finally {
      if (btn) btn.textContent = "Download";
    }
  }, [downloadFilename, layout, name, photoSrc, title]);

  return (
    <div className="attending-badge-canvas">
      <div
        className="attending-badge-frame"
        style={{ ["--badge-preview-width" as string]: `${ATTENDING_BADGE_PREVIEW_WIDTH}px` }}
      >
        <button
          type="button"
          className="attending-badge-hitarea"
          onClick={handleCanvasUploadClick}
          aria-label="Click the photo area to upload your image"
        >
          <canvas
            ref={canvasRef}
            className="attending-badge-preview"
            width={ATTENDING_BADGE_WIDTH}
            height={ATTENDING_BADGE_HEIGHT}
            aria-hidden="true"
          />
        </button>
        {isRendering ? <span className="attending-badge-rendering">Updating preview…</span> : null}
      </div>

      <div className="badge-upload-panel">
        <div className="badge-field-grid">
          <label className="badge-field">
            <span>Your name</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              maxLength={48}
            />
          </label>
          <label className="badge-field">
            <span>Your title</span>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Your role or company"
              maxLength={48}
            />
          </label>
        </div>

        <div className="badge-upload-actions">
          <label className="badge-upload-label" htmlFor="badge-photo-input">
            Upload Photo
            <input
              ref={fileInputRef}
              type="file"
              id="badge-photo-input"
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
            "Tap the photo area on the badge or use Upload Photo below."
          )}
        </p>

        <button
          type="button"
          id="d_photo"
          ref={downloadBtnRef}
          disabled={!photoSrc}
          aria-disabled={!photoSrc}
          onClick={() => void handleDownload()}
        >
          Download
        </button>

        <p className="badge-photo-help">
          Your photo stays in this browser and is only used to generate your downloadable badge.
        </p>
      </div>
    </div>
  );
}
