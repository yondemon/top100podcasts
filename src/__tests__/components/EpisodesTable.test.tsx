import React from 'react';
import { render, screen } from '@testing-library/react';
import EpisodesTable, { EpisodesTableProps } from "../../components/EpisodesTable";
import {MemoryRouter} from 'react-router-dom';

const wrapComponent = () => {
  const props: EpisodesTableProps = {
    episodes: [
      {
        trackId: '1',
        trackName: 'Track 1',
        releaseDate: '2022-12-04',
        trackTimeMillis: '123456',
        description: 'description',
        episodeUrl: ''
      },
    ],
  };

  const view = render(
      <EpisodesTable {...props}/>,
      {wrapper: MemoryRouter}
    );

  return {
    props,
    wrappedComponent: view,
  };
};

describe('EpisodeTable', () => {
  it('renders table', () => {
    wrapComponent();

    const element = screen.getByText(/(Track 1)/i);
    expect(element).toBeInTheDocument();
  });
});
