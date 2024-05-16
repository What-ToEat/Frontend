import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ViewPage from './pages/ViewPage/ViewPage';
import VotePage from './pages/VotePage/VotePage';

function App() {
  useEffect(() => {
    function setScreenSize() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    setScreenSize();
    window.addEventListener('resize', setScreenSize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', setScreenSize);
    };
  }, []);

  return (
    <Router>
      <div className="app">
        <div className="viewer">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/view" element={<ViewPage />} />
            <Route path="/vote" element={<VotePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
