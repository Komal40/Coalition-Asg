import React, { createContext, useState } from 'react'
import { useSearchParams } from 'react-router'

export const DataProvider=createContext()


const DataContext = ({children}) => {

    const [userData, setUserData]=useState(null)

  return (
    <DataProvider.Provider value={{userData, setUserData}}>
        {children}
    </DataProvider.Provider>
  )
}

export default DataContext
