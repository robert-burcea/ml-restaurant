import React from 'react'
import GetData from './GetData';
import SimpleRegression from './SimpleRegression'
import {useData, useSetData} from './DataContext'

const DataContext = React.createContext({x:[], y:[]});

function App() {
  return (
    <DataContext.Provider value={{x:[], y:[]}}>

    <div className="mx-auto max-w-[1040px] bg-gray-400 h-screen border border-stone-500 text-center">
      <SimpleRegression />
      <GetData />
    </div>

    </DataContext.Provider>
  );
}

export default App;
