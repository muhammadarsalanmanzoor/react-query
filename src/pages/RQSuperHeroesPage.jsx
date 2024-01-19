import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';

/**
 *  Data Transformation:
 *  - We have scenario of needing to transform data into a
 *    format that the front end component can consume, to
 *    help with such scenarios react query provides a select
 *    configuration option which we can specify on the useQuery
 *    hook. Let's see how it works.
 *
 */
const RQSuperHeroesPage = () => {
  const onSuccess = (data) => {
    console.log('Perform side effect after data fetching...', data);
  };

  const onError = (error) => {
    console.log('Perform side effect after data encountering error...', error);
  };

  const { isLoading, data, isError, error, isFetching } = useQuery(
    'super-heroes',
    () => {
      return axios.get('http://localhost:4000/superheroes');
    },
    {
      onSuccess: onSuccess,
      onError: onError,
      // for data transformation we specify an option or a configuration
      // called select, a select is a function which automatically receives
      // the api data as an argument, data in our case is basically the response
      // let's map over data array extracting just the hero name
      select: (data) => {
        const superHeroNames = data.data.map((hero) => hero.name);

        // what this does is change the destructured data to an array of super
        // hero names which means we need to update our JSX.
        return superHeroNames;
      },
    }
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
      {/* {data?.data.map((hero) => {
        return <div key={hero.id}>{hero.name}</div>;
      })} */}

      {data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })}
    </>
  );
};

export default RQSuperHeroesPage;
