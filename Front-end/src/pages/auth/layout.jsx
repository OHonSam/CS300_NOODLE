import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  const [currentSrc, setCurrentSrc] = useState("https://i.pinimg.com/736x/59/18/93/5918939ef60bb203912d5a187aa5b4fa.jpg",);
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

      {/* Left Section - Form */}
      <div className="flex flex-col justify-center w-full sm:h-fit h-full bg-white shadow-md max-w-lg p-8 mx-auto rounded-lg lg:w-[60%]">
        <Outlet />
      </div>

      {/* Right Section - Infographics */}
      <div className="hidden overflow-hidden lg:flex items-center justify-center w-[40%] h-screen bg-gradient-to-br text-white bg-gray-100 mr-8">
        <img 
          src={currentSrc} 
          alt="Sign In Image"
          className={`h-[90%] w-full rounded-lg object-cover shadow-lg transition-opacity duration-500 ease-in-out ${imgFade ? 'opacity-0' : 'opacity-100'}`}/>
      </div>
    </div>
  );
};

export default AuthLayout;