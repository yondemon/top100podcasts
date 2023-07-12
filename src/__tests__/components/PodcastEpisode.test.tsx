import React from 'react';
import { render, screen } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import PodcastEpisodeBox, { PodcastEpisodeProps } from '../../components/PodcastEpisode';

import ReactRouterDOM from "react-router-dom";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

const props: PodcastEpisodeProps = {
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

const wrapComponent = () => {

  const view = render(
      <PodcastEpisodeBox {...props}/>,
      {wrapper: MemoryRouter}
    );

  return {
    props,
    wrappedComponent: view,
  };
};

describe('PodcastBox', () => {
  it('renders Box', () => {
    jest.spyOn(ReactRouterDOM, 'useParams').mockReturnValue({ episodeId: props.episodes[0].trackId });

    wrapComponent();

    const element = screen.getByText(/description/i);
    expect(element).toBeInTheDocument();
  });
});
