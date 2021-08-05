import React, {Suspense} from "react";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import routes from "./routes";
import SideBar from "./components/SideBar";
import './App.less'

function App() {
  return (
    <div className="content">
      <SideBar className="left"/>
      <div className="right">
        <Router>
          <Suspense fallback={<div>loading</div>}>
            {routes.map((item) => {
              const { path, component } = item;
              return (
                <Route
                  exact
                  key={path}
                  path={path}
                  component={component}
                />
              );
            })}
            <Redirect from="/" to={"/demo1"} />
          </Suspense>
        </Router>
      </div>
    </div>
  );
}

export default App;