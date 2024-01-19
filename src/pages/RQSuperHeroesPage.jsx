import useSuperHeroes from '../hooks/useSuperHeroes';

const RQSuperHeroesPage = () => {
  const onSuccess = (data) => {
    console.log('Perform side effect after data fetching...', data);
  };

  const onError = (error) => {
    console.log('Perform side effect after data encountering error...', error);
  };

  const { isLoading, data, isError, error, isFetching } = useSuperHeroes(
    onSuccess,
    onError
  );

  console.log({ isLoading, isFetching });

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQSuperHeroesPage</h2>

      {data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })}
    </>
  );
};

export default RQSuperHeroesPage;
