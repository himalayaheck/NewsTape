// api/news.js
export default async function handler(req, res) {
  try {
    const { page = 1, pageSize = 8, category = "general", country = "us" } = req.query;

    const url = new URL("https://newsapi.org/v2/top-headlines");
    url.searchParams.set("country", country);
    url.searchParams.set("category", category);
    url.searchParams.set("page", page);
    url.searchParams.set("pageSize", pageSize);

    const r = await fetch(url, {
      headers: { "X-Api-Key": process.env.NEWS_API_KEY },
    });

    const data = await r.json();
    return res.status(r.ok ? 200 : r.status).json(data);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
}
