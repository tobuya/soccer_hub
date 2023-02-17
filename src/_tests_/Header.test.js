import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/Header';

describe('Header Render Test', () => {
  it('Should render the logo, title, and icons', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
  });
});
