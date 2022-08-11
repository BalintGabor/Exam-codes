function getLongestEnglishComedy(movies) {

    if (movies.length === 0) return null; // eleve üres movies esetén null

    const englishComedies = []; // üres tömb deklarálása gyűjtéshez

    movies.forEach((movie) => {
        if (movie.genre === "comedy" && movie.originalLanguage === "english") {
            englishComedies.push(movie)
        }
    }); // forEach-el történő iterálással kigyűjtjük a kívánt objecteket és pusholjuk az üres tömbbe

    if (englishComedies.length === 0) return null; // szűrés után nem került bele elem (pl. nincs english vagy comedy) akkor a feladat szerinti null-t dobja vissza

    let longestEnglishComedy = englishComedies[0];
    for (const comedy of englishComedies) {
        if (comedy.length > longestEnglishComedy.length) {
            longestEnglishComedy = comedy
        }
    } // deklaráljuk az objectek első elemét, majd for-of ciklussal végigiterálunk és kikeressük a legnagyobbat length-el rendelkezőt, majd return-öljük

    return longestEnglishComedy.title
 } 
 
 module.exports = getLongestEnglishComedy