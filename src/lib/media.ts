// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  媒体数据获取工具 — 追番 & 游戏 API
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface AnimeInfo {
  name: string;
  nameCn: string;
  image: string;
  score: number;
  url: string;
  airDate: string; // YYYY-MM-DD or ""
}

export interface GameInfo {
  name: string;
  image: string;
  url: string;
  releaseDate: string; // YYYY-MM-DD or ""
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function fetchAnime(keyword: string): Promise<AnimeInfo> {
  const fb: AnimeInfo = { name: keyword, nameCn: keyword, image: "", score: 0, url: "#", airDate: "" };
  try {
    const res = await fetch(
      `https://api.bgm.tv/search/subject/${encodeURIComponent(keyword)}?type=2&responseGroup=small`,
      { headers: { "User-Agent": "TorQuenBlog/1.0 (Astro SSG)" } },
    );
    if (!res.ok) return fb;
    const data = await res.json();
    if (!data.list?.length) return fb;
    const s = data.list[0];
    return {
      name: s.name || keyword,
      nameCn: s.name_cn || s.name || keyword,
      image: (s.images?.common || s.images?.medium || "").replace(/^http:/, "https:"),
      score: s.score ?? 0,
      url: `https://bgm.tv/subject/${s.id}`,
      airDate: s.air_date || "",
    };
  } catch {
    return fb;
  }
}

export async function fetchGame(keyword: string): Promise<GameInfo> {
  const fb: GameInfo = { name: keyword, image: "", url: "#", releaseDate: "" };
  try {
    const res = await fetch(
      `https://store.steampowered.com/api/storesearch?term=${encodeURIComponent(keyword)}&l=schinese&cc=CN`,
    );
    if (!res.ok) return fb;
    const data = await res.json();
    if (!data.items?.length) return fb;
    const g = data.items[0];
    return {
      name: g.name || keyword,
      image: `https://cdn.akamai.steamstatic.com/steam/apps/${g.id}/header.jpg`,
      url: `https://store.steampowered.com/app/${g.id}`,
      releaseDate: "", // Steam search API doesn't return release date
    };
  } catch {
    return fb;
  }
}

export async function fetchAllAnime(names: string[]): Promise<AnimeInfo[]> {
  const results: AnimeInfo[] = [];
  for (const n of names) {
    results.push(await fetchAnime(n));
    await wait(350);
  }
  return results;
}

export async function fetchAllGames(names: string[]): Promise<GameInfo[]> {
  const results: GameInfo[] = [];
  for (const n of names) {
    results.push(await fetchGame(n));
    await wait(200);
  }
  return results;
}
