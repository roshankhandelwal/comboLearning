import { FC, useEffect, useState } from "react"

interface Props {
    children: React.ReactNode;
}

const InactivityTracker: FC<Props> = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const checkForInactivity = () => {
        const expiryTime = localStorage.getItem(import.meta.env.VITE_LS_EXPIRY_KEY_NAME)!;
        if (Date.now() > parseInt(expiryTime, 10)) {
            console.log("Setting isLogged in to false");
            setIsLoggedIn(false);
        }
    }

    const updateExpiryTime = () => {
        const expiryTime = Date.now() + parseInt(import.meta.env.VITE_EXPIRY_TIME_INTERVAL, 10);
        localStorage.setItem(import.meta.env.VITE_LS_EXPIRY_KEY_NAME, expiryTime.toString());
    }


    useEffect(() => {
        const interval = setInterval(() => {
            checkForInactivity();
        }, import.meta.env.VITE_CHECK_INTERVAL);

        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        updateExpiryTime();

        window.addEventListener('keypress', updateExpiryTime);
        window.addEventListener('click', updateExpiryTime);
        window.addEventListener('scroll', updateExpiryTime);
        window.addEventListener('mousemove', updateExpiryTime);

        return () => {
            window.removeEventListener('keypress', updateExpiryTime);
            window.removeEventListener('click', updateExpiryTime);
            window.removeEventListener('scroll', updateExpiryTime);
            window.removeEventListener('mousemove', updateExpiryTime);
        }
    }, [])

    return (
        <>
            IsLoggedIn : {!isLoggedIn ? "Not Logged In" : "Is Logged In"}
            {children}
        </>
    )
}

export default InactivityTracker;