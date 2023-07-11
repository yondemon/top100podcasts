import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

import PodcastBox from '../components/PodcastBox';
import { containsTextI } from '../utils/text';
import { PodcastFromFeedInterface } from '../interfaces/Podcast.interface';
import SearchBar from '../components/SearchBar';

const ListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;
const ListItem = styled.div`
  flex-direction: column;
  flex: 1 0 21%;
  max-width: 25%;
  justify-content: stretch;
`;

export interface ListViewProps {
  podcasts: Array<PodcastFromFeedInterface>;
}

export function ListView (props: ListViewProps) {
  const { podcasts } = props;
  const [filteredPodcasts, setFilteredPodcasts] = useState(podcasts);
  const [searching, setSearching] = useState("");

  useEffect(() => {
    filterPodcast(searching, podcasts);
  }, [searching, podcasts]);

  const filterPodcast = (searching: string, podcasts: any[]) => {
    if (searching.length > 0) {
      setFilteredPodcasts(podcasts.filter( 
        (item) => {
          return containsTextI(item['im:name'].label, searching) 
            || containsTextI(item['im:artist'].label, searching);
        }
      ));
    } else {
      setFilteredPodcasts(podcasts);
    }
  }

  return (
    <>
      <SearchBar count={filteredPodcasts.length} setSearching={setSearching}/>
      {filteredPodcasts && filteredPodcasts.length > 0 && (
        <ListWrapper>
          {filteredPodcasts.map( (item) => {

            return (
              <ListItem key={item.id.attributes['im:id']}>
                <Link to={`/podcast/${item.id.attributes['im:id']}`}>
                  <PodcastBox
                    title={item['im:name'].label}
                    img={item['im:image'][0].label}
                    author={item['im:artist'].label} />
                </Link>
              </ListItem>
            );
          })}
        </ListWrapper>
      )}
    </>
  );
};

export default ListView;
