import axios from 'axios';
import { useQuery } from 'react-query';

/**
 *
 * useQuery
 *  - useQuery is the hook we are going to be
 *    using for all our data fetching needs.
 *  - This hook requires at least two arguments
 *      - the first argument is unique key to identify
 *        this query, similar to how you would have a
 *        unique id for every row in a database, queries
 *        also have a unique key in react query
 *      - the second argument useQuery accepts a function
 *        that returns a promise
 */
const RQSuperHeroesPage = () => {
  const { isLoading, data } = useQuery('super-heroes', () => {
    return axios.get('http://localhost:4000/superheroes');
  });

  console.log('Data=>', data);

  if (isLoading) {
    return <h2>Loading...</h2>;
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
