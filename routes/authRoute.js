import express from 'express'
import {registerController,loginController,testController,forgotPasswordController,updateProfileController,getOrdersController,getAllOrdersController} from '../controllers/authController.js';
import { requireSignIn,isAdmin } from '../middlewares/authMiddlewares.js';
//router object
const router=express.Router()

//routering
//Register|| METHOD POST
router.post('/register',registerController)

//Login|| METHOD POST
router.post('/login',loginController)
//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);
//test routers
router.get('/test',requireSignIn,isAdmin,testController)

//protected user route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });
  //protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
})
//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);
export default router;
