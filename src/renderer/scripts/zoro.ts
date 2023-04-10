import axios from "axios";
import cheerio from "cheerio";
import { IAnimeResult, ISearch } from "@consumet/extensions";

const BASE_URL = "https://zoro.to";

export const fetchTopAiring = async (): Promise<ISearch<IAnimeResult>> => {
  const { data } = await axios.get(BASE_URL + "/home");

  const $ = cheerio.load(data);

  const results: Array<IAnimeResult> = [];
  $(".swiper-slide .item").each((_, element) => {
    const image = $(element).find("img").attr("data-src");
    const title = $(element).find(".film-title").attr("data-jname") || "";
    const a = $(element).find("a.film-poster").attr("href");
    const id = a?.split("/").pop() || "";
    const url = BASE_URL + a;

    results.push({
      id,
      url,
      title,
      image,
    });
  });

  return {
    currentPage: 1,
    hasNextPage: false,
    results,
  };
};
