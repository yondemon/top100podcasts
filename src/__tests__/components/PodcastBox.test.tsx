import React from 'react';
import { render, screen } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import PodcastBox, { PodcastBoxProps } from '../../components/PodcastBox';

const wrapComponent = () => {
  const props: PodcastBoxProps = {
    img: '',
    title: 'TITLE',
    author: 'AUTHOR'
  };
  // const history = createMemoryHistory();

  const view = render(
      <PodcastBox {...props}/>,
      {wrapper: MemoryRouter}
    );

  return {
    props,
    wrappedComponent: view,
  };
};

describe('PodcastBox', () => {
  it('renders Box', () => {
    wrapComponent();

    const element = screen.getByText(/TITLE/i);
    expect(element).toBeInTheDocument();
  });
});
