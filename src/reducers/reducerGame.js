import {
  STARTED,
  SET_WINNER,
  SET_ALLOWED_CELLS,
  ADD_DISKS_PLAYERS,
  SET_ERROR,
} from '../types/index';

import initialState from '../initialStates/stateGame';

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case STARTED:
      return {
        ...state,
        started: true,
      };
    case SET_WINNER:
      return {
        ...state,
        winner: action.payload,
      };

    case SET_ALLOWED_CELLS:
      return {
        ...state,
        allowedCells: action.payload,
      };
    case ADD_DISKS_PLAYERS:
      return {
        ...state,
        disksWhite: action.payload.white,
        disksBlack: action.payload.black,
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;
