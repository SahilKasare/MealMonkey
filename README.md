# Welcome to Food Delivery Website: Meal Monkey
MealMonkey is a food ordering and delivery website,
We have 4 kinds of users,

- Customer: Customer can filter restaruants by items, view restaurant details, menu and review, A customer can also write a review for a restaurant.He can manage the cart, place an order and view it.

-Restaurant: A restaurant can view it's statistics in the dashboard, manage the menu (add items, edit them). It can also view and edit it's profile. It can additionally view it's orders and reivews.

-DeliveryPartner: He can view his details and statistics in the dashboard,Can accept pending orders,view active order details and location on the map. Edit profile,

-Admin: Can view website statistics, like customers joined, restaruants joined, daily profit etc. He can view restaurants, its' statistics, users,deliveryPartners. Can create and fetch users with mailid and delete them.

-Guest user is an additional user who can view restaurants and their menus but can't add items to the cart or place an order.

Business Logic- Out of the total price of the order deducted from the customer's wallet, 80% goes to the restaurant, 10% to the admin and delivery partner each.

To visit the live website, [Click Here](https://mealmonkey-food.vercel.app/).
To visit the swagger docs, [Click Here](https://mealmonkey.onrender.com/docs)

## Getting Started

To get started with Meal Monkey, follow these instructions to set up the project locally.

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SahilKasare/MealMonkey.git
   cd MealMonkey
   ```
2. **Install backend packages**
   ```bash
   cd backend
   npm i
   ```
3. **Install frontend packages**
   ```bash
   cd frontend
   npm i
   ```

4. In the `backend` folder, create a `.env` file based on the provided `.env.example`. Make sure to set the necessary environment variables.

### Run the website

1. **Run the backend server**
   ```bash
   cd backend
   npx nodemon
   ```

2. **Run the frontend server**
   ```bash
   cd frontend
   npm run dev
   ```
3. Open Browser and search for : http://localhost:5173/
4. Welcome to Meal Monkey :)

## Contributors
```
FDFED-Project Group 37

Hrishikesh Dongre      (S20220010083)
Sahil Kasare           (S20220010191)
Yadnyesh Badgujar      (S20220010247)
Padmanabham Nithin Sai (S20220010158)
N. Dheeraj Sathvik     (S20220010148)
```
