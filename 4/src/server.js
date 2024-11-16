import fastify from "fastify";
import getCompanies from "./utils.js";

export default () => {
    const app = fastify();

    const companies = getCompanies();

    // BEGIN (write your solution here)
    app.get("/companies/:id", (req, res) => {
        const company = companies.find(({id}) => id === req.params.id);
        if (!company) {
            return res.status(404).send("Company not found");
        }
        return company;
    });

    // END

    return app;
};
