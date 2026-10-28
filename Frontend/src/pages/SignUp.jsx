import { useState } from "react";
import { data, Link } from "react-router-dom";
import AuthAside from "../components/AuthAside.jsx";
import "./Auth.css";

import {
  signup,
  sendOtp,
  verifyOtp
} from "../services/AuthApi.jsx";


export default function SignUp() {

  // ==========================================
  // STATES
  // ==========================================

  const [showPass, setShowPass] = useState(false);

  const [emailVerified, setEmailVerified] =
    useState(false);

  const [otpSent, setOtpSent] =
    useState(false);

  const [otp, setOtp] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: ""
  });


  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));


    // If email changes,
    // previous verification becomes invalid

    if (name === "email") {

      setEmailVerified(false);

      setOtpSent(false);

      setOtp("");

      setMessage("");
    }
  };


  // ==========================================
  // SEND OTP
  // ==========================================

  const handleSendOtp = async () => {
    console.log(formData.email);
    
alert("verify button is clicked");
    if (!formData.email) {
      
      setMessage(
        "Please enter your email first."
      );

      return;
    }


    try {

      setLoading(true);

      setMessage("");

console.log("wait checking");

      const result = await sendOtp(
        formData.email
      );


      console.log(
        "OTP response:",
        result
      );


      // Show OTP input

      setOtpSent(true);


      setMessage(
        "OTP has been sent to your email."
      );

    }

    catch (error) {
      console.log("erropr occured--");
      
      console.error(
        "Send OTP error:",
        error
      );


      setMessage(
        error.message ||
        "Failed to send OTP."
      );
    }

    finally {

      setLoading(false);
    }
  };


  // ==========================================
  // VERIFY OTP
  // ==========================================

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
      const result = await verifyOtp(
        formData.email,
        otp
      );
      console.log("again");
      

      console.log(
        "Verify OTP response:",
        result
      );
 

      // Email verified

      setEmailVerified(true);

      setOtpSent(false);

      setOtp("");


      setMessage(
        "Email verified successfully ✓"
      );

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


  // ==========================================
  // SIGN UP
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    setMessage("");


    // Email verification required

    if (!emailVerified) {

      setMessage(
        "Please verify your email first."
      );

      return;
    }


    try {

      setLoading(true);

console.log("gh");
      console.log("fromdata",formData);
      
      const result = await signup(
        formData
      );
console.log("hj");


      console.log(
        "Signup successful:",
        result
      );


      setMessage(
        "Account created successfully!"
      );

    }

    catch (error) {

      console.error(
        "Signup error:",
        error
      );

      alert(error.message)
      setMessage(
        error.message ||
        "Signup failed."
      );
    }

    finally {

      setLoading(false);
    }
  };


  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="auth">

      <AuthAside />


      <main className="auth-main">

        <div className="auth-card">


          {/* BACK TO SIGN IN */}

          <Link
            to="/signin"
            className="auth-back"
          >
            ← Back to sign in
          </Link>


          <h2>
            Create your account
          </h2>


          <p className="auth-sub">
            Quick and secure setup —
            your private health profile
            in under a minute.
          </p>


          {/* =================================
              FORM
          ================================= */}

          <form
            onSubmit={handleSubmit}
            style={{ marginTop: 20 }}
          >


            {/* =================================
                FULL NAME
            ================================= */}

            <label className="field">

              <span>
                Full name
              </span>

              <input
                id="fullname"
                name="fullname"
                type="text"
                placeholder="Sarah Jones"
                value={formData.fullname}
                onChange={handleChange}
                autoComplete="name"
                required
              />

            </label>


            {/* =================================
                EMAIL + PHONE
            ================================= */}

            <div className="field-row">


              {/* EMAIL */}

              <label className="field">

                <span>
                  Email address
                </span>


                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center"
                  }}
                >


                  {/* EMAIL INPUT */}

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={emailVerified}
                    autoComplete="email"
                    required
                  />


                  {/* VERIFY BUTTON */}

                  {!emailVerified && (

                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={
                        loading ||
                        !formData.email
                      }
                    >

                      {loading
                        ? "Sending..."
                        : "Verify"
                      }

                    </button>

                  )}


                  {/* VERIFIED */}

                  {emailVerified && (

                    <button type="button">
                      ✓ Verified
                    </button>

                  )}

                </div>


                {/* =================================
                    OTP SECTION
                ================================= */}

                {otpSent && !emailVerified && (

                  <div
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      gap: "10px",
                      alignItems: "center"
                    }}
                  >


                    {/* OTP INPUT */}

                    <input
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => {

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


                    {/* VERIFY OTP */}

                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={
                        loading ||
                        otp.length !== 6
                      }
                    >

                      {loading
                        ? "Checking..."
                        : "Verify OTP"
                      }

                    </button>

                  </div>

                )}

              </label>


              {/* =================================
                  PHONE
              ================================= */}

              <label className="field">

                <span>
                  Phone number
                </span>

                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+91 5550001234"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                />

              </label>

            </div>


            {/* =================================
                PASSWORD
            ================================= */}

            <label className="field">

              <span>
                Password
              </span>


              <span className="pass-wrap">

                <input
                  id="password"
                  name="password"
                  type={
                    showPass
                      ? "text"
                      : "password"
                  }
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />


                <button
                  type="button"
                  className="pass-toggle"
                  onClick={() =>
                    setShowPass(!showPass)
                  }
                >

                  {showPass
                    ? "Hide"
                    : "Show"
                  }

                </button>

              </span>

            </label>


            {/* =================================
                PASSWORD PROGRESS
            ================================= */}

            <div
              className="progress progress--blue"
              style={{
                marginBottom: 8
              }}
            >

              <span
                style={{
                  width: "60%"
                }}
              />

            </div>


            <p
              className="muted tiny"
              style={{
                marginBottom: 16
              }}
            >
              Use 8+ characters with a number
              and a symbol.
            </p>


            {/* =================================
                TERMS
            ================================= */}

            <label
              className="remember"
              style={{
                marginBottom: 16
              }}
            >

              <input
                type="checkbox"
                required
              />

              I agree to the Terms &amp;
              Privacy Policy

            </label>


            {/* =================================
                SIGN UP BUTTON
            ================================= */}

            <button
              className="btn btn--primary btn--block"
              type="submit"
              onClick={handleSubmit}
              disabled={
                loading ||
                !emailVerified
              }
            >

              {loading
                ? "Creating account..."
                : "Create account"
              }

            </button>

          </form>


          {/* =================================
              OR
          ================================= */}

          <div className="auth-divider">
            OR
          </div>


          {/* GOOGLE */}

          <button
            className="google-btn"
            type="button"
          >

            <span className="google-g">
              G
            </span>

            Continue with Google

          </button>


          {/* =================================
              SIGN IN
          ================================= */}

          <p className="auth-foot">

            Already have an account?

            {" "}

            <Link to="/signin">
              Sign in
            </Link>

          </p>


          <p className="auth-note">

            Your data is encrypted and never
            shared without your consent.

          </p>

        </div>

      </main>

    </div>
  );
}
