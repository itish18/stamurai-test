import {
  Sun,
  CloudMoon,
  CloudLightning,
  Moon,
  Cloud,
  Cloudy,
  CloudRainWind,
  CloudSunRain,
  CloudMoonRain,
  Snowflake,
  CloudFog,
  Haze,
  CloudSun,
} from "lucide-react";

export const iconMap = {
  "01d": { icon: Sun, imageLink: "/clear.png" },
  "01n": { icon: Moon, imageLink: "/clear-night.jpg" },
  "02d": { icon: CloudSun, imageLink: "/clouds.png" },
  "02n": { icon: CloudMoon, imageLink: "/clouds.png" },
  "03d": { icon: Cloud, imageLink: "/clouds.png" },
  "03n": { icon: Cloud, imageLink: "/clouds.png" },
  "04d": { icon: Cloudy, imageLink: "/clouds.png" },
  "04n": { icon: Cloudy, imageLink: "/clouds.png" },
  "09d": { icon: CloudRainWind, imageLink: "/rain.jpg" },
  "09n": { icon: CloudRainWind, imageLink: "/rain.jpg" },
  "10d": { icon: CloudSunRain, imageLink: "/rain.jpg" },
  "10n": { icon: CloudMoonRain, imageLink: "/rain.jpg" },
  "11d": { icon: CloudLightning, imageLink: "/thunderstorm.jpg" },
  "11n": { icon: CloudLightning, imageLink: "/thunderstorm.jpg" },
  "13d": { icon: Snowflake, imageLink: "/snow.jpg" },
  "13n": { icon: Snowflake, imageLink: "/snow.jpg" },
  "50d": { icon: CloudFog, imageLink: "/mist.jpg" },
  "50n": { icon: Haze, imageLink: "/mist.jpg" },
};

export const Icon = (weatherIcon, size = 100) => {
  const WeatherIcon = iconMap[weatherIcon].icon;
  return <WeatherIcon size={size} />;
};
