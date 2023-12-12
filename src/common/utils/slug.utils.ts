export const getSlugFromUrl = (url: string) =>
  url.replace(/https?:\/\/[^\/]+\//, '');
