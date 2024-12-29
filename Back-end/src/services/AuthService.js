const crypto = require('crypto');

class AuthService {
    constructor(Account) {
        this.Account = Account;
    }

    async checkCredential(username, password) {
        const account = await this.Account.findOne({ username});
        if (!account) return { isValid: false, roleId: null };
        
        const isValid = await account.checkCredential(password);
        const roleId = account.roleId;
        const fullName = account.fullName;
        return { isValid, roleId, fullName };
    }

    async checkResetPasswordCredential(username, resetPasswordToken) {
        const account = await this.Account.findOne({
          username,
          resetPasswordToken: resetPasswordToken,
          resetPasswordExpires: { $gt: Date.now() }
        });
        return !!account;
      }
    
    async changePassword(username, newPassword) {
        const account = await this.Account.findOne({ username });
        if (!account) return false;
        account.password = newPassword;
        await account.save();
        return true;
    }

    async addResetPasswordToken(username) {
        const account = await this.Account.findOne({ username });
        if (!account) return null;

        const resetPasswordToken = crypto.randomBytes(32).toString('hex');
        const otp = this.generateOTP();

        account.resetPasswordToken = resetPasswordToken;
        account.resetPasswordOTP = otp;
        account.resetPasswordExpires = Date.now() + 300000; // 5 minutes
        await account.save();

        return { resetPasswordToken, otp };
    }

    generateOTP() {
        return crypto.randomInt(100000, 999999).toString();
    }

    async verifyOTP(username, otp) {
        const account = await this.Account.findOne({
            username,
            resetPasswordOTP: otp,
            resetPasswordExpires: { $gt: Date.now() }
        });

        return account ? true : false;
    }

    async removeResetPasswordToken(username) {
        const account = await this.Account.findOne({ username });
        if (!account) return false;
        account.resetPasswordToken = null;
        account.resetPasswordOTP = null;
        account.resetPasswordExpires = null;
        await account.save();
        return true;
    }
}

module.exports = AuthService;