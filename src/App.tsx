import React, { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import styled from "styled-components";

import './App.css';

import ITunesService from './services/ITunesService';
import ListView from './view/ListView';
import PodcastView from './view/PodcastView';
import { PodcastFromFeedNormalized } from './interfaces/Podcast.interface';

const Header = styled.header`
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #EEE;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 1.8rem;
`;

function App() {
  const [podcasts, setPodcasts] = useState<PodcastFromFeedNormalized[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPodcasts = async () => {
      setLoading(true);
      try {
        const data = await new ITunesService().getTop100();
        setPodcasts(data);
      } catch(err: any) {
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();  
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header>
          <Link to="/">Podcaster</Link>
          { loading && (
            <ThreeDots color="#61dafb" height={24} width={24}/>
          )}
        </Header>
        <div>
          <Routes>
            <Route path="/" element={<ListView podcasts={podcasts} />} />
            <Route path="/podcast/:podcastId/*" element={<PodcastView podcasts={podcasts} setLoading={setLoading} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
