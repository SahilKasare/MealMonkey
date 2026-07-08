// src/App.jsx
import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import SignUp from './Components/signUp';
import Login from './Components/Login';
import { Provider } from 'react-redux';
import store from './redux/store'
import RestaurantDashboard from './Components/RestaurantDashboard';
import PopularRestaurants from './Components/PopularRestaurants';
import SearchBox from './Components/SearchBox/SearchBox';
import Categories from './Components/Categories/Categories';
import AddMenuItemForm from './Components/AddMenuItemForm';
import AdminDashboard from './Components/AdminDashboard';
import GetCustomer from './Components/getCustomers';
import GetRestaurant from './Components/getRestaurants';
import RestaurantDetails from './Components/RestaurantDetails';
import GetUser from './Components/GetUser'
import DeleteUser from './Components/DeleteUser';
import ChangeUserRole from './Components/ChangeUserRole';
import AddCustomer from './Components/addCustomer';
import AddDeliveryPartner from './Components/addDeliveryPartner';
import AddRestaurant from './Components/addRestaurant';
import AddAdmin from './Components/addAdmin';
import './App.css';
import RestaurantForm from './Components/Restaurant/RestaurantForm';
import AboutUs from './Components/AboutUs';
import Contact from './Components/Contact';
import RestaurantMenu from './Components/RestaurantMenu';
import { UserProvider } from './contexts/UserProvider';
import Menu from './Components/Menu';
import UpdateMenuItemForm from './Components/UpdateItem';
import RestaurantsList from './Components/RestaurantList';
import Cart from './Components/Cart'
import CustomerOrderList from './Components/CustomerOrderList'
import RestaurantOrders from './Components/RestaurantOrders';
import DeliveryPartnerCard from './Components/DeliveryPartner/DeliveryPartnerCard';
import DeliveryPartnerDashboard from './Components/DeliveryPartner/DeliveryPartnerDashboard';
import DeliveryPartnerStats from './Components/DeliveryPartner/DeliveryPartnerStats ';
import ActiveOrders from './Components/DeliveryPartner/ActiveOrders';
import OrderDetails from './Components/DeliveryPartner/OrderDetails';
import OrdersDelivered from './Components/DeliveryPartner/OrdersDelivered';
import Checkout from "./Components/Checkout";
import FAQ from './Components/FAQ';
const App = () => {
  return (
    <Provider store={store}>
    <UserProvider>
      <div className="App">
        <Header />
        <div style={{minHeight: "60vh"}} className="content-container">
          <Routes>
            <Route path="/" element={<><Categories /><PopularRestaurants /></>} />

            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path='/about' element={<AboutUs />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/FAQ' element={<FAQ />} />

            <Route path="/customer/" element={<><Categories /><PopularRestaurants /></>} />
            <Route path="/customer/restaurants/:foodType" element={<RestaurantsList />} />
            <Route path="/customer/cart" element={<Cart/>}/>
            <Route path="/customer/checkout" element={<Checkout />} />
            <Route path="/customer/orders" element={<CustomerOrderList/>}/>
            <Route path="/customer/menu/:restaurantId" element={<RestaurantMenu />} />
            <Route path="/restaurant" element={<RestaurantDashboard />} />
            <Route path="/restaurant/profileDetails" element={<RestaurantForm />} />
            <Route path="/restaurant/menu/item" element={<AddMenuItemForm />} />
            <Route path="/restaurant/menu" element={<Menu />} />
            
            <Route path="/restaurant/updateItem/:id" element={<UpdateMenuItemForm/>} />
            <Route path="/restaurant/orders" element={<RestaurantOrders/>}/>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/getCustomers" element={<GetCustomer />} />
            <Route path="/admin/getRestaurants" element={<GetRestaurant />} />
            <Route path="/admin/:restaurantId" element={<RestaurantDetails/>} />
            <Route path="/admin/getUser" element={<GetUser />} />
            <Route path="/admin/deleteUser" element={<DeleteUser />} />
            <Route path="/admin/changeUserRole" element={<ChangeUserRole />} />
            <Route path="/admin/addAdmin" element={<AddAdmin />} />
            <Route path="/admin/addCustomer" element={<AddCustomer />} />
            <Route path="/admin/addRestaurant" element={<AddRestaurant />} />
            <Route path="/deliveryPartner/profile" element={<DeliveryPartnerCard/>} />
            <Route path="/deliveryPartner" element={<DeliveryPartnerDashboard/>} />
            <Route path="/deliveryPartner/stats" element={<DeliveryPartnerStats/>} />
            <Route path="/deliveryPartner/activeOrders" element={<ActiveOrders/>} />
            <Route path="/deliveryPartner/orderDetails/:orderId" element={<OrderDetails/>} />
            <Route path="/deliveryPartner/ordersDelivered" element={<OrdersDelivered/>} />
            
            
          </Routes>
        </div>
      <Footer/>
      </div>
    </UserProvider>
    </Provider>
  );
}

export default App;
