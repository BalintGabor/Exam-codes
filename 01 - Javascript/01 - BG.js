function getLongestEnglishComedy(movies) {
    console.log(movies) // megnézni a beérkező adatokat
   
    // üres tömb deklarálása
   let englishComedies = []

        // for-of iterálás az elemeken
     for (let movie of movies) {

        // comedy és english kulcsokkal rendelkező elemek kiszűrése
       if (movie.genre === "comedy" && movie.originalLanguage === "english") {

            // a leszűrt objectek kigyűjtése a korábban deklarált üres tömbbe
         englishComedies.push(movie);
       }
     }

       //ismét egy üres tömb deklarálása
     let englishComedyLengths = []

        // for-of iterálás a korábban leszűrt objecteken
     for (let englishmovie of englishComedies) {

        // csak a length változók kigyűjtése a korábban másodszor deklarált üres tömbbe
       englishComedyLengths.push(englishmovie.length)
     }

        // a csak lengtheken történő max keresés, illetve annak indexének meghatározása. mivel a sorrenden ez nem változtat, emiatt az objektumok és azok elemeinek is megegyezik az indexe
     let index = englishComedyLengths.indexOf(Math.max(...englishComedyLengths))
     if (index >= 0) {

        // a megkapott max indexe alapján a title kiolvasása
       return englishComedies[index].title
     }
     
     // mivel az englishComedies tömbbe csak a már szűrt objektumok kerülnek bele, így ha nincs olyan object, ami megfelel ennek (pl. üres movies tömb, csak hungarian, nincs comedy) akkor a feladat szerinti null eredményt adja vissza
   if (englishComedies.values) {} return null
 } 
 module.exports = getLongestEnglishComedy