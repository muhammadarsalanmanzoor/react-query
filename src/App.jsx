import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import HomePage from './pages/HomePage';
import RQSuperHeroesPage from './pages/RQSuperHeroesPage';
import RQSuperhero from './pages/RQSuperhero';
import SuperHeroesPage from './pages/SuperHeroesPage';
import Layout from './pages/Layout';
import './App.css';

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
