import axios from 'axios';
import { useQuery } from 'react-query';

/**
 *  useQuery using onClick:
 *
 *  - In the previous lectures we've had a look at the useQuery hook
 *    for data fetching, we might have notices that the get request
 *    is fired as soon as the component mounts or if we focus the
 *    window, however depending on the requirement we might have to
 *    fetch the data based on a user event and not when the component
 *    mounts, now in this lecture let's learn how to fetch data using
 *    useQuery but only onClick of a button.
 *
 * - There are two steps we need to implement:
 *    - STEP #1:
 *      Inform useQuery not to fire the get request when the component
 *      mounts, we do that by passing in a configuration called `enabled`
 *      and setting it to `false`, so if you now go back to the browser
 *      and navigate to RQ Super Heroes page we don't see the list of
 *      heroes react query does track the query in dev tools but it's data
 *      is empty, so STEP #1 disable fetching on mount using the enabled
 *      flag.
 *
 *    - STEP #2:
 *      We fetch the onClick of a button, let's begin by adding a button
 *      on the screen and onClick of a button we need to fetch the heroes
 *      now the question is how do we do that well it is easier you think
 *      it you might be, useQuery returns a function called `reFetch` to
 *      manually trigger the query all we have to do is pass it in as the
 *      onClick handler, now click on button and we now see the heroes list
 *      of course the query cache and stale time plays the same role on
 *      first request is loading is true on subsequent requests only isFetching
 *      is true because the background reFetching that takes place, if you
 *      have a refresh data button you might want to consider using the isFetching
 *      flag as well as to display the loading indicator so if isLoading or isFetching
 *      is true we need to display the loading spinner, now anytime we click on a
 *      button we see the loading text.
 *
 *
 */
const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    'super-heroes',
    () => {
      return axios.get('http://localhost:4000/superheroes');
    },
    {
      enabled: false,
      refetchOnWindowFocus: true,
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
      <button onClick={refetch}>Fetch SuperHeroes</button>
      {data?.data.map((hero) => {
        return <div key={hero.id}>{hero.name}</div>;
      })}
    </>
  );
};

export default RQSuperHeroesPage;
