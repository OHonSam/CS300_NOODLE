import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import { useEffect } from "react";

const Toast = ({ onClick, message, className, isAccepted }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClick();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClick]);

  return (
    <div id="toast" className={`absolute m-auto flex items-center max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow ${className}`} role="alert">
      <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${isAccepted ? "text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200" : "text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200"
        }`}>
        {isAccepted ? <FaCheck /> : <FaXmark />}
        <span className="sr-only">Check icon</span>
      </div>
      <div className="ms-3 text-sm font-normal">{message}</div>
      <button
        onClick={onClick}
        type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast" aria-label="Close">
        <span className="sr-only">Close</span>
        <IoMdClose />
      </button>
    </div>
  );
};

export default Toast;
