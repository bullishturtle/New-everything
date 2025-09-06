"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Briefcase, DollarSign, Calendar, TrendingUp, Clock, CheckCircle2, Plus } from "lucide-react"
import Link from "next/link"

// Mock data - replace with real data from your API
const dashboardStats = {
  totalLeads: 24,
  activeJobs: 12,
  monthlyRevenue: 45600,
  scheduledToday: 8,
  leadsThisWeek: 6,
  jobsCompleted: 156,
  avgJobValue: 3800,
  customerSatisfaction: 4.8,
}

const recentLeads = [
  { id: 1, name: "Sarah Johnson", phone: "(555) 123-4567", source: "Website", status: "new", value: 2500 },
  { id: 2, name: "Mike Chen", phone: "(555) 987-6543", source: "Referral", status: "contacted", value: 4200 },
  { id: 3, name: "Lisa Rodriguez", phone: "(555) 456-7890", source: "Google Ads", status: "qualified", value: 3100 },
]

const upcomingJobs = [
  {
    id: 1,
    customer: "Johnson Residence",
    address: "123 Oak St",
    time: "9:00 AM",
    type: "Inspection",
    status: "scheduled",
  },
  {
    id: 2,
    customer: "Smith Property",
    address: "456 Pine Ave",
    time: "1:00 PM",
    type: "Repair",
    status: "in_progress",
  },
  { id: 3, customer: "Davis Home", address: "789 Elm Dr", time: "3:30 PM", type: "Replacement", status: "scheduled" },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back! Here's what's happening with your business.</p>
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/dashboard/leads/new">
              <Plus className="h-4 w-4 mr-2" />
              New Lead
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/jobs/new">
              <Plus className="h-4 w-4 mr-2" />
              New Job
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.totalLeads}</div>
            <p className="text-xs text-green-400">+{dashboardStats.leadsThisWeek} this week</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.activeJobs}</div>
            <p className="text-xs text-gray-400">{dashboardStats.scheduledToday} scheduled today</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${dashboardStats.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-green-400">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Job Value</CardTitle>
            <Calendar className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${dashboardStats.avgJobValue.toLocaleString()}</div>
            <p className="text-xs text-gray-400">{dashboardStats.jobsCompleted} jobs completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Leads</CardTitle>
                <CardDescription>Latest prospects and their status</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/leads">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium">{lead.name}</p>
                        <p className="text-sm text-gray-400">{lead.phone}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {lead.source}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${lead.value.toLocaleString()}</p>
                    <Badge
                      variant={
                        lead.status === "new" ? "default" : lead.status === "qualified" ? "secondary" : "outline"
                      }
                      className="text-xs"
                    >
                      {lead.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>Upcoming appointments and jobs</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/calendar">View Calendar</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingJobs.map((job) => (
                <div key={job.id} className="flex items-center gap-4 p-3 rounded-lg bg-white/5">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/20">
                    {job.status === "completed" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                    ) : job.status === "in_progress" ? (
                      <Clock className="h-5 w-5 text-amber-400" />
                    ) : (
                      <Calendar className="h-5 w-5 text-blue-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{job.customer}</p>
                        <p className="text-sm text-gray-400">{job.address}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{job.time}</p>
                        <Badge variant="outline" className="text-xs">
                          {job.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
              <Link href="/dashboard/leads/new">
                <Users className="h-6 w-6" />
                Add Lead
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
              <Link href="/dashboard/jobs/new">
                <Briefcase className="h-6 w-6" />
                Create Job
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
              <Link href="/dashboard/estimates/new">
                <DollarSign className="h-6 w-6" />
                New Estimate
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
              <Link href="/dashboard/calendar">
                <Calendar className="h-6 w-6" />
                Schedule
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
