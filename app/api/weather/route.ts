// app/api/weather/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  // console.log("🌤️ Weather API Called:", { lat, lon });

  // Validasi parameters
  if (!lat || !lon) {
    return NextResponse.json(
      { error: "Latitude and longitude required" },
      { status: 400 }
    );
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;

  // console.log("🔑 API Key exists:", !!apiKey);
  // console.log("🔑 API Key length:", apiKey?.length);

  if (!apiKey) {
    return NextResponse.json(
      {
        error: "OpenWeather API key not configured",
        message: "Please check your .env.local file",
      },
      { status: 500 }
    );
  }

  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=id`;
    // console.log("🌐 Calling OpenWeather API:", apiUrl);

    const response = await fetch(apiUrl);

    // console.log("📡 Response status:", response.status);
    // console.log("📡 Response ok:", response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ OpenWeather API error:", errorText);

      throw new Error(
        `OpenWeather API error: ${response.status} - ${errorText}`
      );
    }

    const data = await response.json();
    console.log("✅ Weather data received:", {
      temp: data.main.temp,
      condition: data.weather[0].description,
      location: data.name,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("💥 Weather API fatal error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch weather data",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
