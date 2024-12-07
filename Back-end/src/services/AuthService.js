const crypto = require('crypto');

class AuthService {
    constructor(User) {
        this.User = User;
    }

    async checkCredential(username, password) {
        const user = await this.User.findOne({ username});
        if (!user) return false;
        return await user.checkCredential(password);
    }

    async checkResetPasswordCredential(username, resetPasswordToken) {
        const user = await this.User.findOne({
          username,
          resetPasswordToken: resetPasswordToken,
          resetPasswordExpires: { $gt: Date.now() }
        });
        return !!user;
      }
    
    async changePassword(username, newPassword) {
        const user = await this.User.findOne({ username });
        if (!user) return false;
        user.password = newPassword;
        await user.save();
        return true;
    }

    async addResetPasswordToken(username) {
        const user = await this.User.findOne({ username });
        if (!user) return null;

        const resetPasswordToken = crypto.randomBytes(32).toString('hex');
        const otp = this.generateOTP();

        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordOTP = otp;
        user.resetPasswordExpires = Date.now() + 300000; // 5 minutes
        await user.save();

        return { resetPasswordToken, otp };
    }

    generateOTP() {
        return crypto.randomInt(100000, 999999).toString();
    }

    async verifyOTP(username, otp) {
        const user = await this.User.findOne({
            username,
            resetPasswordOTP: otp,
            resetPasswordExpires: { $gt: Date.now() }
        });

        return user ? true : false;
    }

    async removeResetPasswordToken(username) {
        const user = await this.User.findOne({ username });
        if (!user) return false;
        user.resetPasswordToken = null;
        user.resetPasswordOTP = null;
        user.resetPasswordExpires = null;
        await user.save();
        return true;
    }
}

module.exports = AuthService;