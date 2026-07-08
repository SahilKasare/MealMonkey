import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { imageUrl } from '../config';

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80";

const CheckoutCart = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [walletBalance, setWalletBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCartAndWallet = async () => {
            try {
                const [cartResponse, walletResponse] = await Promise.all([
                    axiosInstance.get('/customer/cart'),
                    axiosInstance.get('/customer/wallet'),
                ]);
                setCart(Array.isArray(cartResponse.data) ? cartResponse.data : []);
                setWalletBalance(walletResponse.data?.balance ?? 0);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Could not load your cart. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchCartAndWallet();
    }, []);

    // Only count valid line items (product may be missing if it was deleted).
    const validItems = cart.filter((item) => item.product);
    const totalPrice = validItems.reduce(
        (acc, item) => acc + (item.product.price || 0) * item.quantity,
        0
    );

    const handleQuantityChange = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        try {
            await axiosInstance.put(`/customer/cart/${itemId}`, { quantity: newQuantity });
            setCart((prev) =>
                prev.map((item) =>
                    item._id === itemId ? { ...item, quantity: newQuantity } : item
                )
            );
        } catch (err) {
            console.error('Error updating quantity:', err);
        }
    };

    const handleCheckout = async () => {
        setError('');
        if (walletBalance < totalPrice) {
            setError('Insufficient wallet balance for this order.');
            return;
        }

        setProcessing(true);
        try {
            await axiosInstance.post('/customer/checkout', {});
            setCart([]);
            navigate('/customer/checkout', {
                state: { success: true, total: totalPrice },
            });
        } catch (err) {
            const data = err.response?.data;
            setError(typeof data === 'string' ? data : 'Something went wrong during checkout.');
        } finally {
            setProcessing(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-orange-500"></div>
                <p className="mt-4 text-orange-500 font-semibold">Loading your cart...</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto my-10 p-6 bg-white shadow-md rounded-2xl">
            <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Your Cart</h1>

            {validItems.length > 0 ? (
                <div>
                    {validItems.map((item) => (
                        <div key={item._id} className="flex items-center gap-4 border-b py-4">
                            <img
                                src={imageUrl(item.product.image, FALLBACK_IMAGE)}
                                alt={item.product.name || 'Item'}
                                onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <h2 className="text-lg font-bold text-gray-800 truncate">{item.product.name}</h2>
                                <p className="text-gray-600 text-sm">
                                    ₹{(item.product.price || 0).toFixed(2)} each
                                </p>
                                <div className="flex items-center mt-2 gap-3">
                                    <button
                                        onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                        aria-label="Decrease quantity"
                                        className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 font-bold disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        −
                                    </button>
                                    <span className="min-w-[24px] text-center font-medium">{item.quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                        aria-label="Increase quantity"
                                        className="w-9 h-9 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 font-bold"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="font-semibold text-gray-800 whitespace-nowrap">
                                ₹{((item.product.price || 0) * item.quantity).toFixed(2)}
                            </div>
                        </div>
                    ))}

                    <div className="mt-6 space-y-2">
                        <div className="flex justify-between text-gray-700">
                            <span>Wallet Balance</span>
                            <span className="font-medium">₹{walletBalance.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                            <span>Sub Total</span>
                            <span className="font-medium">₹{totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-xl pt-2 border-t">
                            <span className="text-gray-800">To Pay</span>
                            <span className="text-orange-500">₹{totalPrice.toFixed(2)}</span>
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-center mt-4">{error}</p>}

                    <button
                        onClick={handleCheckout}
                        disabled={processing}
                        className="w-full mt-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white py-3 rounded-lg text-lg font-semibold hover:opacity-90 shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {processing ? 'Placing order…' : 'Checkout'}
                    </button>
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-lg text-gray-600 mb-6">Your cart is empty.</p>
                    <Link
                        to="/customer/"
                        className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transition"
                    >
                        Browse Restaurants
                    </Link>
                </div>
            )}
        </div>
    );
};

export default CheckoutCart;
