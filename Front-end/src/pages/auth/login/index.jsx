import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, NavLink } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [passwordVisbile, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        console.log(data);
        navigate("/admin/dashboard");
      } else {
        setErrorMessage(data.message || "Incorrect Username or Password.");
      }
    } catch (error) {
      setErrorMessage("An error occurred during sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      <div className="text-center mb-6">
        <img
          src="https://via.placeholder.com/50"
          alt="Logo"
          className="mx-auto mb-4"
        />
        <h2 className="text-2xl font-semibold text-gray-800">Welcome Back to Noodle</h2>
        <p className="text-gray-500">Enter your username and password to continue.</p>
      </div>
      <form onSubmit={ onSubmit } className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={ handleChange }
            className="w-full px-4 py-2 mt-1 text-gray-900 bg-white border border-black/30 rounded-md shadow-sm focus:border-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type={passwordVisbile ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={ handleChange }
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-white border border-black/30 rounded-md shadow-sm focus:border-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              onClick={ () => setPasswordVisible(!passwordVisbile) }
            >
              {passwordVisbile ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center text-gray-500 hover:cursor-pointer">
            <input type="checkbox" className="checkbox checkbox-sm mr-2 [--chkbg:theme(colors.primary.500)] rounded" />
            Remember me
          </label>
          <NavLink to="/auth/otp-confirmation" className="text-sm text-blue-500 hover:underline">
            Forgot password?
          </NavLink>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Sign In
        </button>
      </form>
      {errorMessage && <p className="mt-2 text-sm text-center text-error-500">{errorMessage}</p>}
      <p className="mt-6 text-sm text-center text-gray-500">
        Don&lsquo;t have an account?{" "}
        <a href="#" className="text-blue-500 hover:underline">
          Request Admin
        </a>
      </p>
    </div>
  );
};

export default SignIn;
