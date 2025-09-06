"use server"

import { kv } from "@vercel/kv"
import { Groq } from "groq-sdk"

export type PropertyInsight = {
  address: string
  roofCondition: string
  estimatedAge: string
  replacementCost: string
  stormRisk: string
  maintenanceRecommendations: string[]
  propertyValueImpact: string
  sustainabilityOptions: string[]
  confidence: number
}

export async function generatePropertyInsights(address: string): Promise<PropertyInsight> {
  // Check cache first
  const cachedInsights = await kv.get<PropertyInsight>(`insights:${address}`)
  if (cachedInsights) {
    console.log("Returning cached insights for", address)
    return cachedInsights
  }

  try {
    console.log("Generating new insights for", address)

    // Initialize Groq client on the server
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    })

    // Generate insights using Groq
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an AI assistant specialized in property and roof analysis. 
          Generate detailed insights about the property at the given address.
          Focus on roof condition, age estimates, replacement costs, storm risk, 
          maintenance recommendations, property value impact, and sustainability options.
          Format your response as structured JSON with the following structure:
          {
            "roofCondition": "description of roof condition",
            "estimatedAge": "age range in years",
            "replacementCost": "cost estimate",
            "stormRisk": "risk assessment",
            "maintenanceRecommendations": ["recommendation1", "recommendation2"],
            "propertyValueImpact": "impact description",
            "sustainabilityOptions": ["option1", "option2"],
            "confidence": 0.85
          }`,
        },
        {
          role: "user",
          content: `Analyze this property: ${address}`,
        },
      ],
      model: "llama3-70b-8192",
      response_format: { type: "json_object" },
    })

    // Extract the response
    const responseText = completion.choices[0]?.message?.content || ""

    // Parse the JSON response
    let insights: PropertyInsight
    try {
      const parsedResponse = JSON.parse(responseText)

      // Map the response to our PropertyInsight type
      insights = {
        address,
        roofCondition: parsedResponse.roofCondition || "Good condition with minor wear",
        estimatedAge: parsedResponse.estimatedAge || "8-10 years",
        replacementCost: parsedResponse.replacementCost || "$12,000 - $15,000",
        stormRisk: parsedResponse.stormRisk || "Medium risk",
        maintenanceRecommendations: parsedResponse.maintenanceRecommendations || [
          "Clean gutters quarterly",
          "Inspect for loose shingles after storms",
          "Trim overhanging branches",
          "Check attic ventilation annually",
        ],
        propertyValueImpact:
          parsedResponse.propertyValueImpact || "Current roof condition adds approximately $8,000 to property value",
        sustainabilityOptions: parsedResponse.sustainabilityOptions || [
          "Solar panel installation viable",
          "Cool roof coating to improve energy efficiency",
          "Rainwater collection system compatible",
        ],
        confidence: parsedResponse.confidence || 0.85,
      }
    } catch (error) {
      console.error("Failed to parse AI response:", error)
      // Fallback with mock data if parsing fails
      insights = getMockInsights(address)
    }

    // Cache the results (expire after 24 hours)
    await kv.set(`insights:${address}`, insights, { ex: 86400 })

    return insights
  } catch (error) {
    console.error("Error generating property insights:", error)
    // Return mock data in case of error
    return getMockInsights(address)
  }
}

// Fallback function that returns mock insights
function getMockInsights(address: string): PropertyInsight {
  return {
    address,
    roofCondition: "Good condition with minor wear",
    estimatedAge: "8-10 years",
    replacementCost: "$12,000 - $15,000",
    stormRisk: "Medium - property is in an area with occasional severe weather",
    maintenanceRecommendations: [
      "Clean gutters quarterly",
      "Inspect for loose shingles after storms",
      "Trim overhanging branches",
      "Check attic ventilation annually",
    ],
    propertyValueImpact: "Current roof condition adds approximately $8,000 to property value",
    sustainabilityOptions: [
      "Solar panel installation viable",
      "Cool roof coating to improve energy efficiency",
      "Rainwater collection system compatible",
    ],
    confidence: 0.85,
  }
}
