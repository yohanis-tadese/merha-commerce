import { toast } from "react-toastify";

const Toast = {
  success: (message, duration = 1500) => {
    toast.success(message, { autoClose: duration });
  },
  error: (message, duration = 1500) => {
    toast.error(message, { autoClose: duration });
  },
  info: (message, duration = 1500) => {
    toast.info(message, { autoClose: duration });
  },
  warn: (message, duration = 1500) => {
    toast.warn(message, { autoClose: duration });
  },
};

export default Toast;
