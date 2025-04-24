"use client"
import Navbar from "@/components/Navbar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format, parseISO } from "date-fns";
import Image from "next/image";


//https://api.openweathermap.org/data/2.5/forecast?q=Nairobi&appid=7de7cf8bfa58b6cb0f7431e6626b8049
// Root interface
interface WeatherForecast {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastEntry[];
  city: CityInfo;
}

// Forecast for a single 3-hour block
interface ForecastEntry {
  dt: number;
  main: MainWeatherData;
  weather: WeatherDescription[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: RainData;
  sys: TimeOfDay;
  dt_txt: string;
}

// Temperature and pressure information
interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

// Weather description
interface WeatherDescription {
  id: number;
  main: string;
  description: string;
  icon: string;
}

// Cloud cover info
interface Clouds {
  all: number;
}

// Wind details
interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

// Rain data (optional, only present if it rained)
interface RainData {
  ['3h']: number;
}

// Whether it's day or night
interface TimeOfDay {
  pod: 'd' | 'n';
}

// City info
interface CityInfo {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export default function Home() {
  const { isPending, error, data } = useQuery<WeatherForecast>({
    queryKey: ["repoData"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=Nairobi&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=40`
      );
      return data;
    },    
  });
  
  const firstData = data?.list[0];
  console.log("data", data);

  if (isPending) return(
    <div className="flex items-center min-h-screen justify-center"> 
    <p className="animate-bounce">Loading...</p>
    </div>
  );
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {/*today data*/}
        <section></section>
        <div className="">
          <h2 className="flex gap-1 text-2x1 items-end">
            <p>{format(parseISO(firstData?.dt_txt ??''),'EEEE')}</p>
            <p>{format(parseISO(firstData?.dt_txt ??''),'dd/MM/yyyy')}</p>
          </h2>
          <div></div>

        </div>
        {/* 7 day forecast data*/}
        <section></section>
      </main>
    </div>
  );
}
