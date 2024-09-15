import { createReducer } from '@reduxjs/toolkit';
import { setPage } from '../actions/actions';


const initialState = {
  currentPage: 'Home',
};

const pageReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setPage, (state, action) => {
      state.currentPage = action.payload;
    });
});

export default pageReducer;
