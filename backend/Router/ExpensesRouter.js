const {
  addTransition,
  fetchTransition,
  deleteTransition,
} = require("../Controller/ExpensesController");

const router = require("express").Router();

router.post("/", addTransition);
router.get("/", fetchTransition);
router.delete("/:expenseId", deleteTransition);

module.exports = router;
