// import { useState } from 'react';
// import axiosInstance from '../utils/axiosInstance' // Adjust the import according to your project structure

// const UserDelete = () => {
//     const [email, setEmail] = useState('');
//     const [message, setMessage] = useState('');
//     const [loading, setLoading] = useState(false);

//     const handleDelete = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setMessage('');

//         try {
//             const response = await axiosInstance.post('/deleteUser', { email });
//             setMessage(response.data.message || 'User deleted successfully');
//         } catch (error) {
//             setMessage('Error deleting user: ' + (error.response?.data?.message || error.message));
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gray-100">
//             <div className="bg-white p-6 rounded shadow-md w-96">
//                 <h2 className="text-xl font-bold mb-4">Delete User</h2>
//                 <form onSubmit={handleDelete}>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 mb-2" htmlFor="email">
//                             Email:
//                         </label>
//                         <input
//                             type="email"
//                             id="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                             className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         className={`w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                         disabled={loading}
//                     >
//                         {loading ? 'Deleting...' : 'Delete User'}
//                     </button>
//                 </form>
//                 {message && <p className={`mt-4 ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
//             </div>
//         </div>
//     );
// };

// export default UserDelete;



import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance'; // Adjust the import according to your project structure

const UserDelete = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleDelete = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        console.log(email);
        try {
            const response = await axiosInstance.post('/admin/deleteUser', { email });
            setMessage(response.data.message || 'User deleted successfully');
        } catch (error) {
            setMessage('Error deleting user: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-xl font-bold mb-4">Delete User</h2>
                <form onSubmit={handleDelete}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Deleting...' : 'Delete User'}
                    </button>
                </form>
                {message && <p className={`mt-4 ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
            </div>
        </div>
    );
};

export default UserDelete;
