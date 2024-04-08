const router = require("express").Router();

const getUserController = require("../controllers/users");

const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", getUserController.getAll);

router.get("/:id", getUserController.getSingle);

router.post("/", isAuthenticated, getUserController.createUser);

router.put("/:id", isAuthenticated, getUserController.updateUser);

router.delete("/:id", isAuthenticated, getUserController.deleteUser);

module.exports = router;