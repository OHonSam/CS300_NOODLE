import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { verifyOTP, requestPasswordReset } from "../../../services/auth/authService";
import { setTempToken } from "../../../services/auth/tokenService";

const OtpConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [otp, setOtp] = useState("");
  
  const username = location.state?.username;

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const data = await verifyOTP(username, otp);
      setTempToken(data.token);
      navigate("/auth/reset-password", { state: { username } });
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      await requestPasswordReset(username);
      setErrorMessage("New OTP code has been sent to your email.");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <NavLink to="/auth/login" className="absolute p-2 text-lg hover:text-grey-400 duration-500">
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