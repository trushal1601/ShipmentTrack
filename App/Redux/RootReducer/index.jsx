import { combineReducers } from 'redux';
import {languageReducer} from '../Reducer/authReducer'


const rootReducer = combineReducers({
  language: languageReducer,
});

export default rootReducer;
