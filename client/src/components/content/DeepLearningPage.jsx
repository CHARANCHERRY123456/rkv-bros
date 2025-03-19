import React from "react";
import Poll from "./Poll";
import deepLearningQuestions from "./questionsDeepLearning.json";

const DeepLearningPage = () => {
  return (
    <div className="poll-page">
      <h1>Deep Learning - Week 8</h1>
      <Poll questions={deepLearningQuestions} />
    </div>
  );
};

export default DeepLearningPage;
