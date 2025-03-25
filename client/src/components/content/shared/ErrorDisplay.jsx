const ErrorDisplay = ({ message, onRetry }) => (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 max-w-4xl mx-auto">
      <div className="flex items-center">
        <svg className="h-5 w-5 text-red-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
        <h3 className="text-lg font-medium text-red-800">Error loading assignment</h3>
      </div>
      <div className="ml-8 mt-2">
        <p className="text-red-700">{message}</p>
        <button
          onClick={onRetry}
          className="mt-3 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  );
  
  export default ErrorDisplay;