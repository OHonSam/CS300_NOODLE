import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const OtpConfirmation = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    // Test error message
    setErrorMessage("Incorrect OTP code.");
    navigate("/auth/reset-password");
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
      <form onSubmit={ onSubmit } className="space-y-6">
        <input 
          type="tel"
          id="otp"
          className="w-full px-4 py-2 mt-1 text-gray-900 bg-white border border-black/30 rounded-md shadow-sm focus:border-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter your OTP Code"  />
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-primary-600 rounded-md hover:bg-primary-700"
        >
          Confirm
        </button>
      </form>
      {errorMessage && <p className="mt-2 text-sm text-center text-error-500">{errorMessage}</p>}
      <p className="mt-6 text-sm text-center text-gray-500">
        Didn&lsquo;t receive the OTP code?{" "}
        <a href="#" className="text-primary-500 hover:underline">
          Send Another
        </a>
      </p>
    </div>
  );
};

export default OtpConfirmation;