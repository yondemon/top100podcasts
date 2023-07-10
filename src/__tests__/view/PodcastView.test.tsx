import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { useParams, MemoryRouter } from 'react-router-dom';

import PodcastView from '../../view/PodcastView';
import ITunesService from '../../services/ITunesService';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(() => { return { podcastId: '000'} } ),
 }));

const wrapComponent = () => {
  const props = {
    podcasts: [
      {
        id: {
          attributes: { 'im:id': '0001' },
        },
        'im:name': { label: 'NAME' },
        'im:artist': { label: 'ARTIST' },
        'im:image': [{ label: '/' }],
      },
    ],
    setLoading: jest.fn(),
  };

  const wrappedComponent = render(
      <PodcastView {...props}/>,
      {wrapper: MemoryRouter}
    );

  return {
    props,
    wrappedComponent,
  };
};


describe('Listview', () => {
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
          // trackTimeMillis: '',
          kind: 'podcast-episode',
        },
      ],
  };
  const mockFetchPodcastInfo = Promise.resolve({json: () => Promise.resolve(mockPodcastInfo)});

  beforeAll(() => {
    jest.spyOn(ITunesService, 'getPodcastInfo').mockImplementationOnce( async () => mockFetchPodcastInfo as any )
  });
  afterAll(() => {
    ITunesService.getPodcastInfo.mockClear();
  });

  xit('renders podcasts with NAME', () => {
    wrapComponent();

    const element = screen.getByText(/TITLE/i);
    expect(element).toBeInTheDocument();
  });
});
