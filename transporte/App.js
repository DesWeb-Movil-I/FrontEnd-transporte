import React from 'react';
import AppNavigator from './components/AppNavigator';
import { AuthProvider } from './components/AuthContex';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}

