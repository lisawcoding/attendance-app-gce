import { useRef, useContext, useState } from "react";
import { URLContext } from "../../contexts/URLContext";
import congratulations from "../../images/congratulations.jpg";

function SignUp(props) {
     const formRef = useRef();
     const { registerURL, findUserURL, createUsersURL } = useContext(URLContext);
     const [isSentMail, setIsSentMail] = useState(false);
     const [alert, setAlert] = useState([]);
     const [token, setToken] = useState("");
     const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
     const btnRef = useRef();
     const [inputValue, setInputValue] = useState({
          name: "",
          email: "",
          companyName: "",
          password: "",
          password2: "",
     });
     const mailSuccessMsg = [
          "verify token has been sent to your email, please check youre email and verify", 
          "please enter token to verify your account",
          "the token will be expired within 10mins"
     ]

     const sentTokenMail = () => {
          fetch(`${registerURL}/mail`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify(inputValue)
          })
          .then( res => res.json())
          .then( data => {
               console.log(data)
               // if(data.error) return window.location.reload()
          })
          .catch( err => console.error(err))          
     }

     const findExistUser = () => {
          fetch( findUserURL, {
               method: "POST", 
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify({ email: inputValue.email }),
          })
          .then( res => res.json())
          .then( data => {
               //if email already exist
               if (data) return setAlert([props.t(`the email is taken. Try another.`)]);
               
               //send token email
               setIsSentMail(true);
               sentTokenMail()
               setAlert([])
          })
          .catch( err => console.error(err))          
     }

     const clickNextBtn = (e) => {
          e.preventDefault();
          if (e.target.password.value !== e.target.password2.value) return setAlert([props.t("Those passwords didn’t match")]);
          findExistUser();
     };

     const createAccount = (e) => {
          e.preventDefault();

          fetch( createUsersURL , {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${e.target.token.value}`,
               },
               body: JSON.stringify(inputValue),
          })
               .then((res) => res.json())
               .then((data) => {
                    console.log(data);
                    if (data.error) {
                         if (data.error.message && data.error.message.toLowerCase().indexOf("expire") !== -1) {
                              return setAlert("token expired");
                         } else {
                              return setAlert("invalid token");
                         }
                    }
                    setIsSignUpSuccess(true);
               })
               .catch((err) => console.error(err));
     };

     const changeInput = (e) => {
          // setInputValue({ ...inputValue, [e.target.name]: e.target.value });
          setInputValue([e.target.name].e.target.value );
          setAlert([]);
          if (e.target.name === "token") return setToken(e.target.value);
          btnRef.current.disabled = false;
     };

     return (
          <>
               {!isSentMail ? (
                    <form onSubmit={clickNextBtn} ref={formRef}>
                         {/* <input type="password" pattern="[a-zA-Z0-9]{8,}"> */}
                         <input type="text" name="name" placeholder="name" required onChange={changeInput} value={inputValue.name} />
                         <input type="email" name="email" placeholder="email" required onChange={changeInput} value={inputValue.email} />
                         <input type="text" name="companyName" placeholder="company name" onChange={changeInput} value={inputValue.companyName} />
                         <input type="password" name="password" placeholder="password" required onChange={changeInput} value={inputValue.password} />
                         <input type="password" name="password2" placeholder="confirm password" required onChange={changeInput} value={inputValue.password2} />
                         <input type="submit" value={props.t("next")} ref={btnRef} />
                         {alert.map((alert) => (
                              <h1 className="alert-text" key={alert}>
                                   {alert}
                              </h1>
                         ))}
                    </form>
               ) : !isSignUpSuccess ? (
                    <form onSubmit={createAccount}>
                         <textarea type="text" name="token" placeholder={props.t("verify token")} required onChange={changeInput} className={alert.length > 0 ? "red-border" : ""} rows="5" />
                         {token.length < 1 &&  mailSuccessMsg.map(msg=> <h1 className="success-text">{props.t(msg)}</h1>)}
                         {alert.length > 0 && <h1 className="alert-text">{props.t(`${alert}`)}!</h1>}
                         <input type="submit" value={props.t("verify")} />
                    </form>
               ) : (
                    <div className="congratulations-div" style={{ backgroundImage: `URL(${congratulations})` }}>
                         <div>
                              <h1>Success!</h1>
                              <p>Great! your account has been created. </p>
                         </div>
                         <div className="check-circle"></div>
                         <button
                              onClick={() => {
                                   props.setIsLogin(true);
                              }}
                         >
                              {props.t("login")}
                         </button>
                    </div>
               )}
          </>
     );
}

export default SignUp;
