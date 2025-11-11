
import './App.css';
import React, { useEffect,useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  const pageSize = 8;
  const apiKey = process.env.REACT_APP_NEWS_API;  
  const [progress, setProgress] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
      <Router>
        <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <LoadingBar color='#0b5ed7 ' progress={progress} />
        <Routes>
          <Route path="/NewsTape" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize}  category='general' isDarkMode={isDarkMode} />} />
          <Route path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize}  category='general' isDarkMode={isDarkMode} />} />
          <Route path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize}  category='general' isDarkMode={isDarkMode} />} />
          <Route path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize}  category='business' isDarkMode={isDarkMode} />} />
          <Route path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize}  category='entertainment' isDarkMode={isDarkMode} />} />
          <Route path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize}  category='health' isDarkMode={isDarkMode} />} />
          <Route path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize}  category='science' isDarkMode={isDarkMode} />} />
          <Route path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize}  category='sports' isDarkMode={isDarkMode} />} />
          <Route path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize}  category='technology' isDarkMode={isDarkMode} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

