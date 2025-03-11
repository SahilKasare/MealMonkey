const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const Auth = require("../middlewares/Auth");
const CRUD = require("../controllers/adminController");
router.get("/", isLoggedIn, (req, res) => {
    res.send("Admin Dashboard");
});

router.get("/getCustomers", isLoggedIn, Auth.authorizeAdmin, CRUD.getCustomers)
router.get("/getRestaurants", isLoggedIn, Auth.authorizeAdmin, CRUD.getRestaurants)
router.get("/analytics/:restaurantId", isLoggedIn, Auth.authorizeAdmin, CRUD.getDailyAndWeeklyAnalytics)

router.post("/getUser", isLoggedIn, Auth.authorizeAdmin, CRUD.getUser)
router.post("/deleteUser", isLoggedIn, Auth.authorizeAdmin, CRUD.deleteUser)
router.post("/changeUserRole", isLoggedIn, Auth.authorizeAdmin, CRUD.changeUserRole)
router.post("/addCustomer", isLoggedIn, Auth.authorizeAdmin, CRUD.addCustomer)
router.post("/addRestaurant", isLoggedIn, Auth.authorizeAdmin, CRUD.addRestaurant)
router.post("/addAdmin", isLoggedIn, Auth.authorizeAdmin, CRUD.addAdmin)
// router.get("/getDeliveryPartner", isLoggedIn, Auth.authorizeAdmin, CRUD.getDeliveryPartner)
// router.post("/addDeliveryPartner", isLoggedIn, Auth.authorizeAdmin, CRUD.addDeliveryPartner)
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
 *      security:
 *          - BearerAuth: []
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
 *      security:
 *          - BearerAuth: []
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
