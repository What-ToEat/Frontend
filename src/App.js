import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ViewPage from './pages/ViewPage/ViewPage';
import VotePage from './pages/VotePage/VotePage';

function App() {

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/view" element={<ViewPage/>} />
          <Route path="/vote" element={<VotePage/>} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
