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

const addSuperHero = (heroDetails) => {
  return axios.post('http://localhost:4000/superheroes', heroDetails);
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();

  return useMutation(addSuperHero, {
    onSuccess: () => {
      // this line is same as we specify the line 5
      // the invalidateQueries will refetch the super
      // heroes query and that is it pretty simple
      queryClient.invalidateQueries('super-heroes');
    },
  });
};
