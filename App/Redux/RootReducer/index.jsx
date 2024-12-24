import {combineReducers} from 'redux';
import {languageReducer} from '../Reducer/authReducer';
import userSlice from '../Features/UserSlice';
import languageSlice from '../Features/LanguageSlice';

const rootReducer = combineReducers({
  language: languageReducer,
  user: userSlice,
  language_id: languageSlice,
});

export default rootReducer;
