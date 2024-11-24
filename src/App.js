// import './App.css';
// import React, { useState } from 'react';
// import Navbar from './components/Navbar';
// import News from './components/News';
// import LoadingBar from 'react-top-loading-bar'
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
// } from "react-router-dom";

// const App =()=> {
//   const pageSize = 8;
//   const apiKey = process.env.REACT_APP_NEWS_API;
//   const [progress, setProgress] = useState(0);
  
//     return (
//       <div>

//         <Router>
//           <Navbar />
//           <LoadingBar
//             color='#0b5ed7 '
//             progress={progress}

//           />
//           <Routes>
//             <Route path="/" element={<News  setProgress={ setProgress} apiKey={ apiKey} key="general" pageSize={ pageSize} country='in' category='general' />} />
//             <Route path="/general" element={<News  setProgress={ setProgress} apiKey={ apiKey} key="general" pageSize={ pageSize} country='in' category='general' />} />
//             <Route path="/business" element={<News setProgress={ setProgress} apiKey={ apiKey} key="business" pageSize={ pageSize} country='in' category='business' />} />
//             <Route path="/entertainment" element={<News  setProgress={ setProgress} apiKey={ apiKey} key="entertainment" pageSize={ pageSize} country='in' category='entertainment' />} />
//             <Route path="/health" element={<News  setProgress={ setProgress} apiKey={ apiKey} key="health" pageSize={ pageSize} country='in' category='health' />} />
//             <Route path="/science" element={<News  setProgress={ setProgress} apiKey={ apiKey} key="science" pageSize={ pageSize} country='in' category='science' />} />
//             <Route path="/sports" element={<News  setProgress={ setProgress} apiKey={ apiKey} key="sports" pageSize={ pageSize} country='in' category='sports' />} />
//             <Route path="/technology" element={<News  setProgress={ setProgress} apiKey={ apiKey} key="technology" pageSize={ pageSize} country='in' category='technology' />} />
//           </Routes>
//         </Router>
//       </div>
//     );
//   }


// export default App;

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
          <Route path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country='in' category='general' isDarkMode={isDarkMode} />} />
          <Route path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country='in' category='general' isDarkMode={isDarkMode} />} />
          <Route path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country='in' category='business' isDarkMode={isDarkMode} />} />
          <Route path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country='in' category='entertainment' isDarkMode={isDarkMode} />} />
          <Route path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country='in' category='health' isDarkMode={isDarkMode} />} />
          <Route path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country='in' category='science' isDarkMode={isDarkMode} />} />
          <Route path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country='in' category='sports' isDarkMode={isDarkMode} />} />
          <Route path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country='in' category='technology' isDarkMode={isDarkMode} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

