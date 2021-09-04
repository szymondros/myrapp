import {toast} from "react-toastify";

const successNotification = (text) => {
    toast.success(text, {
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

export default successNotification;