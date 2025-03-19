import { Router } from "express";
import { calculateCarbon } from "../controller/carbonController";
import { getRecommendations } from "../controller/aiController";

const router = Router();

router.post("/calculate", calculateCarbon);
router.post("/recommendations", getRecommendations);

export default router;
