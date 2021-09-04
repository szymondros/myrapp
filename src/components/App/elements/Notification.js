import React from 'react';
import {toast, ToastContainer, Slide} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = () => {
    return (
        <>
            <ToastContainer
                transition={Slide}
                position="top-center"
                autoClose={1500}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
};

export default Notification;