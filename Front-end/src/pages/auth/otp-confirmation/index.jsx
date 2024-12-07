import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

const OtpConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [otp, setOtp] = useState("");
  
  // Get username from location state (passed from previous screen)
  const username = location.state?.username;

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch('http://localhost:5000/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          otp
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Store temporary token and navigate to password reset page
        localStorage.setItem('tempToken', data.token);
        navigate("/auth/reset-password", { state: { username } });
      } else {
        setErrorMessage(data.message || "Invalid OTP code.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch('http://localhost:5000/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username })
      });

      if (response.ok) {
        setErrorMessage("New OTP code has been sent to your email.");
      } else {
        const data = await response.json();
        setErrorMessage(data.message || "Failed to send new OTP code.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <NavLink to="/auth/login" className="absolute text-lg hover:text-grey-400 duration-500">
        <FaArrowLeft />
      </NavLink>
      <div className="text-center mb-6">
        <img
          src="https://via.placeholder.com/50"
          alt="Logo"
          className="mx-auto mb-4"
        />
        <h2 className="text-2xl font-semibold text-gray-800">Reset Password</h2>
        <p className="text-gray-500">An OTP Code has been sent to your email.</p>
      </div>
      <form onSubmit={onSubmit} className="space-y-6">
        <input
          type="text"
          id="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-4 py-2 mt-1 text-gray-900 bg-white border border-black/30 rounded-md shadow-sm focus:border-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter your OTP Code"
          maxLength={6}
          pattern="\d{6}"
          required
        />
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Confirm"}
        </button>
      </form>
      {errorMessage && <p className="mt-2 text-sm text-center text-error-500">{errorMessage}</p>}
      <p className="mt-6 text-sm text-center text-gray-500">
        Didn&apos;t receive the OTP code?{" "}
        <button 
          onClick={resendOTP} 
          className="text-blue-500 hover:underline"
          disabled={isLoading}
        >
          Send Another
        </button>
      </p>
    </div>
  );
};

export default OtpConfirmation;