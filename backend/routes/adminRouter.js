const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const Auth = require("../middlewares/Auth");
const CRUD = require("../controllers/adminController");
router.use(isLoggedIn);
router.use(Auth.authorizeAdmin);
router.get("/", isLoggedIn, (req, res) => {
    res.send("Admin Dashboard");
});

router.get("/getCustomers", CRUD.getCustomers)
router.get("/getRestaurants", CRUD.getRestaurants)
router.get("/analytics/:restaurantId", CRUD.getDailyAndWeeklyAnalytics)

router.post("/getUser", CRUD.getUser)
router.post("/deleteUser", CRUD.deleteUser)
router.post("/changeUserRole", CRUD.changeUserRole)
router.post("/addCustomer", CRUD.addCustomer)
router.post("/addRestaurant", CRUD.addRestaurant)
router.post("/addAdmin", CRUD.addAdmin)
router.get("/getDeliveryPartner", isLoggedIn, CRUD.getDeliveryPartner)
router.post("/addDeliveryPartner", isLoggedIn, CRUD.addDeliveryPartner)
module.exports = router;

/**
 * @openapi
 * /admin/getCustomers:
 *  get:
 *      tags:
 *          - Admin
 *      summary: Get all customers
 *      description: Retrieve a list of all customers. Only accessible by an Admin.
 *      responses:
 *          200:
 *              description: Successfully retrieved customer list
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: Forbidden
 *          500:
 *              description: Internal Server Error
 */

/**
 * @openapi
 * /admin/getRestaurants:
 *  get:
 *      tags:
 *          - Admin
 *      summary: Get all restaurants
 *      description: Retrieve a list of all registered restaurants. Only accessible by an Admin.
 *      responses:
 *          200:
 *              description: Successfully retrieved restaurant list
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: Forbidden
 *          500:
 *              description: Internal Server Error
 */

/**
 * @openapi
 * /admin/getUser:
 *  post:
 *      tags:
 *          - Admin
 *      summary: Get details of a specific user
 *      description: Fetch details of a user by providing their ID. Only accessible by an Admin.
 *      requestBody:
 *          description: Provide the user ID to retrieve details
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: "user@gmail.com"
 *      responses:
 *          200:
 *              description: Successfully retrieved user details
 *          400:
 *              description: Bad Request (e.g., missing user ID)
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: Forbidden
 *          404:
 *              description: User not found
 *          500:
 *              description: Internal Server Error
 */

/**
 * @openapi
 * /admin/getDeliveryPartner:
 *  get:
 *      tags:
 *          - Admin
 *      summary: Get all delivery partners
 *      description: Retrieve a list of all delivery partners. Only accessible by an Admin.
 *      responses:
 *          200:
 *              description: Successfully retrieved delivery partners
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                  username:
 *                                      type: string
 *                                  email:
 *                                      type: string
 *                                  contact:
 *                                      type: string
 *                                  role:
 *                                      type: string
 *                                      example: deliveryPartner
 *                                  isFree:
 *                                      type: boolean
 *                                  rating:
 *                                      type: number
 *                                  wallet:
 *                                      type: object
 *                                      properties:
 *                                          balance:
 *                                              type: number
 *                                  createdAt:
 *                                      type: string
 *                                      format: date-time
 *                                  updatedAt:
 *                                      type: string
 *                                      format: date-time
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: Forbidden
 *          500:
 *              description: Internal Server Error
 */


/**
 * @openapi
 * /admin/addCustomer:
 *  post:
 *      tags:
 *          - Admin
 *      summary: Add a new customer
 *      description: Allows an admin to create a new customer account.
 *      requestBody:
 *          description: Customer registration details
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - username
 *                          - email
 *                          - password
 *                      properties:
 *                          username:
 *                              type: string
 *                              example: "john_doe"
 *                          email:
 *                              type: string
 *                              example: "john@example.com"
 *                          password:
 *                              type: string
 *                              example: "SecurePass123"
 *                          contact:
 *                              type: string
 *                              example: "9876543210"
 *                          fullAdress:
 *                              type: string
 *                              example: "123 Main St, Cityville"
 *                          pincode:
 *                              type: string
 *                              example: "123456"
 *      responses:
 *          201:
 *              description: Customer successfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                                  example: true
 *                              message:
 *                                  type: string
 *                                  example: "User registered successfully"
 *                              user:
 *                                  $ref: '#/components/schemas/Customer'
 *          400:
 *              description: User already exists
 *          500:
 *              description: Internal Server Error
 */



/**
 * @openapi
 * /admin/addRestaurant:
 *  post:
 *      tags:
 *          - Admin
 *      summary: Add a new restaurant
 *      description: Allows an admin to create a new restaurant account.
 *      requestBody:
 *          description: Restaurant registration details
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - username
 *                          - email
 *                          - password
 *                      properties:
 *                          username:
 *                              type: string
 *                              example: "PizzaHeaven"
 *                          email:
 *                              type: string
 *                              example: "pizzahvn@example.com"
 *                          password:
 *                              type: string
 *                              example: "StrongPassword123"
 *                          contact:
 *                              type: string
 *                              example: "9876543210"
 *                          fullAdress:
 *                              type: string
 *                              example: "456 Food Street, Flavor Town"
 *                          pincode:
 *                              type: string
 *                              example: "987654"
 *                          hotelName:
 *                              type: string
 *                              example: "Pizza Heaven"
 *                          averageCost:
 *                              type: number
 *                              example: 250
 *                          knownFor:
 *                              type: array
 *                              items:
 *                                  type: string
 *                              example: ["Pizza", "Pasta", "Garlic Bread"]
 *                          rating:
 *                              type: number
 *                              example: 4.3
 *      responses:
 *          201:
 *              description: Restaurant successfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                                  example: true
 *                              message:
 *                                  type: string
 *                                  example: "User registered successfully"
 *                              user:
 *                                  $ref: '#/components/schemas/Restaurant'
 *          400:
 *              description: Restaurant already exists
 *          500:
 *              description: Internal Server Error
 */


/**
 * @openapi
 * /admin/deleteUser:
 *  post:
 *      tags:
 *          - Admin
 *      summary: Delete a user by email
 *      description: Allows an admin to delete a user (customer, restaurant, or delivery partner) using their email address.
 *      requestBody:
 *          description: Email of the user to be deleted
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: "user@example.com"
 *      responses:
 *          200:
 *              description: User deleted successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "User deleted successfully"
 *          404:
 *              description: User not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "User not found"
 *          500:
 *              description: Internal Server Error
 */


