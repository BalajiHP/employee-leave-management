const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

var schema = new Schema ({
    username: { type: String },
    email: { type: String },
    password: { type: String },
    creation_dt: { type: Date }
});

schema.statics.hashPassword = function hashPassword(password){
	return bcrypt.hashSync(password,10); 
}

schema.methods.isValid = function(hashedpassword){
	return bcrypt.compareSync(hashedpassword, this.password);
}

module.exports = mongoose.model('User',schema);