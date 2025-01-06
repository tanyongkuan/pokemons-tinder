import { lazy, Suspense } from 'react';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';

const Home = lazy(() => import('./components/Main'));

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Layout>
        <Home />
      </Layout>
    </Suspense>
  );
}

export default App;
