import Listing from "../models/Listing.js";

export const getListings = async (req, res) => {
  try {
    const { city } = req.query;

    const query = { active: true };

    if (city) {
      query.city = city;
    }

    const listings = await Listing.find(query);

    res.status(200).json(listings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
