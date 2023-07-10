import React, { useEffect, useState } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import styled from 'styled-components';

import ITunesService from '../services/ITunesService';
import PodcastInfo from '../components/PodcastInfo';
import EpisodesTable from '../components/EpisodesTable';
import PodcastEpisode from '../components/PodcastEpisode';

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

interface PodcastViewProps {
  podcasts: any[];
  setLoading: (loading: boolean) => void;
}

function PodcastView (props: PodcastViewProps) {
  const params = useParams();
  const { podcastId } = params || {};
  const { podcasts, setLoading } = props;

  const [podcast, setPodcast] = useState<any>(undefined);
  const [description, setDescription] = useState<any>(undefined);
  const [count, setCount] = useState<any>(undefined);
  const [podcastEpisodes, setPodcastEpisodes] = useState<any>(undefined);

  useEffect(() => {
    const fetchPodcast = async () => {
      if(podcastId !== undefined){

        const podcastFromFeed = podcasts.find( (pod) => pod.id.attributes['im:id'] === podcastId);
        if( podcastFromFeed !== undefined){
          console.log(podcastFromFeed);

          if(!podcast){
            setPodcast({
              'collectionName': podcastFromFeed['im:name'].label,
              'artworkUrl100': podcastFromFeed['im:image'][0].label,
              'artistName': podcastFromFeed['im:artist'].label
            })
          }
          setDescription(podcastFromFeed.summary.label);
        } else {
          setDescription(undefined);
        }

        setLoading(true);
        const podcastInfo = await new ITunesService().getPodcastInfo( podcastId );
        setLoading(false);

        const epidodesResults = podcastInfo.results;
                
        if(epidodesResults !== undefined){
          setCount(podcastInfo.resultCount);
          setPodcastEpisodes(epidodesResults.filter(
            (episode: any) => episode.kind === 'podcast-episode')
          );
          setPodcast(epidodesResults.find(((episode: any) => episode.kind === 'podcast')));

        }

      }
    };  
    fetchPodcast();
  }, [podcastId, podcasts, setLoading]);

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
              <PodcastEpisode episodes={podcastEpisodes} />
            )} />
          </Routes>
      </div>
    </Layout>
  )
}

export default PodcastView;