import axios from 'axios'
import React, { useState } from 'react'

// önerilen başlangıç stateleri
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 //  "B" nin bulunduğu indexi

export default function AppFunctional(props) {
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.

  const [degisenIndex, setDegisenIndex] = useState(initialIndex)
  const [counter, setCounter] = useState(initialSteps)
  const [email, setEmail] = useState(initialEmail)
  const [postObject , setPostObject] = useState({
    "Email" : initialEmail,
    "X" : 2,
    "Y" : 2,
  })

  let xDeger;
  let yDeger;
  let abcArray = [];

  

  function getXY() {
    // Koordinatları izlemek için bir state e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için "B" nin hangi indexte olduğunu bilmek yeterlidir.


    const xyArray = []
    for (let y = 1; y < 4; y++) {
      for (let x = 1; x < 4; x++) {
        xyArray.push(`(${x},${y})`)
      }

    }
    let XY;
    for (let i = 0; i < xyArray.length; i++) {
      if (degisenIndex == i) {
        XY = xyArray[i]

        abcArray = xyArray[i]?.split("")
        xDeger = abcArray[0];
        yDeger = abcArray[2];
      }
    }

    return XY
  }

  function getXYMesaj() {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
    // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
    // tamamen oluşturulmuş stringi döndürür.i

    // let messageKordinat = `Koordinatlar ${getXY()}`
    // let messageMove = `${counter} kez ilerlediniz.`

    // return (messageKordinat, messageMove)

  }

  function reset() {
    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.

    setCounter(0)
    setDegisenIndex(initialIndex)
    /*
    TODO
    Mail için tekrar dön.
    
    */
  }

  function sonrakiIndex(yon) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için,
    // şu anki indeksi değiştirmemeli.

    if (yon === "left" && (degisenIndex == 1 || degisenIndex == 2 || degisenIndex == 4 || degisenIndex == 5 || degisenIndex == 7 || degisenIndex == 8)) {
      setDegisenIndex(degisenIndex - 1)
      setCounter(counter + 1)
    }
    if (yon === "right" && (degisenIndex == 0 || degisenIndex == 1 || degisenIndex == 3 || degisenIndex == 4 || degisenIndex == 6 || degisenIndex == 7)) {
      setDegisenIndex(degisenIndex + 1)
      setCounter(counter + 1)
    }
    if (yon === "up" && (degisenIndex == 3 || degisenIndex == 4 || degisenIndex == 5 || degisenIndex == 6 || degisenIndex == 7 || degisenIndex == 8)) {
      setDegisenIndex(degisenIndex - 3)
      setCounter(counter + 1)
    }
    if (yon === "down" && (degisenIndex < 6)) {
      setDegisenIndex(degisenIndex + 3)
      setCounter(counter + 1)
    }
  }

  function onChange(evt) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz
    setEmail(evt.target.value)
  }

  function onSubmit(evt) {
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
    evt.preventDefault()
    console.log(postObject)
    // axios.post('http://localhost:9000/api/result', {
    //   firstName: 'Fred',
    //   lastName: 'Flintstone'
    // })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Koordinatlar {getXY()}</h3>
        <h3 id="steps">{counter} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === degisenIndex ? ' active' : ''}`}>
              {idx === degisenIndex ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button onClick={() => sonrakiIndex("left")} id="left">SOL</button>
        <button onClick={() => sonrakiIndex("up")} id="up">YUKARI</button>
        <button onClick={() => sonrakiIndex("right")} id="right">SAĞ</button>
        <button onClick={() => sonrakiIndex("down")} id="down">AŞAĞI</button>
        <button onClick={reset} id="reset">reset</button>
      </div>
      <form>
        <input onChange={onChange} id="email" type="email" placeholder="email girin"></input>
        <input onClick={onSubmit} id="submit" type="submit"></input>
      </form>
    </div>
  )
}
