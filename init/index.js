const mongoose = require("mongoose");
const Movie = require("../models/movies.js");

const MONGO_URL =
  "mongodb+srv://student001599:uJazBCl7r5BC3vNG@cluster0.kzqm5c3.mongodb.net/alphamovies?retryWrites=true&w=majority&appName=Cluster0";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const sampleMovies = [
  {
    title: "Spirited Away",
    shortdescription: "A girl trapped in a magical world",
    description:
      "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods.",
    category: "Fantasy",
    date: new Date("2001-07-20"),
    url: "https://www.imdb.com/title/tt0245429/",
    image: "https://m.media-amazon.com/images/I/81QE4A+OxiL._AC_SY679_.jpg",
  },
];

const initDB = async () => {
  try {
    await Movie.insertMany(sampleMovies);
    console.log("✅ Sample movie data inserted successfully!");
  } catch (err) {
    console.error("❌ Error seeding database:", err);
  }
};

initDB();
