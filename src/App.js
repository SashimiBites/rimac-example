import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import LoginPage from "./pages/LoginPage/LoginPage";
import Layout from "./components/Layout/Layout";


function App() {
  const userInfo = useSelector(state => state.user.personalInfo);

  return (
    <Layout>
      <Suspense
        fallback={<div className="base-loading">Cargando...</div>}>
        <Switch>
          <Route path="/" exact>
            <LoginPage />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
