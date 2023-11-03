import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import SinglePhotocardPage from "./components/SinglePhotocardPage";
import CreatePhotocard from "./components/CreatePhotocard";
import CreatePhotocardForm from "./components/CreatePhotocard";

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
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/photocard/create" component={CreatePhotocardForm} />
          <Route path="/photocard/:photocardId" component={SinglePhotocardPage} />
          <Route path="/" component={LandingPage} />
        </Switch>
      )}
    </>
  );
}

export default App;
