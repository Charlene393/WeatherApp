"use client"
import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import WeatherDetails from "@/components/WeatherDeatils";
import WeatherIcon from "@/components/WeatherIcon";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import { convertWindSpeed } from "@/utils/convertWindspeed";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";
import { meterToKilometer } from "@/utils/meterToKilometer";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format, fromUnixTime, parseISO } from "date-fns";
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
        <section className="space-y-4">
        <div className="space-y-2">
          <h2 className="flex gap-1 text-6x1 items-end">
            <p>{format(parseISO(firstData?.dt_txt ??''),'EEEE')}</p>
            <p className="text-sm">({format(parseISO(firstData?.dt_txt ??''),'dd/MM/yyyy')})</p>
          </h2>
          <Container className="gap-10 px-10 gap-y-2 items-center">
            <div className="flex flex-col px-4">
              <span className="text-5xl">
              {convertKelvinToCelsius(firstData?.main.temp ?? 0)}°
              </span>
              <p className="text-xs space-x-l whitespace-nowrap">
                <span> Feels like</span>
                <span>
              {convertKelvinToCelsius(firstData?.main.feels_like?? 0)}°
              </span>
              </p>
              <p className="text-xs space-x-2">
                <span>
                  {convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}°↓{""}
                </span>
                <span>
                  {""}
                  {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}°↑
                </span>
              </p>
            </div>
            {/*Time and Weather Icon*/}

            <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
              {data?.list.map((d,index)=>
              <div 
              key={index}
              className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
              >
                <p className="whitespace-nowrap">
                  {format(parseISO(d.dt_txt),'h:mm a')}
                </p>

              {/*<WeatherIcon iconname={d.weather[0].icon} />*/}
              <WeatherIcon iconname={getDayOrNightIcon(d.weather[0].icon,d.dt_txt)}/>
                <p>{convertKelvinToCelsius(d?.main.temp ?? 0)}°</p>
              </div>
              )}
            </div>
            </Container>
            </div>
          <div className="flex gap-4">
            {/*left side*/}
            <Container className="w-fit justify-center flex-col px-4 items-center">
            <p className="capitalize text-center">{firstData?.weather[0].description}</p> 
            <WeatherIcon
            iconname={getDayOrNightIcon
              (firstData?.weather[0].icon ?? "", firstData?.dt_txt?? "")}
            />
            </Container>
            {/*Right side*/}
            <Container className="bg-yellow-300/80 px-6 gap-4 justify-between overflow-x-auto ">
            <WeatherDetails 
            visibility={meterToKilometer(firstData?.visibility ?? 10000)}
            airPressure={`${firstData?.main.pressure} hPa`}
            humidity={`${firstData?.main.humidity} %`}
            windSpeed={convertWindSpeed(firstData?.wind.speed ?? 1.64)}
            sunrise={format(fromUnixTime(data?.city.sunrise ?? 1702949452 ), "H:mm")}
            sunset={format(fromUnixTime(data?.city.sunset ?? 1702982652), "H:mm")}
            />
              </Container>


        </div>
        </section>
        {/* 7 day forecast data*/}
        <section className="flex w-full flex-col gap-4">
          <p className="text-2xl">Forecast (7 days)</p>
        </section>
      </main>
    </div>
  );
}
