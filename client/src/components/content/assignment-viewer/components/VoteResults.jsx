const VoteResults = ({ option, totalVotes }) => {
    const percentage = totalVotes > 0 
      ? Math.round((option.voteCount / totalVotes) * 100) 
      : 0;
  
    return (
      <div className="mt-2">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 rounded-full" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="text-right text-xs text-gray-500 mt-1">
          {percentage}%
        </div>
      </div>
    );
  };
  
  export default VoteResults;