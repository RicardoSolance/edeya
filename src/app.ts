import "dotenv/config";
import express from "express";
// import usersRouter from "./routes/users";
import connectToDataBase from "./config/mongoDB";
import cors from "cors";
import routing from "./routes/routing";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

connectToDataBase();
// app.use("/api", usersRouter);
routing(app);

app.listen(PORT, () => {
  console.log(`edeyá running on port ${PORT}`);
  console.log(`http://${process.env.IP_SERVER}:${PORT}/api`);
});
