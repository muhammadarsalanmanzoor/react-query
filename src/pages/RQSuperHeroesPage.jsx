import useSuperHeroes from '../hooks/useSuperHeroes';
import { Link } from 'react-router-dom';

/**
 *
 * Query by Id:
 * - We learned a lot about the useQuery hook and it's configuration
 *   options when fetching data, now what is also pretty common with
 *   data fetching is querying by id for example you have a list of
 *   items and onClick of an item you want the details of that
 *   individual item, real-world use-cases include fetching details
 *   about a product on an e-commerce site fetching details about a
 *   course etc. Now let's learn how to query by id using react query.
 *
 * - Now as part of this lecture we need to setup some code before we
 *   get to the react query bit let me break it down so you get the big
 *   picture:
 *
 * - STEP #1:
 *   - Create a new page that will eventually display the details about
 *     one single super hero
 * - STEP #2:
 *   - We are going to configure the route to that page and add a link
 *     from the super heroes list page to the super hero details page
 *     that will allow us to navigate by clicking the hero name.
 * - STEP #3:
 *   - We will learn how to fetch a super hero by id and display the
 *     details in the UI.
 *
 * - In this section we will summarize what we have learned over the
 *   past lectures. let's begin
 *
 */

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
