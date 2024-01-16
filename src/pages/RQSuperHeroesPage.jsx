import axios from 'axios';
import { useQuery } from 'react-query';

/**
 * Another great thing about react query is
 * that it comes with dedicated dev tools.
 * they help you visualize all of the inner
 * workings of react query and will likely
 * save your hours of debugging, let's see
 * how to added to our application.
 *
 * STEP #1:
 *  - import the dev tools from react query package.
 *    and we do this in App.js file.
 *
 */
const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error } = useQuery('super-heroes', () => {
    return axios.get('http://localhost:4000/superheroes');
  });

  console.log('Data=>', data);

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
