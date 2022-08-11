class Car {
    constructor(brand, isClean, approxRang) {
        this.brand = brand
        this.isClean = isClean
        this.approxRang = approxRang
    }
    
    isAvailable() {
        if(this.isClean == true && this.approxRang >= 50){return true} else {return false}
    }
}

// isAvailable instance method gyakorlatilag egy szűrő, ami aszerint került megadásra, amik a feladatban is szerepeltek (tiszta legyen az autó és benne minimum 50 km-re elegendő benzin, ha megfelel, akkor true, ha nem, false értéket kap)

class CarFinder {
  static getAvailable (arr, brand) {
    let solution = []
    for (let car of arr) {
        if (car.isAvailable() && car.brand === brand){
          solution.push(car)
        }
      }
    return solution.length
  }
}

// itt már bevetjük a korábban meghatározott isAvailable szűrőt és megszűrjük a megkapott array-ben lévő autókat, kapunk továbbá egy bizonyos márkát is, amire további szűrés is szükséges, mivel ezt csak az array-jel együtt kapjuk meg, emiatt tudjuk csak itt szűrni. Továbbá csak az autók számára vagyunk kíváncsiak, emiatt a .length

module.exports = { Car, CarFinder }