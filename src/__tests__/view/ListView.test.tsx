import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';

import ListView from '../../view/ListView';

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
  };

  const view = render(
      <ListView {...props}/>,
      {wrapper: MemoryRouter}
    );

  return {
    props,
    wrappedComponent: view,
  };
};

describe('Listview', () => {
  it('renders podcasts with NAME', () => {
    wrapComponent();

    const element = screen.getByText(/NAME/i);
    expect(element).toBeInTheDocument();
  });

  it('renders filtered podcasts with NAME when search A', () =>{
    wrapComponent();

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();

    fireEvent.change( searchInput, {target: { value: 'A' }});
    const listElement = screen.getByText(/NAME/i);
    expect(listElement).toBeInTheDocument();
  })

  it('renders filtered podcasts with NAME when empty search', () =>{
    wrapComponent();

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();

    fireEvent.change( searchInput, {target: { value: '' }});
    const listElement = screen.getByText(/NAME/i);
    expect(listElement).toBeInTheDocument();
  })
});
