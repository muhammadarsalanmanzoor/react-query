import axios from 'axios';
import { useQuery } from 'react-query';

/**
 *  Query Cache:
 *   - This is a feature that library provides out of the box
 *     and it is important to understanding why use query works
 *     the way it does.
 *
 *   - Let see something which might interesting. Go to the home
 *     page of app and press empty cache and hard reload and go to
 *     networks tab and observe what happens when we navigate to the
 *     traditional super hero screen and slow the network speed for
 *     this example and go to traditional super hero screen  we see
 *     the loading text and then list of heroes go back home click
 *     the traditional super heroes again we see the loading text
 *     and then the list of heroes every time we do this we always see the
 *     loading text, let's now compare this with the RQ Super heroes
 *     screen if we navigate we see the loading text and the list of
 *     heroes however if we go home and comeback we don't see the
 *     loading text and this is because of query cache that react query
 *     provides.
 *
 *   - By default every query result is cached for 5 minutes and react
 *     query relies on that cache for subsequent requests.
 *
 *   - How react query works with the respect to caching?
 *     - The first time useQuery is fired for superheroes key is `loading`
 *       is set to true and a network request is sent to fetch the data
 *       when the request is completed it is cached using the query key
 *       and the fetch super heroes function as the unique identifiers now
 *       when we navigate to the homepage and revisit the RQ super heroes
 *       page react query will check if the data for this query exists in
 *       cache since it does the cached data is immediately returned without
 *       isLoading set to true and that is the reason we don't see the
 *       loading text for subsequent requests however react query knows that
 *       the server data might have updated and the cache might not contain
 *       the latest data so a background refetch is triggered for the same
 *       query and if the fetch is successful the new data is updated in the
 *       ui. Now you might be wondering if isLoading is not changed does
 *       useQuery provide another boolean flag to indicate the background
 *       refetching of the query the answer is yes and the flag is called
 *       `isFetching` is set to true.
 *
 *    - What about the cache time and how do we configure it?
 *      - We'll like we mentioned react query sets a default value of 5 mins
 *        for the query cache and that is a good default which you can leave
 *        as it is, if you really want to change it though pass in a third
 *        argument to useQuery, the third argument is an object where you can
 *        configure multiple properties of which cache time is one of them let's
 *        set it to 5 seconds, if we now head back to the browser and empty cache
 *        hard reload, navigate to RQ Super heroes page the query is executed
 *        and cached if the query is active that is it has an active observer
 *        it will continue to remain in cache you can see the query key in rq
 *        dev tools if we now navigate to the homepage the query becomes inactive
 *        and after 5 seconds the query is garbage collected, if we now go back to
 *        RQ SuperHeroes screen we will see the loading text again and then the
 *        list, while the query is still cached though navigating back and forth/instantly
 *        you will see the cached data and a refetch in the background you don't
 *        have to see the loading state.
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
      cacheTime: 5000,
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
