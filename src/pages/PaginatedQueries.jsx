import { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

/**
 *
 * STEP #1:
 * - We need to maintain a state variable for the page number
 *
 * STEP #2:
 * - We need to add next and previous button that change page
 *   number
 *
 * For improvement purpose we used keepPreviousData key
 * Currently the ui jumps in and out of the success and
 * loading states because each new page is treated like
 * a brand new query, loading and then the data to overcome
 * this react query provides an option called keepPreviousData
 * and we set this to true react query will maintain the data
 * from the last successful fetch while the new data is being
 * requested even though the query key has changed and when
 * the new data is arrived the previous data is seamlessly
 * swapped to show the new data and in this case you can
 * use the isFetching flag to show a loading indicator
 * if you wish to
 */

const fetchColors = (value) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${value}`);
};

const PaginatedQueries = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const { data, isLoading, isError, error, isFetching } = useQuery(
    ['colors', pageNumber],
    () => fetchColors(pageNumber),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div>
        {data?.data.map((color) => {
          return (
            <div key={color.id}>
              <h2>
                {color.id}. {color.label}
              </h2>
            </div>
          );
        })}
      </div>

      <div>
        <button
          onClick={() => setPageNumber((page) => page - 1)}
          disabled={pageNumber == 1}
        >
          Prev
        </button>
        <button
          onClick={() => setPageNumber((page) => page + 1)}
          disabled={pageNumber == 4}
        >
          Next
        </button>
      </div>

      {isFetching && 'Loading...'}
    </>
  );
};

export default PaginatedQueries;
