import React, { useEffect, useState } from "react";

const QuestionView = ({ onBack }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("/src/components/content/data.txt")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Error loading questions:", err));
  }, []);

  return (
    <div>
      <h2>Questions</h2>
      <button onClick={onBack}>Back to Tests</button>
      {questions.length === 0 && <p>Loading questions...</p>}
      {questions.map((q, index) => (
        <div key={index} style={{ margin: "20px 0", borderBottom: "1px solid #ccc" }}>
          <h4>Q{index + 1}: {q.text}</h4>
          <ul>
            {q.choices.map((choice, idx) => (
              <li key={idx}>{choice}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default QuestionView;
