import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import axiosInstance from '../utils/axiosInstance';
import { 
    FaWallet, 
    FaClock, 
    FaShoppingBag, 
    FaStore, 
    FaMoneyBillWave,
    FaSpinner
} from 'react-icons/fa';

const StatusBadge = ({ status }) => {
    const statusStyles = {
        pending: 'bg-amber-100 text-amber-700 border-amber-200',
        accepted: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        completed: 'bg-blue-100 text-blue-700 border-blue-200',
        cancelled: 'bg-red-100 text-red-700 border-red-200'
    };

    const safeStatus = status || 'pending';
    return (
        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusStyles[safeStatus] || 'bg-gray-100 text-gray-700'}`}>
            {safeStatus.charAt(0).toUpperCase() + safeStatus.slice(1)}
        </span>
    );
};

const OrderCard = ({ order, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="w-full"
        >
            <div 
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3 min-w-0">
                            <FaStore className="text-orange-500 text-xl flex-shrink-0" />
                            <h3 className="text-lg font-semibold text-gray-800 truncate">
                                {order.restaurantEmail}
                            </h3>
                        </div>
                        <StatusBadge status={order.status} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-2 min-w-0">
                            <FaShoppingBag className="text-gray-400 flex-shrink-0" />
                            <span className="text-gray-600">Order ID:</span>
                            <span className="font-medium truncate">#{(order.orderId || '').toString().slice(-6).toUpperCase() || 'N/A'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaMoneyBillWave className="text-gray-400 flex-shrink-0" />
                            <span className="text-gray-600">Total:</span>
                            <span className="font-bold text-green-600">₹{order.totalAmount}</span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <FaClock />
                        <span>{format(new Date(order.createdAt), 'PPp')}</span>
                    </div>

                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4"
                            >
                                <div className="border-t pt-4">
                                    <h4 className="text-md font-medium mb-3">Order Items</h4>
                                    <div className="space-y-2">
                                        {order.items.map((item, idx) => (
                                            <div 
                                                key={idx} 
                                                className="flex justify-between items-center p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                                            >
                                                <span className="text-gray-700">{item.product?.name || 'Item unavailable'}</span>
                                                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                                                    Qty: {item.quantity}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

const WalletSection = ({ balance, addAmount, setAddAmount, handleAddMoney }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md mx-auto mb-8"
        >
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <FaWallet className="text-2xl text-orange-500" />
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                            Wallet Balance
                        </h2>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">₹{Number(balance || 0).toFixed(2)}</div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="number"
                        placeholder="Amount to add"
                        value={addAmount || ''}
                        onChange={(e) => setAddAmount(Number(e.target.value))}
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 outline-none"
                        min="0"
                    />
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAddMoney}
                        disabled={addAmount <= 0}
                        className={`px-6 py-3 rounded-xl font-medium shadow-lg transition-all duration-200
                            ${addAmount <= 0
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-xl'
                            }`}
                    >
                        Add Money
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

const OrdersList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [walletBalance, setWalletBalance] = useState(0);
    const [addAmount, setAddAmount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [ordersResponse, walletResponse] = await Promise.all([
                    axiosInstance.get('/customer/orders'),
                    axiosInstance.get('/customer/wallet')
                ]);
                
                setOrders(Array.isArray(ordersResponse.data) ? ordersResponse.data : []);
                setWalletBalance(walletResponse.data?.balance ?? 0);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddMoney = async () => {
        if (addAmount <= 0) return;

        try {
            await axiosInstance.post('/customer/addMoney', { amount: addAmount });
            const response = await axiosInstance.get('/customer/wallet');
            setWalletBalance(response.data.balance);
            setAddAmount(0);
        } catch (error) {
            console.error('Error adding money to wallet:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh] bg-gray-50">
                <div className="text-center">
                    <FaSpinner className="animate-spin text-4xl text-orange-500 mx-auto mb-4" />
                    <p className="text-gray-600">Loading your orders...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[60vh] bg-gradient-to-br from-gray-50 to-orange-50 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                <WalletSection 
                    balance={walletBalance}
                    addAmount={addAmount}
                    setAddAmount={setAddAmount}
                    handleAddMoney={handleAddMoney}
                />

                <div className="space-y-6">
                    {orders.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12"
                        >
                            <div className="text-gray-500 text-xl">
                                No orders found. Start ordering to see your history here!
                            </div>
                        </motion.div>
                    ) : (
                        <div className="grid gap-6">
                            {orders.map((order, index) => (
                                <OrderCard
                                    key={order.orderId || index}
                                    order={order}
                                    index={index}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrdersList;