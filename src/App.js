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
  const [cx_sec, setCX_SEC] = useState();
  const [dish, setDish] = useState();
  const [earnings, setEarnings] = useState();
  const [soup, setSoup] = useState();
  const [garnish, setGarnish] = useState();
  const [salad, setSalad] = useState();
  const [desert, setDesert] = useState();
  const [bread, setBread] = useState();

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
          setEarnings(doc.data().earnings)
          setDish(doc.data().dish)
          setCX_SEC(doc.data().cx_sec) 
          setSoup(doc.data().soup)
          setGarnish(doc.data().garnish)
          setSalad(doc.data().salad)
          setDesert(doc.data().desert)
          setBread(doc.data().bread)
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
    const cx_modified = cx.split(' ').map((item) => { return parseInt(item) });
    const earnings_modified = earnings.split(' ').map((item) => { return parseInt(item) });
    const dish_modified = dish.split(' ').map((item) => { return parseInt(item) });
    const cx_sec_modified = cx_sec.split(' ').map((item) => { return parseInt(item) });
    const soup_modified = soup.split(' ').map((item) => { return parseInt(item) });
    const garnish_modified = garnish.split(' ').map((item) => { return parseInt(item) });
    const salad_modified = salad.split(' ').map((item) => { return parseInt(item) });
    const desert_modified = desert.split(' ').map((item) => { return parseInt(item) });
    const bread_modified = bread.split(' ').map((item) => { return parseInt(item) });

    const numberToCheck = parseInt(num);

    const regressionDish = new SimpleLinearRegression(cx_modified, dish_modified);
    const regressionCash = new SimpleLinearRegression(cx_modified,earnings_modified);
    const regressionSoup = new SimpleLinearRegression(cx_sec_modified, soup_modified);
    const regressionGarnish = new SimpleLinearRegression(cx_sec_modified,garnish_modified);
    const regressionSalad = new SimpleLinearRegression(cx_sec_modified, salad_modified);
    const regressionDesert = new SimpleLinearRegression(cx_sec_modified,desert_modified);
    const regressionBread = new SimpleLinearRegression(cx_sec_modified, bread_modified);


    const jsonDish = regressionDish.toJSON();
    const jsonCash = regressionCash.toJSON();
    const jsonSoup = regressionSoup.toJSON();
    const jsonGarnish = regressionGarnish.toJSON();
    const jsonSalad = regressionSalad.toJSON();
    const jsonDesert = regressionDesert.toJSON();
    const jsonBread = regressionBread.toJSON();

    const loadedDish = SimpleLinearRegression.load(jsonDish);
    const loadedCash = SimpleLinearRegression.load(jsonCash);
    const loadedSoup = SimpleLinearRegression.load(jsonSoup);
    const loadedGarnish = SimpleLinearRegression.load(jsonGarnish);
    const loadedSalad = SimpleLinearRegression.load(jsonSalad);
    const loadedDesert = SimpleLinearRegression.load(jsonDesert);
    const loadedBread = SimpleLinearRegression.load(jsonBread);
  

    setResult({
      dishes:Math.floor(loadedDish.predict(numberToCheck)), 
      cash:Math.floor(loadedCash.predict(numberToCheck)),
      soup:Math.floor(loadedSoup.predict(numberToCheck)),
      garnish:Math.floor(loadedGarnish.predict(numberToCheck)),
      salad:Math.floor(loadedSalad.predict(numberToCheck)),
      desert:Math.floor(loadedDesert.predict(numberToCheck)),
      bread:Math.floor(loadedBread.predict(numberToCheck)),
    })

    setReady(true);
}


  return (
 
    <div className="mx-auto p-5 m-5 max-w-[1040px] bg-[#D3E298] h-full border border-stone-500 text-center rounded shadow-xl">

      <div className="mx-auto m-3 p-2 boder shadow-sm bg-white w-fit rounded hover:cursor-pointer hover:scale-105 tippy"><span>Info</span></div><h1 className="text-2xl font-bold mb-3 tracking-widest">Eurest PEC101 ML ALGO</h1>
      <div className="mx-auto max-w-[840px] flex flex-col p-2">
        <div className="flex flex-col border-b shadow-xl bg-[#CDE7BE] m-2 rounded-xl">
            <p className="text-xl font-bold p-4">Introduceti numarul estimat de clienti:</p>
            <input className="mx-auto text-center text-lg shadow-xl rounded h-[50px] m-2" onChange={(e) => {setNum(e.target.value)}}></input>
            <button className="mx-auto m-5 p-2 w-min bg-slate-50 rounded shadow-xl hover:scale-110" onClick={() => {ml()}}>SUBMIT</button>
        </div>

     
          <div className="overflow-x-auto relative shadow-md rounded-lg">
       <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400 rounded-lg">
         <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
         <tr>
           <th scope="col" className="py-3 px-6">Categorie</th>
           <th scope="col" className="py-3 px-6">Cantitate</th>
           <th scope="col" className="py-3 px-6">UNITATE</th>
         </tr>
         </thead>
         <tbody>
          <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-green-100">
            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">Incasari</th>
            <th className="text-green-700 text-xl">{ready ? result.cash : <p>awaiting</p>}</th>
            <th>RON</th>
          </tr>
          <tr className="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-green-100">
            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">Fel Principal</th>
            <th className="text-green-700 text-xl">{ready ? result.dishes : <p>awaiting</p>}</th>
            <th>portii</th>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-green-100">
            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">Supe/Ciorbe</th>
            <th className="text-green-700 text-xl">{ready ? result.soup : <p>awaiting</p>}</th>
            <th>portii</th>
          </tr>
          <tr className="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-green-100">
            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">Garnituri</th>
            <th className="text-green-700 text-xl">{ready ? result.garnish : <p>awaiting</p>}</th>
            <th>portii</th>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-green-100">
            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">Salate</th>
            <th className="text-green-700 text-xl">{ready ? result.salad : <p>awaiting</p>}</th>
            <th>portii</th>
          </tr>
          <tr className="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-green-100">
            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">Desert</th>
            <th className="text-green-700 text-xl">{ready ? result.desert : <p>awaiting</p>}</th>
            <th>portii</th>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-green-100">
            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">Chifle</th>
            <th className="text-green-700 text-xl">{ready ? result.bread : <p>awaiting</p>}</th>
            <th>bucati</th>
          </tr>
         </tbody>
       </table>
       </div>
        
      </div>
    </div>


  );
}

export default App;
