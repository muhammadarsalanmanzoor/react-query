import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';

/**
 *  callBacks with useQuery:
 *  - callBacks with useQuery when we are dealing with data fetching 
 *    sometime we might want to perform a side effect when the query 
 *    completes an example could be opening a modal or navigating to
 *    a different route or even displaying toast notifications to cater
 *    to these scenarios react query let's us specify success and error
 *    callbacks as configurations or options to the useQuery hook,
 *    let's see how to add them in our component;
 *  
 *  - First we need to define two functions which will be called when
 *    query succeeds or when it fails.
 * 
 *  - The first one let's call it onSuccess, this function will be called
 *    when the query successfully fetches data, similarly let's define 
 *    onError function which gets called when the query encounters an error
 *    while trying to fetch the data, to attach these functions to our 
 *    super-heroes query all we have to do is to specify onsuccess and onerror
 *    configurations, so the third argument in useQuery which is an object 
 *    we specify onsuccess and onerror callback, now lets' save the file
 *    and let's see if this works. Navigate to RQ Super heroes page and we
 *    see the success callback log message and go back to vs code and change 
 *    the url to superheroes11111 head back to the browser navigate to RQ
 *    Super heroes the query retries three times before calling the onError
 *    callback. What is also worth noting is react query automatically 
 *    injects the data that has been fetched or the error that was encountered
 *    into these callback params so we can specify data as params into onsuccess
 *    and similarly error param to onerror callback 
 *
 
 *
 *
 */
const RQSuperHeroesPage = () => {
  const [isRefetchInterval, setIsRefetchInterval] = useState(3000);
  const onSuccess = (data) => {
    console.log('Perform side effect after data fetching...', data);

    if (data?.data.length >= 4) {
      setIsRefetchInterval(false);
    }
  };

  const onError = (error) => {
    console.log('Perform side effect after data encountering error...', error);

    setIsRefetchInterval(false);
  };

  const { isLoading, data, isError, error, isFetching } = useQuery(
    'super-heroes',
    () => {
      return axios.get('http://localhost:4000/superheroes');
    },
    {
      refetchInterval: isRefetchInterval,

      onSuccess: onSuccess,
      onError: onError,
    }
  );

  console.log({ isLoading, isFetching });

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQSuperHeroesPage</h2>
      {data?.data.map((hero) => {
        return <div key={hero.id}>{hero.name}</div>;
      })}
    </>
  );
};

export default RQSuperHeroesPage;
