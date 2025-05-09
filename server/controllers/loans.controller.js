const LOAN_DAYS = 30;
const Loan = require("../models/Loan");
const Book = require("../models/Book");
const Member = require("../models/Member");
const { Op } = require("sequelize");

const loanBookToMember = async (req, res) => {
   const memberId = req.body.memberId;
   const bookId = req.body.bookId;

   const foundBook = await Book.findByPk(bookId);
   if (!foundBook) {
      return res.status(404).send("Book not found");
   }

   const foundMember = await Member.findByPk(memberId);
   if (!foundMember) {
      return res.status(404).send("Member not found");
   }

   const currentDate = new Date();
   const calculatedDeadline = new Date(currentDate.getTime() + LOAN_DAYS * 24 * 60 * 60 * 1000);

   try {
      const createdLoan = await Loan.create({
         loan_date: currentDate,
         deadline: calculatedDeadline,
         bookId: bookId,
         memberId: memberId
      });

      res.status(201).send({ id: createdLoan.id, deadline: createdLoan.deadline });
   } catch (error) {
      console.error(error);
      res.status(500).send("Error al crear el préstamo");
   }
};

const returnBook = async (req, res) => {
   try {
     const bookId = req.body.bookId;

     const updatedLoans = await Loan.update(
       { returnDate: new Date() },
       {
         where: {
           bookId: bookId,
           returnDate: null
         },
       }
     );

     res.send({ cancelledLoans: updatedLoans[0] });
   } catch (error) {
     console.error('Error al devolver el libro:', error);
     res.status(500).send('Error al devolver el libro');
   }
};

const getLoans = async (req, res) => {
   const { memberId, active_loans } = req.query;

   const whereFilter = {};
   if (memberId) {
     whereFilter.memberId = memberId; 
   }

   if (active_loans === "true") {
     whereFilter.returnDate = null; 
   }

   if (active_loans === "false") {
     whereFilter.returnDate = {
         [Op.not]: null
     };
   }

   try {
     const loans = await Loan.findAll({
       where: whereFilter,
       include: [
         {
           model: Book,
           attributes: ["title"]
         },
         {
           model: Member,
           attributes: ["name"]
         }
       ],
     });

     const result = loans.map((loan) => ({
       returnDate: loan.returnDate,
       loanDate: loan.loan_date,
       deadline: loan.deadline,
       bookTitle: loan?.Book?.title,
       memberName: loan?.Member?.name
     }));

     res.json({ loans: result });
   } catch (error) {
     console.error("Error al obtener los préstamos:", error);
     res.status(500).json({ error: "Error al obtener los préstamos" });
   }
};

exports.getLoans = getLoans;
exports.loanBookToMember = loanBookToMember;
exports.returnBook = returnBook;
