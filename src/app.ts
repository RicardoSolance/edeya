import "dotenv/config";
import express from "express";
import connectToDataBase from "./config/mongoDB";
import cors from "cors";
import routing from "./routes/routing";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

connectToDataBase();
routing(app);

app.listen(PORT, () => {
  console.log(`EDEYÁ SEVER RUNNING ON PORT ${PORT}`);
  console.log(`http://${process.env.IP_SERVER}:${PORT}`);
});
