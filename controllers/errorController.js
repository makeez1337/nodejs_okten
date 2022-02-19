class ErrorController {
    renderErrorPage(req, res) {
        res.render('error');
    }
}

module.exports = new ErrorController();