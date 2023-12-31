import React, { useEffect, useState } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import styled from 'styled-components';

import ITunesService from '../services/ITunes.service';
import PodcastInfo from '../components/PodcastInfo';
import EpisodesTable from '../components/EpisodesTable';
import PodcastEpisodeBox from '../components/PodcastEpisode';
import { Podcast, PodcastFromFeedNormalized } from '../models/Podcast.model';

const Layout = styled.div`
  display:flex;
  & > div:nth-child(1) {
    flex-direction: column;
    flex: 1 0 25%;
    max-width: 25%;
    justify-content: stretch;  
  }
  & > div:nth-child(2) {
    flex-direction: column;
    flex: 1 0 75%;
    max-width: 75%;
    justify-content: stretch;  
  }    
`;
const Box = styled.div`
  border: 1px solid #eee;
  box-shadow: 2px 2px 6px 2px #eee;
  margin: 20px 10px 10px;
  padding: 1rem;
  text-align:center;
`;
const Count = styled.h2`
  text-align: left;
  margin: 0;
  font-size: 1.2rem;
`;

export interface PodcastViewProps {
  podcasts: PodcastFromFeedNormalized[];
  setLoading: (isLoading: boolean) => void;
  setError: (isError: boolean) => void;
}

function PodcastView (props: PodcastViewProps) {
  const params = useParams();
  const { podcastId } = params || {};
  const { podcasts, setLoading, setError } = props;

  const [podcast, setPodcast] = useState<Podcast|undefined>(undefined);
  const [description, setDescription] = useState<string|undefined>(undefined);
  const [count, setCount] = useState<string|undefined>(undefined);
  const [podcastEpisodes, setPodcastEpisodes] = useState<any|undefined>(undefined);

  useEffect(() => {
    const fetchPodcast = async () => {
      if(podcastId !== undefined){

        const podcastFromFeed = podcasts.find( (pod) => pod.id === podcastId);
        if( podcastFromFeed !== undefined){
          setPodcast((prev?: Podcast) => ({
            ...prev,
            'collectionName': podcastFromFeed.title,
            'artworkUrl100': podcastFromFeed.img,
            'artistName': podcastFromFeed.author
          }))
          setDescription(podcastFromFeed.summary);
        } else {
          setDescription(undefined);
        }

        setError(false);
        setLoading(true);
        try {
          const podcastInfo = await new ITunesService().getPodcastInfo( podcastId );

          const episodesResults = podcastInfo.results;

          if(episodesResults !== undefined) {
            setCount(podcastInfo.resultCount);
            setPodcastEpisodes(episodesResults.filter(
              (episode: any) => episode.kind === 'podcast-episode')
            );
            setPodcast((prev: any) => {
              return {
                ...prev,
                ...episodesResults.find(((episode: any) => episode.kind === 'podcast'))
              };
            });
          }
        } catch(err: any) {
          setError(true);
        } finally {
          setLoading(false);
        }                
      }
    };  
    fetchPodcast();
  },[podcastId, podcasts, setError, setLoading]);

  return (
    <Layout>
      <div>
        {podcast && (
          <PodcastInfo
            title={podcast['collectionName']}
            img={podcast['artworkUrl100']}
            author={podcast['artistName']}
            description={description} />
        )}
      </div>

      <div>
        <Routes>
          <Route path="" element={(
            <>
              <Box>
                <Count>
                  {podcastEpisodes && (
                    <>Episodes: {count}</>
                  )}
                </Count>
              </Box>
              <Box>
                {podcastEpisodes && (
                  <EpisodesTable episodes={podcastEpisodes} />
                )}
              </Box>
            </>
          )} />
          <Route path="episode/:episodeId" element={(
              <PodcastEpisodeBox episodes={podcastEpisodes} />
            )} />
          </Routes>
      </div>
    </Layout>
  )
}

export default PodcastView;