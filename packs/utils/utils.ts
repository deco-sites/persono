const imageExtensionsRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;

export const typeChecker = <T extends object>(v: T, prop: keyof T) => prop in v;

export const getImageUrl = (imageBaseUrl?: string, path?: string) => {
  if (path) {
    const match = path.match(imageExtensionsRegex);
    if (match) {
      const extension = match[1].toLowerCase();
      switch (extension) {
        case "png":
          return `${imageBaseUrl}${extension}${path}`;
        case "gif":
          return `${imageBaseUrl}${extension}${path}`;
        case "jpg":
        case "jpeg":
          return `${imageBaseUrl}avif${path}`;
        default:
          return `${imageBaseUrl}png${path}`;
      }
    }
  }
  return "";
};
