import axios from 'axios';
import { useQuery } from 'react-query';

/**
 *  Query Cache:
 *  - In the previous lectures we learned about the query
 *    cache feature in react query, one of the uses of
 *    caching the query results is being able to re-use the
 *    results for subsequent queries that will allow the user
 *    to view the previously fetched data without having to
 *    view the loading indicator every single time this leading
 *    to a slightly better user experience.
 *
 *  - Another use of Query cache is to reduce the number
 *    of network requests for data that doesn't necessarily
 *    change too often, for example let's say our list of
 *    super heroes does not change often and it is okay if
 *    the user sees stale data for a while in such cases
 *    we can use the cached query results without having to
 *    refetch in the background to achieve that behavior we
 *    configure another property called staleTime.
 *
 *  - for example as a developer i know that the list of
 *    superheroes does not change often even if it does
 *    it is okay if the user is seeing steel data for
 *    perhaps 30 seconds what we can do then is add another
 *    property called staleTime and set it to 30 seconds for
 *    our useQuery hook, by default staleTime is 0 second
 *    which is why previously every visit to the react query
 *    super heroes page would trigger a background re-fetch.
 *
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
