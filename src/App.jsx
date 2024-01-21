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
