import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage/HomePage';
import ViewPage from './pages/ViewPage/ViewPage';
import VotePage from './pages/VotePage/VotePage';
import VoteDetailPage from './pages/VoteDetailPage/VoteDetailPage';  // 새로운 컴포넌트를 임포트합니다.

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
            <Route path="/vote/:hash" element={<VoteDetailPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
