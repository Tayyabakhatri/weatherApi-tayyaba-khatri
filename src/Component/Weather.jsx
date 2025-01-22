import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./weather.css";
// import { AiOutlineSound } from "react-icons/ai";

function Weather() {
  let userCityRef = useRef(null);
  let [data, setData] = useState(null);
  let [altitude, setAltitude] = useState(null);
  let [icon, setIcon] = useState(null);
  let ref = useRef(null);
  let [fahranhiet, setFahrenhiet] = useState("");
  let [error, setError] = useState(null);
console.log(icon);

  // audio function
  let audioRef = useRef(null);
  let [isPlay, setIsPlay] = useState("");
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
    setIsPlay(isPlay);
  }, []);
  const pause = () => {
    if (audioRef.current) {
      if (isPlay) {
        audioRef.current.pause();
      }
    }
    setIsPlay(!isPlay);
  };
  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
    setIsPlay(isPlay);
  };
  function text() {
    useEffect(() => {
      // Element ko reference ke zariye access karein
      if (ref.current) {
        elementRef.current.classList.add("text-focus-in"); // Example: Color change
      }
    }, []);
  }

  const getCityName = async () => {
    let cityName = userCityRef.current.value;

    let APIkey = "8609ff3b0e5801e5636c55836b57d5bf";
    try {
      const weatherAPI = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}&units=metric`
      );
      let weatherData = weatherAPI.data;
      console.log(weatherData);

      setData(weatherData);
      let seaLevelPressure = weatherData?.main?.sea_level;
      let icon = weatherData?.Weather?.[0].icon;
      // sea level pressure
      if (seaLevelPressure) {
        const altitude = 44330 * (1 - (seaLevelPressure / 1013.25) ** 0.1903);
        setAltitude(altitude.toFixed(2)); // Keeping two decimal places
      }
      text();
      return setIcon(icon);
    } catch (e) {
      
      
      let err = e.code;
      console.log(err);
     return setError(err);
     
    }
  };
  console.log(error);
  

  function Fahranhiet(celsius) {
    const fahrenheitValue = (celsius * 9) / 5 + 32;
    setFahrenhiet(fahrenheitValue.toFixed(2));
  }
  return (
    <>
      <section
        className="vh-100"
        style={{
          background: "url(public/SFFd.gif)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <audio ref={audioRef} autoPlay loop>
          <source
            src="./src/assets/mixkit-bad-weather-heavy-rain-and-thunder-1261.wav"
            type="audio/wav"
          />
        </audio>
        <div className="container  h-100">
          <div className="d-flex gap-3 pt-4">
            <i
              className="fa-solid fa-volume-low"
              onClick={pause}
              style={{ color: "#fafcff" }}
            ></i>
            <i
              className="fa-solid fa-volume-high"
              onClick={play}
              style={{ color: "#fafcff" }}
            ></i>
          </div>
          <div className="text-center">
            <h1 className="mb-4 pb-2 fw-bold tracking-in-expand text-white">
              Check the weather forecast
            </h1>
          </div>
          <div className="input-group rounded mb-3 gap-5">
          
            <input
              type="search"
              className="form-control rounded "
              style={{ background: "#F7F7F7" }}
              placeholder="City"
              aria-label="Search"
              aria-describedby="search-addon"
              ref={userCityRef}
            />
            <a href="#!" type="button">
              <span
                className="input-group-text border-0 fw-bold  "
                id="search-addon"
                onClick={getCityName}
              >
                search
              </span>
            </a>
          </div>

          {error && (
            <div
              className="text-white text-center"
              style={{ fontSize: "40px" }}
            >
              {error}
            </div>
          )}

          {/* <div className="row d-flex justify-content-center align-items-center "> */}
            {data && (
            <div
              className="card shadow-0 mt-5  fade-in-left "
              style={{ backgroundColor:'#8fa8d3c4'}}
            >
              <div className="my-4 px-4 " >
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="option1"
                    checked
                  />
                  <label
                    className="form-check-label text-dark"
                    htmlFor="inlineRadio1"
                  >
                    Celsius
                  </label>
                </div>

                {/* <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="option2"
                  />
                  <label
                    className="form-check-label text-dark"
                    htmlFor="inlineRadio2"
                   
                  >
                    Farenheit
                  </label>
                </div> */}
              </div>
              <div className="card-body p-4" style={{fontSize:'20px', fontWeight:''}}>
                <h1 className="mb-1 sfw-normal text-focus-in" id="h1">{data?.name}</h1>
                <p className="mb-2 ">
                  Current temperature:{" "}
                  <strong ref={ref}>{data?.main?.temp}°C</strong>
                </p>
                <p>
                  Feels like:{" "}
                  <strong ref={ref}>{data?.main?.feels_like}°C</strong>
                </p>
                <p>
                  Max: <strong ref={ref}>{data?.main?.temp_max}°C</strong>, Min:{" "}
                  <strong ref={ref}>{data?.main?.temp_min}°C</strong>
                </p>
                <p>
                  Humidity: <strong ref={ref}>{data?.main?.humidity}</strong>
                </p>
                <p>
                  sea Level: <strong ref={ref}>{altitude}</strong>
                </p>
                <p>
                  Wind speed: <strong ref={ref}>{data?.wind?.speed}</strong>
                </p>
                <img src={`http://openweathermap.org/img/w/${icon}.png`} />

                {/* <div className="d-flex flex-row align-items-center">
                  <i
                    className="fas fa-cloud fa-3x"
                    style={{ color: "#eee" }}
                  ></i>
                </div> */}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Weather;
