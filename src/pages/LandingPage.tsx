import React from 'react'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Cloud, Thermometer, MapPin, History, Shield, Zap, Globe, Users } from 'lucide-react'
import HeroSection from '@/components/hero-section'
import WeatherSearchBar from '@/components/WeatherSearchBar'

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-bold text-xl text-blue-600">DevClimate</div>
          <div className="flex items-center gap-3">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm" className="font-medium text-black hover:bg-gray-100">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm" className="bg-black hover:bg-gray-800 text-white font-medium">
                  Get Started
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link to="/dashboard">
                <Button variant="outline" size="sm" className="font-medium border-black text-black hover:bg-black hover:text-white">
                  Dashboard
                </Button>
              </Link>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8"
                  }
                }}
              />
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Search Section */}
      <section className="pt-24 pb-6">
        <div className="max-w-md mx-auto px-6">
          <WeatherSearchBar />
        </div>
      </section>

      {/* Hero Section */}
      <div className="pb-8">
        <HeroSection />
      </div>

      {/* Features Section */}
      <section className="pt-12 pb-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose DevClimate?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get accurate, real-time weather data with powerful features designed for developers and weather enthusiasts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Cloud className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Real-Time Data</CardTitle>
                <CardDescription>
                  Get up-to-the-minute weather information from reliable sources worldwide.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Global Coverage</CardTitle>
                <CardDescription>
                  Search weather conditions for any city around the world with comprehensive coverage.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <History className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Search History</CardTitle>
                <CardDescription>
                  Keep track of all your weather searches with detailed history and easy management.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Secure & Private</CardTitle>
                <CardDescription>
                  Your data is protected with enterprise-grade security and privacy controls.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Optimized for speed with instant search results and smooth user experience.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-cyan-600" />
                </div>
                <CardTitle>Developer Friendly</CardTitle>
                <CardDescription>
                  Built by developers, for developers, with clean APIs and comprehensive documentation.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Weather Info Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Comprehensive Weather Information</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Get detailed weather insights including temperature, humidity, wind speed, pressure, and more.
                Our platform provides everything you need to stay informed about weather conditions.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Thermometer className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="font-medium">Temperature & Feels Like</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Cloud className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="font-medium">Weather Conditions & Descriptions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Globe className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="font-medium">Humidity, Pressure & Wind Data</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center gap-3">
                    <Cloud className="h-8 w-8 text-blue-500" />
                    <div>
                      <h3 className="font-semibold">New York</h3>
                      <p className="text-sm text-muted-foreground">Partly Cloudy</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">22°C</div>
                    <div className="text-sm text-muted-foreground">Feels like 25°C</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center gap-3">
                    <Cloud className="h-8 w-8 text-gray-500" />
                    <div>
                      <h3 className="font-semibold">London</h3>
                      <p className="text-sm text-muted-foreground">Overcast</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">15°C</div>
                    <div className="text-sm text-muted-foreground">Feels like 13°C</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center gap-3">
                    <Cloud className="h-8 w-8 text-yellow-500" />
                    <div>
                      <h3 className="font-semibold">Tokyo</h3>
                      <p className="text-sm text-muted-foreground">Sunny</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">28°C</div>
                    <div className="text-sm text-muted-foreground">Feels like 31°C</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of users who trust DevClimate for accurate weather information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignedOut>
              <SignUpButton mode="modal">
                <Button size="lg" variant="secondary">
                  Create Free Account
                </Button>
              </SignUpButton>
              <SignInButton mode="modal">
                <Button size="lg" variant="outline">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link to="/dashboard">
                <Button size="lg" variant="secondary">
                  Go to Dashboard
                </Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted/30 border-t">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="font-bold text-xl text-primary mb-4 md:mb-0">DevClimate</div>
            <div className="text-sm text-muted-foreground">
              © 2025 DevClimate. Built with ❤️ for weather enthusiasts.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage