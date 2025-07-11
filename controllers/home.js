const Movie = require("../models/movies.js");
const Your = require("../models/yourmovies.js");

module.exports.index = async (req, res) => {
  const perPage = 8;
  const page = parseInt(req.query.page) || 1;
  const searchQuery = req.query.q || "";
  const selectedCategory = req.query.category || "";

  // Build dynamic MongoDB query
  let query = {};

  if (searchQuery) {
    query.$or = [
      { title: { $regex: searchQuery, $options: "i" } },
      { shortdescription: { $regex: searchQuery, $options: "i" } },
      { description: { $regex: searchQuery, $options: "i" } },
      { category: { $regex: searchQuery, $options: "i" } },
    ];
  }

  if (selectedCategory) {
    query.category = { $regex: "^" + selectedCategory + "$", $options: "i" };
  }

  const totalMovies = await Movie.countDocuments(query);
  const movies = await Movie.find(query)
    .skip((page - 1) * perPage)
    .limit(perPage)
    .sort({ date: -1 });

  // Get unique categories for filter UI
  const allCategories = await Movie.distinct("category");

  res.render("movie/index.ejs", {
    movies,
    current: page,
    pages: Math.ceil(totalMovies / perPage),
    searchQuery,
    selectedCategory,
    allCategories,
  });
};

module.exports.showPage = async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);
  res.render("movie/show.ejs", { movie });
};

module.exports.aboutPage = async (req, res) => {
  res.render("movie/about.ejs");
};

//your movies
module.exports.yourmoviesPage = async (req, res) => {
  const us = req.user;
  const your = await Your.find({ user: us._id })
    .populate("movie")
    .populate("user");
  res.render("movie/yourmovies.ejs", { your });
};

module.exports.saveMovie = async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);
  const newm = new Your();
  newm.user = req.user._id;
  newm.movie = movie;
  newm.save();
  req.flash("success", "Movie Saved !");
  res.redirect(`/movie/${id}`);
};
