import React from "react";
import Poll from "./Poll";
import oosdQuestions from "./questionsOOSD.json";

const OOSDPage = () => {
  return (
    <div className="poll-page">
      <h1>OOSD - Week 8</h1>
      <Poll questions={oosdQuestions} />
    </div>
  );
};

export default OOSDPage;
