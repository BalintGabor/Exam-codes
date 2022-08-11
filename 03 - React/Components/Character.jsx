import React, { useState } from 'react'
import "./Character.css" // hidden class css meghívásához

function Character ({ name, details}) { // propsok áthívása a parent elementből (App.js)

    const [isVisible, setVisible] = useState(false) // alapból nem láthatóak a 25. sorban lévő details adatok
    const [buttonText, setButtonText] = useState("Show more") // mivel nem láthatóak a 25. sorban lévő adatok, emiatt a Show more jelenik meg alap esetben

    const visibibilityHandler = () => { // ahelyett, hogy az onClick eseményen belül sorolnánk fel a meghívandó folyamatokat, ezeket így ki tudjuk szerveni jobban átláthatóan
        setVisible(!isVisible) // ! ellenkező értéket jelent, jelen esetben az onClick hatására a korábbi false, vagy épp true az ellenkezőjét kapja meg
        textChange(); // 14. sorban lévő function meghívás
    }

    const textChange = () => {
        /* ------ Ugyanaz a kód, mint lejjebb -------
        /*if (buttonText === "Show more") {
            setButtonText("Show less")
        } else setButtonText("Show more")*/
        buttonText === "Show more" ? setButtonText("Show less") : setButtonText("Show more") // mivel itt nem true/false az eredmény, hanem szöveg, emiatt a 10.sorban használt megoldást itt jobban ki kell fejteni, hogy ha Show more a jelenlegi érték akkor onClick hatására Show Less-re vált és ugyanez fordítva
    }

    return (
        <>
            <h2>{name}</h2> {/*Mivel a props-on belül {} értékben adtuk át, emiatt nem kell props.name-ként hivatkozni*/}
            <p className={isVisible ? "" : "hidden"}>{details}</p> {/*A details alapból nem látható, az onClickre változik az isVisible értéke */}
            <button onClick={visibibilityHandler}>{buttonText}</button> {/*Az onClick eseménykor lefutó folyamatok a 9-11. sorban van kibontva, így elég csak visibibilityHandler-ként hivatkozni*/}
        </>
    )
}

export default Character