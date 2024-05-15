const db = require("../models/index.models");
const Borrowing = db.borrowing;

exports.saveBorrowing = async(data) => {
    const borrowing = new Borrowing(data)
    return await borrowing.save();
}

exports.findBorrowingById = async(id) => {
    return await Borrowing.findOne({_id:id})
}

exports.findBorrowingByUser = async (id) => {
    return await Borrowing.find({"user._id": id})
}

exports.updateBorrowingReturned = async(_id) => {
    return await Borrowing.updateOne({_id:_id},{ $set: { isReturned: true } })
}