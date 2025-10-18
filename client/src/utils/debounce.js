export const debounce = (func, delay = 300) => {
  let timeoutId;
  
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export default debounce;
