"use client"
import type { PropertyInsight } from "@/app/actions/property-insights"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Sun, Wind, DollarSign, Clock, Wrench } from "lucide-react"

interface PropertyInsightsProps {
  insights: PropertyInsight
  isLoading?: boolean
}

export function PropertyInsights({ insights, isLoading = false }: PropertyInsightsProps) {
  // Helper function to determine condition color
  const getConditionColor = (condition: string) => {
    if (condition.toLowerCase().includes("excellent") || condition.toLowerCase().includes("good")) {
      return "bg-green-500"
    } else if (condition.toLowerCase().includes("fair")) {
      return "bg-yellow-500"
    } else if (condition.toLowerCase().includes("poor")) {
      return "bg-red-500"
    } else {
      return "bg-blue-500"
    }
  }

  if (isLoading) {
    return (
      <Card className="w-full bg-white/5 backdrop-blur-sm border border-white/10">
        <CardHeader>
          <CardTitle className="text-xl">Analyzing Property...</CardTitle>
          <CardDescription>Our AI is gathering insights about this property</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-4 bg-white/10 rounded animate-pulse"></div>
            <div className="h-4 bg-white/10 rounded animate-pulse"></div>
            <div className="h-4 bg-white/10 rounded animate-pulse"></div>
            <div className="h-4 bg-white/10 rounded animate-pulse"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full bg-white/5 backdrop-blur-sm border border-white/10">
      <CardHeader>
        <CardTitle className="text-xl">AI Property Insights</CardTitle>
        <CardDescription>Analysis for {insights.address}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Roof Condition */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-white">Roof Condition</h3>
            <Badge variant="outline" className={`${getConditionColor(insights.roofCondition)} text-white`}>
              {insights.roofCondition.split(" ")[0]}
            </Badge>
          </div>
          <p className="text-sm text-gray-400">{insights.roofCondition}</p>
        </div>

        {/* Age and Replacement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-400" />
              <h3 className="font-medium text-white">Estimated Age</h3>
            </div>
            <p className="text-sm text-gray-400">{insights.estimatedAge}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-amber-400" />
              <h3 className="font-medium text-white">Replacement Cost</h3>
            </div>
            <p className="text-sm text-gray-400">{insights.replacementCost}</p>
          </div>
        </div>

        {/* Storm Risk */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-amber-400" />
            <h3 className="font-medium text-white">Storm Risk Assessment</h3>
          </div>
          <p className="text-sm text-gray-400">{insights.stormRisk}</p>
        </div>

        {/* Maintenance Recommendations */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Wrench className="h-4 w-4 text-amber-400" />
            <h3 className="font-medium text-white">Maintenance Recommendations</h3>
          </div>
          <ul className="text-sm text-gray-400 space-y-1">
            {insights.maintenanceRecommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Property Value Impact */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-amber-400" />
            <h3 className="font-medium text-white">Property Value Impact</h3>
          </div>
          <p className="text-sm text-gray-400">{insights.propertyValueImpact}</p>
        </div>

        {/* Sustainability Options */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-amber-400" />
            <h3 className="font-medium text-white">Sustainability Options</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {insights.sustainabilityOptions.map((option, index) => (
              <Badge key={index} variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                {option.split(" ")[0]}
              </Badge>
            ))}
          </div>
          <ul className="text-sm text-gray-400 space-y-1 mt-2">
            {insights.sustainabilityOptions.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">AI Confidence</span>
            <span className="text-sm text-gray-400">{Math.round(insights.confidence * 100)}%</span>
          </div>
          <Progress value={insights.confidence * 100} className="h-2 bg-white/10" />
          <p className="text-xs text-gray-500 mt-2">
            Analysis powered by Groq AI. Results are estimates and should be verified by professionals.
          </p>
        </div>
      </CardFooter>
    </Card>
  )
}
