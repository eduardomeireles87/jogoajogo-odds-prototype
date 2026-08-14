const DEFAULT_RSS_URL = "https://esporte.ig.com.br/rss/v1/feed";
const GENERAL_PROGNOSTICOS_URL =
  "https://esporte.ig.com.br/jogoajogo/noticias/prognosticos";

export type PrognosticoArticle = {
  title: string;
  link: string;
  pubDate?: string;
};

export type PrognosticoLookup = {
  matched: boolean;
  url: string;
  title?: string;
  pubDate?: string;
  matchedSlug?: string;
  checkedSlugs: string[];
  fallbackUrl: string;
};

type LookupInput = {
  home: string;
  away: string;
  rssUrl?: string;
};

function decodeXmlEntities(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function readXmlField(itemXml: string, field: string) {
  const pattern = new RegExp(`<${field}[^>]*>([\\s\\S]*?)<\\/${field}>`, "i");
  const match = itemXml.match(pattern);
  return match ? decodeXmlEntities(match[1].trim()) : "";
}

export function parseRssArticles(xml: string): PrognosticoArticle[] {
  const itemMatches = xml.match(/<item\b[\s\S]*?<\/item>/gi) ?? [];

  return itemMatches
    .map((itemXml) => ({
      title: readXmlField(itemXml, "title"),
      link: readXmlField(itemXml, "link"),
      pubDate: readXmlField(itemXml, "pubDate") || undefined,
    }))
    .filter((article) => article.link);
}

export function slugifyTeamName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " e ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function hasJogoAJogoPath(articleUrl: string) {
  try {
    return new URL(articleUrl).pathname.includes("/jogoajogo/");
  } catch {
    return false;
  }
}

function articleSlug(articleUrl: string) {
  try {
    const pathname = new URL(articleUrl).pathname;
    const lastSegment = pathname.split("/").filter(Boolean).at(-1) ?? "";
    return lastSegment.replace(/\.html(?:\.amp)?$/i, "").replace(/\.amp$/i, "");
  } catch {
    return "";
  }
}

function hasSlugBoundary(slug: string, matchSlug: string) {
  if (!slug || !matchSlug) return false;
  return new RegExp(`(^|-)${matchSlug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(-|$)`).test(slug);
}

export function buildMatchSlugs(home: string, away: string) {
  const homeSlug = slugifyTeamName(home);
  const awaySlug = slugifyTeamName(away);

  return [`${homeSlug}-${awaySlug}`, `${awaySlug}-${homeSlug}`].filter(
    (slug, index, slugs) => slug !== "-" && slugs.indexOf(slug) === index,
  );
}

export function findPrognosticoArticle(
  articles: PrognosticoArticle[],
  home: string,
  away: string,
) {
  const checkedSlugs = buildMatchSlugs(home, away);
  const jogoAJogoArticles = articles.filter((article) => hasJogoAJogoPath(article.link));

  for (const matchSlug of checkedSlugs) {
    const article = jogoAJogoArticles.find((candidate) =>
      hasSlugBoundary(articleSlug(candidate.link), matchSlug),
    );

    if (article) return { article, matchedSlug: matchSlug, checkedSlugs };
  }

  return { article: undefined, matchedSlug: undefined, checkedSlugs };
}

export async function lookupPrognosticoLink({
  home,
  away,
  rssUrl = DEFAULT_RSS_URL,
}: LookupInput): Promise<PrognosticoLookup> {
  const response = await fetch(rssUrl, {
    headers: { accept: "application/rss+xml, application/xml, text/xml" },
    cf: { cacheTtl: 300, cacheEverything: true },
  } as RequestInit);

  if (!response.ok) {
    throw new Error(`RSS returned ${response.status}`);
  }

  const xml = await response.text();
  const result = findPrognosticoArticle(parseRssArticles(xml), home, away);

  return {
    matched: Boolean(result.article),
    url: result.article?.link ?? GENERAL_PROGNOSTICOS_URL,
    title: result.article?.title,
    pubDate: result.article?.pubDate,
    matchedSlug: result.matchedSlug,
    checkedSlugs: result.checkedSlugs,
    fallbackUrl: GENERAL_PROGNOSTICOS_URL,
  };
}
