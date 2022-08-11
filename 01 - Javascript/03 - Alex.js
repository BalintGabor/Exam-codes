function getLongestEnglishComedy(movies) {
    let movieLength = 0 // deklarálás tömb nélkül
    let longestMovie = null // a map-es szűrésen kívül minden más esetben nem történik változás benne, így null lesz marad
        movies.filter((movie) => { // iterálás map-pel, vagy filterrel, a map új tömböt hoz létre
            if (movie.genre === "comedy" && movie.originalLanguage === "english") { // comedy és english szűrés
                if (movie.length > movieLength) {
                    movieLength = movie.length; // megkeresi a legnagyobb length értéket
                    longestMovie = movie.title; // az eredmény címét adja át a változónak
                }
            }
        })
    return longestMovie
 } 
 
 module.exports = getLongestEnglishComedy