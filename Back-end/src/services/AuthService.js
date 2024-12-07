class AuthService {
    constructor(User) {
        this.User = User;
    }

    async checkCredential(username, password) {
        const user = await this.User.findOne({ username});
        if (!user) return false;
        return await user.checkCredentials(password);
    }

    async checkResetPasswordCredentials(username, resetPasswordToken) {
        const user = await this.User.findOne({
          username,
          resetPasswordToken,
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

    async addResetPasswordToken(username, resetPasswordToken) {
        const user = await this.User.findOne({ username });
        if (!user) return false;
        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordExpires = Date.now() + 300000; // 5 minutes
        await user.save();
        return true;
    }

    async removeResetPasswordToken(username) {
        const user = await this.User.findOne({ username });
        if (!user) return false;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();
        return true;
    }
}

module.exports = AuthService;