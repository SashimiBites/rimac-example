import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import LoginPage from "./pages/LoginPage/LoginPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Layout from "./components/Layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const PlanPage = React.lazy(() => import('./pages/PlanesPage/PlanesPage'));
const GraciasPage = React.lazy(() => import('./pages/GraciasPage/GraciasPage'));

function App() {
  const userInfo = useSelector(state => state.user.personalInfo);
  const planInfo = useSelector(state => state.plan.totalSum);

  const isStepOneFinished = (userInfo !== null);
  const isStepTwoFinished = (isStepOneFinished && (planInfo !== null));

  return (
    <Layout>
      <Suspense
        fallback={<div className="base-loading">Cargando...</div>}>
        <Switch>
          <ProtectedRoute path="/planes" component={PlanPage} completed={isStepOneFinished}/>
          <ProtectedRoute path="/gracias" component={GraciasPage} completed={isStepTwoFinished}/>
          <Route path="/" exact>
            <LoginPage />
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
