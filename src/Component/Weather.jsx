import React from "react";

function Weather() {
  return (
    <>
      <section
        className="vh-100"
        style={{
          backgroundImage:
            "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/draw1.webp)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-8 col-lg-6 col-xl-4">
              <h3 className="mb-4 pb-2 fw-normal">
                Check the weather forecast
              </h3>

              <div className="input-group rounded mb-3">
                <input
                  type="search"
                  className="form-control rounded"
                  placeholder="City"
                  aria-label="Search"
                  aria-describedby="search-addon"
                />
                <a href="#!" type="button">
                  <span
                    className="input-group-text border-0 fw-bold"
                    id="search-addon"
                  >
                    Check!
                  </span>
                </a>
              </div>

              <div className="mb-4 pb-2">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="option1"
                    checked
                  />
                  <label className="form-check-label" htmlFor="inlineRadio1">
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
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    Farenheit
                  </label>
                </div>
              </div>

              <div className="card shadow-0 border">
                <div className="card-body p-4">
                  <h4 className="mb-1 sfw-normal">New York, US</h4>
                  <p className="mb-2">
                    Current temperature: <strong>5.42°C</strong>
                  </p>
                  <p>
                    Feels like: <strong>4.37°C</strong>
                  </p>
                  <p>
                    Max: <strong>6.11°C</strong>, Min: <strong>3.89°C</strong>
                  </p>

                  <div className="d-flex flex-row align-items-center">
                    <p className="mb-0 me-4">Scattered Clouds</p>
                    <i
                      className="fas fa-cloud fa-3x"
                      style={{ color: "#eee" }}
                    ></i>
                  </div>
                </div>
              </div>
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
