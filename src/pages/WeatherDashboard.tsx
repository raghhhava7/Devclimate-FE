import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useSearchParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Trash2, Search, Cloud, Thermometer, Droplets, Wind, ArrowLeft } from 'lucide-react'

interface WeatherData {
  _id: string
  city: string
  temperature: number
  description: string
  humidity: number
  windSpeed: number
  timestamp: string
}

interface WeatherResponse {
  searches: WeatherData[]
  currentPage: number
  totalPages: number
  totalSearches: number
}

const WeatherDashboard: React.FC = () => {
  const { user, token, logout } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searches, setSearches] = useState<WeatherData[]>([])
  const [loading, setLoading] = useState(false)
  const [city, setCity] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const API_BASE_URL = 'http://localhost:5000/api'

  const fetchWeatherSearches = async (page = 1) => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/weather?page=${page}&limit=5`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data: WeatherResponse = await response.json()
        setSearches(data.searches)
        setCurrentPage(data.currentPage)
        setTotalPages(data.totalPages)
      }
    } catch (error) {
      console.error('Error fetching weather searches:', error)
    } finally {
      setLoading(false)
    }
  }

  const searchWeather = async () => {
    if (!city.trim()) return
    
    await searchWeatherForCity(city.trim())
    setCity('') // Clear the input after search
  }

  const deleteSearch = async (searchId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/weather/${searchId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        fetchWeatherSearches(currentPage)
      }
    } catch (error) {
      console.error('Error deleting weather search:', error)
    }
  }

  useEffect(() => {
    fetchWeatherSearches()
    
    // Handle search from URL parameters
    const searchQuery = searchParams.get('search')
    if (searchQuery) {
      setCity(searchQuery)
      // Auto-search when coming from landing page
      setTimeout(() => {
        searchWeatherForCity(searchQuery)
      }, 500)
      // Clear the search parameter
      setSearchParams({})
    }
    
    // Handle pending search from localStorage
    const pendingSearch = localStorage.getItem('pendingSearch')
    if (pendingSearch) {
      setCity(pendingSearch)
      // Auto-search the pending query
      setTimeout(() => {
        searchWeatherForCity(pendingSearch)
      }, 500)
      // Clear the pending search
      localStorage.removeItem('pendingSearch')
    }
  }, [searchParams, setSearchParams])

  const searchWeatherForCity = async (cityName: string) => {
    if (!cityName.trim()) return

    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/weather/current/${encodeURIComponent(cityName.trim())}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        fetchWeatherSearches(1)
      } else {
        const errorData = await response.json()
        alert(errorData.error || 'Failed to fetch weather data')
      }
    } catch (error) {
      console.error('Error fetching weather data:', error)
      alert('Failed to fetch weather data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Weather Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.username || 'User'}!</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="sm" className="font-medium text-black hover:bg-gray-100">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Button variant="outline" onClick={logout}>
              Sign Out
            </Button>
          </div>
        </div>

        {/* Weather Search */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Weather
            </CardTitle>
            <CardDescription>
              Enter a city name to get current weather information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Enter city name..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && searchWeather()}
                className="flex-1"
              />
              <Button onClick={searchWeather} disabled={loading || !city.trim()}>
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Weather History */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Searches</CardTitle>
            <CardDescription>
              Your weather search history
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading && searches.length === 0 ? (
              <div className="text-center py-8">Loading...</div>
            ) : searches.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No weather searches yet. Try searching for a city above!
              </div>
            ) : (
              <div className="space-y-4">
                {searches.map((search) => (
                  <div
                    key={search._id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <Cloud className="h-8 w-8 text-blue-500" />
                      <div>
                        <h3 className="font-semibold">{search.city}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(search.timestamp).toLocaleDateString()} at{' '}
                          {new Date(search.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Thermometer className="h-4 w-4" />
                          {search.temperature}°C
                        </div>
                        <div className="flex items-center gap-1">
                          <Droplets className="h-4 w-4" />
                          {search.humidity}%
                        </div>
                        <div className="flex items-center gap-1">
                          <Wind className="h-4 w-4" />
                          {search.windSpeed} km/h
                        </div>
                      </div>
                      <div className="text-sm font-medium">{search.description}</div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteSearch(search._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fetchWeatherSearches(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="flex items-center px-4 text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fetchWeatherSearches(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default WeatherDashboard