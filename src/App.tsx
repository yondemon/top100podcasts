import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";

import './App.css';

import ITunesService from './services/ITunesService';
import ListView from './view/ListView';
import PodcastView from './view/PodcastView';

function App() {
  const [podcasts, setPodcasts] = useState<any[]>([]);

  const Header = styled.header`
    padding: 0.2rem 1rem;
    border-bottom: 1px solid #777;
  `;

  useEffect(() => {
    const fetchPodcasts = async () => {
      const result = await ITunesService.getTop100();
    
      setPodcasts(result.data.feed.entry);
    };

    fetchPodcasts();  
  }, []);

  return (
    <div className="App">
      <Header>
        Podcaster
      </Header>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ListView podcasts={podcasts} />} />
            <Route path="/podcast/:podcastId" element={<PodcastView />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
