import {toast} from "react-toastify";

const errorNotification = (text) => {
    toast.error(text, {
        theme: "dark",
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

export default errorNotification;