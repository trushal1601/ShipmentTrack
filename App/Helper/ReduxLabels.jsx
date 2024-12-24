import { useSelector } from "react-redux";

export const useLabels = () => {
    const {selectedLanguage} = useSelector(state => state.language_id);
    const lang = selectedLanguage?.labels;
  return lang;
};
