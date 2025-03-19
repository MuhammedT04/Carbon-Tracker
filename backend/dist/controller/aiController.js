"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecommendations = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../config/env");
const getRecommendations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { travelData, footprint } = req.body;
        const recommendations = yield fetchAIRecommendations(travelData, footprint);
        res.json({ recommendations });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getRecommendations = getRecommendations;
function fetchAIRecommendations(travelData, footprint) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            if (!env_1.config.OPENAI_API_KEY) {
                throw new Error("OpenAI API key is missing.");
            }
            const response = yield axios_1.default.post("https://api.openai.com/v1/chat/completions", {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a sustainability expert providing concise recommendations for reducing carbon footprint.",
                    },
                    {
                        role: "user",
                        content: `Based on the following travel data, provide 3-5 specific, actionable recommendations to reduce carbon footprint. Keep each recommendation under 50 words. Transportation: ${travelData.transportation}, Distance: ${travelData.distance} km, Frequency: ${travelData.frequency}, Calculated footprint: ${footprint}.00 kg CO2e`,
                    },
                ],
                temperature: 0.7,
                max_tokens: 300,
            }, {
                headers: {
                    Authorization: `Bearer ${env_1.config.OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            });
            const content = response.data.choices[0].message.content;
            const recommendations = content
                .split(/\d+\./)
                .filter((item) => item.trim())
                .map((item) => item.trim());
            return recommendations;
        }
        catch (error) {
            console.error("AI API error:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
            return [
                `Consider carpooling or public transit instead of using your ${travelData.transportation}.`,
                "Try combining multiple errands into a single trip to reduce total distance traveled.",
                "Explore remote work options to reduce commuting frequency when possible.",
            ];
        }
    });
}
