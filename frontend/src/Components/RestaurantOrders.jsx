// components/RestaurantOrders.js
import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserProvider';
import axiosInstance from '../utils/axiosInstance';

const OrderStatusBadge = ({ status }) => {
    const statusStyles = {
        pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        completed: 'bg-green-100 text-green-800 border-green-300',
        processing: 'bg-blue-100 text-blue-800 border-blue-300',
    };

    return (
        <span className={`px-4 py-1 rounded-full text-sm font-semibold border ${statusStyles[status.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-300'} animate-pulse`}>
            {status}
        </span>
    );
};

const RestaurantOrders = () => {
    const { user } = useUser();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axiosInstance.get('/restaurant/orders');
                setOrders(res.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchOrders();
        }
    }, [user]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-50 to-gray-50">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <div className="text-2xl font-semibold text-orange-600 animate-pulse">
                        Loading Orders...
                    </div>
                </div>
            </div>
        );
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
        }).format(amount);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-50 -mt-8">
            <div className="max-w-8xl mx-auto p-8">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                        Order Dashboard
                    </h1>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-gray-500">Welcome back,</span>
                        <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-lg font-semibold">
                            {user?.name || 'Restaurant Owner'}
                        </span>
                    </div>
                </div>

                {orders.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-xl">
                        <div className="w-24 h-24 mx-auto mb-6">
                            <svg className="w-full h-full text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-700 mb-2">No Orders Yet</h3>
                        <p className="text-gray-500">Your orders will appear here once customers start placing them.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                        {orders.map((order) => (
                            <div
                                key={order._id}
                                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                            >
                                <div className="p-6 space-y-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="text-xs font-semibold text-gray-500">ORDER ID</span>
                                            <p className="font-mono text-sm">{order._id}</p>
                                        </div>
                                        <OrderStatusBadge status={order.status || 'Pending'} />
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-2xl font-bold text-orange-600">
                                                {formatCurrency(order.totalAmount)}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}
                                            </span>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                                </svg>
                                                <span className="text-gray-600">{order.customerName}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                                </svg>
                                                <span className="text-blue-600 text-sm">{order.customerEmail}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-100 pt-4">
                                        <h4 className="text-sm font-semibold text-gray-600 mb-3">Order Items</h4>
                                        <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                                            {order.items.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="flex justify-between items-center p-2 rounded-lg hover:bg-orange-50 transition-colors"
                                                >
                                                    <span className="font-medium text-gray-800">
                                                        {item.product.name}
                                                    </span>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-semibold">
                                                            × {item.quantity}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* <div className="flex justify-end space-x-3">
                                        <button
                                            onClick={() => setSelectedOrder(order)}
                                            className="px-4 py-2 text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors"
                                        >
                                            View Details
                                        </button>
                                        <button className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors">
                                            Update Status
                                        </button>
                                    </div> */}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Custom Scrollbar Styles */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #888;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #555;
                }
            `}</style>
        </div>
    );
};

export default RestaurantOrders;    