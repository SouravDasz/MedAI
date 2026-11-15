import { useState } from "react";
import { Link } from "react-router-dom";
import AuthAside from "../components/AuthAside.jsx";
import "./Auth.css";
import{signin,verifyOtpLogin } from "../services/AuthApi.jsx";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
    const Navigate=useNavigate();

  const [mode, setMode] = useState("password"); // password | otp
  const [showPass, setShowPass] = useState(false);
  const [robot, setRobot] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const[otp,setOtp]=useState("");
  const [fromdata,setFormData]=useState({
    username:"",
    password:"",
    email:"",
    mode:"password"
  });
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData((prev)=>({
        ...prev,
        [name]:value,
        
    }))
    // setFormData({mode:mode})

    console.log(mode);
    
  };
   const handleSubmit = async (e) => {
  
      e.preventDefault();
  
  
      setMessage("");
  
  
      // Email verification required
  
  //     if (!emailVerified) {
  // 
  //       setMessage(
  //         "Please verify your email first."
  //       );
  
      //   return;
      // }
  
  
      try {
  
        setLoading(true);
  
  console.log("gh");
        
        console.log("fromdata",fromdata);
        
        const result = await signin(
          fromdata
        );
  console.log("hj");
  
  
        console.log(
          "Signin successful:",
          result
        );
  
        if(fromdata.mode=="password"){
          setMessage(
          "Login successfully!"
        );
        Navigate("/");

        }
        else{
          setOtpSent(true);
          setMessage("Otp sent Successfully.");
        }
  
      }
  
      catch (error) {
  
        console.error(
          "Signin error:",
          error
        );
  
        alert(error.message)
        setMessage(
          error.message ||
          "Signin failed."
        );
      }
  
      finally {
  
        setLoading(false);
      }
    };
   const handleVerifyOtp = async () => {
   
       if (!otp) {
   
         setMessage(
           "Please enter the OTP."
         );
   
         return;
       }
   
   
       if (otp.length !== 6) {
   
         setMessage(
           "OTP must contain 6 digits."
         );
   
         return;
       }
   
   
       try {
   
         setLoading(true);
   
         setMessage("");
         console.log("checking");
         
         // let data="signup";
         const result = await verifyOtpLogin(
           fromdata.email,
           otp
         );
         console.log("again");
         
   
         console.log(
           "Verify OTP response:",
           result
         );
    
   
         // Email verified
   
        //  setEmailVerified(true);
   
         setOtpSent(false);
   
         setOtp("");
   
   
         setMessage(
           "Login successfully"
         );
         Navigate("/");
       }
   
       catch (error) {
   
         console.error(
           "Verify OTP error:",
           error
         );
   
   
         setMessage(
           error.message ||
           "Invalid OTP."
         );
       }
   
       finally {
   
         setLoading(false);
       }
     };
   
  return (
    <div className="auth">
      <AuthAside />

      <main className="auth-main">
        <div className="auth-card">
        {message && (
        <div style={{ marginTop: '20px', color: 'green', fontWeight: 'bold' }}>
          {message}
        </div>
      )}

          <h2>Welcome back</h2>
          <p className="auth-sub">Sign in to continue to your MedAI health dashboard.</p>

          <div className="auth-tabs">
            <button
              className={`auth-tab ${mode === "password" ? "active" : ""}`}
              onClick={() =>{ setMode("password");
                setFormData((prev)=>({...prev,mode:"password"}));
              }}
            >
              Username &amp; Password
            </button>
            <button
              className={`auth-tab ${mode === "otp" ? "active" : ""}`}
              onClick={() =>{ setMode("otp");
                setFormData((prev)=>({...prev,mode:"otp"}));
              }}
            >
              Login via Email OTP
            </button>
          </div>

          {mode === "password" ? (
            <form onSubmit={(e) => e.preventDefault()}>
              <label className="field">
                <span>Username</span>
                <input type="text" placeholder="e.g. sarah.jones" 
                name="username"
                 value={fromdata.username}  onChange={handleChange} autoComplete="username" />
              </label>

              <label className="field">
                <span>Password</span>
                <span className="pass-wrap">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Enter your password"
                    name="password"
                    value={fromdata.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="pass-toggle"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? "Hide" : "Show"}
                  </button>
                </span>
              </label>

              <div className="robot-check">
                <input
                  type="checkbox"
                  id="robot"
                  checked={robot}
                  onChange={(e) => setRobot(e.target.checked)}
                />
                <label htmlFor="robot">
                  <strong>I&apos;m not a robot</strong>
                  <small>Verify to keep your account secure.</small>
                </label>
                <span className="robot-mark">
                  🛡️
                  <br />
                  Privacy · Terms
                </span>
              </div>

              <div className="auth-inline">
                <label className="remember">
                  <input type="checkbox" /> Remember me
                </label>
                <span className="link">Forgot password?</span>
              </div>

              <button className="btn btn--primary btn--block" type="submit" onClick={ handleSubmit}>
                Sign in
              </button>

              <div className="auth-alt">
                <span>✉️</span>
                <span>Can&apos;t remember it? We can send your password reset link.</span>
                <button className="btn btn--ghost btn--sm" type="button" onClick={handleSubmit}>
                  Send to registered email
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={(e) => e.preventDefault()}>
              <label className="field">
                <span>Registered email</span>
                <input type="email" name="email" placeholder="you@example.com" value={fromdata.email} onChange={handleChange} autoComplete="email" />
              </label>

              {!otpSent ? (
                <button
                  className="btn btn--primary btn--block"
                  type="button"
                  onClick={handleSubmit}
                  
                >
                  Send one-time code
                </button>
              ) : (
                <>
                  <label className="field">
                    <span>Enter the 6-digit code</span>
                  </label>
                  <div className="otp-boxes">
                    
                      <input   value={otp} onChange={(e) => {

                        // Only allow numbers

                        const value =
                          e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 6);

                        setOtp(value);

                      }}
                      maxLength={6}
                      inputMode="numeric"
                    />
  
                    
                  </div>
                  <div className="auth-inline">
                    <span className="muted tiny">Code expires in 05:00</span>
                    <span className="link">Resend code</span>
                  </div>
                  <button className="btn btn--primary btn--block" onClick={handleVerifyOtp} type="submit">
                    Verify &amp; sign in
                  </button>
                  <p className="auth-note">
                    <button
                      type="button"
                      className="link"
                      onClick={() => setOtpSent(false)}
                    >
                      Use a different email
                    </button>
                  </p>
                </>
              )}

              <div className="auth-alt">
                <span>🔐</span>
                <span>No password needed — we email you a secure one-time code.</span>
              </div>
            </form>
          )}

          <div className="auth-divider">OR</div>
          <button className="google-btn" type="button">
            <span className="google-g">G</span> Continue with Google
          </button>

          <p className="auth-foot">
            You have no account? <Link to="/signup">Sign up now</Link>
          </p>
          <p className="auth-note">
            Protected by reCAPTCHA · <Link to="/">Back to home</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
