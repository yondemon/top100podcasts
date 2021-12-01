import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import styled from "styled-components";

import './App.css';

import ITunesService from './services/ITunesService';
import ListView from './view/ListView';
import PodcastView from './view/PodcastView';

const Header = styled.header`
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #EEE;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 1.8rem;
`;

function App() {
  const [podcasts, setPodcasts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPodcasts = async () => {
      setLoading(true);
      const result = await ITunesService.getTop100();
      setLoading(false);
      setPodcasts(result.data.feed.entry);
    };

    fetchPodcasts();  
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header>
          <Link to="/">Podcaster</Link>
          { loading && (
            <Loader type="ThreeDots" color="#61dafb" height={24} width={24}/>
          )}
        </Header>
        <div>
          <Routes>
            <Route path="/" element={<ListView podcasts={podcasts} />} />
            <Route path="/podcast/:podcastId/*" element={<PodcastView setLoading={setLoading} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
