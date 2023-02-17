import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Competition from '../components/HomePage';
import soccerHubReducer from '../Redux/Competition/competition';

const store = configureStore({
  reducer: {
    soccer: soccerHubReducer,
  },
  preloadedState: {
    soccer: {
      matchesByCompetition: {
        'Premier League': [
          {
            matchId: 1,
            matchTitle: 'Match 1',
            datePlayed: new Date(),
            thumbnail: 'thumbnail1.jpg',
            highlightsVideo: ' <div dangerouslySetInnerHTML={{ __html: match.highlightsVideo }} />',
          },
        ],
        'La Liga': [
          {
            matchId: 2,
            matchTitle: 'Match 2',
            datePlayed: new Date(),
            thumbnail: 'thumbnail2.jpg',
            highlightsVideo: '<div dangerouslySetInnerHTML={{ __html: match.highlightsVideo }} />',
          },
        ],
      },
    },
  },
});

const mockStore = store;

describe('Competition Tests', () => {
  beforeEach(() => {
    mockStore.dispatch = jest.fn();
  });

  it('Should render the input field and a list of competitions', () => {
    render(
      <Provider store={mockStore}>
        <Competition />
      </Provider>,
    );

    const input = screen.getByLabelText('Sizing example input');
    expect(input).toBeInTheDocument();

    const premierLeagueButton = screen.getByText('Premier League');
    expect(premierLeagueButton).toBeInTheDocument();

    const laLigaButton = screen.getByText('La Liga');
    expect(laLigaButton).toBeInTheDocument();
  });

  it('Should render the matches for the selected competition', async () => {
    render(
      <Provider store={mockStore}>
        <Competition />
      </Provider>,
    );

    const premierLeagueButton = screen.getByText('Premier League');
    fireEvent.click(premierLeagueButton);

    await waitFor(() => {
      const matchTitle = screen.getByText('Match 1');
      expect(matchTitle).toBeInTheDocument();

      const thumbnail = screen.getByAltText('Match');
      expect(thumbnail).toBeInTheDocument();
    });
  });

  it('Should filter the list of competitions by name', () => {
    render(
      <Provider store={mockStore}>
        <Competition />
      </Provider>,
    );

    const input = screen.getByLabelText('Sizing example input');
    fireEvent.change(input, { target: { value: 'premier' } });

    const premierLeagueButton = screen.getByText('Premier League');
    expect(premierLeagueButton).toBeInTheDocument();

    const laLigaButton = screen.queryByText('La Liga');
    expect(laLigaButton).not.toBeInTheDocument();
  });

  it('Should dispatch the fetchData action when mounted', () => {
    render(
      <Provider store={mockStore}>
        <Competition />
      </Provider>,
    );
    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expect.any(Function));
  });
});
