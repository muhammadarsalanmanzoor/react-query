import axios from 'axios';
import { useQuery } from 'react-query';

/**
 *  Query Cache:
 *   - In the past lectures we learned about query cache and
 *     stale time we got to know that react query has a default
 *     cache duration of 5 minutes and default staleTime of 0
 *     seconds, now let's learn two more configurations related
 *     to reFetching for which react query provides a default
 *     value.
 *   - The first one is refetch on mount by default it is set to
 *     true, if it is set to true the query will refetch on mount
 *     if the data is stale, if we set this to false the query
 *     will not refetch on mount and navigate to the first time
 *     the data is fetched and if we come back to the page the
 *     query data will not re-fetched another possible value you
 *     can specify is the string `always` so irrespective of
 *     whether query data is stale or not the query will always
 *     refetch the data when the component mounts.
 *   - refetchOnWindowFocus by default it is true, so any time
 *     your tab loses focus and gain focus again a background
 *     refetch is initiated when the refetch completes the ui
 *     as updated with the data retrieved and this is a perfectly
 *     valid default value which ensures your ui is upto date
 *     with the remote data when your user comes back to the
 *     application however if you wish you can set it to `false`.
 *
 *   - refetchOnMount:
 *     By default iski value `true` hoti hai, jab hum first time
 *     RQ SuperHero page visit karengy tu initial time reFetch
 *     request bhi chaly gi or agar hum iski value ko false kardy
 *     tu initial time reFetch request nahi chaly gi or jab hum tab
 *     lose kar k wapis ayengy tu reFetch request chaly gi kun k
 *     reFetchOnWindowFocus ki value true hai by default or hum
 *     chahien tu iski value bhi false kar sakty hain.
 *
 */
const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error, isFetching } = useQuery(
    'super-heroes',
    () => {
      return axios.get('http://localhost:4000/superheroes');
    },
    {
      staleTime: 30000,
      refetchOnMount: false,
      refetchOnWindowFocus: 'always',
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
