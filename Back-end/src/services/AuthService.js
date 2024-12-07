class AuthService {
    constructor(Account) {
        this.Account = Account;
    }

    async checkCredential(username, password) {
        const account = await this.Account.findOne({ username});
        if (!account) return false;
        return await account.checkCredentials(password);
    }

    async checkResetPasswordCredentials(username, resetPasswordToken) {
        const account = await this.Account.findOne({
          username,
          resetPasswordToken,
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

    async addResetPasswordToken(username, resetPasswordToken) {
        const account = await this.Account.findOne({ username });
        if (!account) return false;
        account.resetPasswordToken = resetPasswordToken;
        account.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await account.save();
        return true;
    }

    async removeResetPasswordToken(username) {
        const account = await this.Account.findOne({ username });
        if (!account) return false;
        account.resetPasswordToken = null;
        account.resetPasswordExpires = null;
        await account.save();
        return true;
    }
}

module.exports = AuthService;