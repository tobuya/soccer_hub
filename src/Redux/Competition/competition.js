import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://www.scorebat.com/video-api/v3/feed/?token=NTg1MjFfMTY3NjM2MTMxOF9iYzkyZWFjZjA0ZjNlMDMxMzI1NmU2ZDgyZDNiN2RhNzZmMzI2MDUw';

const initialState = {
  matchesByCompetition: {},
};

const FETCHED_DATA = 'soccer_hub/competition/FETCHED_DATA';
const SET_MATCHES_BY_COMPETITION = 'soccer_hub/competition/SET_MATCHES_BY_COMPETITION';

const fetchData = createAsyncThunk(
  FETCHED_DATA,
  async () => {
    const response = await axios.get(API_URL);
    const soccerData = response.data.response.map(({
      title, competition, matchviewUrl, competitionUrl, thumbnail, date, videos,
    }) => ({
      matchTitle: title,
      competitionName: competition,
      matchId: matchviewUrl,
      competitionId: competitionUrl,
      thumbnail,
      datePlayed: date,
      highlightsVideo: videos[0].embed,
    }));

    const matchesByCompetition = {};
    soccerData.forEach((match) => {
      const { competitionName } = match;
      if (!matchesByCompetition[competitionName]) {
        matchesByCompetition[competitionName] = [];
      }
      matchesByCompetition[competitionName].push(match);
    });

    return { soccerData, matchesByCompetition };
  },
);

const soccerHubReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${FETCHED_DATA}/fulfilled`:
      return { ...state, ...action.payload };
    case SET_MATCHES_BY_COMPETITION:
      return { ...state, matchesByCompetition: action.payload };
    default:
      return state;
  }
};

export { fetchData };
export default soccerHubReducer;
