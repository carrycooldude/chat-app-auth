// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import LoginForm from './LoginForm';
import BusinessLoginForm from './BusinessLoginForm';
import Chat from './Chat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<LoginForm />} />
        </Route>
        <Route path="/business" element={<Outlet />}>
          <Route index element={<BusinessLoginForm />} />
        </Route>
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
