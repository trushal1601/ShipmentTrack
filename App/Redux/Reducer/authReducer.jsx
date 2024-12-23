import { Language_Type } from '../ActionType/index';

const initialState = { selectedLanguage: null };

export const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case Language_Type:
      return { ...state, selectedLanguage: action.data };
    default:
      return state;
  }
};
