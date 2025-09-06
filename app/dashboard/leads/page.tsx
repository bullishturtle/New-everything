"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, Search, Filter, MoreHorizontal, Phone, Mail, MapPin, Eye, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

// Mock data - replace with real data from your API
const leads = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "(555) 123-4567",
    address: "123 Oak Street, Springfield, IL",
    source: "Website",
    status: "new",
    estimatedValue: 2500,
    createdAt: "2024-01-15",
    assignedTo: "John Doe",
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike.chen@email.com",
    phone: "(555) 987-6543",
    address: "456 Pine Avenue, Springfield, IL",
    source: "Referral",
    status: "contacted",
    estimatedValue: 4200,
    createdAt: "2024-01-14",
    assignedTo: "Jane Smith",
  },
  {
    id: 3,
    name: "Lisa Rodriguez",
    email: "lisa.rodriguez@email.com",
    phone: "(555) 456-7890",
    address: "789 Elm Drive, Springfield, IL",
    source: "Google Ads",
    status: "qualified",
    estimatedValue: 3100,
    createdAt: "2024-01-13",
    assignedTo: "John Doe",
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david.wilson@email.com",
    phone: "(555) 321-0987",
    address: "321 Maple Lane, Springfield, IL",
    source: "Cold Call",
    status: "proposal_sent",
    estimatedValue: 5800,
    createdAt: "2024-01-12",
    assignedTo: "Jane Smith",
  },
]

const statusColors = {
  new: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  contacted: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  qualified: "bg-green-500/20 text-green-400 border-green-500/30",
  proposal_sent: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  won: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  lost: "bg-red-500/20 text-red-400 border-red-500/30",
}

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Leads</h1>
          <p className="text-gray-400 mt-1">Manage your prospects and potential customers</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/leads/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Lead
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">24</div>
            <p className="text-sm text-gray-400">Total Leads</p>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">8</div>
            <p className="text-sm text-gray-400">New This Week</p>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">65%</div>
            <p className="text-sm text-gray-400">Conversion Rate</p>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">$3,800</div>
            <p className="text-sm text-gray-400">Avg Lead Value</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/5 border-white/10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Status: {statusFilter === "all" ? "All" : statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-900 border-white/10">
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>All Statuses</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem onClick={() => setStatusFilter("new")}>New</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("contacted")}>Contacted</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("qualified")}>Qualified</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("proposal_sent")}>Proposal Sent</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle>All Leads ({filteredLeads.length})</CardTitle>
          <CardDescription>Manage and track your sales prospects</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                <TableHead>Lead</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id} className="border-white/10">
                  <TableCell>
                    <div>
                      <div className="font-medium">{lead.name}</div>
                      <div className="text-sm text-gray-400 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {lead.address.split(",")[0]}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3" />
                        {lead.phone}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <Mail className="h-3 w-3" />
                        {lead.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{lead.source}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[lead.status as keyof typeof statusColors]}>
                      {lead.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">${lead.estimatedValue.toLocaleString()}</TableCell>
                  <TableCell className="text-sm text-gray-400">{lead.assignedTo}</TableCell>
                  <TableCell className="text-sm text-gray-400">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-gray-900 border-white/10" align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Lead
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Phone className="mr-2 h-4 w-4" />
                          Call Lead
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem className="text-red-400">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Lead
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
