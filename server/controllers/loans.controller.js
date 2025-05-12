const LOAN_DAYS = 30;
const { Op } = require("sequelize");

const Loan = require("../models/Loan");
const Book = require("../models/Book");
const Member = require("../models/Member");

const loanBookToMember = async (req, res) => {
    const memberId = req.body.memberId;
    const bookId = req.body.bookId;

    const foundBook = await Book.findByPk(bookId);
    if (!foundBook) {
        res.status(404).send("Book not found");
        return;
    }

    const foundMember = await Member.findByPk(memberId);
    if (!foundMember) {
        res.status(404).send("Member not found");
        return;
    }

    const currentDate = new Date();
    const calcuatedDeadline = new Date(
        currentDate.getTime() + LOAN_DAYS * 24 * 60 * 60 * 1000
    );

    const createdLoan = await Loan.create({
        loanDate: currentDate,
        deadline: calcuatedDeadline,
        BookId: bookId,
        MemberId: memberId,
    });
    res.status(201).send({ deadline: createdLoan.deadline });
};

const returnBook = async (req, res) => {
    const bookId = req.body.bookId;

    const foundBook = await Book.findByPk(bookId);
    if (!foundBook) {
        res.status(404).send("Book not found");
        return;
    }

    const updatedLoans = await Loan.update(
        { returnDate: new Date() },
        {
            where: {
                BookId: bookId,
                returnDate: null,
            },
        }
    );

    res.send({ canceledLoans: updatedLoans[0] });
};

const getLoans = async (req, res) => {
    console.log(req.user);
    const memberId = req.query.memberId;
    const activeLoans = req.query.activeLoans;

    const whereFilter = {};
    if (memberId) {
        whereFilter.MemberId = memberId;
    }
    if (activeLoans === "true") {
        whereFilter.returnDate = null;
    }
    if (activeLoans === "false") {
        whereFilter.returnDate = {
            [Op.not]: null,
        };
    }

    const loans = await Loan.findAll({
        where: whereFilter,
        include: [
            { model: Book, attributes: ["title"] },
            { model: Member, attributes: ["name"] },
        ],
    });

    const parsedLoans = loans.map((loan) => {
        return {
            returnDate: loan.returnDate,
            loanDate: loan.loanDate,
            deadline: loan.deadline,
            bookId: loan?.BookId,
            memberId: loan?.MemberId,
            bookTitle: loan?.Book?.title,
            memberName: loan?.Member?.name,
        };
    });

    res.send(parsedLoans);
};

exports.getLoans = getLoans;
exports.loanBookToMember = loanBookToMember;
exports.returnBook = returnBook;
