import {toast} from 'react-toastify';

export const handlesuccess = (message) => {
    toast.success(message, {
        position: "top-right",
    })
}

export const handleerror = (message) => {
    toast.error(message, {
        position: "top-right",
    })
}