import "dotenv/config";
import express from "express";
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/api", (_req, res) => {
  res.send("Bienvenidos a edeYá");
});

app.listen(PORT, () => {
  console.log("############ API REST #################");
  console.log(`edeyá running on port ${PORT}`);
  console.log(`http://${process.env.IP_SERVER}:${PORT}/api`);
});
