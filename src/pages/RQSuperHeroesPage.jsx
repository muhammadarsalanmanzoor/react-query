import axios from 'axios';
import { useQuery } from 'react-query';

/**
 * Remember how useQuery returns a loading flag
 * and a API data well it turns out that useQuery
 * also returns an isError flag as well as the
 * error thrown from the request, we can destructure
 * both of them isError and error
 */
const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error } = useQuery('super-heroes', () => {
    return axios.get('http://localhost:4000/superheroes1');
  });

  console.log('Data=>', data);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  // the only difference in standard super heroes page
  // and this is we se error.message
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
