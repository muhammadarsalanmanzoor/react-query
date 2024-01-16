import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import HomePage from './pages/HomePage';
import RQSuperHeroesPage from './pages/RQSuperHeroesPage';
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
          path: '/super-heroes',
          element: <SuperHeroesPage />,
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={appRouter} />
    </QueryClientProvider>
  );
}

export default App;
