import { combineReducers } from 'redux';
import notes from './notes.reducer';

const rootReducer = combineReducers({
  notes,
});

export default rootReducer;
