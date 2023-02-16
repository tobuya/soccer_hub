import { configureStore } from '@reduxjs/toolkit';
import soccerHubReducer from './Competition/competition';

const store = configureStore({
  reducer: {
    soccer: soccerHubReducer,
  },
});

export default store;
