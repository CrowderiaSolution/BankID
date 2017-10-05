import StatusCodes from 'http-status-codes';

module.exports = (router) => {
    router.route('/').get(function (req, res) {
        res.status(StatusCodes.OK).json({ message: 'APP_NAME' + 'API_VERTION' })
    })

    // erorrs handler
    router.use(function (err, req, res, next) {
        var status = err.status || StatusCodes.INTERNAL_SERVER_ERROR
        res.status(status)
        res.json({
            app: 'api',
            status: status,
            error: err.message
         })
    })

    return router
}