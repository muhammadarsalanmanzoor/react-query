import { useQuery } from 'react-query';
import axios from 'axios';

/**
 *
 * Parallel Queries:
 * - When using a library it is pretty common to overthink
 *   how to make something work, parallel queries are queries
 *   that executed in parallel so as to maximize fetching
 *   concurrency with react query executing parallel queries
 *   is as simple as invoking as useQuery multiple times,
 *   now we might have a question when we destructure a values
 *   returned how do we make use of the values since there would
 *   be a conflict for example if we have data from super hero
 *   api we would destructure data and we have to do the same
 *   for friend as well the way to resolve this is by using aliases
 *   for every value be it data or isLoading or isError use an
 *   appropriate alias
 */

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes');
};

const fetchFriends = () => {
  return axios.get('http://localhost:4000/friends');
};

const ParallelQueries = () => {
  const { data: superHeroes } = useQuery('super-heroes', fetchSuperHeroes);
  const { data: friends } = useQuery('friends', fetchFriends);

  return <div>ParallelQueries</div>;
};

export default ParallelQueries;
