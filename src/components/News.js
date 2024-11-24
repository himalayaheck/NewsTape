// import React, { useState, useEffect } from 'react';
// import NewsItem from './NewsItem';
// import Loading from './Loading';
// import PropTypes from 'prop-types';
// import InfiniteScroll from "react-infinite-scroll-component";

// const News = (props) => {
//   const { country, pageSize, category, apiKey, setProgress, isDarkMode } = props;

//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [totalResults, setTotalResults] = useState(0);

//   useEffect(() => {
//     document.title = `${capitalize(category)} - NewsTape`;
//     updateNews();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const capitalize = (str) => {
//     if (!str) return '';
//     return str.replace(/\b\w/g, char => char.toUpperCase());
//   };

//   const updateNews = async (page = 1) => {
//     setProgress(10);
//     const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
//     setLoading(true);
//     let data = await fetch(url);
//     setProgress(30);
//     let parsedData = await data.json();
//     setProgress(75);
//     setArticles(parsedData.articles);
//     setTotalResults(parsedData.totalResults);
//     setLoading(false);
//     setProgress(100);
//   };

//   const fetchMoreData = async () => {
//     const nextPage = page + 1;
//     const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${pageSize}`;
//     setPage(nextPage);
//     let data = await fetch(url);
//     let parsedData = await data.json();
//     setArticles(articles.concat(parsedData.articles));
//     setTotalResults(parsedData.totalResults);
//   };

//   return (
//     <div className={`container my-4 ${isDarkMode ? 'text-light' : ''}`}>
//       <h2 style={{ marginTop: '70px' }}>NewsTape - Top {capitalize(props.category)} Headlines</h2>
//       {loading && <Loading />}
//       <InfiniteScroll
//         dataLength={articles.length}
//         next={fetchMoreData}
//         hasMore={articles.length !== totalResults}
//         loader={<Loading isDarkMode />}
//       >
//         <div className='container'>
//           <div className='row my-5'>
//             {articles.map((element) => {
//               return (
//                 <div className="col-md-3" key={element.url}>
//                   <NewsItem
//                     title={element.title ? element.title : " "}
//                     description={element.description ? element.description : " "}
//                     imageUrl={element.urlToImage}
//                     newsUrl={element.url}
//                     time={element.publishedAt}
//                     isDarkMode={isDarkMode}
//                   />
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </InfiniteScroll>
//     </div>
//   );
// }

// News.defaultProps = {
//   country: 'in',
//   pageSize: 8,
//   category: 'general',
//   page: 1
// };

// News.propTypes = {
//   country: PropTypes.string,
//   pageSize: PropTypes.number,
//   category: PropTypes.string,
//   apiKey: PropTypes.string.isRequired,
//   setProgress: PropTypes.func.isRequired,
//   isDarkMode: PropTypes.bool.isRequired
// };

// export default News;

import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import Loading from './Loading';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({ pageSize, category, setProgress, isDarkMode }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); // Initially set to true
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalize = (str) => {
    if (!str) return '';
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };

  useEffect(() => {
    document.title = `${capitalize(category)} - NewsTape`;
    updateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]); // Reload news whenever the category changes

  const updateNews = async () => {
    setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=68e630c13e9347f5bb88397713e0bcf8&page=${page}&pageSize=${pageSize}`;
    setLoading(true);
    try {
      const response = await fetch(url);
      setProgress(30);
      const data = await response.json();
      setProgress(75);
      setArticles(data.articles || []);
      setTotalResults(data.totalResults || 0);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
      setArticles([]);
    } finally {
      setLoading(false);
      setProgress(100);
    }
  };

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=68e630c13e9347f5bb88397713e0bcf8&page=${nextPage}&pageSize=${pageSize}`;
    setPage(nextPage);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setArticles((prevArticles) => prevArticles.concat(data.articles || []));
    } catch (error) {
      console.error("Failed to fetch more articles:", error);
    }
  };

  return (
    <div className={`container my-4 ${isDarkMode ? 'text-light' : ''}`}>
      <h2 style={{ marginTop: '70px' }}>NewsTape - Top {capitalize(category)} Headlines</h2>
      {loading && <Loading />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Loading />}
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
      {!loading && articles.length === 0 && (
        <p>No news items available at the moment.</p>
      )}
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
