const API_URL = "http://127.0.0.1:8000";


export const sendOtp = async (email) => {

  const response = await fetch(
    `${API_URL}/auth/send-otp`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        email: email
      })
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to send OTP"
    );
  }

  return data;
};


export const verifyOtp = async (
  email,
  otp
) => {

  const response = await fetch(
    `${API_URL}/auth/verify-email`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        email: email,
        otp: otp
      })
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Invalid OTP"
    );
  }

  return data;
};


export const signup = async (formData) => {

  const response = await fetch(
    `${API_URL}/auth/signup`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(formData)
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Signup failed"
    );
  }

  return data;
};