'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface WeatherData {
  temp: number;
  condition: string;
  location: string;
  humidity: number;
  loading: boolean;
  error?: string;
}

const FIXED_PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: [10, 25, 40, 55, 70, 85, 15, 30, 45, 60, 75, 90, 20, 35, 50, 65, 80, 95, 5, 95][i],
  top: [20, 35, 50, 65, 80, 25, 40, 55, 70, 85, 30, 45, 60, 75, 90, 15, 40, 65, 10, 85][i],
  duration: 3 + (i % 3),
  delay: (i % 4) * 0.5
}));

export default function PortfolioEntry() {
  const [weather, setWeather] = useState<WeatherData>({
    temp: 0,
    condition: '',
    location: '',
    humidity: 0,
    loading: true
  });

  const [currentTime, setCurrentTime] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get user location and real weather data
  useEffect(() => {
    if (!isClient) return;

    const getWeather = async () => {
      try {
        // Step 1: Get user location
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 10000,
            enableHighAccuracy: false
          });
        });

        const { latitude, longitude } = position.coords;

        // Step 2: Get city name from coordinates (Reverse Geocoding)
        const reverseGeoResponse = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=id`
        );
        const locationData = await reverseGeoResponse.json();
        const city = locationData.city || locationData.locality || 'Lokasi Anda';

        // Step 3: Get weather data from OpenWeatherMap
        // GANTI YOUR_API_KEY dengan API key asli Anda
        const weatherResponse = await fetch(
          `/api/weather?lat=${latitude}&lon=${longitude}`
        );

        if (!weatherResponse.ok) {
          throw new Error('Weather data not available');
        }

        const weatherData = await weatherResponse.json();

        setWeather({
          temp: Math.round(weatherData.main.temp),
          condition: weatherData.weather[0].description,
          location: city,
          humidity: weatherData.main.humidity,
          loading: false
        });

      } catch (error) {
        console.log('Error getting weather:', error);

        // Fallback data
        setWeather({
          temp: 28,
          condition: 'Cerah',
          location: 'Jakarta',
          humidity: 75,
          loading: false,
          error: 'Gagal mendapatkan data cuaca real'
        });
      }
    };

    getWeather();
  }, [isClient]);

  // Update time - hanya di client
  useEffect(() => {
    if (!isClient) return;

    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [isClient]);

  const getWeatherEmoji = (condition: string) => {
    const conditionLower = condition.toLowerCase();

    if (conditionLower.includes('cerah') || conditionLower.includes('clear')) return '☀️';
    if (conditionLower.includes('awan') || conditionLower.includes('cloud')) return '⛅';
    if (conditionLower.includes('hujan') || conditionLower.includes('rain')) return '🌧️';
    if (conditionLower.includes('gerimis') || conditionLower.includes('drizzle')) return '🌦️';
    if (conditionLower.includes('badai') || conditionLower.includes('storm')) return '⛈️';
    if (conditionLower.includes('salju') || conditionLower.includes('snow')) return '❄️';
    if (conditionLower.includes('kabut') || conditionLower.includes('fog')) return '🌫️';

    return '🌈';
  };

  const getWeatherMessage = (temp: number, condition: string) => {
    if (temp > 30) return "☀️ Hari yang panas! Perfect untuk coding dengan AC!";
    if (temp < 20) return "❄️ Dingin sekali! Cocok untuk coding dengan secangkir kopi hangat!";
    if (condition.toLowerCase().includes('hujan')) return "🌧️ Hari hujan! Waktu yang tepat untuk indoor coding!";
    return "💻 Cuaca sempurna untuk development!";
  };

  // Loading state untuk server rendering
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">

      {/* Animated Background Elements - FIXED POSITIONS */}
      <div className="absolute inset-0">
        {/* Floating particles dengan posisi fixed */}
        {FIXED_PARTICLES.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 min-h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Side - Portfolio Intro */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-white space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block"
            >
              <div className="text-amber-400 text-sm font-mono bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                👋 Hello, Welcome!
              </div>
            </motion.div>

            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-5xl lg:text-6xl font-bold leading-tight"
            >
              I&#39;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-400">Andri</span>
            </motion.h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-300 leading-relaxed"
            >
              Creative <span className="text-amber-300">Fullstack Developer</span> dengan passion
              dalam menciptakan pengalaman digital yang menarik dan functional.
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link href="/home">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full font-semibold transition-colors shadow-lg"
                >
                  🚀 Explore Portfolio
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-amber-400/30 hover:border-amber-400/60 text-amber-300 px-8 py-3 rounded-full font-semibold transition-colors backdrop-blur-sm"
              >
                📧 Contact Me
              </motion.button>
            </motion.div>

            {/* Tech Stack Badges */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-3 pt-6"
            >
              {['Next.js', 'React', 'TypeScript', 'Node.js', 'Laravel'].map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm border border-white/20"
                >
                  {tech}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Weather Widget */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              {/* Widget Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-white font-semibold text-lg">Cuaca Lokal</h3>
                  <p className="text-gray-300 text-sm">{currentTime}</p>
                </div>
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="text-3xl"
                >
                  🌍
                </motion.div>
              </div>

              {/* Weather Content */}
              {weather.loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-400 mx-auto"></div>
                  <p className="text-gray-300 mt-2">Mendeteksi lokasi...</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="text-5xl"
                    >
                      {getWeatherEmoji(weather.condition)}
                    </motion.div>
                    <div className="text-right">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-3xl font-bold text-white"
                      >
                        {weather.temp}°C
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-amber-300 font-medium capitalize"
                      >
                        {weather.condition}
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-gray-300 text-sm mt-1"
                      >
                        📍 {weather.location}
                      </motion.div>
                    </div>
                  </div>

                  {/* Weather Details */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10"
                  >
                    <div className="text-center">
                      <div className="text-gray-300 text-sm">Kelembapan</div>
                      <div className="text-white font-semibold">{weather.humidity}%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-300 text-sm">Terasa seperti</div>
                      <div className="text-white font-semibold">{weather.temp + 2}°C</div>
                    </div>
                  </motion.div>

                  {/* Fun Message */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center mt-4 pt-4 border-t border-white/10"
                  >
                    <p className="text-amber-300 text-sm">
                      {getWeatherMessage(weather.temp, weather.condition)}
                    </p>
                    {weather.error && (
                      <p className="text-red-300 text-xs mt-2">{weather.error}</p>
                    )}
                  </motion.div>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}