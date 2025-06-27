"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ReportGenerator } from "@/components/reports/report-generator"
import { FileText, Download, Eye, Calendar, User } from "lucide-react"
import { mockReports } from "@/data/mock-database-data"

export function ReportsManagement() {
  const downloadReport = (reportId: number) => {
    console.log(`Downloading report ${reportId}`)
    // In real app, this would trigger file download
  }

  const viewReport = (reportId: number) => {
    console.log(`Viewing report ${reportId}`)
    // In real app, this would open report viewer
  }

  return (
    <div className="space-y-6">
      {/* Report Generator */}
      <ReportGenerator />

      {/* Existing Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generated Reports
          </CardTitle>
          <CardDescription>Previously generated reports based on database analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockReports.map((report) => (
              <div key={report.reportId} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{report.title}</h4>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                  </div>
                  <Badge variant="outline">{report.reportType.replace("_", " ")}</Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Generated: {new Date(report.generatedDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    Authority ID: {report.authorityId}
                  </div>
                </div>

                {report.reportData && (
                  <div className="bg-muted/50 p-3 rounded text-xs">
                    <strong>Report Summary:</strong>
                    <div className="mt-1">
                      {typeof report.reportData === "object" && report.reportData.summary && (
                        <p>{report.reportData.summary}</p>
                      )}
                      {typeof report.reportData === "object" && report.reportData.keyFindings && (
                        <div className="mt-2">
                          <strong>Key Findings:</strong>
                          <ul className="list-disc list-inside mt-1">
                            {report.reportData.keyFindings.map((finding: string, index: number) => (
                              <li key={index}>{finding}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => viewReport(report.reportId)}>
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button size="sm" onClick={() => downloadReport(report.reportId)}>
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Report Templates</CardTitle>
          <CardDescription>Pre-configured report templates for common analytics needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Monthly Tourism Summary",
                description: "Comprehensive monthly overview of all tourism metrics",
                queries: ["visitor_count", "revenue_analysis", "attraction_performance"],
                frequency: "Monthly",
              },
              {
                name: "Attraction Performance Report",
                description: "Detailed analysis of individual attraction performance",
                queries: ["visit_patterns", "revenue_per_attraction", "capacity_utilization"],
                frequency: "Weekly",
              },
              {
                name: "Visitor Demographics Analysis",
                description: "Deep dive into visitor demographics and behavior patterns",
                queries: ["age_distribution", "geographic_origins", "visit_duration"],
                frequency: "Quarterly",
              },
              {
                name: "Revenue Optimization Report",
                description: "Analysis focused on revenue streams and optimization opportunities",
                queries: ["revenue_trends", "pricing_analysis", "seasonal_patterns"],
                frequency: "Monthly",
              },
            ].map((template, index) => (
              <Card key={index} className="p-4">
                <h4 className="font-medium mb-2">{template.name}</h4>
                <p className="text-sm text-muted-foreground mb-3">{template.description}</p>

                <div className="space-y-2 mb-3">
                  <div className="text-xs font-medium">Database Queries:</div>
                  <div className="flex flex-wrap gap-1">
                    {template.queries.map((query, qIndex) => (
                      <Badge key={qIndex} variant="secondary" className="text-xs">
                        {query.replace("_", " ")}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{template.frequency}</span>
                  <Button size="sm" variant="outline">
                    Use Template
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
