import {buildIdGenerator, generateToken} from "../utils.js";

export default (app) => {
    const users = [];

    const generateId = buildIdGenerator();

    app.get("/users/new", (req, res) => res.view("src/views/users/new"));

    // BEGIN (write your solution here)
    app.post("/users", (req, res) => {
        const user = {
            id: generateId(),
            token: generateToken(),
            ...req.body
        };
        users.push(user);
        res.cookie("token", user.token);
        res.redirect(`/users/${user.id}`);
    });

    app.get("/users/:id", (req, res) => {
        const user = users.find(({id, token}) => id === req.params.id && token === req.cookies.token);
        if (!user) {
            return res.status(404).send("User not found");
        }
        return res.view("src/views/users/show", {user});
    })
    // END
};
