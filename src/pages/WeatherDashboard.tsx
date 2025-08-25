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

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  const fetchWeatherSearches = async (page = 1) => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/api/weather?page=${page}&limit=5`, {
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
      const response = await fetch(`${API_BASE_URL}/api/weather/${searchId}`, {
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
      const response = await fetch(`${API_BASE_URL}/api/weather/current/${encodeURIComponent(cityName.trim())}`, {
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
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Weather Dashboard</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Welcome back, {user?.username || 'User'}!</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <Link to="/" className="flex-1 sm:flex-none">
              <Button variant="ghost" size="sm" className="font-medium text-black hover:bg-gray-100 w-full sm:w-auto text-xs sm:text-sm">
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Home</span>
              </Button>
            </Link>
            <Button variant="outline" onClick={logout} size="sm" className="text-xs sm:text-sm px-2 sm:px-4">
              Sign Out
            </Button>
          </div>
        </div>

        {/* Weather Search */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Search className="h-4 w-4 sm:h-5 sm:w-5" />
              Search Weather
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Enter a city name to get current weather information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Input
                placeholder="Enter city name..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && searchWeather()}
                className="flex-1 text-sm sm:text-base"
              />
              <Button onClick={searchWeather} disabled={loading || !city.trim()} className="w-full sm:w-auto text-sm sm:text-base">
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Weather History */}
        <Card>
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl">Recent Searches</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Your weather search history
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading && searches.length === 0 ? (
              <div className="text-center py-6 sm:py-8 text-sm sm:text-base">Loading...</div>
            ) : searches.length === 0 ? (
              <div className="text-center py-6 sm:py-8 text-muted-foreground text-sm sm:text-base">
                No weather searches yet. Try searching for a city above!
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {searches.map((search) => (
                  <div
                    key={search._id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg gap-3 sm:gap-4"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                      <Cloud className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-sm sm:text-base truncate">{search.city}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {new Date(search.timestamp).toLocaleDateString()} at{' '}
                          {new Date(search.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6">
                      <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm flex-wrap">
                        <div className="flex items-center gap-1">
                          <Thermometer className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{search.temperature}°C</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Droplets className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{search.humidity}%</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Wind className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{search.windSpeed} km/h</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between w-full sm:w-auto gap-2">
                        <div className="text-xs sm:text-sm font-medium truncate flex-1 sm:flex-none">{search.description}</div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteSearch(search._id)}
                          className="p-1 sm:p-2 flex-shrink-0"
                        >
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-2 mt-4 sm:mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fetchWeatherSearches(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-full sm:w-auto text-xs sm:text-sm"
                >
                  Previous
                </Button>
                <span className="flex items-center px-2 sm:px-4 text-xs sm:text-sm order-first sm:order-none">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fetchWeatherSearches(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-full sm:w-auto text-xs sm:text-sm"
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