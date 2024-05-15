module.exports = (mongoose) => {
    var schema = mongoose.Schema(
      {
        _id: String,
        password: String,
      },
      { timestamps: false }
    );

    const Auth = mongoose.model("auth", schema);
    return Auth;
  };