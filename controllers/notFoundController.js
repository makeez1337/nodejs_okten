class NotFoundController {
    renderNotFoundPage(req, res) {
        res.render('notFound');
    }
}

module.exports = new NotFoundController();