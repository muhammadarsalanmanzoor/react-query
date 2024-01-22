import { useState } from 'react';
import { useSuperHeroes, useAddSuperHeroData } from '../hooks/useSuperHeroes';
import { Link } from 'react-router-dom';

/**
 * React Query provides two ways to optimistically update your UI
 * before a mutation has completed. You can either use the onMutate
 * option to update your cache directly, or leverage the returned
 * variables to update your UI from the useMutation result.
 *
 *
 * In the context of forms, this technique helps to make apps feel
 * more responsive. When a user submits a form, instead of waiting
 * for the server's response to reflect the changes, the interface
 * is immediately updated with the expected outcome.
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
