import f from "wretch";

const endpoint = import.meta.env.VITE_ANIFLIX_API_URL;

const getHeaders = () => {
  const token = JSON.parse(localStorage.getItem("token") || "");

  const headers = {
    Authorization: `Bearer ${token.accessToken}`,
  };

  return { headers, token };
};

export async function fAsync(url: string) {
  const fullURL = endpoint + url;
  const { headers } = getHeaders();

  return f(fullURL).headers(headers);
}

export default (url: string) => {
  const fullURL = endpoint + url;
  const { headers, token } = getHeaders();

  return f(fullURL)
    .headers(headers)
    .catcher(401, () => {
      const { refreshToken } = token;
      const newHeaders = Object.assign(headers, {
        "x-refresh-token": refreshToken,
      });

      return f(`${endpoint}/api/auth/refresh`)
        .headers(newHeaders)
        .post()
        .json(({ token }) => {
          localStorage.setItem("token", JSON.stringify(token));
        })
        .catch((err) => {
          const e = JSON.parse(err.message);
          console.log(e);
        });
    });
};
