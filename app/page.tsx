"use client"

import type React from "react"
import { redirect } from "next/navigation"

import { useState } from "react"
import { Search, Star, Shield, Clock, Download, ChevronRight, Cloud, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PropertyInsights } from "@/components/property-insights"
import { generatePropertyInsights, type PropertyInsight } from "@/app/actions/property-insights"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function HomePage() {
  redirect("/dashboard")

  const [address, setAddress] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [propertyInsights, setPropertyInsights] = useState<PropertyInsight | null>(null)
  const [showInsights, setShowInsights] = useState(false)
  const { toast } = useToast()

  const handlePropertySearch = async () => {
    if (!address.trim()) {
      toast({
        title: "Address Required",
        description: "Please enter a property address to analyze",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)
    setShowInsights(true)

    try {
      // Call the server action
      const insights = await generatePropertyInsights(address)
      setPropertyInsights(insights)

      toast({
        title: "Analysis Complete",
        description: "AI-powered property insights are ready",
      })
    } catch (error) {
      console.error("Error analyzing property:", error)
      toast({
        title: "Analysis Failed",
        description: "Unable to generate property insights. Please try again.",
        variant: "destructive",
      })
      setShowInsights(false)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handlePropertySearch()
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Stars background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full bg-[#000000] opacity-70"></div>
        {/* Animated stars/particles */}
        <div className="stars-container">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white opacity-70 animate-pulse"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Earth glow in the distance */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[30vh] rounded-full bg-blue-500/20 opacity-30"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold text-xl">
              R
            </div>
            <span className="font-bold text-xl">RoofFax</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#" className="text-sm hover:text-amber-400 transition">
              Features
            </Link>
            <Link href="#" className="text-sm hover:text-amber-400 transition">
              Pricing
            </Link>
            <Link href="#" className="text-sm hover:text-amber-400 transition">
              Testimonials
            </Link>
            <Link href="#" className="text-sm hover:text-amber-400 transition">
              Dashboard
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/signin" className="text-sm hover:text-amber-400 transition">
              Sign In
            </Link>
            <Button className="bg-amber-500 hover:bg-amber-600 text-black">Get Started Free</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block px-4 py-1 rounded-full border border-amber-500/50 text-amber-400 text-sm mb-6 backdrop-blur-sm">
              <span className="mr-2">•</span>
              Welcome back, Earthling. You found the coordinates.
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Your RoofFax guided you <span className="text-amber-500">out of orbit</span>.
              <br />
              Let's finish the journey.
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Your property report awaits. One free pull to bring you back to Earth with all the data you need.
            </p>

            {/* Property Search */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-0 bg-amber-500/20 blur-xl"></div>
              <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      type="text"
                      placeholder="Enter property address..."
                      className="pl-10 bg-black/30 border-white/20 h-12 w-full"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                  </div>
                  <Button
                    className="h-12 px-8 bg-amber-500 hover:bg-amber-600 text-black font-medium"
                    onClick={handlePropertySearch}
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? "Analyzing..." : "Pull My RoofFax"}
                  </Button>
                </div>
                <p className="text-xs text-gray-400 mt-3 text-center">
                  One free report per person or company. After that, the Pro Tools await.
                </p>
              </div>
            </div>
          </div>

          {/* Property Insights Section */}
          {showInsights && (
            <div className="max-w-4xl mx-auto mt-8 mb-16">
              <PropertyInsights
                insights={
                  propertyInsights || {
                    address: address,
                    roofCondition: "",
                    estimatedAge: "",
                    replacementCost: "",
                    stormRisk: "",
                    maintenanceRecommendations: [],
                    propertyValueImpact: "",
                    sustainabilityOptions: [],
                    confidence: 0,
                  }
                }
                isLoading={isAnalyzing}
              />
            </div>
          )}

          {/* Report Features */}
          <div className="max-w-4xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-amber-500/50 transition group">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
                <Cloud className="h-6 w-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Storm Tracking</h3>
              <p className="text-gray-400">Historical storm data and future predictions for your property location.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-amber-500/50 transition group">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Roof Age Estimates</h3>
              <p className="text-gray-400">AI-powered analysis to determine the approximate age of your roof.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-amber-500/50 transition group">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Contractor Suggestions</h3>
              <p className="text-gray-400">Vetted professionals in your area with ratings and specialties.</p>
            </div>
          </div>
        </section>

        {/* Time Capsule Section */}
        <section className="container mx-auto px-4 py-16 border-t border-white/10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Drop a Time Capsule</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Leave a message for the next homeowner or your future self. Your note will live in our RoofFacts
                database.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
              <Textarea
                placeholder="Share your home's story, maintenance tips, or a message to future owners..."
                className="bg-black/30 border-white/20 h-32 mb-4"
              />
              <div className="flex justify-end">
                <Button className="bg-white/10 hover:bg-white/20 text-white">Save to Time Capsule</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Trust the Fox Section */}
        <section className="container mx-auto px-4 py-16 border-t border-white/10">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Trust the Fox. Trust the Data.</h2>
              <p className="text-xl text-gray-300 mb-6">
                Like a seasoned scout guiding you through uncharted territory, RoofFax provides clarity in the chaos of
                homeownership data.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-400" />
                  <span>98% Accuracy Rate</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-amber-400" />
                  <span>Trusted by Pros</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="absolute inset-0 bg-amber-500/20 blur-xl"></div>
              <div className="relative w-full aspect-square max-w-sm mx-auto">
                <div className="w-full h-full bg-amber-500/10 rounded-full flex items-center justify-center">
                  <div className="text-amber-500 text-4xl font-bold">R</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pro Tools Section */}
        <section className="container mx-auto px-4 py-16 border-t border-white/10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Need More Than One Report?</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Unlock the full potential of RoofFax with our professional tools designed for serious users.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-amber-500/50 transition group">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-amber-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Property Insights</h3>
                <p className="text-gray-400 mb-4">
                  Advanced analytics and predictions based on comprehensive property data.
                </p>
                <div className="bg-black/30 rounded p-3 text-gray-500 text-sm">
                  <div className="blur-sm">Property value trend: +12% over 3 years</div>
                  <div className="blur-sm">Roof replacement ROI: 68.4%</div>
                  <div className="mt-2 text-amber-500 text-center">Unlock with Pro Tools</div>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-amber-500/50 transition group">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
                  <Download className="h-6 w-6 text-amber-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Unlimited RoofFax Pulls</h3>
                <p className="text-gray-400 mb-4">
                  Access property reports without limits. Perfect for professionals and investors.
                </p>
                <div className="bg-black/30 rounded p-3 text-gray-500 text-sm">
                  <div className="blur-sm">12 properties in watchlist</div>
                  <div className="blur-sm">Batch processing available</div>
                  <div className="mt-2 text-amber-500 text-center">Unlock with Pro Tools</div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button className="bg-amber-500 hover:bg-amber-600 text-black px-8 py-6 text-lg rounded-lg">
                Explore Pro Tools <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold text-sm">
                R
              </div>
              <span className="font-bold">RoofFax</span>
              <span className="text-sm text-gray-400 ml-4">© {new Date().getFullYear()} All rights reserved</span>
            </div>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition">
                Terms
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition">
                Contact
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition">
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
