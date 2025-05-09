const express = require("express");
const loanController = require("../controllers/loans.controller");
const router = express.Router();

router.post("/", loanController.loanBookToMember);
router.put("/", loanController.returnBook);
router.get("/", loanController.getLoans);

module.exports = router;
