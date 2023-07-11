import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

import ITunesService from '../services/ITunesService';

jest.mock('../services/ITunesService', () => ({
  __esModule: true,
  default: jest.fn(() => {
    // eslint-disable-next-line no-labels, no-unused-labels
    getTop100: jest.fn(() => Promise.resolve())
  })
}))

describe('App', () => {
  it('renders header link', () => {
    render(<App />);
    const linkElement = screen.getByText(/Podcaster/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('calls ItunesService', () => {
    render(<App />);
    expect(ITunesService).toHaveBeenCalled();
  })
});
