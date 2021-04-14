import React from 'react'
import { isMobile, isTablet } from 'react-device-detect'
import { Container, Segment } from 'semantic-ui-react'
import moment from 'moment'
import Images from '../images/weather-animated/index'
import '../owm-left.css'
import '../owm-right.css'

function WeatherWidget({ weather, unit, activeItem, country }) {
  const tempStyle = {
    fontSize: '12px',
    stroke: 'rgb(51, 51, 51)',
    fill: 'rgb(51, 51, 51)',
  }

  const code = weather.current.weather[0].icon
  const icon = Images[code].path

  return isMobile || isTablet ? (
    <div className="widget-right weather-right--type1 widget-right--brown">
      <div className="widget-right__header widget-right__header--brown">
        <div className="widget-right__layout">
          <div>
            <h2 className="widget-right__title">{country.capital} </h2>
            <p>{weather.current.weather[0].description} </p>
          </div>
        </div>
        <img
          src={icon}
          width="128"
          height="128"
          alt={`Weather in ${country.name}`}
          className="weather-right__icon"
        />
      </div>
      <div className="weather-right weather-right--brown">
        <div className="weather-right__layout">
          <div className="weather-right__temperature">
            {Math.round(weather.current.temp)}
            <span>°{unit === 'metric' ? 'C' : 'F'}</span>
          </div>
          <div>
            <div className="weather-right-card">
              <table className="weather-right__table">
                <tbody>
                  <tr className="weather-right__items">
                    <th colSpan="2" className="weather-right__item">
                      Details
                    </th>
                  </tr>
                  <tr className="weather-right__items">
                    <td className="weather-right__item">Feels like</td>
                    <td className="weather-right__item">
                      {Math.round(weather.current.feels_like)}
                      <span>°{unit === 'metric' ? 'C' : 'F'}</span>
                    </td>
                  </tr>
                  <tr className="weather-right__items">
                    <td className="weather-right__item">Clouds</td>
                    <td className="weather-right__item">
                      {weather.current.clouds}
                      <span>%</span>
                    </td>
                  </tr>
                  <tr className="weather-right__items">
                    <td className="weather-right__item">Wind</td>
                    <td className="weather-right__item">
                      {Math.round(weather.current.wind_speed)}
                      {activeItem === 'metric' ? 'm/s' : 'mph'}
                    </td>
                  </tr>
                  <tr className="weather-right-card__items">
                    <td className="weather-right__item">Humidity</td>
                    <td className="weather-right__item">
                      {weather.current.humidity}%
                    </td>
                  </tr>
                  <tr className="weather-right-card__items">
                    <td className="weather-right__item">Pressure</td>
                    <td className="weather-right__item">
                      {weather.current.pressure} hPa
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="widget-right__footer widget-right__footer--brown">
        <div className="widget-right__layout">
          <a
            href="https://openweathermap.org/"
            target="_blank"
            rel="noreferrer"
          >
            <div className="widget-right__logo_black_small"></div>
          </a>
          <div className="widget-right__date">
            {moment.unix(weather.current.dt).format('YYYY-MM-DD, h:mm a')}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div className="widget-left-menu widget-left-menu--brown">
        <div className="widget-left-menu__layout">
          <h2 className="widget-left-menu__header">{country.capital} </h2>
          <a
            href="https://openweathermap.org/"
            target="_blank"
            rel="noreferrer"
          >
            <div className="widget-left-menu__logo_black"></div>
          </a>
        </div>
      </div>
      <div>
        <Segment
          style={{ margin: 0, border: 0, boxShadow: 'none' }}
          floated="left"
        >
          {JSON.stringify(weather.current.weather[0].icon)}
          <div className="weather-left-card__row1">
            <img
              //  src={`https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${weather.current.weather[0].icon}.png`}
              style={{ width: 100, height: 100 }}
              src={icon}
              alt={`Weather in ${country.name}`}
              className="weather-left-card__img"
            />
            <div className="weather-left-card__col">
              <p className="weather-left-card__number">
                {Math.round(weather.current.temp)}
                <span>°{unit === 'metric' ? 'C' : 'F'}</span>
              </p>
            </div>
          </div>
          <div className="weather-left-card__row2">
            <p className="weather-left-card__means">
              {weather.current.weather[0].description}
            </p>
            <p className="weather-left-card__wind">
              Wind: {Math.round(weather.current.wind_speed)}
              {unit === 'metric' ? ' m/s' : ' mph'}
            </p>
          </div>
        </Segment>

        <Segment
          style={{ margin: 0, border: 0, boxShadow: 'none' }}
          floated="right"
        >
          <div className="widget-left__calendar">
            <ul className="calendar">
              <li className="calendar__item">
                Today
                <br />
                {moment.unix(weather.current.dt).format('MMM D')}
                <img
                  src={`https://openweathermap.org/img/w/${weather.current.weather[0].icon}.png`}
                  width="32"
                  height="32"
                  alt="Today"
                />
              </li>
              <li className="calendar__item">
                {moment.unix(weather.daily[1].dt).format('ddd')}
                <br /> {moment.unix(weather.daily[1].dt).format('MMM D')}
                <img
                  src={`https://openweathermap.org/img/w/${weather.daily[1].weather[0].icon}.png`}
                  width="32"
                  height="32"
                  alt={moment.unix(weather.daily[1].dt).format('ddd')}
                />
              </li>
              <li className="calendar__item">
                {moment.unix(weather.daily[2].dt).format('ddd')}
                <br /> {moment.unix(weather.daily[2].dt).format('MMM D')}
                <img
                  src={`https://openweathermap.org/img/w/${weather.daily[2].weather[0].icon}.png`}
                  width="32"
                  height="32"
                  alt={moment.unix(weather.daily[2].dt).format('ddd')}
                />
              </li>
              <li className="calendar__item">
                {moment.unix(weather.daily[3].dt).format('ddd')}
                <br /> {moment.unix(weather.daily[3].dt).format('MMM D')}
                <img
                  src={`https://openweathermap.org/img/w/${weather.daily[3].weather[0].icon}.png`}
                  width="32"
                  height="32"
                  alt={moment.unix(weather.daily[3].dt).format('ddd')}
                />
              </li>
              <li className="calendar__item">
                {moment.unix(weather.daily[4].dt).format('ddd')}
                <br /> {moment.unix(weather.daily[4].dt).format('MMM D')}
                <img
                  src={`https://openweathermap.org/img/w/${weather.daily[4].weather[0].icon}.png`}
                  width="32"
                  height="32"
                  alt={moment.unix(weather.daily[4].dt).format('ddd')}
                />
              </li>
              <li className="calendar__item">
                {moment.unix(weather.daily[5].dt).format('ddd')}
                <br /> {moment.unix(weather.daily[5].dt).format('MMM D')}
                <img
                  src={`https://openweathermap.org/img/w/${weather.daily[5].weather[0].icon}.png`}
                  width="32"
                  height="32"
                  alt={moment.unix(weather.daily[5].dt).format('ddd')}
                />
              </li>
              <li className="calendar__item">
                {moment.unix(weather.daily[6].dt).format('ddd')}
                <br /> {moment.unix(weather.daily[6].dt).format('MMM D')}
                <img
                  src={`https://openweathermap.org/img/w/${weather.daily[6].weather[0].icon}.png`}
                  width="32"
                  height="32"
                  alt={moment.unix(weather.daily[6].dt).format('ddd')}
                />
              </li>
              <li className="calendar__item">
                {moment.unix(weather.daily[7].dt).format('ddd')}
                <br /> {moment.unix(weather.daily[7].dt).format('MMM D')}
                <img
                  src={`https://openweathermap.org/img/w/${weather.daily[7].weather[0].icon}.png`}
                  width="32"
                  height="32"
                  alt={moment.unix(weather.daily[7].dt).format('ddd')}
                />
              </li>
            </ul>
            <div id="graphic2" className="widget-left__graphic">
              <svg
                className="axis"
                width="420"
                height="79"
                fill="#FEB020"
                style={{ stroke: 'rgb(255, 255, 255)' }}
              >
                <g>
                  <path
                    d="M15,23.615384615384613L72.14285714285714,30.42307692307692L129.28571428571428,30.42307692307692L186.42857142857142,21.346153846153847L243.57142857142856,41.76923076923077L300.7142857142857,44.03846153846154L357.85714285714283,39.5L415,34.96153846153847L415,53.11538461538461L357.85714285714283,53.11538461538461L300.7142857142857,57.65384615384615L243.57142857142856,53.11538461538461L186.42857142857142,48.57692307692308L129.28571428571428,50.84615384615385L72.14285714285714,50.84615384615385L15,44.03846153846154L15,23.615384615384613"
                    style={{
                      strokeWidth: '1px',
                      stroke: 'rgb(254, 176, 32)',
                      fill: 'rgb(254, 176, 32)',
                      opacity: 1,
                    }}
                  ></path>
                </g>
                {/* today */}
                <text
                  x="15"
                  y="19.115384615384613"
                  textAnchor="middle"
                  style={tempStyle}
                >
                  {Math.round(weather.daily[0].temp.max)}°
                </text>
                <text
                  x="15"
                  y="61.03846153846154"
                  textAnchor="middle"
                  style={tempStyle}
                >
                  {Math.round(weather.daily[0].temp.min)}°
                </text>
                {/* day 2 */}
                <text
                  x="72.14285714285714"
                  y="25.92307692307692"
                  textAnchor="middle"
                  style={tempStyle}
                >
                  {Math.round(weather.daily[1].temp.max)}°
                </text>
                <text
                  x="72.14285714285714"
                  y="67.84615384615384"
                  textAnchor="middle"
                  style={tempStyle}
                >
                  {Math.round(weather.daily[1].temp.min)}°
                </text>
                {/* day 3 */}
                <text
                  x="129.28571428571428"
                  y="25.92307692307692"
                  textAnchor="middle"
                  style={tempStyle}
                >
                  {Math.round(weather.daily[2].temp.max)}°
                </text>
                <text
                  x="129.28571428571428"
                  y="67.84615384615384"
                  textAnchor="middle"
                  style={tempStyle}
                >
                  {Math.round(weather.daily[2].temp.min)}°
                </text>
                {/* day 4 */}
                <text
                  x="186.42857142857142"
                  y="16.846153846153847"
                  textAnchor="middle"
                  style={tempStyle}
                >
                  {Math.round(weather.daily[3].temp.max)}°
                </text>
                <text
                  x="186.42857142857142"
                  y="65.57692307692308"
                  textAnchor="middle"
                  style={tempStyle}
                >
                  {Math.round(weather.daily[3].temp.min)}°
                </text>
                {/* day 5 */}
                <text
                  x="243.57142857142856"
                  y="37.26923076923077"
                  textAnchor="middle"
                  style={tempStyle}
                >
                  {Math.round(weather.daily[4].temp.max)}°
                </text>
                <text
                  x="243.57142857142856"
                  y="70.11538461538461"
                  textAnchor="middle"
                  style={tempStyle}
                >
                  {Math.round(weather.daily[4].temp.min)}°
                </text>
                {/* day 6 */}
                <text
                  x="300.7142857142857"
                  y="39.53846153846154"
                  textAnchor="middle"
                  style={tempStyle}
                >
                  {Math.round(weather.daily[5].temp.max)}°
                </text>
                <text
                  x="300.7142857142857"
                  y="74.65384615384616"
                  textAnchor="middle"
                  style={tempStyle}
                >
                  {Math.round(weather.daily[5].temp.min)}°
                </text>
                {/* day 7 */}
                <text
                  x="357.85714285714283"
                  y="35"
                  textAnchor="middle"
                  style={tempStyle}
                >
                  {Math.round(weather.daily[6].temp.max)}°
                </text>
                <text
                  x="357.85714285714283"
                  y="70.11538461538461"
                  textAnchor="middle"
                  style={tempStyle}
                >
                  {Math.round(weather.daily[6].temp.min)}°
                </text>
                {/* day 8 */}
                <text
                  x="415"
                  y="30.461538461538467"
                  textAnchor="middle"
                  style={tempStyle}
                >
                  {Math.round(weather.daily[7].temp.max)}°
                </text>
                <text
                  x="415"
                  y="70.11538461538461"
                  textAnchor="middle"
                  style={tempStyle}
                >
                  {Math.round(weather.daily[7].temp.min)}°
                </text>
              </svg>
            </div>
          </div>
        </Segment>
      </div>
    </div>
  )
}

export default WeatherWidget
