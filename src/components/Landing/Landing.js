import { useState } from "react";
import { useTranslation } from "react-i18next";

import "./Landing.scss";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import ChangePW from "./ChangePW";

function Landing(props) {
     const { t, i18n } = useTranslation();
     const [isLogin, setIsLogin] = useState(true);
     const [isForgotPW, setIsForgotPW] = useState(false);
     const [isLoading] = useState(false);

     return (
          <main id="Landing">
               <section className="left-div">
                    <h1>{t("attendance app")}</h1>
               </section>
               <section className="right-div">
                    <div className="tab-div">
                         <h1 className={!isLogin ? "selected-tab" : undefined} onClick={() => setIsLogin(false)}>
                              {t("create an account")}
                         </h1>
                         <h1 className={isLogin ? "selected-tab" : undefined} onClick={() => setIsLogin(true)}>
                              {isForgotPW ? t("change password") : t("login")}
                         </h1>
                    </div>
                    <div className="form-div">
                         {isLogin ? (
                              isForgotPW ? (
                                   <ChangePW t={t} setIsForgotPW={setIsForgotPW} />
                              ) : (
                                   <LogIn t={t} setIsForgotPW={setIsForgotPW} props={props} />
                              )
                         ) : (
                              <SignUp t={t} setIsLogin={setIsLogin} />
                         )}
                    </div>
               </section>
               {isLoading && (
                    <div className="loader-wrapper">
                         <div className="loader"></div>
                    </div>
               )}
          </main>
     );
}

export default Landing;
