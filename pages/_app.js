import '../styles/globals.css'
import AppContext from "../lib/AppContext";
import {useState} from "react";

function MyApp({ Component, pageProps }) {
  const [mode, setMode] = useState('light')
  const context = {
    state: {
      mode
    },
    setMode
  }
  return (
    <AppContext.Provider value={context}>
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}

export default MyApp
