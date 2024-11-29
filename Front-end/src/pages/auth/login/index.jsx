import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignIn = () => {
  const [passwordVisbile, setPasswordVisible] = useState(false);
  const [currentSrc, setCurrentSrc] = useState("");
  const [imgFade, setImgFade] = useState(false);

  useEffect(() => {
    const imgsrc = [
      "https://i.pinimg.com/736x/59/18/93/5918939ef60bb203912d5a187aa5b4fa.jpg",
      "https://i.pinimg.com/736x/89/c7/d3/89c7d32bbf9e1cbf4458cf14664b4938.jpg",
      "https://i.pinimg.com/474x/91/af/b9/91afb9da294da896e059cfff4dc2ed11.jpg"
    ];
    let i = 0;
  
    const interval = setInterval(() => {
      setImgFade(true);

      setTimeout(() => {
        i = (i + 1) % imgsrc.length;
        setCurrentSrc(imgsrc[i]);
        setImgFade(false);
      }, 500);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 items-center">
      {/* Left Section - Sign-in Form */}
      <div className="flex flex-col justify-center w-full sm:h-fit h-full bg-white shadow-md max-w-lg p-8 mx-auto rounded-lg lg:w-[60%]">
        <div className="text-center mb-6">
          <img
            src="https://via.placeholder.com/50"
            alt="Logo"
            className="mx-auto mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-800">Welcome Back to Noodle</h2>
          <p className="text-gray-500">Enter your username and password to continue.</p>
        </div>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-white border border-black/30 rounded-md shadow-sm focus:border-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email address"
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
                className="w-full px-4 py-2 mt-1 text-gray-900 bg-white border border-black/30 rounded-md shadow-sm focus:border-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                onClick={() => setPasswordVisible(!passwordVisbile)}
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
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-500">
          Dont have an account?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Request Admin
          </a>
        </p>
      </div>

      {/* Right Section - Information Panel */}
      <div className="hidden overflow-hidden lg:flex items-center justify-center w-[40%] h-screen bg-gradient-to-br text-white bg-gray-100 mr-8">
        <img 
          src={currentSrc} 
          alt="Sign In Image"
          className={`h-[90%] w-full rounded-lg object-cover shadow-lg transition-opacity duration-500 ease-in-out ${imgFade ? 'opacity-0' : 'opacity-100'}`}/>
      </div>
    </div>
  );
};

export default SignIn;
