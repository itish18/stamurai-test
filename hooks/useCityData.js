import { create } from "zustand";

export const useCityData = create((set) => ({
  weather: {},
  setWeather: (data) =>
    set((state) => ({ weather: { ...state.weather, [data.name]: data } })),
}));
