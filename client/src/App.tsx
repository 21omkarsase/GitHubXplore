import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Pages/Home';
import Followers from './Components/Pages/Followers';
import Following from './Components/Pages/Following';
import Repos from './Components/Pages/Repos';
import Repo from './Components/Pages/Repo';
import Loading from './Components/Layout/Loading';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/followers/:username" element={<Followers />} />
        <Route path="/following/:username" element={<Following />} />
        <Route path="/repository/:username" element={<Repos />} />
        <Route path="/:username/:reponame" element={<Repo />} />
      </Routes>
    </Router>
  );
};

export default App;
