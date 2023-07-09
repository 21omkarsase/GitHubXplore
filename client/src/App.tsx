import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Pages/Home';
import Followers from './Components/Pages/Followers';
import Following from './Components/Pages/Following';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/followers/:username" element={<Followers />} />
        <Route path="/following/:username" element={<Following />} />
      </Routes>
    </Router>
  );
};

export default App;
