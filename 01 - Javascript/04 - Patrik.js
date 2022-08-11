function getLongestEnglishComedy(movies) {
    if (movies.length === 0) return null; // üres tömb esetén null
    const englishComedies = movies.filter(movie => movie.genre === "comedy" && movie.originalLanguage === "english"); // english és comedy szűrés
    if (englishComedies.length === 0) return null; // amennyiben nincs a tömbben english és comedy, akkor null 
    const lengthMax = Math.max(...englishComedies.map(comedy => comedy.length)); // mappel megkeresi a legnagyobb legth értéket
    const result = englishComedies.find(longest => longest.length === lengthMax) // a legnagyobb length értékhez tartozó object megtalálása
    return result.title
 } 
 
 module.exports = getLongestEnglishComedy