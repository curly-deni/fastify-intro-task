import fastify from "fastify";
import view from "@fastify/view";
import pug from "pug";
import getUsers from "./utils.js";

export default async () => {
  const app = fastify();

  await app.register(view, { engine: { pug } }); // --- Add this line

  const users = getUsers();

  // BEGIN (write your solution here)
  app.get("/users", (req, res) => {
    res.view("src/views/users/index", { users });
  })

  app.get("/users/:id", (req, res) => {
    const user = users.find((user) => user.id === req.params.id);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    res.view("src/views/users/show", { user });
  })
  // END
  return app;
};