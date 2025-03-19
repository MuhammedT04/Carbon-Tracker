import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "../src/router/carbonRoutes";

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/api",router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


export default app;