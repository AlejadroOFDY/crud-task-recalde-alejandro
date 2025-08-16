import express from "express";
import task_route from "./src/routes/task.routes.js";
import user_route from "./src/routes/user.routes.js";
import profile_route from "./src/routes/profile.routes.js";
import { ProjectModel } from "./src/models/project.model.js";
import { ProfileModel } from "./src/models/profile.model.js";
import { UserProjectModel } from "./src/models/user_project.model.js";
import { start_DB } from "./src/config/database.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use("/api/tasks", task_route);
app.use("/api/users", user_route);
app.use("/api/profile", profile_route);

app.listen(PORT, async () => {
  await start_DB(), console.log(`Servidor corriendo en: localhost:${PORT}`);
});
