import React, { useEffect, useState } from "react"
import Character from "./components/Character"
import LoadingMask from "./components/LoadingMask"
import Subscription from "./components/Subscription"


const App = () => {
  
  const [characters, setCharacters] = useState(null) // characterek fetch-eléséhez 
  const [delayedComponent, setDelayedComponent] = useState(false) // Subscription component megjelenítéséhez és elrejtéséhez

  useEffect(() => {
    const characters = async () => {
      const charactersResponse = await fetch("https://demoapi.com/api/series/howimetyourmother")
      const characterJson = await charactersResponse.json()
      setCharacters(characterJson) // a kezdeti characters = null érték helyett megkapja a fetch-elt adatot = characterJson
    }
    characters()
  }, [])
  
  /* -------- Ugyanez mint fent, csak await nélkül ---------
  useEffect (() => {
    fetch("https://demoapi.com/api/series/howimetyourmother")
    .then(response => response.json())
    .then((data) => {
      setCharacters(data)
    })
  })*/

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedComponent(true);
    }, 10000); // A feladat alapján 10 mp késéssel szükséges, hogy betöltsön a Subscribtion component

    return () => {
      clearTimeout(timer);
    }; // mivel a Child -> Parent kommunikáció megtörténik az ottani fetchet követően, amit a 41. sor alapján felhasználunk és változás történik az App.js-ben, emiatt elindul ismét a useEffect és ismét betöltené a Subscribtion componentet, ezt akadályozzuk meg a cleartimeout-tal
  }, []);

  
  const pullData = (data) => {
      if (data !== "") { // amint a Subscription component-ben a subscribed useState-s változó megkapja az adatot (jelen esetben a POST requestben magadott e-mail címet), az üres string helyett már adatot tartalmaz, így elindulhat a setTimeOut
        setTimeout(() => {
          setDelayedComponent(false)
        }, 5000) // 5 mp-et követően a delayedComponent változó megkapja a set-tere által a false értéket, emiatt már az 57. sorban lévő delayedComponent is false lesz, így a Subscription component eltűnik
      }
  }

  return (
    <div>
      <h1>Series Api</h1>
      {characters ? characters.map((character, index) => <Character key={index} name={character.name} details={character.details}/>) : <LoadingMask/>}
      {/* ? Amennyiben a characters értéket kap, akkor történjen meg a map, amiben a kapott objecteket character paraméterkétn hívjuk, továbbá a kötelező key-hez az index értéket társítjuk.
          Mivel az objecteket characterként hívjuk a map során, emiatt a benne lévő name és details meghívásához a character.name és character.details kell értéknek, kulcsként pedig az egyszerűbb name és character elnevezést adjuk
          
          : Amennyiben a character még nem kapott értéket (a feladatban ez 2-5 mp) addig a LoadingMask lép életbe - ez a kezdeti betöltés, de ezt a LoadingMaskot használjuk a többi Loading esetén is, így nem kell többször létrehoznunk*/}
      {delayedComponent && <Subscription childParentComm={pullData}/>}
      {/* A 10 mp-et követően, ami a 30-33. sorban történik a delayedComponent true értéket kap így vele együtt már meg tud jelenni a Subscription component
          
          A childParentComm segítségével a függvényt props-ként átadjuk a Child elementnek, hidat képezünk ezzel, mert mivel függvény van benne, emiatt folyamatos kommunikációt biztosít a Child-Parent között, így minden változás átérkezik a Childból, jelen esetben a Subscription component-ből*/}
    </div>
  )
}

export default App
