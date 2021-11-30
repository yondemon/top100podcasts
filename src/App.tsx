import React, { useEffect, useState } from 'react';
import styled from "styled-components";

import './App.css';

import ITunesService from './services/ITunesService';
import PodcastBox from './components/PodcastBox';

function App() {
  const [podcasts, setPodcasts] = useState<any[]>([]);

  const Header = styled.header`
    padding: 0.2rem 1rem;
    border-bottom: 1px solid #777;
  `;

  const ListWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
  `
  const ListItem = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 0 21%;
    max-width: 25%;
    justify-content: stretch;
  `

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
        {podcasts && podcasts.length > 0 && (
          <ListWrapper>
            {podcasts.map( (item) => {

              return (
                <ListItem>
                  <PodcastBox
                    title={item['im:name'].label}
                    img={item['im:image'][0].label}
                    author={item['im:artist'].label} />
                </ListItem>
              );
            })}
          </ListWrapper>
        )}
      </div>
    </div>
  );
}

export default App;
