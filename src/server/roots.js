function homepage(req, res) {
    res.send('Hello World');
}

function login(req, res) {
    res.send('Logged in');
}

// nodejs module.export multiple functions?
module.exports = { login: login, homepage: homepage}