
/* This is a scalable object, just add the page name and its respective categories (considering) these
  categories titles are in the database as collections it will automatically scale. 

  Useful so when we add more pages or expand our categories collections

*/

const categoriesByPage = {
    home: ["Disney+ Highlights", "What to Watch Tonight", "Disney Nostalgia"],
    movies: ["Action and Adventure", "Comedy Movies", "Drama Movies"],
    shows: ["Comedy Series", "Drama Series", "Adult Animation"],
    "Walt Disney": ["Featured", "Walt Disney Animation Studios", "Live-Action Series and Specials"],
    Pixar: ["Academy Award Winners", "Movies", "Shorts"],
    "Marvel Studios": ["Marvel Cinematic Universe in Timeline Order", "Marvel Legacy Movies", "Marvel Cinematic Universe"],
    "National Geographic": ["Documentary Series", "Climate Change", "Animals and Nature"]
}

const allCategories = [
  "Disney+ Highlights",
  "What to Watch Tonight",
  "Disney Nostalgia",
  "Action and Adventure",
  "Comedy Movies",
  "Drama Movies",
  "Comedy Series",
  "Drama Series",
  "Adult Animation",
  "Featured",
  "Walt Disney Animation Studios",
  "Live-Action Series and Specials",
  "Academy Award Winners",
  "Movies",
  "Shorts",
  "Marvel Cinematic Universe in Timeline Order",
  "Marvel Legacy Movies",
  "Marvel Cinematic Universe",
  "Documentary Series",
  "Climate Change",
  "Animals and Nature",
]

export {categoriesByPage, allCategories};