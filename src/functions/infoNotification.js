import {toast} from "react-toastify";

const infoNotification = (text) => {
    toast.info(text, {
        theme: "dark",
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

export default infoNotification;