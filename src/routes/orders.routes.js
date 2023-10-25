const { Router } = require("express");

const OrdersController = require("../controllers/OrdersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const checkIsAdmin = require("../middlewares/checkIsAdmin");

const ordersRoutes = Router();

const ordersController = new OrdersController();

ordersRoutes.use(ensureAuthenticated);

ordersRoutes.get("/", ordersController.index);
ordersRoutes.post("/", ordersController.create);
ordersRoutes.patch("/:id", checkIsAdmin, ordersController.update);
ordersRoutes.get("/:id", ordersController.show);
ordersRoutes.delete("/:id", checkIsAdmin, ordersController.delete);

module.exports = ordersRoutes;