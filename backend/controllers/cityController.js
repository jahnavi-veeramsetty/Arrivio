import City from "../models/City.js";

export const getCities = async (req, res) => {
  try {
    const cities = await City.find({ active: true }).sort({ name: 1 });
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cities" });
  }
};
