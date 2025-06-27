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
import { CalendarIcon, Download, FileText, BarChart3, Users, DollarSign } from "lucide-react"
import { format } from "date-fns"
import { mockReports } from "@/data/mock-database-data"

interface ReportConfig {
  title: string
  description: string
  reportType: string
  dateRange: { start: Date | undefined; end: Date | undefined }
  metrics: string[]
  attractions: string[]
  exportFormat: string
}

export function ReportGenerator() {
  const [config, setConfig] = useState<ReportConfig>({
    title: "",
    description: "",
    reportType: "",
    dateRange: { start: undefined, end: undefined },
    metrics: [],
    attractions: [],
    exportFormat: "pdf",
  })

  const [isGenerating, setIsGenerating] = useState(false)

  const availableMetrics = [
    { id: "visitor_count", label: "Visitor Count", icon: Users, query: "COUNT(Visit.VisitorID)" },
    { id: "revenue", label: "Revenue", icon: DollarSign, query: "SUM(Visit.Amount)" },
    { id: "avg_duration", label: "Average Duration", icon: BarChart3, query: "AVG(Visit.Duration)" },
    { id: "rating", label: "Average Rating", icon: BarChart3, query: "AVG(Visit.Rating)" },
    {
      id: "capacity_utilization",
      label: "Capacity Utilization",
      icon: BarChart3,
      query: "COUNT(*)/Attraction.Capacity",
    },
  ]

  const reportTypes = [
    { value: "tourism_trend", label: "Tourism Trend Analysis" },
    { value: "revenue", label: "Revenue Performance" },
    { value: "visitor_demographics", label: "Visitor Demographics" },
    { value: "attraction_comparison", label: "Attraction Comparison" },
    { value: "custom", label: "Custom Report" },
  ]

  const exportFormats = [
    { value: "pdf", label: "PDF Document" },
    { value: "excel", label: "Excel Spreadsheet" },
    { value: "csv", label: "CSV Data" },
    { value: "powerpoint", label: "PowerPoint Presentation" },
  ]

  const handleMetricToggle = (metricId: string) => {
    setConfig((prev) => ({
      ...prev,
      metrics: prev.metrics.includes(metricId)
        ? prev.metrics.filter((m) => m !== metricId)
        : [...prev.metrics, metricId],
    }))
  }

  const handleGenerateReport = async () => {
    setIsGenerating(true)

    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newReport = {
      reportId: mockReports.length + 1,
      reportType: config.reportType,
      title: config.title,
      description: config.description,
      generatedDate: new Date().toISOString().split("T")[0],
      authorityId: 1,
      reportData: {
        metrics: config.metrics,
        dateRange: config.dateRange,
        attractions: config.attractions,
        exportFormat: config.exportFormat,
        queries: config.metrics.map((metricId) => {
          const metric = availableMetrics.find((m) => m.id === metricId)
          return {
            metric: metricId,
            query: `SELECT ${metric?.query} FROM Visit JOIN Attraction ON Visit.AttractionID = Attraction.AttractionID WHERE VisitDate BETWEEN '${config.dateRange.start?.toISOString().split("T")[0]}' AND '${config.dateRange.end?.toISOString().split("T")[0]}'`,
          }
        }),
      },
    }

    console.log("Generated report:", newReport)
    setIsGenerating(false)

    // Reset form
    setConfig({
      title: "",
      description: "",
      reportType: "",
      dateRange: { start: undefined, end: undefined },
      metrics: [],
      attractions: [],
      exportFormat: "pdf",
    })
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Report Generator
          </CardTitle>
          <CardDescription>Create custom reports based on database queries and analytics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Report Title</Label>
            <Input
              id="title"
              placeholder="Enter report title..."
              value={config.title}
              onChange={(e) => setConfig((prev) => ({ ...prev, title: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the purpose and scope of this report..."
              value={config.description}
              onChange={(e) => setConfig((prev) => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label>Report Type</Label>
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
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Date Range</Label>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex-1">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {config.dateRange.start ? format(config.dateRange.start, "PPP") : "Start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={config.dateRange.start}
                    onSelect={(date) =>
                      setConfig((prev) => ({ ...prev, dateRange: { ...prev.dateRange, start: date } }))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex-1">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {config.dateRange.end ? format(config.dateRange.end, "PPP") : "End date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={config.dateRange.end}
                    onSelect={(date) => setConfig((prev) => ({ ...prev, dateRange: { ...prev.dateRange, end: date } }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
            onClick={handleGenerateReport}
            disabled={!config.title || !config.reportType || isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>Generating Report...</>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Generate Report
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Metrics Selection</CardTitle>
          <CardDescription>Choose which metrics to include in your report</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {availableMetrics.map((metric) => (
              <div key={metric.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                <Checkbox
                  id={metric.id}
                  checked={config.metrics.includes(metric.id)}
                  onCheckedChange={() => handleMetricToggle(metric.id)}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <metric.icon className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor={metric.id} className="font-medium">
                      {metric.label}
                    </Label>
                  </div>
                  <div className="text-xs text-muted-foreground font-mono mt-1">{metric.query}</div>
                </div>
              </div>
            ))}
          </div>

          {config.metrics.length > 0 && (
            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <Label className="text-sm font-medium">Selected Metrics:</Label>
              <div className="flex flex-wrap gap-1 mt-2">
                {config.metrics.map((metricId) => {
                  const metric = availableMetrics.find((m) => m.id === metricId)
                  return (
                    <Badge key={metricId} variant="secondary">
                      {metric?.label}
                    </Badge>
                  )
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
