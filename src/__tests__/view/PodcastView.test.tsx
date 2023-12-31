import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import PodcastView, { PodcastViewProps } from '../../view/PodcastView';
import ITunesService from '../../services/ITunes.service';

import ReactRouterDOM from "react-router-dom";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
 }));

const wrapComponent = () => {
  const props: PodcastViewProps = {
    podcasts: [
      {
        id: '0001',
        title: 'NAME',
        author: 'ARTIST',
        img: '/',
        summary: 'SUMMARY',
      },
    ],
    setLoading: jest.fn(),
    setError: jest.fn(),
  };

  const view = render(
      <PodcastView {...props}/>,
      {wrapper: MemoryRouter}
    );

  return {
    props,
    view,
  };
};

const mockPodcastInfo = {
  resultCount: 1,
  results: 
    [
      {
        collectionName: 'TITLE',
        artworkUrl100: 'URL',
        artistName: 'AUTHOR',
        kind: 'podcast',
      },
      {
        trackName: 'CHAPTER 1',
        releasreleaseDateed: '2021-01-01 12:30',
        trackTimeMillis: '2345678',
        kind: 'podcast-episode',
      },
      {
        trackName: 'CHAPTER 2',
        releaseDate: '2021-02-02 12:30',
        trackTimeMillis: '2345678',
        kind: 'podcast-episode',
      },
      {
        trackName: 'CHAPTER 3',
        releaseDate: '2021-03-03 12:30',
        trackTimeMillis: '23456',
        kind: 'podcast-episode',
      },
    ],
};

jest.mock('../../services/ITunes.service', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    getTop100: jest.fn(() => Promise.resolve()),
    getPodcastInfo: jest.fn(() => Promise.resolve(mockPodcastInfo))
  }))
}))

describe('PodcastView', () => {

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('renders podcasts with NAME', () => {
    jest.spyOn(ReactRouterDOM, 'useParams').mockReturnValue(({ podcastId: '0001'}));

    wrapComponent();

    expect(ITunesService).toHaveBeenCalled();

    const element = screen.getByText(/NAME/i);
    expect(element).toBeInTheDocument();
  });
});
