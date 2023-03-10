import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Roles } from 'types/role';

import Home from '@pages/Home';
import Auth from '@pages/Login/Auth';
import Login from '@pages/Login/index';
import Test from '@pages/Test';

import PrivateRouter from './PrivateRouter';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRouter>
              <Home />
            </PrivateRouter>
          }
          index
        />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/test"
          element={
            <PrivateRouter roles={[Roles.TEST_ROLE]}>
              <Test />
            </PrivateRouter>
          }
          index
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
