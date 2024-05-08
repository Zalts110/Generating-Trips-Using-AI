import axios from "axios";

export const generateTripPlan = async (country, transportation) => {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: `Generate a JSON response with 3 trip routes for ${country} by ${transportation}, including the name of each trip, starting and ending coordinates (latitude,longitude) for each trip. Each trip should also include a description. Please provide only the JSON data without any additional text. the data will looks like: {name, start_coordinates:{latitude,longitude}, end_coordinates:{latitude, longitude}} and the array name will be trip_routes`,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer s`,
        "Content-Type": "application/json",
      },
    }
  );

  let tripPlan;
  try {
    tripPlan = JSON.parse(response.data.choices[0].message.content);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }

  return tripPlan;
};

export async function generateImageFromDescription(description) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        model: "dall-e-2",
        prompt: description,
        n: 1,
        size: "512x512",
      },
      {
        headers: {
          Authorization: `Bearer s`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data && response.data.data[0] && response.data.data[0].url) {
      console.log(response.data);
      return response.data.data[0].url;
    } else {
      throw new Error("Image generation failed");
    }
  } catch (error) {
    console.error("Failed to generate image:", error);
    return null;
  }
}
