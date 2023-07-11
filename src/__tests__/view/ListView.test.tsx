import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';

import ListView, { ListViewProps } from '../../view/ListView';

const wrapComponent = () => {
  const props: ListViewProps = {
    podcasts: [
      {
        id: '0001',
        title: 'NAME',
        author: 'ARTIST',
        img: '/',
        summary: 'SUMMARY',
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
