import { useState } from "react";

const useInput = (placeholder, defaultState) => {
  const [state, updateState] = useState(defaultState);
  const reset = () => {
    updateState(defaultState);
  };

  const bind = {
    state,
    placeholder,
    onChange: e => {
      updateState(e.target.value);
    }
  };

  return [state, bind, reset];
};

export default useInput;
