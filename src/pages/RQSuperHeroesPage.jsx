import { useState } from 'react';
import { useSuperHeroes, useAddSuperHeroData } from '../hooks/useSuperHeroes';
import { Link } from 'react-router-dom';

/**
 * Now everything is working fine but there is room for
 * improvement at the moment after we add a hero we have
 * to manually refetch the super hero list by clicking the
 * fetch hero button this is because as soon as we add a
 * new hero the super-hero query data is out of date wouldn't
 * it be nice if we could tell react query to automatically
 * refetch the super-heros query as soon as the mutation
 * succeeds, react query makes it really simple to achieve
 * that, the feature is called query invalidation, let's
 * see how to implement it.
 *
 * - STEP #1:
 * import useQueryClient client from react query then within
 * the custom mutation hook get hold of the instance, then
 * we need to get hold of the success callback on the useMutation
 * hook for that we specify the second argument object and set
 * onsuccess property
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
