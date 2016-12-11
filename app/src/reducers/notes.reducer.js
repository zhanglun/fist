import { ADD_NOTE, REMOVE_NOTE, UPDATE_NOTE } from '../actions';

let initNoteState = {
  items: [],

};

export default function notes(state = initNoteState, action) {
  switch (action.type) {
    case ADD_NOTE:
      return state;
      break;
    case REMOVE_NOTE:
      break;
    case UPDATE_NOTE:
      return state;
      break;
    default:

      return state;
      break;
  }
}

