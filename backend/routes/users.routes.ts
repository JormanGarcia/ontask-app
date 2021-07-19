import { Router } from "express";
import { usersServices } from "../services/users.service";

const router = Router();
const { getUsers, getUserByID } = usersServices();

router.get("/", async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

router.get("/:_id", (req, res) => {
  const { _id } = req.params;

  const users = getUserByID(_id);
  res.json(users);
});

export default router;
