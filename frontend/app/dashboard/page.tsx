"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Phone, MessageSquare, Bot, Activity, Clock, Send, Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Interaction {
  id: string
  type: "sms" | "voice"
  from: string
  message: string
  response: string
  timestamp: string
}

export default function DashboardPage() {
  const [interactions, setInteractions] = useState<Interaction[]>([])
  const [testMessage, setTestMessage] = useState("")
  const [testPhone, setTestPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [lastResponse, setLastResponse] = useState("")

  // Mock data for demonstration
  useEffect(() => {
    const mockInteractions: Interaction[] = [
      {
        id: "1",
        type: "sms",
        from: "+1234567890",
        message: "When was Alexander the Great born?",
        response: "Alexander the Great was born on July 20 or 21, 356 BC.",
        timestamp: new Date().toISOString(),
      },
      {
        id: "2",
        type: "voice",
        from: "+0987654321",
        message: "What are your business hours?",
        response: "Our business hours are Monday to Friday, 9 AM to 6 PM EST.",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
    ]
    setInteractions(mockInteractions)
  }, [])

  const handleTestSms = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!testMessage.trim() || !testPhone.trim()) return

    setIsLoading(true)
    setLastResponse("")

    try {
      const formData = new FormData()
      formData.append("Body", testMessage)
      formData.append("From", testPhone)

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/sms`, {
        method: "POST",
        body: formData,
      })

      const xmlResponse = await res.text()

      // Parse the XML response
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(xmlResponse, "text/xml")
      const messageElement = xmlDoc.getElementsByTagName("Message")[0]
      const extractedMessage = messageElement?.textContent || "No response received"

      setLastResponse(extractedMessage)

      // Add to interactions list
      const newInteraction: Interaction = {
        id: Date.now().toString(),
        type: "sms",
        from: testPhone,
        message: testMessage,
        response: extractedMessage,
        timestamp: new Date().toISOString(),
      }
      setInteractions((prev) => [newInteraction, ...prev])

      // Clear form
      setTestMessage("")
      setTestPhone("")
    } catch (error) {
      setLastResponse("Error: Could not connect to the service. Make sure your Flask server is running.")
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Bot className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">AI Support Dashboard</span>
              </div>
            </div>
            <Badge variant="secondary" className="flex items-center">
              <Activity className="h-4 w-4 mr-1" />
              Live
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Interactions</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{interactions.length}</div>
              <p className="text-xs text-muted-foreground">+12% from last hour</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">SMS Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{interactions.filter((i) => i.type === "sms").length}</div>
              <p className="text-xs text-muted-foreground">Active conversations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Voice Calls</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{interactions.filter((i) => i.type === "voice").length}</div>
              <p className="text-xs text-muted-foreground">Completed calls</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.2s</div>
              <p className="text-xs text-muted-foreground">-0.3s from yesterday</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Test Interface */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Send className="h-5 w-5 mr-2 text-blue-600" />
                Test SMS Interface
              </CardTitle>
              <CardDescription>Send test messages to your AI support system</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTestSms} className="space-y-4">
                <div>
                  <label htmlFor="test-phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    id="test-phone"
                    type="tel"
                    placeholder="+1234567890"
                    value={testPhone}
                    onChange={(e) => setTestPhone(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="test-message" className="block text-sm font-medium text-gray-700 mb-2">
                    Test Message
                  </label>
                  <Textarea
                    id="test-message"
                    placeholder="Enter your test message..."
                    value={testMessage}
                    onChange={(e) => setTestMessage(e.target.value)}
                    rows={3}
                    required
                  />
                </div>

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Test Message
                    </>
                  )}
                </Button>
              </form>

              {lastResponse && (
                <div className="mt-4">
                  <Separator className="mb-4" />
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Latest Response:</h4>
                    <p className="text-green-800 text-sm whitespace-pre-wrap">{lastResponse}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Interactions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-green-600" />
                Recent Interactions
              </CardTitle>
              <CardDescription>Latest customer interactions with your AI support</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {interactions.map((interaction) => (
                  <div key={interaction.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {interaction.type === "sms" ? (
                          <MessageSquare className="h-4 w-4 text-blue-600" />
                        ) : (
                          <Phone className="h-4 w-4 text-green-600" />
                        )}
                        <Badge variant={interaction.type === "sms" ? "default" : "secondary"}>
                          {interaction.type.toUpperCase()}
                        </Badge>
                      </div>
                      <span className="text-xs text-gray-500">{formatTime(interaction.timestamp)}</span>
                    </div>

                    <div className="text-sm">
                      <div className="text-gray-600">From: {interaction.from}</div>
                      <div className="mt-1">
                        <span className="font-medium">Message:</span> {interaction.message}
                      </div>
                      <div className="mt-1 p-2 bg-gray-50 rounded text-gray-700">
                        <span className="font-medium">AI Response:</span> {interaction.response}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
