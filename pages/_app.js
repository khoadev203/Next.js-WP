import '../styles/globals.css'
import AppContext from "../lib/AppContext";
import {useState} from "react";

function MyApp({ Component, pageProps }) {
  const [mode, setMode] = useState('light')
  const [category, setCategory] = useState('All')
  const context = {
    state: {
      mode,
      category
    },
    setMode,
    setCategory
  }
  return (
    <AppContext.Provider value={context}>
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}

export default MyApp
