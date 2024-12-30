import {combineReducers} from 'redux';
import {languageReducer} from '../Reducer/authReducer';
import userSlice from '../Features/UserSlice';
import languageSlice from '../Features/LanguageSlice';
import emailSlice from '../Features/EmailSlice';
import homeSlice from '../Features/HomeSlice';

const rootReducer = combineReducers({
  language: languageReducer,
  user: userSlice,
  language_id: languageSlice,
  email: emailSlice,
  home: homeSlice,
});

export default rootReducer;
