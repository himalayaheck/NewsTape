
import React from 'react';

const NewsItem = (props) => {
  const { title, description, imageUrl, newsUrl, time, isDarkMode } = props;

  const textStyle = {
    color: isDarkMode ? '#b0b0b0' : '#6c757d'
};
  return (
    <div>
      <div className={`card ${isDarkMode ? 'bg-dark text-light' : ''}`}>
        <img src={imageUrl ? imageUrl : "https://cdn.ndtv.com/common/images/ogndtv.png"} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-sm btn-primary">Read More</a>
          <p className="card-text"><small className="" style={textStyle}>Published at {new Date(time).toGMTString()}</small></p>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;

