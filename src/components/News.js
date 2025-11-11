

// import React, { useState, useEffect } from 'react';
// import NewsItem from './NewsItem';
// import Loading from './Loading';
// import PropTypes from 'prop-types';
// import InfiniteScroll from "react-infinite-scroll-component";

// const News = ({ pageSize, category, setProgress, isDarkMode }) => {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true); // Initially set to true
//   const [page, setPage] = useState(1);
//   const [totalResults, setTotalResults] = useState(0);

//   const capitalize = (str) => {
//     if (!str) return '';
//     return str.replace(/\b\w/g, char => char.toUpperCase());
//   };

//   useEffect(() => {
//     document.title = `${capitalize(category)} - NewsTape`;
//     updateNews();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [category]); // Reload news whenever the category changes

//   const updateNews = async () => {
//     setProgress(10);
//     const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=68e630c13e9347f5bb88397713e0bcf8&page=${page}&pageSize=${pageSize}`;
//     setLoading(true);
//     try {
//       const response = await fetch(url);
//       setProgress(30);
//       const data = await response.json();
//       setProgress(75);
//       setArticles(data.articles || []);
//       setTotalResults(data.totalResults || 0);
//     } catch (error) {
//       console.error("Failed to fetch articles:", error);
//       setArticles([]);
//     } finally {
//       setLoading(false);
//       setProgress(100);
//     }
//   };

//   const fetchMoreData = async () => {
//     const nextPage = page + 1;
//     const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=68e630c13e9347f5bb88397713e0bcf8&page=${nextPage}&pageSize=${pageSize}`;
//     setPage(nextPage);
//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       setArticles((prevArticles) => prevArticles.concat(data.articles || []));
//     } catch (error) {
//       console.error("Failed to fetch more articles:", error);
//     }
//   };

//   return (
//     <div className={`container my-4 ${isDarkMode ? 'text-light' : ''}`}>
//       <h2 style={{ marginTop: '70px' }}>NewsTape - Top {capitalize(category)} Headlines</h2>
//       {loading && <Loading />}
//       <InfiniteScroll
//         dataLength={articles.length}
//         next={fetchMoreData}
//         hasMore={articles.length < totalResults}
//         loader={<Loading />}
//       >
//         <div className="row my-5">
//           {articles.map((article) => (
//             <div className="col-md-3" key={article.url}>
//               <NewsItem
//                 title={article.title || "No Title"}
//                 description={article.description || "No Description"}
//                 imageUrl={article.urlToImage}
//                 newsUrl={article.url}
//                 time={article.publishedAt}
//                 isDarkMode={isDarkMode}
//               />
//             </div>
//           ))}
//         </div>
//       </InfiniteScroll>
//       {!loading && articles.length === 0 && (
//         <p>No news items available at the moment.</p>
//       )}
//     </div>
//   );
// };

// News.defaultProps = {
//   pageSize: 8,
//   category: 'general',
// };

// News.propTypes = {
//   pageSize: PropTypes.number,
//   category: PropTypes.string,
//   setProgress: PropTypes.func.isRequired,
//   isDarkMode: PropTypes.bool.isRequired,
// };

// export default News;
import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import Loading from './Loading';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const MAX_NEWSAPI_RESULTS = 100; // NewsAPI practical pagination cap for free plans

const News = ({ pageSize, category, setProgress, isDarkMode }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);      // initial load only
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(true);      // controls InfiniteScroll loader

  const cap = (total) => Math.min(total || 0, MAX_NEWSAPI_RESULTS);

  const capitalize = (str) => (str ? str.replace(/\b\w/g, c => c.toUpperCase()) : '');

  useEffect(() => {
    document.title = `${capitalize(category)} - NewsTape`;
    // reset state when category changes
    setArticles([]);
    setPage(1);
    setTotalResults(0);
    setHasMore(true);
    setLoading(true);
    updateNews(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const updateNews = async (pageToFetch) => {
    setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=68e630c13e9347f5bb88397713e0bcf8&page=${pageToFetch}&pageSize=${pageSize}`;
    try {
      const response = await fetch(url);
      setProgress(30);
      const data = await response.json();
      setProgress(75);

      const incoming = data.articles || [];
      const total = data.totalResults || 0;

      setArticles(incoming);
      setTotalResults(total);
      setPage(pageToFetch);

      // Determine if there are more pages you can realistically fetch
      const reached = incoming.length >= pageSize ? pageToFetch * pageSize : incoming.length;
      setHasMore(reached < cap(total));
    } catch (error) {
      console.error("Failed to fetch articles:", error);
      setArticles([]);
      setHasMore(false);
    } finally {
      setLoading(false);
      setProgress(100);
    }
  };

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=68e630c13e9347f5bb88397713e0bcf8&page=${nextPage}&pageSize=${pageSize}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const incoming = data.articles || [];

      setArticles(prev => prev.concat(incoming));
      setPage(nextPage);

      // If API returned nothing, or we’ve reached the capped total, stop
      const newLength = (articles.length + incoming.length);
      if (incoming.length === 0 || newLength >= cap(totalResults)) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch more articles:", error);
      setHasMore(false); // stop infinite loader on error
    }
  };

  return (
    <div className={`container my-4 ${isDarkMode ? 'text-light' : ''}`}>
      <h2 style={{ marginTop: '70px' }}>NewsTape - Top {capitalize(category)} Headlines</h2>

      {/* Show the top-level loader ONLY during the very first load */}
      {loading ? (
        <Loading />
      ) : (
        <InfiniteScroll
          // Key helps reset the scroller when category changes
          key={`${category}-${pageSize}`}
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<Loading />}  // appears only while fetching more
        >
          <div className="row my-5">
            {articles.map((article) => (
              <div className="col-md-3" key={article.url}>
                <NewsItem
                  title={article.title || "No Title"}
                  description={article.description || "No Description"}
                  imageUrl={article.urlToImage}
                  newsUrl={article.url}
                  time={article.publishedAt}
                  isDarkMode={isDarkMode}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}

      {!loading && articles.length === 0 && <p>No news items available at the moment.</p>}
    </div>
  );
};

News.defaultProps = {
  pageSize: 8,
  category: 'general',
};

News.propTypes = {
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default News;
