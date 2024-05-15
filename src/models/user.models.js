module.exports = (mongoose)=> {
    var schema = mongoose.Schema(
      {
        authId: String,
        name: String,
        type: String,
      },
      { timestamps: false }
    );

    const User = mongoose.model("user", schema);
    return User;
  };