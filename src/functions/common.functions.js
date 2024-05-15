const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.hashPassword = async(password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
      } catch (err) {
        throw new Error('Error hashing password: ' + err.message);
      }

}

exports.passwordCompare = async(password,hashedPassword)  => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
      } catch (err) {
        throw new Error('Error comparing passwords: ' + err.message);
      }
}