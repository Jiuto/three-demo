import React, {Suspense, lazy} from "react";
import { Route, HashRouter as Router, Redirect } from "react-router-dom";
import routes from "./routes";
import SideBar from "./components/SideBar";
import './App.scss'

function App() {
  return (
    <Router>
      <Suspense fallback={<div>loading</div>}>
        <div className="content">
          <div className="left">
            <SideBar />
          </div>
          <div className="right">
            {routes.map((item) => {
              const { path, component } = item;
              return (
                    <Route
                      exact
                      key={path}
                      path={path}
                      component={lazy(component)}
                    />
              );
            })}
            </div>
          </div>
        <Redirect from="/" to={"/demo1"} />
      </Suspense>
    </Router>
  );
}

export default App;