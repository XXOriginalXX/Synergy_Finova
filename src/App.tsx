import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Chatbot from './components/Chatbot';
import TutorialOverlay from './components/TutorialOverlay';

const queryClient = new QueryClient();

// Clear the localStorage entry on application start to ensure tutorial always shows
// Remove this line once you've confirmed the tutorial works correctly
localStorage.removeItem('hasSeenTutorial');

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-black">
          <TutorialOverlay />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Chatbot />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
