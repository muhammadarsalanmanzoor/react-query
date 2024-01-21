import { useState } from 'react';
import { useSuperHeroes, useAddSuperHeroData } from '../hooks/useSuperHeroes';
import { Link } from 'react-router-dom';

/**
 * In the previous lectures we looked at the data fetching aspect of react
 * query now it's time to focus on the data posting aspect that is sending
 * data from your application to any backend if you've worked on web apps
 * for a while you know that posting data like a new todo item or new name
 * or submitting a form are all pretty common, react query does cater to
 * those scenarios but it goes the extra mile to make things simpler for you
 * and that is what we will focus on, in this branch we learn how to perform
 * a basic post request and in upcoming branches we will see what features
 * react query provides to make our life easier.
 *
 * To summarize:
 * import useMutation hook and call it passing in the mutation function,
 * the mutation function automatically receives any argument you pass
 * when you invoke the mutate function in your component
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
