import express, { Request, Response } from "express";
import { pool } from "./db";
import { app } from "./app";

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

pool
  .connect()
  .then((client) => {
    console.log("Connected to the database");
    client.release();
  })
  .catch((err) => console.error("Database connection error", err));
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
