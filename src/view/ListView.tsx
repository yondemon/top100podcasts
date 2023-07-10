import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

import PodcastBox from '../components/PodcastBox';
import { containsTextI } from '../utils/text';

const SearchBar = styled.div`
  display: flex;
  width: 100%;
  align-items: center; 
  justify-content: flex-end;
  margin: 0.5rem 0;
`;
const SearchCount = styled.div`
  background-color: #06C;
  color: #FFF;
  border-radius: 0.2rem;
  padding: 0.1rem 0.3rem;
  margin: 0 0.5rem;
  font-weigth: bold;
  font-size: 0.9rem;
`;
const SearchInput = styled.input`
  border: 1px solid #CCC;
  border-radius: 0.2rem;
  font-size: 1rem;
  padding: 0.1rem;
  margin-right: 1rem;
`;
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

interface ListViewProps {
  podcasts: any[];
}

export function ListView (props: ListViewProps) {
  const { podcasts } = props;
  const [filteredPodcasts, setFilteredPodcasts] = useState(podcasts);
  const [searching, setSearching] = useState("");

  useEffect(() => {
    filterPodcast(searching, podcasts);
  }, [searching, podcasts]);

  const handleSearch = (e: any) => {
    const searching = e.target.value;
    setSearching(searching);
  }

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
      <SearchBar>
        {podcasts && (  
          <SearchCount>{filteredPodcasts.length}</SearchCount>
        )}
        <div>
          <SearchInput
            type="text"
            placeholder="Filter podcasts..."
            onChange={handleSearch}
          />
        </div>
      </SearchBar>
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
