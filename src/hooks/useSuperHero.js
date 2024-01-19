import axios from 'axios';
import { useQuery } from 'react-query';

const useSuperHero = (heroId) => {
  return useQuery(['super-hero', heroId], ({ queryKey }) => {
    const id = queryKey[1];
    return axios.get(`http://localhost:4000/superheroes/${id}`);
  });
};

export default useSuperHero;
