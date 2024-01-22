import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

export const useSuperHeroes = (onSuccess, onError) => {
  return useQuery(
    'super-heroes',
    () => {
      return axios.get('http://localhost:4000/superheroes');
    },
    {
      onSuccess: onSuccess,
      onError: onError,

      // select: (data) => {
      //   const superHeroNames = data.data.map((hero) => hero.name);

      //   return superHeroNames;
      // },
    }
  );
};

/**
 *
 * STEP #1:
 * Remove onSuccess callback as it is not needed for optimistic updates.
 * Instead we need three other callbacks onMutate, onError and onSettled,
 * let's define these functions on step at a time.
 *
 * STEP #2:
 * let's define the onMutate callback, onMutate is called before the mutation
 * function is fired and is passed the same variables the mutation function
 * would receive in our case it is the new hero we want to add, with in the
 * function the first thing is we want to cancel any outgoing refetches so
 * they don't override our optimistic update, next we need to hold the current
 * query data before we make any update this will help us rollback in case the
 * mutation fails and to get hold the current query data we use the getQueryData
 * method on the query client instance
 *
 *
 *
 */

const addSuperHero = (heroDetails) => {
  return axios.post('http://localhost:4000/superheroes', heroDetails);
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();

  return useMutation(addSuperHero, {
    onMutate: async (newHero) => {
      await queryClient.cancelQueries('super-heroes');

      const previousHeroData = queryClient.getQueryData('super-heroes');

      // we have updating our list of heroes even before making the
      // post request
      queryClient.setQueryData('super-heroes', (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData,
            { id: oldQueryData?.data.length + 1, ...newHero },
          ],
        };
      });

      // this will be used to roll back data in case the mutation
      // errors out, which now brings us to the STEP#3 defining
      // the onError callback this function is called if the mutation
      // encounters an error, the function receives three args, first
      // one is error that encountered we don't need this, second is
      // variables passed into the mutation which is name and alterEgo
      // we don't need this either, the third arg is context which
      // is additional information pertaining the mutation it is on
      // this object we can access previousHeroData that we have
      // return from the onMutate callback and set it as the query data
      // when there is an error
      return { previousHeroData };
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData('super-heroes', context.previousHeroData);
    },

    // STEP #4: Defining the onSettled callback, this function is called
    // if the mutation is either successful or when it encounters and error
    // in this function we have to do is refetch the super heroes

    onSettled: () => {
      queryClient.invalidateQueries('super-heroes');
    },
  });
};
