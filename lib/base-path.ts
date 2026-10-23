// Next.js does not prefix next/image sources or plain <a href> file links with
// the configured basePath, so every public/ asset URL goes through here.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(publicPath: string): string {
  return `${BASE_PATH}${publicPath}`;
}
