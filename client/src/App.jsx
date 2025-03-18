import React from 'react';
import { AuthProvider } from './components/contexts/AuthContext.jsx';
import AppRouter from './components/appSetup/appRouters.jsx';

const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

export default App;
