import React, { useReducer } from "react";
import LegacyForm from "./legacyForm";
import LoginContext from "./LoginContext";
import codeFrom from "./codeFrom";

const reducer = (state, action) => {
  let count = 60;
  // setInterval(() => {
  //   state = count+=1
  //   // console.log(state)
  // }, 1000)
};

const reducerTiming = (state, action) => {
  switch (action) {
    case true:
      return true;
    default:
      return false;
  }
};

const newLogin = props => {
  const [count, dispatch] = useReducer(reducer, 60);
  const [timing, dispatchTiming] = useReducer(reducerTiming, false);
  return (
    <LoginContext.Provider
      value={{ color: "danger", timing, count, dispatch, dispatchTiming }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};
newLogin.LegacyForm = LegacyForm;
newLogin.codeFrom = codeFrom;
export default newLogin;
