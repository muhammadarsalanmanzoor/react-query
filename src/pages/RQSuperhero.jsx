import { useParams } from 'react-router-dom';
import useSuperHero from '../hooks/useSuperHero';

const RQSuperhero = () => {
  const { heroId } = useParams();

  console.log('heroId=>', heroId);

  const { isLoading, isError, data, error } = useSuperHero(heroId);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      <h1>
        {data?.data?.name} - {data?.data.alterEgo}
      </h1>
    </div>
  );
};

export default RQSuperhero;
