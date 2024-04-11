import axios from "axios";

export const citySuggestion = async (inputValue) => {
  try {
    const options = {
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SUGGESTION_API}/cities?namePrefix=${inputValue}`,
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_SUGGESTION_API_KEY,
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_SUGGESTION_API_HOST,
      },
    };
    const response = await axios.request(options);

    return { data: response.data };
  } catch (e) {
    return { error: e.response?.data.message || e };
  }
};
