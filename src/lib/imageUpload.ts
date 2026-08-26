export const MAX_IMAGE_BYTES = 500 * 1024; // 500 KB
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
export const MAX_IMAGE_WIDTH = 800;

export type ImageProcessResult = { dataUrl: string } | { error: string };

/** Validates a file, compresses it to max 800px wide and returns a base64 data URL. */
export async function processImageFile(file: File): Promise<ImageProcessResult> {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return { error: "Only JPG, PNG or WEBP images are allowed." };
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return { error: "Image must be 500 KB or smaller." };
  }

  const dataUrl = await readAsDataUrl(file);
  try {
    const compressed = await compress(dataUrl, file.type);
    return { dataUrl: compressed };
  } catch {
    return { dataUrl };
  }
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function compress(dataUrl: string, type: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, MAX_IMAGE_WIDTH / img.width);
      if (scale === 1) return resolve(dataUrl);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("no canvas context"));
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const outType = type === "image/png" ? "image/png" : type === "image/webp" ? "image/webp" : "image/jpeg";
      resolve(canvas.toDataURL(outType, 0.85));
    };
    img.onerror = () => reject(new Error("image decode failed"));
    img.src = dataUrl;
  });
}
