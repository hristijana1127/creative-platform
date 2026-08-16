import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StyledToastContainer } from "./styles";

const useToast = () => {
  const showToast = (message, type = "info", options = {}) => {
    const toastFn = toast[type] ?? toast;
    toastFn(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      ...options,
    });
  };

  return { showToast };
};

const ToastProvider = ({ children }) => {
  return (
    <>
      {children}
      <StyledToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
};

export { ToastProvider, useToast };
