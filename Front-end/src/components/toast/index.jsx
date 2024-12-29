import { useEffect, useState } from "react";

const Toast = ({ type, message, duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, duration, onClose);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) {
    return null;
  }

  const colors = {
    success: "green-500",
    error: "red-500",
    info: "blue-500",
    warning: "yellow-300",
  };

  const icons = {
    success: <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />,
    error: <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />,
    info: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12M12 2h0" />,
    warning: <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v12M12 18h0" />,
  };

  const title = {
    success: "Success",
    error: "Error",
    info: "Info",
    warning: "Warning",
  };

  return (
    <div className={`flex items-center bg-white rounded shadow-lg p-4 border-l-8 border-${colors[type]}`}>
      <div className={`flex items-center justify-center w-10 h-10 bg-${colors[type]} rounded-full mr-3`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="white"
          className="w-6 h-6"
        >
          {icons[type]}
        </svg>
      </div>

      <div className="flex-1">
        <p className="font-bold text-lg">{title[type]}</p>
        <p className="text-gray-600">{message}</p>
      </div>

      <button
        className="text-gray-500 hover:text-gray-700 ml-4"
        onClick={() => setVisible(false)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default Toast;
