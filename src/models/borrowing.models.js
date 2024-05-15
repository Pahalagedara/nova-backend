const { ObjectId } = require('mongodb');
module.exports = (mongoose) => {
    var schema = mongoose.Schema(
      {
        user: {
            _id: ObjectId,
            name: String
        },
        book: {
            _id: ObjectId ,
            name: String
        },
        isReturned: Boolean
      },
      { timestamps: false }
    );
  
  
    const Borrowing = mongoose.model("borrowing", schema);
    return Borrowing;
  };