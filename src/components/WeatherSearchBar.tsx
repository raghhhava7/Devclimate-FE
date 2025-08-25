import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, MapPin } from 'lucide-react'

const WeatherSearchBar: React.FC = () => {
  const [city, setCity] = useState('')
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!city.trim()) return

    if (user) {
      // If user is signed in, navigate to dashboard with search query
      navigate(`/dashboard?search=${encodeURIComponent(city.trim())}`)
    } else {
      // If user is not signed in, store the search query and redirect to login
      localStorage.setItem('pendingSearch', city.trim())
      navigate('/login')
    }
  }

  return (
    <form onSubmit={handleSearch} className="relative">
      <div className="relative flex items-center">
        <MapPin className="absolute left-3 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="pl-10 pr-24 h-12 text-base border-2 focus:border-primary"
        />
        <Button 
          type="submit" 
          size="sm" 
          className="absolute right-1 h-10"
          disabled={!city.trim()}
        >
          <Search className="h-4 w-4 mr-1" />
          Search
        </Button>
      </div>
      
      {!user && (
        <p className="text-sm text-muted-foreground mt-2 text-center">
          Sign in to search weather for any city worldwide
        </p>
      )}
    </form>
  )
}

export default WeatherSearchBar