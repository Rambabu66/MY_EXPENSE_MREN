import { toast } from "react-toastify";

export const handleSucess = (msg) => {
  toast.success(msg, {
    position: "top-right",
  });
};
export const handleError = (msg) => {
  toast.error(msg, {
    position: "top-right",
  });
};


export const APICALL_URL='https://my-expenses-uj57.onrender.com' //'http://localhost:5000'
