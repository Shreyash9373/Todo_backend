import { pool } from "../db";
import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
export const addTask = asyncHandler(async (req: Request, res: Response) => {
  const { name, date } = req.body;
  console.log("date", date);
  const response = await pool.query(
    "insert into tasks(name,date) values($1,$2)",
    [name, date]
  );

  return res.status(201).json({ message: "Task added successfully" });
});

export const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const { id, name, date } = req.body;
  const formattedDate = new Date(date);
  await pool.query("update tasks set name=$1,date=$2 where id=$3", [
    name,
    date,
    id,
  ]);
  return res.status(200).json({ message: "Task Updated successfully" });
});

export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await pool.query("delete from tasks where id = $1", [id]);
  return res.status(200).json({ message: "Task deleted successfully" });
});

export const getTasks = asyncHandler(async (req: Request, res: Response) => {
  const response = await pool.query(
    "SELECT id, name, to_char(date, 'YYYY-MM-DD') as date, completed FROM tasks;"
  );
  // const formattedRes = response.rows.map((task) => ({
  //   ...task,
  //   date: task.date.toISOString().split("T")[0],
  // }));
  return res.status(200).json(response.rows);
});

export const completeTask = asyncHandler(
  async (req: Request, res: Response) => {
    const { id, status } = req.params;
    const response = await pool.query(
      "update tasks set completed=$1 where id=$2",
      [status, id]
    );
    if (response) {
      return res.status(200).json({ message: "Task status updated" });
    }
  }
);
