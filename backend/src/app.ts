import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "../src/router/carbonRoutes";

dotenv.config();

const PORT = process.env.PORT || 5001; 


const app = express();
app.use(cors({ origin: "https://carbon-footprint-tracker-phi.vercel.app", credentials: true }));
app.use(express.json());

app.use("/api",router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


export default app;