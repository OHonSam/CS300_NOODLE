const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const RoleId = {
    ADMIN: 0,
    TEACHER: 1,
    STUDENT: 2
};

const AccountSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roleId: {type: Number, enum: Object.values(RoleId), required: true},
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
});

AccountSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();
    bcrypt.hash(this.password, 12, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    });
});

AccountSchema.methods.checkCredentials = function(password) {
    return bcrypt.compare(password, this.password);
};

const Account = mongoose.model('Account', AccountSchema);

module.exports = { Account, RoleId };