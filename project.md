
### User Methods
* search and filter
* order tracking
* rating & review (for delivery do after order completion and for hotel in the menu page)
* website revieww on home page (write )
* wishlist (in the card adds to favourite)
* order history
* discount also in the card (manager can change it in productSchema)
* cart
* account setting (for delete isdelete() make true when delete, check on /register if false make true)


### Manager Methods
* dashboard (consists of cards of the menu and other stats)
* menu management (list of all food items , update item, add item , delete item, add discount to all)
In settings page
* form  
* orders 
* customer review
* business hours (isAvailable)


### Delivery partner methods
* Profile Management: Set up and manage their delivery profile, including availability, location, and vehicle details.
* View available delivery requests and accept or decline orders based on their current load 
* Delivery Performance: Access reports on performance metrics like delivery times, customer ratings, and completed orders.
* Delivery Partner Ratings: Receive ratings and feedback from users and restaurants after each delivery.
* Earnings & Payment Tracking: View completed deliveries, tips, and total earnings. Request withdrawals or view payout history.
* Review restaurant and mealmonkey

## Admin
User Management: Manage users (customers, restaurants, delivery partners) including profile suspensions, and access control.
Order Oversight: Monitor all orders in real-time, including order statuses, delays, and fulfillment issues.
Revenue & Commission Management: Track the platform’s earnings from commission on orders, and manage payments to restaurants and delivery partners.
Analytics & Reporting: Access detailed reports on platform activity, sales, delivery times, customer behavior, and operational efficiency.


### OOPS concept use
* used for authorization, whose object can be created to use the methods
* discriminator used in models, to show inheritance
##### WORKING
Discriminators are particularly useful when you have a base schema (for shared fields) and additional fields that differ between types. For example, if you have    a User model that is shared between different user roles like Customer, Manager, and Delivery Partner, you can use discriminators to extend the User model and      add role-specific fields.
* get, update methods are created in a single class, whose object can be instantiated to access the methods, for ex for admin routes


Requirements
* regex
* oops
* comments
* ajax
* es6
* dhtml (not req)
