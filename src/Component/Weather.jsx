import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./weather.css";
import { AiOutlineSound } from "react-icons/ai";

function Weather() {
  let userCityRef = useRef(null);
  let [data, setData] = useState(null);
  let [altitude, setAltitude] = useState(null);
  let [icon, setIcon] = useState(null);
  let ref = useRef(null);
  let [celcius, setCelcius] = useState("");
  let [fahranhiet, setFahrenhiet] = useState("");

  // audio function
  let audioRef = useRef(null);
  let [isPlay, setIsPlay] = useState(true);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);
  const playPause = () => {
    if (audioRef.current) {
      if (isPlay) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlay(!isPlay)
    }
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
      setIcon(icon);
      // sea level pressure
      if (seaLevelPressure) {
        const altitude = 44330 * (1 - (seaLevelPressure / 1013.25) ** 0.1903);
        setAltitude(altitude.toFixed(2)); // Keeping two decimal places
      }
      text();
    } catch (e) {
      console.log(e);
    }
  };
  function Fahranhiet(celsius) {
    const fahrenheitValue = (celsius * 9) / 5 + 32;
    setFahrenheit(fahrenheitValue.toFixed(2));
  }
  return (
    <>
      <section
        className="vh-100"
        style={{
          background: "url(./src/assets/SFFd.gif)",
          // "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/draw1.webp)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <i className="fa-solid fa-volume-low" style={{color: "#fafcff"}}></i>
        <audio ref={audioRef} autoPlay loop>
          <source
            src="./src/assets/mixkit-bad-weather-heavy-rain-and-thunder-1261.wav"
            type="audio/wav"
          />
        </audio>
         <button onClick={playPause}>
          {isPlay ? 'Pause' : 'Play'}
        </button>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-8 col-lg-6 col-xl-4">
              <h2 className="mb-4 pb-2 fw-bold tracking-in-expand text-success">
                Check the weather forecast
              </h2>

              <div className="input-group rounded mb-3">
                <input
                  type="search"
                  className="form-control rounded"
                  placeholder="City"
                  aria-label="Search"
                  aria-describedby="search-addon"
                  ref={userCityRef}
                />
                <a href="#!" type="button">
                  <span
                    className="input-group-text border-0 fw-bold"
                    id="search-addon"
                    onClick={getCityName}
                  >
                    Check!
                  </span>
                </a>
              </div>

              {data && (
                <div
                  className="card shadow-0  fade-in-left "
                  style={{ backgroundColor: "gray" }}
                >
                  <div className="my-4 px-4">
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

                    <div className="form-check form-check-inline">
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
                        onClick={Fahranhiet}
                      >
                        Farenheit
                      </label>
                    </div>
                  </div>
                  <div className="card-body p-4">
                    <h4 className="mb-1 sfw-normal text-focus-in">
                      {data?.name}
                    </h4>
                    <p className="mb-2 ">
                      Current temperature:{" "}
                      <strong ref={ref}>{data?.main?.temp}°C</strong>
                    </p>
                    <p>
                      Feels like:{" "}
                      <strong ref={ref}>{data?.main?.feels_like}°C</strong>
                    </p>
                    <p>
                      Max: <strong ref={ref}>{data?.main?.temp_max}°C</strong>,
                      Min: <strong ref={ref}>{data?.main?.temp_min}°C</strong>
                    </p>
                    <p>
                      Humidity:{" "}
                      <strong ref={ref}>{data?.main?.humidity}</strong>
                    </p>
                    <p>
                      sea Level: <strong ref={ref}>{altitude}</strong>
                    </p>
                    <p>
                      Wind speed: <strong ref={ref}>{data?.wind?.speed}</strong>
                    </p>
                    <img src={`http://openweathermap.org/img/w/${icon}.png`} />

                    <div className="d-flex flex-row align-items-center">
                      <i
                        className="fas fa-cloud fa-3x"
                        style={{ color: "#eee" }}
                      ></i>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* <div>
        <section className="vh-100 sec" style={{backgroundColor:'white'}}>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-10 col-lg-8 col-xl-6">
                <div
                  className="card bg-dark text-white"
                  style={{borderRadius: '40px'}}
                >
                  <div className="bg-image" style={{borderRadius:' 35px'}}>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/draw1.webp"
                      className="card-img"
                      alt="weather"
                    />
                    <div
                      className="mask"
                      style={{backgroundColor: 'rgba(190, 216, 232, .5)'}}
                    ></div>
                  </div>
                  <div className="card-img-overlay text-dark p-5">
                    <h4 className="mb-0">Juneau, Alaska, US</h4>
                    <p className="display-2 my-3">1.28°C</p>
                    <p className="mb-2">
                      Feels Like: <strong>-1.08 °C</strong>
                    </p>
                    <h5>Snowy</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div> */}
    </>
  );
}

export default Weather;
