module.exports = (mongoose) => {
    var schema = mongoose.Schema(
      {
        name: String,
        totalCopies: Number,
        availableCopies: Number,
      },
      { timestamps: false }
    );
  
  
    const Book = mongoose.model("book", schema);
    return Book;
  };