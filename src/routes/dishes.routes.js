const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const DishesController = require("../controllers/DishesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const checkIsAdmin = require("../middlewares/checkIsAdmin");

const dishesRoutes = Router();
const upload = multer(uploadConfig.MULTER);
const dishesController = new DishesController();

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.post("/", checkIsAdmin, upload.single("image"), dishesController.create);
dishesRoutes.patch("/:id", checkIsAdmin, upload.single("image"), dishesController.update);
dishesRoutes.get("/", dishesController.index);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.delete("/:id", checkIsAdmin, dishesController.delete);

module.exports = dishesRoutes;