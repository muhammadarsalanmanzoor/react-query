import { useQueries } from 'react-query';
import axios from 'axios';

/**
 *
 * Dynamic Parallel Queries:
 * - Imagine a scenario where the user can see a table
 *   of heroes select one or more heroes and fetch their
 *   details so the component will not know before hand
 *   how many queries to execute and the very important
 *   point to keep in mind is that if the number of queries
 *   you need to execute is changing from render to render
 *   you cannot use manuel querying as that would violate
 *   the rules of hooks in other words what we have learned
 *   in the previous lecture of simply invoking useQuery
 *   multiple times is not sufficient for dynamic parallel
 *   queries heroId being dynamic part of the query to cater
 *   to this specific scenario react query provide another
 *   hook called useQueries let's see how to make use of it.
 */

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};
const DynamicParallelQueries = ({ heroIds }) => {
  // Now this hook has a different syntax, we have hero ids
  // which is an array so as an argument ro use queries we're
  //  going to map over the id's and return an object that
  // translates to a query, what does useQueries return, well
  // it returns an array of query results
  const queryResults = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ['super-hero', id],
        queryFn: () => fetchSuperHero(id),
      };
    })
  );

  console.log('queryResults=>', queryResults);

  return <div>DynamicParallelQueries</div>;
};

export default DynamicParallelQueries;
