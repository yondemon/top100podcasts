import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import ITunesService from './services/ITunesService';

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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div>
        {podcasts && podcasts.length > 0 && (
          <ul>
            {podcasts.map( (item) => (
              <li>{ item.title.label }</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
