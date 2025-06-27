"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Download, FileText, Users, DollarSign, TrendingUp, Clock, Star, Loader2 } from "lucide-react"
import { format } from "date-fns"

interface ReportConfig {
  title: string
  description: string
  reportType: string
  dateRange: { start: Date | undefined; end: Date | undefined }
  metrics: string[]
  exportFormat: string
}

const reportTypes = [
  { value: "visitor_analytics", label: "Visitor Analytics", description: "Analyze visitor patterns and demographics" },
  { value: "revenue_report", label: "Revenue Report", description: "Financial performance and revenue analysis" },
  { value: "performance_summary", label: "Performance Summary", description: "Overall attraction performance metrics" },
  { value: "seasonal_analysis", label: "Seasonal Analysis", description: "Seasonal trends and patterns" },
]

const availableMetrics = [
  { id: "visitor_count", label: "Total Visitors", icon: Users },
  { id: "revenue", label: "Revenue", icon: DollarSign },
  { id: "avg_rating", label: "Average Rating", icon: Star },
  { id: "peak_hours", label: "Peak Hours", icon: Clock },
  { id: "visitor_growth", label: "Visitor Growth", icon: TrendingUp },
]

const exportFormats = [
  { value: "pdf", label: "PDF Document" },
  { value: "excel", label: "Excel Spreadsheet" },
  { value: "csv", label: "CSV Data" },
]

const recentReports = [
  {
    id: 1,
    title: "Monthly Visitor Report",
    type: "Visitor Analytics",
    date: "2024-01-15",
    status: "completed",
    downloads: 23,
  },
  {
    id: 2,
    title: "Q4 Revenue Analysis",
    type: "Revenue Report",
    date: "2024-01-10",
    status: "completed",
    downloads: 45,
  },
  {
    id: 3,
    title: "Performance Summary",
    type: "Performance Summary",
    date: "2024-01-08",
    status: "processing",
    downloads: 0,
  },
]

export function OwnerReports() {
  const [config, setConfig] = useState<ReportConfig>({
    title: "",
    description: "",
    reportType: "",
    dateRange: { start: undefined, end: undefined },
    metrics: [],
    exportFormat: "pdf",
  })
  const [isGenerating, setIsGenerating] = useState(false)

  const handleMetricToggle = (metricId: string) => {
    setConfig((prev) => ({
      ...prev,
      metrics: prev.metrics.includes(metricId)
        ? prev.metrics.filter((m) => m !== metricId)
        : [...prev.metrics, metricId],
    }))
  }

  const handleGenerate = async () => {
    if (!config.title || !config.reportType || !config.dateRange.start || !config.dateRange.end) {
      alert("Please fill in all required fields")
      return
    }

    setIsGenerating(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))
      alert("Report generated successfully!")
      // Reset form
      setConfig({
        title: "",
        description: "",
        reportType: "",
        dateRange: { start: undefined, end: undefined },
        metrics: [],
        exportFormat: "pdf",
      })
    } catch (error) {
      alert("Failed to generate report")
    } finally {
      setIsGenerating(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Completed</Badge>
      case "processing":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Processing</Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground">Generate detailed reports for your attractions</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Report Generator */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Generate New Report
              </CardTitle>
              <CardDescription>Create custom reports for your attraction performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Report Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter report title"
                    value={config.title}
                    onChange={(e) => setConfig((prev) => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Report Type *</Label>
                  <Select
                    value={config.reportType}
                    onValueChange={(value) => setConfig((prev) => ({ ...prev, reportType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div>
                            <div className="font-medium">{type.label}</div>
                            <div className="text-xs text-muted-foreground">{type.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Describe the purpose of this report..."
                  value={config.description}
                  onChange={(e) => setConfig((prev) => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Date Range *</Label>
                <div className="grid gap-2 sm:grid-cols-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="justify-start">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {config.dateRange.start ? format(config.dateRange.start, "PPP") : "Start date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={config.dateRange.start}
                        onSelect={(date) =>
                          setConfig((prev) => ({
                            ...prev,
                            dateRange: { ...prev.dateRange, start: date },
                          }))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="justify-start">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {config.dateRange.end ? format(config.dateRange.end, "PPP") : "End date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={config.dateRange.end}
                        onSelect={(date) =>
                          setConfig((prev) => ({
                            ...prev,
                            dateRange: { ...prev.dateRange, end: date },
                          }))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Metrics to Include</Label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {availableMetrics.map((metric) => (
                    <div key={metric.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <Checkbox
                        id={metric.id}
                        checked={config.metrics.includes(metric.id)}
                        onCheckedChange={() => handleMetricToggle(metric.id)}
                      />
                      <div className="flex items-center gap-2 flex-1">
                        <metric.icon className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor={metric.id} className="text-sm font-medium cursor-pointer">
                          {metric.label}
                        </Label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Export Format</Label>
                <Select
                  value={config.exportFormat}
                  onValueChange={(value) => setConfig((prev) => ({ ...prev, exportFormat: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {exportFormats.map((format) => (
                      <SelectItem key={format.value} value={format.value}>
                        {format.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={
                  !config.title ||
                  !config.reportType ||
                  !config.dateRange.start ||
                  !config.dateRange.end ||
                  isGenerating
                }
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Report...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Generate Report
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Reports */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>Your recently generated reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{report.title}</h4>
                      <p className="text-sm text-muted-foreground">{report.type}</p>
                    </div>
                    {getStatusBadge(report.status)}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{report.date}</span>
                    <span>{report.downloads} downloads</span>
                  </div>
                  {report.status === "completed" && (
                    <Button size="sm" variant="outline" className="w-full">
                      <Download className="h-3 w-3 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
