import React from "react";
import { FiDroplet } from "react-icons/fi";
import { ImMeter } from "react-icons/im";
import { LuEye, LuSunrise, LuSunset } from "react-icons/lu";
import { MdAir } from "react-icons/md";

export interface WeatherDetailsProps{
    visibility : string;
    humidity : string;
    windSpeed : string;
    airPressure : string;
    sunrise : string;
    sunset : string;
}
export default function WeatherDetails(props: WeatherDetailsProps) {

    const{
        visibility = "25km",
        humidity = "50%",
        windSpeed = "10km/h",
        airPressure = "1013hPa",
        sunrise = "6:00 AM",
        sunset = "6:00 PM",
    } = props
    return (
        <>
        <SingleWeatherDetailsProps
        icon ={<LuEye />}
        information="Visibility"
        value={props.visibility}
        />
        <SingleWeatherDetailsProps
        icon ={<FiDroplet />}
        information="Humidity"
        value={props.humidity}
        />
        <SingleWeatherDetailsProps
        icon ={<MdAir/>}
        information="Wind Speed"
        value={props.windSpeed}
        />
        <SingleWeatherDetailsProps
        icon ={<ImMeter/>}
        information="Air Pressure"
        value={props.airPressure}
        />
        <SingleWeatherDetailsProps
        icon ={<LuSunrise/>}
        information="Sunrise"
        value={props.sunrise}
        />
        <SingleWeatherDetailsProps
        icon ={<LuSunset/>}
        information="Sunset"
        value={props.sunset}
        />
        </>
        
    )
}
export interface SingleWeatherDetailsProps{
    information: string;
    icon: React.ReactNode;
    value:string
}

function SingleWeatherDetailsProps(props: SingleWeatherDetailsProps) {
    return (
        <div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black.80">
            <p className="whitespace-nowrap">{props.information}</p>
            <div className="text-3xl">{props.icon}</div>
            <p>{props.value}</p>
        </div>
    )

}