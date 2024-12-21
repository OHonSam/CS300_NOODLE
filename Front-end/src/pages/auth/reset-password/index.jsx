import { useState } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { changePassword } from "../../../services/auth/authService";
import { getTempToken, removeTempToken } from "../../../services/auth/tokenService";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const username = location.state?.username;
  const tempToken = getTempToken();

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    
    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      await changePassword(username, formData.newPassword, tempToken);
      removeTempToken();
      navigate("/auth/login", { 
        state: { successMessage: "Password reset successfully. Please log in." } 
      });
    } catch (error) {
      setErrorMessage(error.message);
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
        <p className="text-gray-500">Enter a new password.</p>
      </div>
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <div className="relative">
            <input 
              type={newPasswordVisible ? "text" : "password"}
              id="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-white border border-black/30 rounded-md shadow-sm focus:border-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your new password"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              onClick={() => setNewPasswordVisible(!newPasswordVisible)}
            >
              {newPasswordVisible ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="relative">
            <input 
              type={confirmPasswordVisible ? "text" : "password"}
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-white border border-black/30 rounded-md shadow-sm focus:border-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Confirm your new password"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              {confirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "Resetting..." : "Confirm"}
        </button>
      </form>
      {errorMessage && <p className="mt-2 text-sm text-center text-error-500">{errorMessage}</p>}
    </div>
  );
};

export default ResetPassword;