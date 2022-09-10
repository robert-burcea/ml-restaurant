import React, {useEffect, useState} from 'react'
import {useData, useSetData} from './DataContext'

const GetData = () => {

    const data = useData();
    const setData = useSetData();
    const [x, setX] = useState();
    const [y, setY] = useState();


  return (
    <div className="mx-auto max-w-[840px] flex flex-col">
        <div>
            <p className="text-xl font-bold p-4">Please insert X:</p>
            <input className="shadow-xl rounded h-[40px]" onChange={(e) => {setX(e.target.value)}}></input>
        </div>
        <div>
            <p className="text-xl font-bold p-4">Please insert Y:</p>
            <input className="shadow-xl rounded h-[40px]" onChange={(e) => {setY(e.target.value)}}></input>
        </div>
        <button className="mx-auto m-5 p-2 w-min bg-slate-50 rounded shadow-xl hover:scale-110" onClick={() => {setData({x:[x.split(',').map((item) => { return parseInt(item) })], y:[y.split(',').map((item) => { return parseInt(item) })]}); console.log(data)}}>SUBMIT</button>
        
    </div>
  )
}

export default GetData