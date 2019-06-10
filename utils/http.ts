import "isomorphic-fetch";

export const get = (url: string, opts = {}) => {
  const isRelative = url.startsWith("/");
  if (isRelative && !window) {
    throw Error("Cannot fetch relative urls in server.");
  }
  const endpoint = isRelative ? `${window.origin}${url}` : url;
  console.log(endpoint);
  return fetch(endpoint, opts).then(r => r.json());
};
