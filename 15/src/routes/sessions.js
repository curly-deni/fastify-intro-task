import generateUsers, {decrypt} from "../utils.js";

export default (app) => {
    const users = generateUsers();

    // BEGIN (write your solution here)
    app.get('/sessions/new', (req, res) => {
        res.view('src/views/sessions/new');
    })

    app.post('/sessions', (req, res) => {
        const {username, password} = req.body;
        console.log(username, password, users);
        const user = users.find(user => user.username === username);
        if (!user || decrypt(user.password) !== password) {
            req.flash('warning', 'Wrong username or password');
            return res.redirect('/sessions/new');
        }
        req.session.username = username;
        res.redirect('/');
    })

    app.post('/sessions/delete', (req, res) => {
        req.session.username = null;
        res.redirect('/');
    })
    // END
};
