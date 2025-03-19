"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCarbon = void 0;
const EMISSION_FACTORS = {
    car: 0.2,
    bus: 0.1,
    train: 0.05,
    flight: 0.3,
};
const FREQUENCY_MULTIPLIERS = {
    daily: 1,
    weekly: 7,
    monthly: 30,
    yearly: 365,
};
const calculateCarbon = (req, res) => {
    try {
        const { transportation, distance, frequency } = req.body;
        if (!transportation || !distance || !frequency) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const emissionFactor = EMISSION_FACTORS[transportation] || 0.1;
        const frequencyMultiplier = FREQUENCY_MULTIPLIERS[frequency] || 1;
        const carbonFootprint = distance * emissionFactor * frequencyMultiplier;
        return res.json({ carbonFootprint });
    }
    catch (error) {
        console.error("Error in /api/calculate:", error.message);
        return res.status(500).json({ error: error.message });
    }
};
exports.calculateCarbon = calculateCarbon;
