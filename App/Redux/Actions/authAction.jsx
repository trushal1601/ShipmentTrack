import {Language_Type} from '../ActionType/index';

export const language = item => {
  return {
    type: Language_Type,
    data: item,
  };
};
