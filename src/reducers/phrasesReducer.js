import { UPDATE_USER } from '../actions/phrasesActions';

export default function phrasesReducer(state = [], {type, payload}) {
  switch (type) {
    case UPDATE_USER:
      return payload;
    default:
    	return state;
  }
}