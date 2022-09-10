import React, {useEffect, useState} from 'react'
import SimpleLinearRegression from 'ml-regression-simple-linear';
import db from './firebase'
import { 
    collection, onSnapshot
  } from 'firebase/firestore'
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; 
import 'tippy.js/themes/material.css';



function App() {
  const [cx, setCX] = useState();
  const [dish, setDish] = useState();
  const [earnings, setEarnings] = useState();
  const [loadedDish, setLoadedDish] = useState();
  const [loadedCash, setLoadedCash] = useState();
  const [num, setNum] = useState();
  const [result, setResult] = useState();
  const [fetched, setFetched] = useState(false);
  const [ready, setReady] = useState(false);

  const dataFetch = () => {

    const colRef = collection(db, 'algos')

    onSnapshot(colRef, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          setCX(doc.data().cx)
          setDish(doc.data().dish)
          setEarnings(doc.data().earnings)
        })
    })
    setFetched(true)
  }

  useEffect(() => {
    dataFetch();
  })

  tippy('.tippy', {
    content: 'Algoritmul prezice numarul de portii principale si incasarile bazandu-se pe dataset-ul format din ultimele 500 de intrari clienti-fp-incasari. Algoritmul functioneaza pentru valori mai mari de 100 in mod optim',
    })

  const ml = () => {
    const a = cx.split(' ').map((item) => { return parseInt(item) });
    const b = dish.split(' ').map((item) => { return parseInt(item) });
    const c = earnings.split(' ').map((item) => { return parseInt(item) });
    const numberToCheck = parseInt(num);
     const regressionDish = new SimpleLinearRegression(a, b);
    const regressionCash = new SimpleLinearRegression(a,c)
    const jsonDish = regressionDish.toJSON();
    const jsonCash = regressionCash.toJSON();
    const loadedDish = SimpleLinearRegression.load(jsonDish);
    const loadedCash = SimpleLinearRegression.load(jsonCash);
    localStorage.setItem('loadedDish',loadedDish);
    localStorage.setItem('loadedCash',loadedCash);    
    setResult({dishes:Math.floor(loadedDish.predict(numberToCheck)), cash:Math.floor(loadedCash.predict(numberToCheck))})
    setReady(true);
}


  return (
 
    <div className="mx-auto p-5 m-5 max-w-[1040px] bg-[#D3E298] h-full border border-stone-500 text-center rounded shadow-xl">

      <div className="mx-auto m-3 p-2 boder shadow-sm bg-white w-fit rounded hover:cursor-pointer hover:scale-105 tippy"><span>Info</span></div><h1 className="text-2xl font-bold mb-3 tracking-widest">Eurest PEC101 ML ALGO</h1>
      <div className="mx-auto max-w-[840px] flex flex-col p-2">
        <div className="flex flex-col border-b shadow-xl bg-[#CDE7BE]">
            <p className="text-xl font-bold p-4">Introduceti numarul de clienti estimati:</p>
            <input className="mx-auto text-center shadow-xl rounded h-[50px] m-2" onChange={(e) => {setNum(e.target.value)}}></input>
            <button className="mx-auto m-5 p-2 w-min bg-slate-50 rounded shadow-xl hover:scale-110" onClick={() => {ml()}}>SUBMIT</button>
        </div>

        <div className="max-w-[840px] border rounded shadow-xl m-3 bg-[#CDE7BE]">
          <div className="mx-auto text-xl flex flex-col sm:flex-row justify-center items-center p-2"><p>Vor fi cumparate </p>{ready? <p className="text-3xl p-2 font-bold text-[#2E5EAA]">~{result.dishes}</p> : 
          <div className="text-sm text-slate-600">...awaiting...</div>} <p>portii de fel principal</p></div>
          <div className="mx-auto text-xl flex flex-col sm:flex-row justify-center items-center p-2"><p>Incasarile vor fi de </p>{ready? <p className="text-3xl p-2 font-bold text-[#2E5EAA]">~{result.cash}</p> : 
          <div className="text-sm text-slate-600">...awaiting...</div>} <p>RON fara TVA</p></div>
      </div>
        
      </div>
    </div>


  );
}

export default App;
