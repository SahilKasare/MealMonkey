import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // useEffect(() => {
    //     const fetchCustomers = () => {
    //         const xhr = new XMLHttpRequest();
    //         xhr.open('GET', '/admin/getCustomers', true);
    //         xhr.onreadystatechange = function () {
    //             if (xhr.readyState === 4) {
    //                 setLoading(false);
    //                 if (xhr.status === 200) {
    //                     const data = JSON.parse(xhr.responseText); 
    //                     console.log(data);
    //                     setCustomers(data); 
    //                 } else {
    //                     setError('Failed to fetch customers'); 
    //                 }
    //             }
    //         };
    //         xhr.send(); // Send the request
    //     };

    //     fetchCustomers();
    // }, []);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axiosInstance.get('/admin/getCustomers');
                console.log(response.data);
                setCustomers(response.data);
            } catch (err) {
                setError('Failed to fetch customers');
            } finally {
                setLoading(false);
            }
        };
        fetchCustomers();
    }, []);
    
    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Customers</h2>
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {!loading && !error && (
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2">Username</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.length > 0 ? (
                            customers.map((customer) => (
                                <tr key={customer._id} className="border-b">
                                    <td className="px-4 py-2">{customer.username}</td>
                                    <td className="px-4 py-2">{customer.email}</td>
                                    <td className="px-4 py-2">{customer.contact}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center py-4">No customers found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Customers;
