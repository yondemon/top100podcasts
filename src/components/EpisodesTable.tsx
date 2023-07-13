import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

import { beautifyDate, millisecondsToTime } from '../utils/time';
import { PodcastEpisode } from '../models/PodcastEpisode.model';


const Table = styled.table`
  border-collapse: collapse;
  margin: 0;
  width: 100%;
`;
const TableHead = styled.tr`
  font-size: 0.9rem;
  font-weight: bold;
  border-bottom: 2px solid #BBB;
  text-align: left;
  & th {
    padding: 0.5rem;
    height: 1.5rem;
    text-align: left;
  }
`;
const TableRow = styled.tr`
  font-size: 0.8rem;
  border-bottom: 1px solid #CCC;
  &:hover {
    background-color: #DDD;
  }
  & td {
    padding: 0.5rem;
    height: 1.5rem;
  }
  &:nth-child(odd) {
    background-color: #EEE;
    &:hover {
      background-color: #DDD;
    }
  }
`;
const TableCellTitle = styled.td`
  text-align: left;
`;
const TableCellDate = styled.td`
  text-align: right;
  width: 4.5rem;
`;
const TableCellDuration = styled.td`
  text-align: right;
  width: 4.5rem;
`;

export interface EpisodesTableProps {
  episodes: Array<PodcastEpisode>;
}

function EpisodesTable (props: EpisodesTableProps) {
  const { episodes } = props;

  return (
    <Table>
      <thead>
        <TableHead>
          <th>Title</th>
          <th>Date</th>
          <th>Duration</th>
        </TableHead>
      </thead>
      <tbody>
        { episodes
            .map((episode: any) => (
              <TableRow key={episode.trackId}>
                <TableCellTitle>
                  <Link to={`episode/${episode.trackId}`}>{episode.trackName}</Link>
                </TableCellTitle>
                <TableCellDate>{ beautifyDate(episode.releaseDate) }</TableCellDate>
                <TableCellDuration>{ millisecondsToTime(episode.trackTimeMillis) }</TableCellDuration>
              </TableRow>
            ))
        }
      </tbody>
    </Table>
  );
}

export default EpisodesTable;