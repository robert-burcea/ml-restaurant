import React, {useEffect, useState} from 'react';
import SimpleLinearRegression from 'ml-regression-simple-linear';
import {useData, useSetData} from './DataContext'


const SimpleRegression = () => {
    const x= [
        1,2,3,4,5
    ]
    const y= [
        2,3,4,5,6
    ]
    const [result, setResult] = useState();
    const data = useData();
    const setData = useSetData();
    //const x = data.x;
    //const y = data.y;

    const ml = () => {
        console.log(data.x,data.y)
        const regression = new SimpleLinearRegression(data.x, data.y);
        console.log(regression.predict(7));
        const json = regression.toJSON();
        console.log(json)
        const loaded = SimpleLinearRegression.load(json);
        return Math.floor(loaded.predict(850));
    }

    useEffect(() => {
        data ? setResult(ml()) : <p>Awaiting</p>;
    }, data)

  return (
    <div>
        <p>{result}</p>
    </div>
  )
}

export default SimpleRegression