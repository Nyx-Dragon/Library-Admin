const express = require("express");
const loansController = require("../controllers/loans.controller");
const router = express.Router();

router.post("/", loansController.loanBookToMember);
router.patch("/", loansController.returnBook);
router.get("/", loansController.getLoans);

module.exports = router;
