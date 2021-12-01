import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import styled from "styled-components";

import './App.css';

import ITunesService from './services/ITunesService';
import ListView from './view/ListView';
import PodcastView from './view/PodcastView';

const Header = styled.header`
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #777;
`;

function App() {
  const [podcasts, setPodcasts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPodcasts = async () => {
      const result = await ITunesService.getTop100();
    
      setPodcasts(result.data.feed.entry);
    };

    fetchPodcasts();  
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header>
          <Link to="/">Podcaster</Link>
        </Header>
        <div>
          <Routes>
            <Route path="/" element={<ListView podcasts={podcasts} />} />
            <Route path="/podcast/:podcastId/*" element={<PodcastView />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
