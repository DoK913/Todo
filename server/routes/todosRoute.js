const express = require("express");
const bodyParser = require("body-parser");

const controller = require("../controllers/todosControllers");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/todos", controller.createNew);
router.get("/todos", controller.getAllTodos);
router.patch("/todos/:todoId", controller.update);
router.delete("/todos/byIds", controller.deleteByIds);
router.put("/todos", controller.saveAll);

module.exports = router;
