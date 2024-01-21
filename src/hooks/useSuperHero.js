import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';

/**
 *
 * In this lecture we can showcase another feature in react
 * query which improves the data viewing experience for a
 * user thereby is something you should consider for your
 * application and that is providing initial query data.
 *
 * - Now When we move on RQ Super heros page we see the loading
 *   text and this list of heroes now when i clicked on particular
 *   hero we see the loading text again and then the hero details
 *   but here is a question we can ask ourself we have already
 *   fetched the hero data in the list component itself can we
 *   not use that data here in the details page and the answer
 *   is yes we can do that but we have to keep in mind that the
 *   listing page may not contain all the data we display in the
 *   details page so another api to fetch all details cannot be
 *   ruled out what we can do however is use the listing data as
 *   the initial data to the details query what that allows is for
 *   react query to not set a loading state to the details query
 *   only a background reFetch is initiated and once the details
 *   are retrieved they will overwrite any initial data we might
 *   have set, this is especially helpful when you have fetched
 *   above the fold data in the previous query, lets see how to do
 *   this. All our work is going to be just react query we don't
 *   have to touch any of the component code since we are dealing
 *   with hero details our work is in the useSuperHero.js file
 *
 * - STEP #1:
 *   We need to access to the query client that we set at the top
 *   level using the provider component inside App.js file and
 *   for that react query provides another hook called useQueryClient
 *
 * - STEP #2:
 *   For STEP #2 we need to specify the third argument to useQuery which
 *   is an object again the property is called initialData and this is
 *   a function, with in the function we first need to get the hero from
 *   the hero list corresponding to the heroId parameter
 */

const useSuperHero = (heroId) => {
  const queryClient = useQueryClient();

  return useQuery(
    ['super-hero', heroId],
    ({ queryKey }) => {
      const id = queryKey[1];
      return axios.get(`http://localhost:4000/superheroes/${id}`);
    },
    {
      initialData: () => {
        const hero = queryClient
          .getQueryData('super-heroes')
          ?.data?.find((hero) => hero.id === heroId);

        if (hero) {
          return {
            data: hero,
          };
        } else {
          return undefined;
        }
      },
    }
  );
};

export default useSuperHero;
