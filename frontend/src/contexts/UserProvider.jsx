// src/contexts/UserContext.js
import  { createContext, useContext, useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance'; // Adjust the import path as necessary

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get('/get_user'); // Using axiosInstance here
                // console.log('User data received:', response.data); 
                setUser(response.data);
            } catch (error) {
                // A 401/403 simply means no one is logged in yet — that's expected,
                // so only surface unexpected failures.
                const status = error?.response?.status;
                if (status && status !== 401 && status !== 403) {
                    console.error('Error fetching user:', error);
                }
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
