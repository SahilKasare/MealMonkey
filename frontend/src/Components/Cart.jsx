import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const CheckoutCart = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [walletBalance, setWalletBalance] = useState(0); // Add wallet balance state

    useEffect(() => {
        const fetchCartAndWallet = async () => {
            try {
                const cartResponse = await axiosInstance.get('/customer/cart');
                setCart(cartResponse.data);
                calculateTotalPrice(cartResponse.data);

                const walletResponse = await axiosInstance.get('/customer/wallet'); // Fetch wallet balance
                setWalletBalance(walletResponse.data.balance); // Assuming API returns `{ balance: number }`
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCartAndWallet();
    }, []);

    const calculateTotalPrice = (cartItems) => {
        const total = cartItems.reduce((acc, item) =>
            acc + (item.product.price * item.quantity), 0);
        setTotalPrice(total);
    };

    const handleQuantityChange = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        try {
            await axiosInstance.put(`/customer/cart/${itemId}`, { quantity: newQuantity });

            // Update only the quantity of the specific item in the cart
            const updatedCart = cart.map(item => {
                if (item._id === itemId) {
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });

            setCart(updatedCart);
            calculateTotalPrice(updatedCart);
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const handleCheckout = async () => {
        if (walletBalance < totalPrice) {
            alert('Insufficient wallet balance!');
            return;
        }

        try {
            await axiosInstance.post('/customer/checkout', { cart });
            setCart([]);
            setTotalPrice(0);
            alert('Checkout successful!');
            navigate('/customer/checkout');
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    const finalTotal = totalPrice;

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-semibold mb-6 text-center">Cart Items</h1>
            {cart.length > 0 ? (
                <div>
                    {cart.map(item => (
                        <div key={item._id} className="border-b py-4 mb-4">
                            <h2 className="text-xl font-bold">{item.product.name}</h2>
                            <p className="text-gray-700">
                                Price: <span className="text-yellow-500 font-semibold">
                                    ₹{item.product.price.toFixed(2)}
                                </span> x {item.quantity}
                            </p>
                            <div className="flex items-center mt-2">
                                <p className="mr-2">Quantity:</p>
                                <button
                                    onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 text-red-500 hover:bg-red-200 font-bold shadow-md">
                                    -
                                </button>
                                <span className="mx-2">{item.quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-500 hover:bg-green-200 font-bold shadow-md">
                                    +
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Wallet Balance */}
                    <div className="flex justify-between text-lg mt-4">
                        <span className="text-gray-700">Wallet Balance</span>
                        <span className="text-gray-800 font-medium">₹{walletBalance.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-lg">
                        <span className="text-gray-700">Sub Total</span>
                        <span className="text-gray-800 font-medium">₹{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-xl mt-4">
                        <span className="text-gray-800">To Pay</span>
                        <span className="text-yellow-500">₹{finalTotal.toFixed(2)}</span>
                    </div>

                    <button
                        onClick={handleCheckout}
                        className="mt-6 w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200 w-full mt-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white py-3 rounded-lg text-lg hover:opacity-90 shadow-lg">
                        Checkout
                    </button>
                </div>
            ) : (
                <p className="text-lg text-gray-600 text-center">Your cart is empty.</p>
            )}
        </div>
    );
};

export default CheckoutCart;
