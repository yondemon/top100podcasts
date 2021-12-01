import React from 'react';
import styled from "styled-components";

import { beautifyDate, millisecondsToTime } from '../utils/time';

interface EpisodesTableProps {
  episodes: any[];
}

function EpisodesTable (props: EpisodesTableProps) {
  const { episodes } = props;

  const Table = styled.table`
    border-collapse: collapse;
    margin: 1rem 0 0;
  `
  const TableHead = styled.tr`
    font-size: 1rem;
    font-weight: bold;
    border-bottom: 2px solid #BBB;
    text-align: left;
  `
  const TableRow = styled.tr`
    font-size: 0.8rem;
    border-bottom: 1px solid #CCC;
    & td {
      padding: 0.2rem;
      height: 2rem;
    }
    &:nth-child(even) {
      background-color: #EEE;
    }
  `
  const TableCellDate = styled.td`
    text-align: right;
  `
  const TableCellDuration = styled.td`
    text-align: right;
  `

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
                <td>{episode.trackName}</td>
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