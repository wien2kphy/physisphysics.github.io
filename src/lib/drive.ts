// Extract Google Drive file id from any share URL form
export function extractDriveId(url: string): string | null {
  if (!url) return null;
  const m =
    url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    url.match(/[?&]id=([a-zA-Z0-9_-]+)/) ||
    url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  return m?.[1] ?? null;
}

export function drivePreviewUrl(idOrUrl: string): string {
  const id = idOrUrl.length < 40 && !/\//.test(idOrUrl) ? idOrUrl : extractDriveId(idOrUrl);
  return id ? `https://drive.google.com/file/d/${id}/preview` : idOrUrl;
}

export function driveDownloadUrl(idOrUrl: string): string {
  const id = idOrUrl.length < 40 && !/\//.test(idOrUrl) ? idOrUrl : extractDriveId(idOrUrl);
  return id ? `https://drive.google.com/uc?export=download&id=${id}` : idOrUrl;
}
