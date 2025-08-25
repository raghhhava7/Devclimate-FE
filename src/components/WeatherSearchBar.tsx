import React, { useState } from 'react'
import { useAuth, SignInButton } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, MapPin } from 'lucide-react'

const WeatherSearchBar: React.FC = () => {
  const [city, setCity] = useState('')
  const { isSignedIn } = useAuth()
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!city.trim()) return

    if (isSignedIn) {
      // If user is signed in, navigate to dashboard with search query
      navigate(`/dashboard?search=${encodeURIComponent(city.trim())}`)
    } else {
      // If user is not signed in, store the search query and show sign in modal
      localStorage.setItem('pendingSearch', city.trim())
      // The SignInButton will handle opening the modal
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
        {isSignedIn ? (
          <Button 
            type="submit" 
            size="sm" 
            className="absolute right-1 h-10"
            disabled={!city.trim()}
          >
            <Search className="h-4 w-4 mr-1" />
            Search
          </Button>
        ) : (
          <SignInButton mode="modal">
            <Button 
              type="button" 
              size="sm" 
              className="absolute right-1 h-10"
              disabled={!city.trim()}
            >
              <Search className="h-4 w-4 mr-1" />
              Search
            </Button>
          </SignInButton>
        )}
      </div>
      
      {!isSignedIn && (
        <p className="text-sm text-muted-foreground mt-2 text-center">
          Sign in to search weather for any city worldwide
        </p>
      )}
    </form>
  )
}

export default WeatherSearchBar