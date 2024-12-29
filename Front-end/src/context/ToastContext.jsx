import Toast from "../components/toast";
import { useState } from "react";
import { ToastContext } from "../hooks/useToast";

export const ToastProvider = ({ children }) => {
  const [toastList, setToastList] = useState([]);

  const addToast = (type, message) => {
    setToastList((prev) => [...prev, { type, message }]);
  };

  const removeToast = (index) => {
    setToastList((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 flex flex-col items-end space-y-2">
        {toastList.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            message={toast.message}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
