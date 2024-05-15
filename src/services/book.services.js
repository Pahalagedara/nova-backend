const db = require("../models/index.models");
const Book = db.book;

exports.saveBookData = async(name,totalCopies,availableCopies) => {
    const book = new Book({
        name: name,
        totalCopies: totalCopies,
        availableCopies: availableCopies,
    })
    return await book.save();
}
exports.findBookDataById = async(id) => {
    return await Book.findOne({_id:id})
}
exports.deleteBookData = async(document) => {
    return await Book.deleteOne(document)
}

exports.getAllBooks = async() => {
    return await Book.find({});
}