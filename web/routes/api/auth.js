import authHandler from '../../handlers/auth'

module.exports = {
    setupRoute: (router) => {
        router.route('/auth/bankid')
            .post(authHandler.authenticateUser, authHandler.generateAndSendToken)
        router.route('/auth/bankid/authunticate')
            .post(authHandler.generateAndSendToken)
    }
}