import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Punch from "./components/FrontDesk/Punch";
import Landing from "./components/Landing/Landing";
import AllEmployees from "./components/DashBoard/AllEmployees/AllEmployees";
import EmployeeProfile from "./components/DashBoard/EmployeeProfile";
import CreateEmployee from "./components/DashBoard/CreateEmployee";
import User from "./components/DashBoard/User";
import EmployeeRecords from "./components/DashBoard/EmployeeRecords/EmployeeRecords";
import NotFound from "./components/Common/NotFound";
import { Redirect } from "react-router-dom";


function App(props) {

     const ProtectedRoute = ({ exact, path, component: Component, ...rest }) => {
          const [ user, setUser ] = useState(sessionStorage.getItem("accessToken"))

          return (
               <Route
                    // exact
                    // path={path}
                    {...rest}
                    render={(routeProps) => 
                         !user ? <Redirect to={{pathname: "/"}} />:
                         <>
                              {( path !=="/home" && path!=="/punch" ) && <Navbar {...routeProps} />}
                              <Component {...routeProps} />
                         </> } />
          );
     };

     return (
          <div className="App">
               <Router>
                    <Switch>
                         <Route exact path="/" component={Landing} />
                         <ProtectedRoute exact path="/home" component={Home} />
                         <ProtectedRoute exact path="/user" component={User} />
                         <ProtectedRoute exact path="/employees" component={(props) => <AllEmployees {...props} />} />
                         <ProtectedRoute exact path="/employee/create" component={(props) => <CreateEmployee {...props} />} />
                         <ProtectedRoute exact path="/employee/profile/:id" component={EmployeeProfile} />
                         <ProtectedRoute exact path="/employee/records/:id" component={EmployeeRecords} />
                         <ProtectedRoute exact path="/punch" component={Punch} />
                         <Route path="" component={NotFound} />
                    </Switch>
                    
               </Router>
          </div>
     );
}

export default App;