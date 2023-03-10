import { useState } from 'react';

function useFetch() {
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const makeFetch = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (error) {
      setErrors(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    errors, isLoading, makeFetch,
  };
}

export default useFetch;
