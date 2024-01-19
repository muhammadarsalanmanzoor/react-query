import axios from 'axios';
import { useQuery } from 'react-query';

/**
 *  Polling:
 *  - Polling basically refers to the process of fetching
 *    data at regular intervals, for example if you have a
 *    component that shows the real-time price of different
 *    stocks you might want to fetch data every second to
 *    update the UI this ensures the UI will always be in sync
 *    with the remote data irrespective of configurations
 *    like refetchOnMount or reFetchOnWindowFocus which is
 *    dependent on user-interaction, now to poll data with
 *    react query we can make use of another configuration
 *    called reFetchInterval by default it is set to false
 *    however you an set it to a number in milliseconds which
 *    will result in a continuous reFetch of the query at
 *    that interval for example if i set it to 2000 the query
 *    will automatically reFetch every two seconds, now
 *    navigate to browser and you can see that the query
 *    toggles between fetching and stale every two seconds.
 *
 *  - Now one point to highlight here is that the polling or
 *    automatic reFetching is paused if the window loses focus
 *    if you do want background reFetching at regular intervals
 *    you can specify another configuration called refetchIntervalInBackground
 *    and set it to true so this will continue to poll data
 *    even when the browser is not focused. so using refetchInterval and
 *    refetchIntervalInBackground you can poll data and provide
 *    a really good experience in apps where data changes every now
 *    and then
 *
 */
const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error, isFetching } = useQuery(
    'super-heroes',
    () => {
      return axios.get('http://localhost:4000/superheroes');
    },
    {
      refetchInterval: 2000,
      refetchIntervalInBackground: true,
    }
  );

  console.log({ isLoading, isFetching });

  if (isLoading) {
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
