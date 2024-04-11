import axios from "axios";

export const fetchCities = async (start) => {
  try {
    const result = await axios.get(
      `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?disjunctive.cou_name_en&sort=name&rows=30&start=${start}`
    );
    return { data: result.data };
  } catch (e) {
    return {
      error: "Something went wrong",
    };
  }
};
