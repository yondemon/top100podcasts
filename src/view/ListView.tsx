import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

import PodcastBox from '../components/PodcastBox';

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

function ListView (props: ListViewProps) {
  const { podcasts } = props;

  return (
    <>
      {podcasts && podcasts.length > 0 && (
        <ListWrapper>
          {podcasts.map( (item) => {

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
