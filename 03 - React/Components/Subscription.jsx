import React, { useEffect, useState } from 'react'
import LoadingMask from './LoadingMask';
import Button from '@mui/material/Button'; // a feladatban kért material designhoz tartozó import

function Subscription({childParentComm}) { // a Child-Parent közötti kommunikációhoz átadott props
  
  const [email, setEmail] = useState("") // input fieldben lévő érték változásához
  const [isDisabled, setDisabled] = useState(true) // a Subscribe button disabled=false vagy true-ra állításához
  const [loading, setLoading] = useState(false) // LoadingMask előhozásához és az input, illetve a button elrejtéséhez amíg tart a loading
  const [subscribed, setSubscribed] = useState("") // fetchelés követően adatot kap
  
  useEffect(() => {
    childParentComm(subscribed)
  }, [childParentComm, subscribed]) // a subscribed érték változására elindul a Child-Parent kommunikáció és átadja a parentnek (App.js-nek) a propsban megadott függvényen keresztül az subscribed értékét
  
  const validateEmail = (email) => 
    typeof email === "string" && email.includes("@") && email.includes("."); // az input értékét figyeli, hogy megfelel-e a kért követelményeknek (@ és .) a 20.sorban lévő átadott érték által

  useEffect(() => {
    setDisabled(!validateEmail(email)); // amíg validateEmail-ben található szabály (17.sor)nak nem felel meg, addi a  setDisabled(!false) marad, vagyis setDisabled(true), amint megfelel a 17. sorban lévő szabálynak az érték az megváltozik és setDisabled(!true) lesz, vagyis setDisabled(false) ezáltal átadja a false értéket a isDisabled-nek a setter és a button a 45. sorban disabled=false-ra változik, így az elérhetővé válik
  }, [email])

  const handleSubmit = (e) => {
    e.preventDefault() // az automatikus beállításokat kiszedi, pl újratöltené az oldalt
    setLoading(true) // elindul a fetch, a loading értéke true
    fetch("https://demoapi.com/api/series/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"email" : email}), // az inputban megadott e-mail cím post-tal történő fetch-e
    })
    .then((response) => response.json())
    .then((data) => setSubscribed(data)) // setSubscribed setter alapján a subscribed megkapja a válasz adatot (jelenleg az e-mail címet)
    .finally(() => {
        setLoading(false) // lefut a fetch a loading kikapcsol - false
    })
  };

  return (
    <>
        <form>
            <h3>Subscribe to our newsletter</h3>
            {!loading && !subscribed && (
            <>{/*Amennyiben nem fut a loading és a subscribed sem kap adatot, addig az input field és a button jelenjen meg*/}
            <input type="text" value={email} onChange={(event) => {setEmail(event.target.value)}}/> {/*Az onChange miatt átadja az értékét a email-nek a setEmailen keresztül*/}
            <Button variant="contained" disabled={isDisabled} onClick={handleSubmit}>Subscribe</Button> {/*A disabled=true alapból, így amíg nem lesz megfelelő az e-mail 16-21.sor, addig marad is, az onClick esemény hatására a 23-36.sorig lefut a fetch*/}
            </>
            )}
            {loading && <LoadingMask/>} {/*Amíg fut a loading (true), addig a LoadingMask is megjelenik*/}
            {subscribed && <p>Subscribed</p> } {/*A subscribed ha értéket kap, megjelenik a Subscribed üzenet*/}
        </form>
    </>
  )
}

export default Subscription