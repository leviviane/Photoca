import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import LandingPage from "./components/LandingPage";
import SinglePhotocardPage from "./components/SinglePhotocardPage";
import CreatePhotocardForm from "./components/CreatePhotocard";
import UpdatePhotocardForm from "./components/UpdatePhotocard";
import ManagePhotocard from "./components/ManagePhotocard";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route exact path="/photocards">
            <LandingPage />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/photocards/:photocardId/update">
            <UpdatePhotocardForm />
          </Route>
          <Route path="/photocards/create">
            <CreatePhotocardForm />
          </Route>
          <Route path='/photocards/current'>
            <ManagePhotocard />
          </Route>
          <Route path="/photocards/:id">
            <SinglePhotocardPage />
          </Route>
          <Route>Page Not Found</Route>
        </Switch>
      )}
    </>
  );
}

export default App;
