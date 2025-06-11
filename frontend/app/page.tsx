"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Phone, MessageSquare, Bot, Zap, Shield, Clock, Send, Loader2 } from "lucide-react"

export default function HomePage() {
  const [smsMessage, setSmsMessage] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState("")

  const handleSmsTest = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!smsMessage.trim() || !phoneNumber.trim()) return

    setIsLoading(true)
    setResponse("")

    try {
      const formData = new FormData()
      formData.append("Body", smsMessage)
      formData.append("From", phoneNumber)

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/sms`, {
        method: "POST",
        body: formData,
      })


      const xmlResponse = await res.text()

      // Parse the XML response to extract the message
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(xmlResponse, "text/xml")
      const messageElement = xmlDoc.getElementsByTagName("Message")[0]
      const extractedMessage = messageElement?.textContent || "No response received"

      setResponse(extractedMessage)
    } catch (error) {
      setResponse("Error: Could not connect to the service. Make sure your Flask server is running on localhost:5000")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">AI Support</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
              Features
            </a>
            <a href="#demo" className="text-gray-600 hover:text-blue-600 transition-colors">
              Demo
            </a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            <Zap className="h-4 w-4 mr-1" />
            AI-Powered Support
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Intelligent SMS & Voice
            <span className="text-blue-600"> Support System</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Provide instant, intelligent customer support through SMS and voice calls. Powered by advanced AI to
            understand and respond to customer queries 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-3">
              <MessageSquare className="h-5 w-5 mr-2" />
              Try SMS Demo
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3">
              <Phone className="h-5 w-5 mr-2" />
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose AI Support?</h2>
            <p className="text-xl text-gray-600">Advanced features that make customer support effortless</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <MessageSquare className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>SMS Support</CardTitle>
                <CardDescription>Instant responses to customer queries via text messages</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Real-time message processing</li>
                  <li>• Natural language understanding</li>
                  <li>• Automated logging and tracking</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <Phone className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Voice Calls</CardTitle>
                <CardDescription>Interactive voice responses with speech recognition</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Speech-to-text conversion</li>
                  <li>• Natural voice responses</li>
                  <li>• Multi-language support</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <Bot className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>AI Intelligence</CardTitle>
                <CardDescription>Powered by advanced GPT models for accurate responses</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Context-aware responses</li>
                  <li>• Learning from interactions</li>
                  <li>• Customizable AI behavior</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Try the SMS Demo</h2>
            <p className="text-xl text-gray-600">Test our AI support system with a sample message</p>
          </div>

          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-6 w-6 mr-2 text-blue-600" />
                SMS Support Demo
              </CardTitle>
              <CardDescription>
                Send a test message to see how our AI responds. Make sure your Flask server is running on
                localhost:5000.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSmsTest} className="space-y-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1234567890"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Ask anything... e.g., 'When was Alexander the Great born?'"
                    value={smsMessage}
                    onChange={(e) => setSmsMessage(e.target.value)}
                    rows={3}
                    required
                  />
                </div>

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>

              {response && (
                <div className="mt-6">
                  <Separator className="mb-4" />
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">AI Response:</h4>
                    <p className="text-blue-800 whitespace-pre-wrap">{response}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Clock className="h-12 w-12 mx-auto mb-4 text-blue-200" />
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-blue-200">Always Available</div>
            </div>
            <div>
              <Zap className="h-12 w-12 mx-auto mb-4 text-blue-200" />
              <div className="text-3xl font-bold mb-2">&lt;2s</div>
              <div className="text-blue-200">Response Time</div>
            </div>
            <div>
              <Shield className="h-12 w-12 mx-auto mb-4 text-blue-200" />
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-blue-200">Secure & Private</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">Integrate our AI support system into your business today</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-3">
              Contact Sales
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3">
              View Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Bot className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold">AI Support</span>
            </div>
            <div className="text-gray-400 text-sm">© 2024 AI Support. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
