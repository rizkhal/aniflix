import f from "wretch";

const endpoint = import.meta.env.VITE_ANIFLIX_API_URL;

export async function fAsync(url: string) {
  const fullURL = endpoint + url;

  const token = JSON.parse(localStorage.getItem("user") || "");

  const headers = {
    Authorization: token.accessToken,
  };

  return f(fullURL).headers(headers);
}

export default (url: string) => {
  const fullURL = endpoint + url;

  const token = JSON.parse(localStorage.getItem("user") || "");

  const headers = {
    Authorization: token.accessToken,
  };

  return f(fullURL).headers(headers);
};
