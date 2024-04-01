import "dotenv/config";
import express from "express";
import usersRouter from "./routes/users";
import connectToDataBase from "./config/mongoDB";
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

connectToDataBase();
app.use("/api", usersRouter);

app.listen(PORT, () => {
  console.log(`edeyá running on port ${PORT}`);
  console.log(`http://${process.env.IP_SERVER}:${PORT}/api`);
});
