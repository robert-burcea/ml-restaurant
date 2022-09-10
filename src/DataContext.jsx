import React from 'react'
import {useState, useContext} from 'react'

export const Data = React.createContext();
export const SetData = React.createContext();

export const useData = () => {
    return useContext(Data);
}

export const useSetData = () => {
    return useContext(SetData);
}

export default function DataContext({value, children}) {
    const [data, setData] = useState()
  return (
        <Data.Provider value={data}>
            <SetData.Provider value={setData}>
                {children}
            </SetData.Provider>
        </Data.Provider>
  )
}
