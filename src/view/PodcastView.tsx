import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import styled from 'styled-components';

import ITunesService from '../services/ITunesService';
import PodcastBox from '../components/PodcastBox';
import EpisodesTable from '../components/EpisodesTable';

function PodcastView () {
  const { podcastId } = useParams();

  const [podcast, setPodcast] = useState<any>(undefined);
  const [count, setCount] = useState<any>(undefined);
  const [podcastEpisodes, setPodcastEpisodes] = useState<any>(undefined);

  const Layout = styled.div`
    display:flex;
  `

  useEffect(() => {
    const fetchPodcast = async () => {
      if(podcastId !== undefined){
        const result = await ITunesService.getPodcastInfo( podcastId );
    
        const epidodesResults = result.data.results;

        setCount(result.data.resultCount);
        setPodcastEpisodes(epidodesResults.filter(
          (episode: any) => episode.kind === 'podcast-episode')
        );     
        setPodcast(epidodesResults.find(((episode: any) => episode.kind === 'podcast')));

      }
    };
  
    fetchPodcast();
  }, [podcastId]);

  return (
    <Layout>
      <div>
        {podcast && (
          <PodcastBox
            title={podcast['collectionName']}
            img={podcast['artworkUrl60']}
            author={podcast['artistName']} />
        )}
      </div>
      <div>
        <div>
          {podcastEpisodes && (
            <>Episodes: {count}</>
          )}
        </div>
        <div>
          {podcastEpisodes && (
            <EpisodesTable episodes={podcastEpisodes} />
          )}
        </div>
      </div>
    </Layout>
  )
}

export default PodcastView;