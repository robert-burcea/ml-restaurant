import React, {useEffect, useState} from 'react'
import SimpleLinearRegression from 'ml-regression-simple-linear';



function App() {
  const [x, setX] = useState();
  const [y, setY] = useState();
  const [z, setZ] = useState();
  const [result, setResult] = useState();
  const [ready, setReady] = useState(false);

  const ml = () => {
    const a = x.split(' ').map((item) => { return parseInt(item) });
    const b = y.split(' ').map((item) => { return parseInt(item) });
    const numberToCheck = parseInt(z);
    console.log(a,b)
    const regression = new SimpleLinearRegression(a, b);
    const json = regression.toJSON();
    console.log(json)
    const loaded = SimpleLinearRegression.load(json);
    console.log('loaded', loaded)
    console.log(Math.floor(loaded.predict(numberToCheck)))
    setResult(Math.floor(loaded.predict(numberToCheck)))
    setReady(true);
    return Math.floor(loaded.predict(numberToCheck));
}


  return (
 

    <div className="mx-auto max-w-[1040px] bg-gray-400 h-screen border border-stone-500 text-center">

      <div className="mx-auto max-w-[840px] flex flex-col">
        <div>
            <p className="text-xl font-bold p-4">Please insert X:</p>
            <input className="shadow-xl rounded h-[40px]" onChange={(e) => {setX(e.target.value)}}></input>
        </div>
        <div>
            <p className="text-xl font-bold p-4">Please insert Y:</p>
            <input className="shadow-xl rounded h-[40px]" onChange={(e) => {setY(e.target.value)}}></input>
        </div>
        <div>
            <p className="text-xl font-bold p-4">Introduceti numarul de clienti de azi:</p>
            <input className="shadow-xl rounded h-[40px]" onChange={(e) => {setZ(e.target.value)}}></input>
        </div>
        <button className="mx-auto m-5 p-2 w-min bg-slate-50 rounded shadow-xl hover:scale-110" onClick={() => {ml()}}>SUBMIT</button>

        <div>
        <div><p>Astazi vor fi cumparate </p>{ready? <p className="text-3xl font-bold text-red-700">~{result}</p> : <div>awaiting</div>} <p>portii de fel principal</p></div>
      </div>
        
    </div>
    </div>


  );
}

export default App;
