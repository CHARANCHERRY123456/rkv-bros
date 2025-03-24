




const QuestionCard = ({ question, assignmentId, questionIndex, onSubmit }) => {
    const totalVotes = question.responses.reduce((sum, r) => sum + r.count, 0);
  
    return (
      <div className="p-4 border rounded-md mb-4">
        <h2 className="font-semibold">{question.questionText}</h2>
        {question.options.map((option, i) => {
          const voteCount = question.responses.find(r => r.optionIndex === i)?.count || 0;
          const percentage = totalVotes ? ((voteCount / totalVotes) * 100).toFixed(1) : 0;
          return (
            <button
              key={i}
              onClick={() => onSubmit({ assignmentId, questionIndex, selectedOption: i })}
              className="block w-full text-left p-2 bg-gray-100 rounded-md my-1"
            >
              {option} - {percentage}%
            </button>
          );
        })}
      </div>
    );
  };
  
  export default QuestionCard;
  




