import express from "express";
import task_route from "./src/routes/task.routes";
import user_route from "./src/routes/user.routes";
import { start_DB } from "./src/config/database.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use("/api/task", task_route);
app.use("/api/user", user_route);

app.listen(PORT, async() => {
    await start_DB(),
    console.log(`Servidor corriendo en: localhost:${PORT}`);
});
