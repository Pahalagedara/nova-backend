module.exports = (mongoose) => {
    var schema = mongoose.Schema(
      {
        _id: String,
        name: String,
        totalCopies: Number,
        availableCopies: Number,
      },
      { timestamps: false }
    );
  
  
    const Book = mongoose.model("book", schema);
    return Book;
  };