import { useState } from 'react';
import { useSuperHeroes, useAddSuperHeroData } from '../hooks/useSuperHeroes';
import { Link } from 'react-router-dom';

/**
 * Now instead of refetching a query for the item that was
 * returned inside new posted hero and wasting a network
 * call for data that we already have inside the post
 * response we can take advantage of the object returned
 * by the mutation function and immediately update the
 * existing query with the new data, in similar words we
 * can use the add super hero mutation response to update
 * the super-heroes query data thereby saving an additional
 * network request let's see how to this.
 *
 *
 *
 */

const RQSuperHeroesPage = () => {
  const [name, setName] = useState('');
  const [alterEgo, setAlterEgo] = useState('');

  const onSuccess = (data) => {
    console.log('Perform side effect after data fetching...', data);
  };

  const onError = (error) => {
    console.log('Perform side effect after data encountering error...', error);
  };

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroes(onSuccess, onError);

  const { mutate: addHeroHandler } = useAddSuperHeroData();

  console.log({ isLoading, isFetching });

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  const handleAddHeroClick = () => {
    const heroDetails = { name, alterEgo };

    addHeroHandler(heroDetails);
  };

  return (
    <>
      <h2>RQSuperHeroesPage</h2>

      <div>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>

      <button onClick={refetch}>Fetch Heroes</button>

      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
    </>
  );
};

export default RQSuperHeroesPage;
