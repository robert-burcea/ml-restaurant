import React, {useEffect, useState} from 'react'
import SimpleLinearRegression from 'ml-regression-simple-linear';



function App() {
  const [x, setX] = useState();
  const [y, setY] = useState();
  const [result, setResult] = useState();
  const [ready, setReady] = useState(false);

  const ml = () => {
    const a = x.split(',').map((item) => { return parseInt(item) });
    const b = y.split(',').map((item) => { return parseInt(item) });
    console.log(a,b)
    const regression = new SimpleLinearRegression(a, b);
    const json = regression.toJSON();
    console.log(json)
    const loaded = SimpleLinearRegression.load(json);
    console.log('loaded', loaded)
    console.log(Math.floor(loaded.predict(850)))
    setResult(Math.floor(loaded.predict(850)))
    setReady(true);
    return Math.floor(loaded.predict(850));
}


  return (
 

    <div className="mx-auto max-w-[1040px] bg-gray-400 h-screen border border-stone-500 text-center">
      <div>
        <div>{ready? result : <div>loading</div>}</div>
      </div>
      <div className="mx-auto max-w-[840px] flex flex-col">
        <div>
            <p className="text-xl font-bold p-4">Please insert X:</p>
            <input className="shadow-xl rounded h-[40px]" onChange={(e) => {setX(e.target.value)}}></input>
        </div>
        <div>
            <p className="text-xl font-bold p-4">Please insert Y:</p>
            <input className="shadow-xl rounded h-[40px]" onChange={(e) => {setY(e.target.value)}}></input>
        </div>
        <button className="mx-auto m-5 p-2 w-min bg-slate-50 rounded shadow-xl hover:scale-110" onClick={() => {ml()}}>SUBMIT</button>
        
    </div>
    </div>


  );
}

export default App;
