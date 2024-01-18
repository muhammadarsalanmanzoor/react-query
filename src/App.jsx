import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import HomePage from './pages/HomePage';
import RQSuperHeroesPage from './pages/RQSuperHeroesPage';
import SuperHeroesPage from './pages/SuperHeroesPage';
import Layout from './pages/Layout';
import './App.css';

/**
 * What is ReactQuery?
 * A library for fetching data in react application.
 *
 * Why would you need a library for data fetching?
 * - Since React is UI library there is no specific
 * pattern for data fetching, what we typically do
 *
 * - Make use of useEffect hook for data fetching and
 * useState hook maintain component state like loading,
 * error and resulting data.
 *
 * - If the data is needed throughout the app, we tend
 * to use state management libraries. But what is important
 * to note here is that most of the state management
 * libraries are good for working with client state,
 * state like theme for the application or whether a
 * modal is open they are not great for working with
 * asynchronous or server state and this is because
 * server state is very different to client state, client
 * state is persisted in your app memory and accessing or
 * updating it is synchronous, server state on the other
 * hand is persisted remotely in a database perhaps
 * and requires asynchronous apis for fetching or updating
 *
 * - Challenging when you have to deal with caching, deduping
 * multiple requests for the same data, updating stale data in
 * the background, performance optimizations etc.
 * - If you have to cater to all these in an application it
 * requires significant time and effort to do it all by
 * your self or you can take a smarter approach or use a library
 * which makes handling all these scenarios a walk in the park.
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
