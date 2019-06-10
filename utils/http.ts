import "isomorphic-fetch";

export const get = (url: string, opts = {}) => {
  const endpoint = url.startsWith("/")
    ? `${process.env.WAIFU_TIERLIST_URL}${url}`
    : url;
  console.log(endpoint);
  return fetch(`${endpoint}`, opts).then(r => r.json());
};

