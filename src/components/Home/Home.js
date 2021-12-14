import { useContext } from "react";
import { NavLink } from "react-router-dom";

import logo from "../../images/logo.png";
import dashboard from "../../images/dashboard.png";
import clockIn from "../../images/clockIn.png";
import "./Home.scss";
import { DataContext } from "../../contexts/DataContext";
import { FunctionContext } from "../../contexts/FunctionContext";

function Home(props) {
     const { thisUser } = useContext(DataContext);
     const { logout } = useContext(FunctionContext);
     
     return (
          <main id="Home">
               <section className="top">
                    <div className="right-div">
                         <img src={logo} alt="logo" />
                         <h1>Hello {thisUser.name}</h1>
                    </div>
                    <h1 className="logout-btn" onClick={() => logout(props)}>
                         logout
                    </h1>
               </section>
               <section className="main">
                    <div className="dashboard" style={{backgroundImage: `url(${dashboard})`}}>
                         {/* <img src={dashboard} alt="dashboard" /> */}
                         <NavLink exact to="/employees" activeClassName="nav-active">
                              go to dashboard
                         </NavLink>
                    </div>
                    <div className="clockIn" style={{backgroundImage: `url(${dashboard})`}}>
                         {/* <img src={clockIn} alt="clorckIn" /> */}
                         <NavLink exact to="/punch" activeClassName="nav-active">
                              go to clockIn desk
                         </NavLink>
                    </div>
               </section>
               <section className="bottom">
                    <p>Copyright © 2010-2021 tolisacoding All rights reserved.</p>
               </section>
          </main>
     );
}

export default Home;