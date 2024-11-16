import _ from "lodash";
import fastify from "fastify";
import getUsers from "./utils.js";

export default () => {
    const app = fastify();

    const users = getUsers();

    // BEGIN (write your solution here)
    app.get("/users", (req, res) => {
        const {page = 1, per = 5} = req.query;
        const chunked = _.chunk(users, per);
        return res.send(chunked[page - 1]);
    })
    // END

    return app;
};
