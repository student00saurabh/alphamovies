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

  let saved = null;
  if (req.user) {
    saved = await Your.findOne({ user: req.user._id, movie: movie._id });
  }

  res.render("movie/show.ejs", { movie, saved });
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

  // Check if movie already saved by this user
  const alreadySaved = await Your.findOne({
    user: req.user._id,
    movie: id,
  });

  if (alreadySaved) {
    req.flash("error", "Movie already saved in your collection!");
    return res.redirect(`/movie/${id}`);
  }

  // If not saved, save the movie
  const newm = new Your({
    user: req.user._id,
    movie: movie,
  });

  await newm.save();
  req.flash("success", "Movie Saved!");
  res.redirect(`/movie/${id}`);
};

module.exports.unsaveMovie = async (req, res) => {
  const { id } = req.params;

  // Remove the saved movie entry for the logged-in user
  await Your.findOneAndDelete({
    user: req.user._id,
    movie: id,
  });

  req.flash("success", "Movie removed from your collection.");
  res.redirect(`/movie/${id}`); // or redirect to /yourmovies if preferred
};
