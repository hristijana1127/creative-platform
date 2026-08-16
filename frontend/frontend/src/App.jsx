import {ToastProvider} from './components/ui/Toast';
import { Suspense } from 'react';
import "./App.css";
import {RouterProvider} from 'react-router-dom';
import {router} from './routes/router';
import {AuthProvider} from './context/AuthProvider';
import SuspenseLoader from './components/ui/SuspenseLoader';

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Suspense fallback={<SuspenseLoader/>}>
          <RouterProvider router={router}/>
        </Suspense>
      </AuthProvider>
    </ToastProvider>
  )
}

export default App;
