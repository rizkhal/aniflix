import f from "wretch";

const endpoint = import.meta.env.VITE_ANIFLIX_API_URL;

// const getHeaders = () => {
//   const token = JSON.parse(localStorage.getItem("token") || "");

//   const headers = {
//     Authorization: `Bearer ${token.accessToken}`,
//   };

//   return { headers, token };
// };

export async function fAsync(url: string) {
  const fullURL = endpoint + url;
  // const { headers } = getHeaders();

  return f(fullURL);
}

export default (url: string) => {
  const fullURL = endpoint + url;
  // const { headers, token } = getHeaders();

  return f(fullURL);
};
