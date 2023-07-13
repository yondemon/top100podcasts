import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import HTMLReactParser from 'html-react-parser';
import { PodcastEpisode } from '../models/PodcastEpisode.model';

const Box = styled.div`
  border: 1px solid #eee;
  box-shadow: 2px 2px 6px 2px #eee;
  margin: 20px 10px 10px;
  padding: 1rem;
  text-align:left;
`;
const Title = styled.h1`
  font-size: 1.2rem;
`;
const Description = styled.div`
  font-size: 0.9rem;
  font-style: italic;
  white-space: pre-wrap;
`;
const Player = styled.audio`
  margin: 1.5rem 0 0;
  width: 100%;
`;

export interface PodcastEpisodeProps {
  episodes: Array<PodcastEpisode>;
}

function PodcastEpisodeBox (props: PodcastEpisodeProps) {
  const { episodes } = props;
  const { episodeId } = useParams();
  const [episode, setEpisode] = useState<any>(undefined);

  useEffect(() => {
    if( episodeId !== undefined && episodes !== undefined){
      setEpisode(episodes.find((item) => {
        return episodeId === item.trackId.toString();
      }));     
    } else {
      setEpisode(undefined);
    }
  }, [episodes, episodeId]);

  return (
    <Box>
      {episode && (
        <>
          <Title>{episode.trackName}</Title>
          <Description>
            {HTMLReactParser(episode.description)}
          </Description>
          <Player src={episode.episodeUrl} controls />
        </>
      )}
    </Box>
  )
}

export default PodcastEpisodeBox;