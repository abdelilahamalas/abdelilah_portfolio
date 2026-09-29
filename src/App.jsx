import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PortfolioLayout from './pages/PortfolioLayout';
import PortfolioHome from './pages/PortfolioHome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PortfolioLayout />}>
          <Route index element={<PortfolioHome />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
