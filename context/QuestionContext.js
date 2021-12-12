import { createContext, useState, useCallback } from "react";
const vocab = require("../data/vocab.json");

export const QuestionContext = createContext([]);

const QuestionContextProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);

  const setQuestionList = (aList) => {
    setQuestions(aList);
  };

  const fetchQuestions = useCallback(async () => {
    // const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    // const responseData = await response.json();

    setQuestionList(vocab);
  }, []);

  return (
    <QuestionContext.Provider
      value={{ setQuestionList, questions, fetchQuestions }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionContextProvider;
