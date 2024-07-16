import React, { useState, useEffect } from 'react'
import Loading from './Loading'

export default function Weather({ k, mode }) {
    //location
    const [loading, setloading] = useState(true);
    const [city, setcity] = useState("bhubaneswar");

    const [location, setlocation] = useState({
        Name: "",
        Region: "",
        Country: "",
        Longitude: "",
        Latitude: "",
        TimeZone: ""
    })
    const [temp, settemp] = useState({
        Temperature: "",
        FeelsLike: "",
        Condition: "",
        LastUpd: "",
        icon: ""
    })
    const [wind, setwind] = useState({
        WindSpeed: "",
        WindDeg: "",
        WindDire: "",
        Humidity: ""
    })
    const searchcity = (e) => {
        e.preventDefault();
        const cityn = e.target.elements.city.value.trim();
        console.log(cityn);
        if (cityn) {
            setcity(cityn);
        }
    }
    const fetchdata = async (city) => {
        try {
            const url = `https://api.weatherapi.com/v1/current.json?key=${k}&q=${city}`;
            setloading(true);
            const data = await fetch(url);
            // console.log(data);
            const jsondata = await data.json();
            // console.log(jsondata);
            setloading(false);
            setlocation({
                Name: jsondata.location.name,
                Region: jsondata.location.region,
                Country: jsondata.location.country,
                Longitude: jsondata.location.lon,
                Latitude: jsondata.location.lat,
                TimeZone: jsondata.location.tz_id
            })
            settemp({
                Temperature: jsondata.current.temp_c,
                FeelsLike: jsondata.current.feelslike_c,
                Condition: jsondata.current.condition.text,
                LastUpd: jsondata.current.last_updated,
                icon: jsondata.current.condition.icon,
            })
            setwind({
                WindSpeed: jsondata.current.wind_mph,
                WindDeg: jsondata.current.wind_degree,
                WindDire: jsondata.current.wind_dir,
                Humidity: jsondata.current.humidity
            })
        } catch (error) {
            setlocation({
                Name: "unknown",
                Region: "unknown",
                Country: "unknown",
                Longitude: "unknown",
                Latitude: "unknown",
                TimeZone: "unknown"
            })
            settemp({
                Temperature: "unknown",
                FeelsLike: "unknown",
                Condition: "unknown",
                LastUpd: "unknown",
                icon: "https://www.shareicon.net/download/2016/08/20/817729_close_395x512.png",
            })
            setwind({
                WindSpeed: "unknown",
                WindDeg: "unknown",
                WindDire: "unknown",
                Humidity: "unknown"
            })
        }

    }
    useEffect(() => {
        if (city) {
            fetchdata(city);
        }
    }, [city]);
    return (
        <>
            <div className="text-center my-3">{loading && <Loading />}</div>
            <h1 className={`text-center text-${mode === 'light' ? 'dark' : 'light'}`} >Weather Forecast: Daily Updated Weather</h1>
            <div className="searchbutton my-2">
                <form className="d-flex my-2" onSubmit={searchcity} role="search">
                    <input className="form-control me-2" name="city" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
            <div className="container container-w d-flex justify-content-center align-items-center my-3">

                <div className={`card bg-${mode}`} >
                    <div className="card-body">
                        <h1 className={`text-center text-${mode === 'light' ? 'dark' : 'light'}`}>Location</h1>
                        <div className={`card-text text-${mode === 'light' ? 'dark' : 'light'} t1`}>Name: {location.Name}</div>
                        <div className={`card-text text-${mode === 'light' ? 'dark' : 'light'} t1`}>Region: {location.Region} </div>
                        <div className={`card-text text-${mode === 'light' ? 'dark' : 'light'} t1`}>Counrty: {location.Country} </div>
                        <div className={`card-text text-${mode === 'light' ? 'dark' : 'light'} t1`}>Longitude: {location.Longitude}</div>
                        <div className={`card-text text-${mode === 'light' ? 'dark' : 'light'} t1`}>Latitude: {location.Latitude}</div>
                        <div className={`card-text text-${mode === 'light' ? 'dark' : 'light'} t1`}>Time Zone: {location.TimeZone}</div>
                    </div>
                </div>
                <div className={`card bg-${mode}`} >
                    <img src={temp.icon} className="card-img-top" alt="" />
                    <div className="card-body">
                        <div className={`card-text text-${mode === 'light' ? 'dark' : 'light'} t2`}>Temperature (&deg;C): {temp.Temperature}</div>
                        <div className={`card-text text-${mode === 'light' ? 'dark' : 'light'} t2`}>Feels like (&deg;C): {temp.FeelsLike}</div>
                        <div className={`card-text text-${mode === 'light' ? 'dark' : 'light'} t2`}>Condition: {temp.Condition}</div>
                        <p className={`card-text text-${mode === 'light' ? 'dark' : 'light'} t2`}><p className="text-body-secondary">Last Updated: {temp.LastUpd}</p></p>
                    </div>
                </div>
                <div className={`card bg-${mode}`} >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Wind_vane_05643.jpg" className="card-img-top" alt="" />
                    <div className="card-body">
                        <div className={`card-text text-${mode === 'light' ? 'dark' : 'light'} t3`}>Wind Speed (kph): {wind.WindSpeed}</div>
                        <div className={`card-text text-${mode === 'light' ? 'dark' : 'light'} t3`}>Wind Degree: {wind.WindDeg}</div>
                        <div className={`card-text text-${mode === 'light' ? 'dark' : 'light'} t3`}>Wind Direction: {wind.WindDire}</div>
                        <div className={`card-text text-${mode === 'light' ? 'dark' : 'light'} t3`}>Humidity: {wind.Humidity}</div>
                        <p className={`card-text text-${mode === 'light' ? 'dark' : 'light'} t3`}><small className="text-body-secondary">Last Updated: {temp.LastUpd}</small></p>
                    </div>
                </div>
            </div>
        </>
    )
}
