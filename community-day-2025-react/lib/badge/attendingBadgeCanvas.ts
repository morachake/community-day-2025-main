import { drawRoundedCoverPhoto, loadImage } from "@/lib/badge/ditherImage";

export const ATTENDING_BADGE_WIDTH = 819;
export const ATTENDING_BADGE_HEIGHT = 1024;

export type AttendingBadgeFields = {
  name: string;
  title: string;
  photoSrc?: string;
};

export type AttendingBadgeLayout = {
  templateSrc: string;
  photo: { x: number; y: number; width: number; height: number; radius: number };
  name: { x: number; y: number; maxWidth: number; fontSize: number; lineHeight: number };
  title: { x: number; y: number; maxWidth: number; fontSize: number; lineHeight: number };
  nameCover: { x: number; y: number; width: number; height: number };
  titleCover: { x: number; y: number; width: number; height: number };
};

export const ATTENDING_PWANI_LAYOUT: AttendingBadgeLayout = {
  templateSrc: "/images/badge/attending-pwani-template.png",
  photo: { x: 56, y: 196, width: 330, height: 456, radius: 32 },
  name: { x: 407, y: 492, maxWidth: 380, fontSize: 34, lineHeight: 40 },
  title: { x: 407, y: 528, maxWidth: 380, fontSize: 22, lineHeight: 28 },
  nameCover: { x: 400, y: 482, width: 400, height: 40 },
  titleCover: { x: 400, y: 518, width: 400, height: 36 },
};

export const VOLUNTEERING_PWANI_LAYOUT: AttendingBadgeLayout = {
  ...ATTENDING_PWANI_LAYOUT,
  templateSrc: "/images/badge/volunteering-pwani-template.png",
};

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  const lines: string[] = [];
  let currentLine = words[0];

  for (let index = 1; index < words.length; index += 1) {
    const nextLine = `${currentLine} ${words[index]}`;
    if (ctx.measureText(nextLine).width <= maxWidth) {
      currentLine = nextLine;
    } else {
      lines.push(currentLine);
      currentLine = words[index];
    }
  }

  lines.push(currentLine);
  return lines;
}

function drawTextBlock(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  fontSize: number,
  lineHeight: number,
  color: string,
  fontWeight: number | string,
  uppercase = false,
) {
  const content = uppercase ? text.toUpperCase() : text;
  ctx.save();
  ctx.fillStyle = color;
  ctx.font = `${fontWeight} ${fontSize}px "Roboto", "Arial", sans-serif`;
  ctx.textBaseline = "top";

  const lines = wrapText(ctx, content, maxWidth);
  lines.slice(0, 2).forEach((line, index) => {
    ctx.fillText(line, x, y + index * lineHeight);
  });
  ctx.restore();
}

function coverMockPhoto(
  ctx: CanvasRenderingContext2D,
  layout: AttendingBadgeLayout,
) {
  const { x, y, width, height, radius } = layout.photo;
  const inset = 14;
  const innerRadius = Math.max(radius - inset, 10);

  ctx.save();
  roundedRectPath(ctx, x, y, width, height, radius);
  ctx.clip();
  ctx.fillStyle = "#0b1018";
  ctx.fillRect(x, y, width, height);
  ctx.restore();

  ctx.save();
  roundedRectPath(ctx, x, y, width, height, radius);
  ctx.clip();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.42)";
  ctx.lineWidth = 2;
  ctx.setLineDash([12, 8]);
  roundedRectPath(
    ctx,
    x + inset,
    y + inset,
    width - inset * 2,
    height - inset * 2,
    innerRadius,
  );
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "rgba(255, 255, 255, 0.82)";
  ctx.font = '600 22px "Roboto", "Arial", sans-serif';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Upload your photo", x + width / 2, y + height / 2);
  ctx.restore();
}

function roundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function coverMockText(ctx: CanvasRenderingContext2D, layout: AttendingBadgeLayout) {
  ctx.save();
  ctx.fillStyle = "#0b1018";
  ctx.fillRect(
    layout.nameCover.x,
    layout.nameCover.y,
    layout.nameCover.width,
    layout.nameCover.height,
  );
  ctx.fillRect(
    layout.titleCover.x,
    layout.titleCover.y,
    layout.titleCover.width,
    layout.titleCover.height,
  );
  ctx.restore();
}

export async function drawAttendingBadge(
  canvas: HTMLCanvasElement,
  fields: AttendingBadgeFields,
  layout: AttendingBadgeLayout = ATTENDING_PWANI_LAYOUT,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = ATTENDING_BADGE_WIDTH;
  canvas.height = ATTENDING_BADGE_HEIGHT;

  const template = await loadImage(layout.templateSrc);
  ctx.drawImage(template, 0, 0, ATTENDING_BADGE_WIDTH, ATTENDING_BADGE_HEIGHT);

  if (fields.photoSrc) {
    const photo = await loadImage(fields.photoSrc);
    drawRoundedCoverPhoto(
      ctx,
      photo,
      layout.photo.x,
      layout.photo.y,
      layout.photo.width,
      layout.photo.height,
      layout.photo.radius,
    );
  } else {
    coverMockPhoto(ctx, layout);
  }

  coverMockText(ctx, layout);

  if (fields.name.trim()) {
    drawTextBlock(
      ctx,
      fields.name,
      layout.name.x,
      layout.name.y,
      layout.name.maxWidth,
      layout.name.fontSize,
      layout.name.lineHeight,
      "#ff9900",
      700,
      true,
    );
  }

  if (fields.title.trim()) {
    drawTextBlock(
      ctx,
      fields.title,
      layout.title.x,
      layout.title.y,
      layout.title.maxWidth,
      layout.title.fontSize,
      layout.title.lineHeight,
      "#d1d5db",
      500,
    );
  }
}

export async function renderAttendingBadgeBlob(
  fields: AttendingBadgeFields,
  layout?: AttendingBadgeLayout,
): Promise<Blob | null> {
  const canvas = document.createElement("canvas");
  await drawAttendingBadge(canvas, fields, layout);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/png");
  });
}
