"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carbonController_1 = require("../controller/carbonController");
const aiController_1 = require("../controller/aiController");
const router = (0, express_1.Router)();
router.post("/calculate", carbonController_1.calculateCarbon);
router.post("/recommendations", aiController_1.getRecommendations);
exports.default = router;
