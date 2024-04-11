import axios from "axios";

export const weatherDetails = async (cityName) => {
  try {
    const responseOne = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
    );
    const responseTwo = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
    );

    const forecastList = responseTwo.data.list?.map((item) => {
      return {
        date: item.dt_txt,
        main: item.main,
        weather: item.weather[0],
        wind: item.wind,
      };
    });

    const result = {
      name: responseOne.data.name,
      cord: responseOne.data.coord,
      currentWeather: responseOne.data.weather[0],
      tempDetails: responseOne.data.main,
      visibility: responseOne.data.visibility,
      sunrise: responseOne.data.sys.sunrise,
      sunset: responseOne.data.sys.sunset,
      wind: responseOne.data.wind,
      forecast: forecastList,
    };

    return { data: result };
  } catch (e) {
    console.log(e);
    return { error: e?.response?.data?.message || e };
  }
};
