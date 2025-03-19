import { Request, Response } from "express";
import axios from "axios";
import { config } from "../config/env";

interface RecommendationRequestBody {
  travelData: {
    transportation: string;
    distance: number;
    frequency: string;
  };
  footprint: number;
}

export const getRecommendations = async (
  req: Request<{}, {}, RecommendationRequestBody>,
  res: Response
) => {
  try {
    const { travelData, footprint } = req.body;
    const recommendations = await fetchAIRecommendations(travelData, footprint);
    res.json({ recommendations });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};



async function fetchAIRecommendations(
  travelData: RecommendationRequestBody["travelData"],
  footprint: number
): Promise<string[]> {
  try {
    if (!config.OPENAI_API_KEY) {
      throw new Error("OpenAI API key is missing.");
    }

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a sustainability expert providing concise recommendations for reducing carbon footprint.",
          },
          {
            role: "user",
            content: `Based on the following travel data, provide 3-5 specific, actionable recommendations to reduce carbon footprint. Keep each recommendation under 50 words. Transportation: ${
              travelData.transportation
            }, Distance: ${travelData.distance} km, Frequency: ${
              travelData.frequency
            }, Calculated footprint: ${footprint}.00 kg CO2e`,
          },
        ],
        temperature: 0.7,
        max_tokens: 300,
      },
      {
        headers: {
          Authorization: `Bearer ${config.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content: string = response.data.choices[0].message.content;

    const recommendations: string[] = content
      .split(/\d+\./)
      .filter((item: string) => item.trim())
      .map((item: string) => item.trim());

    return recommendations;
  } catch (error) {
    console.error(
      "AI API error:",
      (error as any).response?.data || (error as Error).message
    );

    return [
      `Consider carpooling or public transit instead of using your ${travelData.transportation}.`,
      "Try combining multiple errands into a single trip to reduce total distance traveled.",
      "Explore remote work options to reduce commuting frequency when possible.",
    ];
  }
}
