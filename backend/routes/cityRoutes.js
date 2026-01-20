import express from "express";
import City from "../models/City.js";
import Listing from "../models/Listing.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // get active cities
    const cities = await City.find({ isActive: true });

    // for each city, count listings
    const citiesWithCount = await Promise.all(
      cities.map(async (city) => {
        const count = await Listing.countDocuments({
          city: city.name
        });

        return {
          name: city.name,
          slug: city.slug,
          count,
        };
      })
    );

    res.json(citiesWithCount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
