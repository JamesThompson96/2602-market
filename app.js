import express from "express";
import morgan from "morgan";
import getUserFromToken from "#middleware/getUserFromToken";
import ordersRouter from "#api/orders";
import productsRouter from "#api/products";
import usersRouter from "#api/users";

const app = express();
export default app;

app.use(morgan("dev"));
app.use(express.json());
app.use(getUserFromToken);
app.use("/orders", ordersRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);

app.use((err, req, res, next) => {
  switch (err.code) {
    case "22P02":
      return res.status(400).send(err.message);

    case "23505":

    case "23503":
      return res.status(400).send(err.detail);
    default:
      next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong.");
});
