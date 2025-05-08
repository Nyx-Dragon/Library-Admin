const LOAN_DAYS =  30;
const Loan = require("../models/Loan")
const Book = require("../models/Book")
const Member = require("../models/Member")

const loanBookToMember = async (req, res) =>{
   const memberId = req.body.memberId
   const bookId = req.body.bookId

   const foundBook = await Book.findByPk(bookId)
if(!foundBook){
   res.status(404).send("Book not found")
}

const foundMember = await Member.findByPk(bookId)
if(!foundMember){
   res.status(404).send("Member not found")
}
   const currentDate = new Date();
   const calculatedDeadline = new Date(currentDate.getTime() + LOAN_DAYS * 24 * 60 * 60 * 1000);

   const createdLoan = await Loan.create({
      loanDate: currentDate,
      deadline: calculatedDeadline,
      BookId: bookId,
      MemberId: memberId
   })
   res.status(201).send({id: createdLoan.deadline})
}

exports.loanBookToMember = loanBookToMember;