const LoadingSpinner = () => (
    <div className="text-center py-8">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-blue-500 border-r-transparent"></div>
      <p className="mt-2 text-gray-600">Loading assignment...</p>
    </div>
  );
  
  export default LoadingSpinner;