import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import HomePage from './pages/HomePage';
import RQSuperHeroesPage from './pages/RQSuperHeroesPage';
import RQSuperhero from './pages/RQSuperhero';
import SuperHeroesPage from './pages/SuperHeroesPage';
import Layout from './pages/Layout';
import './App.css';
import ParallelQueries from './pages/ParallelQueries';
import DynamicParallelQueries from './pages/DynamicParallelQueries';
import DependentQueries from './pages/DependentQueries';
import PaginatedQueries from './pages/PaginatedQueries';
import InfinitePaginatedQueries from './pages/InfinitePaginatedQueries';

/**
 * Let's see how to work with axios interceptors in this branch,
 * let me point out that react query has nothing to do with axios
 * interceptor, however when using axios for network requests it
 * is pretty common to have a base url the bearer token in header
 * custom error handling etc..., so i want to show you how to go
 * about it as i'm pretty sure you might have to do something
 * similar when building a react app with react query, the first
 * thing is to create a utils folder within this folder create a
 * new file called axios-utils.js
 *
 */

const queryClient = new QueryClient();

function App() {
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: '/rq-super-heroes',
          element: <RQSuperHeroesPage />,
        },
        {
          path: '/rq-super-heroes/:heroId',
          element: <RQSuperhero />,
        },
        {
          path: '/rq-parallel',
          element: <ParallelQueries />,
        },
        {
          path: '/rq-dynamic-parallel',
          element: <DynamicParallelQueries heroIds={[1, 3]} />,
        },
        {
          path: '/rq-dependent',
          element: <DependentQueries email='ahmed@gmail.com' />,
        },
        {
          path: '/rq-paginated',
          element: <PaginatedQueries />,
        },
        {
          path: '/rq-infinite',
          element: <InfinitePaginatedQueries />,
        },
        {
          path: '/super-heroes',
          element: <SuperHeroesPage />,
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={appRouter} />
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  );
}

export default App;
