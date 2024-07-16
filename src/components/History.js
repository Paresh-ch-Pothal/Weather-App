import React, { useEffect, useState } from 'react'
import Loading from './Loading'

export default function History({ k,mode,type}) {
    const [location, setlocation] = useState({
        Name: "", region: "", country: "", longitude: "", latitude: "", timezone: ""
    })
    const [weather, setweather] = useState({
        maxtemp: "", mintemp: "", avgtemp: "", maxwind: "", avghum: "", condition: "", icon: ""
    })
    const [astro, setastro] = useState({
        sunrise: "", sunset: "", moonrise: "", moonset: "", moonphase: "", moonillu: ""
    })
    const [loading, setloading] = useState(false);

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
    const [city, setcity] = useState("bhubaneswar");
    const [date, setdate] = useState(formatDate(new Date()));
    const [hourlydata,sethourlydata]=useState([]);

    const searchhistory = (e) => {
        e.preventDefault();
        const cityn = e.target.elements.city.value.trim();
        const dates = e.target.elements.date.value.trim();
        if (cityn && dates) {
            setcity(cityn);
            setdate(formatDate(dates));
        }

    }
    const fetchdataH = async () => {
        try {
            const url = `https://api.weatherapi.com/v1/${type}.json?key=${k}&q=${city}&dt=${date}`;
            setloading(true);
            let data = await fetch(url);
            let jsondata = await data.json();
            setloading(false);
            setlocation({
                Name: jsondata.location.name,
                region: jsondata.location.region,
                country: jsondata.location.country,
                longitude: jsondata.location.lon,
                latitude: jsondata.location.lat,
                timezone: jsondata.location.tz_id
            });
            setweather({
                maxtemp: jsondata.forecast.forecastday[0].day.maxtemp_c,
                mintemp: jsondata.forecast.forecastday[0].day.mintemp_c,
                avgtemp: jsondata.forecast.forecastday[0].day.avgtemp_c,
                maxwind: jsondata.forecast.forecastday[0].day.maxwind_kph,
                avghum: jsondata.forecast.forecastday[0].day.avghumidity,
                condition: jsondata.forecast.forecastday[0].day.condition.text,
                icon: jsondata.forecast.forecastday[0].day.condition.icon
            })
            setastro({
                sunrise: jsondata.forecast.forecastday[0].astro.sunrise,
                sunset: jsondata.forecast.forecastday[0].astro.sunset,
                moonrise: jsondata.forecast.forecastday[0].astro.moonrise,
                moonset: jsondata.forecast.forecastday[0].astro.moonset,
                moonphase: jsondata.forecast.forecastday[0].astro.moon_phase,
                moonillu: jsondata.forecast.forecastday[0].astro.moon_illumination
            })
            sethourlydata(jsondata.forecast.forecastday[0].hour);

        } catch (error) {
            setlocation({
                Name: "No-data",
                region: "No-data",
                country: "No-data",
                longitude: "No-data",
                latitude: "No-data",
                timezone: "No-data"
            });
            setweather({
                maxtemp: "No-data",
                mintemp: "No-data",
                avgtemp: "No-data",
                maxwind: "No-data",
                avghum: "No-data",
                condition: "No-data",
                icon: "",
            })
            setastro({
                sunrise: "No-data",
                sunset: "No-data",
                moonrise: "No-data",
                moonset: "No-data",
                moonphase: "No-data",
                moonillu: "No-data"
            })
            sethourlydata([]);
        }

    }
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    useEffect(() => {
        fetchdataH();
        // eslint-disable-next-line
    }, [city, date])
    return (
        <>
            <div className="text-center my-3">{loading && <Loading />}</div>
            <h1 className={`text-center text-${mode === 'light' ? 'dark' : 'light'}`} >Weather Forecast: {capitalizeFirstLetter(type)}</h1>
            <div className="container history-input">
                <form className="d-flex History-search my-3" onSubmit={searchhistory} role="search">
                    <input className="form-control me-2" name='city' type="search" placeholder="Search" aria-label="Search" />
                    <input className="form-control me-2" name='date' type="date" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
            <div className="container history-card">
                <div className={`card bg-${mode}`} style={{ border: "1px solid black", padding: "30px" }}>
                    <div className="card-body">
                        <h1 className={`text-center text-${mode === 'light' ? 'dark' : 'light'}`}>Location</h1>
                        <div className={`card-text t1 text-${mode === 'light' ? 'dark' : 'light'}`}>Name: {location.Name} </div>
                        <div className={`card-text t1 text-${mode === 'light' ? 'dark' : 'light'}`}>Region: {location.region} </div>
                        <div className={`card-text t1 text-${mode === 'light' ? 'dark' : 'light'}`}>Counrty: {location.country}</div>
                        <div className={`card-text t1 text-${mode === 'light' ? 'dark' : 'light'}`}>Longitude: {location.longitude}</div>
                        <div className={`card-text t1 text-${mode === 'light' ? 'dark' : 'light'}`}>Latitude: {location.latitude}</div>
                        <div className={`card-text t1 text-${mode === 'light' ? 'dark' : 'light'}`}>Time Zone: {location.timezone}</div>
                    </div>
                </div>
                <div className={`card bg-${mode}`} style={{ border: "1px solid black", padding: "30px" }}>
                    <img src={weather.icon} className="card-img-top" alt="" />
                    <div className="card-body">
                        <div className={`card-text t2 text-${mode === 'light' ? 'dark' : 'light'}`}>Max Temp(&deg;C): {weather.maxtemp}</div>
                        <div className={`card-text t2 text-${mode === 'light' ? 'dark' : 'light'}`}>Min Temp(&deg;C): {weather.mintemp}</div>
                        <div className={`card-text t2 text-${mode === 'light' ? 'dark' : 'light'}`}>Avg Temp(&deg;C): {weather.avgtemp}</div>
                        <div className={`card-text t2 text-${mode === 'light' ? 'dark' : 'light'}`}>Max wind(mph): {weather.maxwind}</div>
                        <div className={`card-text t2 text-${mode === 'light' ? 'dark' : 'light'}`}>Avg Humidity: {weather.avghum}</div>
                        <div className={`card-text t2 text-${mode === 'light' ? 'dark' : 'light'}`}>condition: {weather.condition}</div>
                    </div>
                </div>
                <div className={`card bg-${mode}`} style={{ border: "1px solid black", padding: "30px" }}>
                    <div className="card-body">
                        <h1 className={`text-center text-${mode === 'light' ? 'dark' : 'light'}`}>Astro</h1>
                        <div className={`card-text t2 text-${mode === 'light' ? 'dark' : 'light'}`}>Sunrise: {astro.sunrise}</div>
                        <div className={`card-text t2 text-${mode === 'light' ? 'dark' : 'light'}`}>Sunset:  {astro.sunset}</div>
                        <div className={`card-text t2 text-${mode === 'light' ? 'dark' : 'light'}`}>Moonrise: {astro.moonrise}</div>
                        <div className={`card-text t2 text-${mode === 'light' ? 'dark' : 'light'}`}>Moonset: {astro.moonset}</div>
                        <div className={`card-text t2 text-${mode === 'light' ? 'dark' : 'light'}`}>Moon Phase: {astro.moonphase}</div>
                        <div className={`card-text t2 text-${mode === 'light' ? 'dark' : 'light'}`}>Moon illumination: {astro.moonillu}</div>
                    </div>
                </div>
            </div>
            
                {hourlydata.length > 0 && (
                    <div className="container container-hd ">
                        {hourlydata.map((hour,index)=>{
                            return(<div className="card  hourly-data" key={index}>
                            <div className={`bg-${mode} card-header text-${mode === 'light' ? 'dark' : 'light'}`}>
                                {hour.time}
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className={`list-group-item bg-${mode}`}>
                                    <img src={hour.condition.icon} alt="" width="30" height="30" />
                                </li>
                                <li className={`bg-${mode} list-group-item text-${mode === 'light' ? 'dark' : 'light'}`}>{hour.temp_c} &deg;C</li>
                            </ul>
                        </div>)
                        })}
                    </div>
                )}
        </>
    )
}
