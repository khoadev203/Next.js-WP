import React, {useContext, useEffect} from 'react';
import AppContext from "../lib/AppContext";

function Header(props) {
  const context = useContext(AppContext)
  let {mode} = context.state
  useEffect(() => {
    document.querySelector('body').classList.remove(mode == 'light' ? 'dark' : 'light')
    document.querySelector('body').classList.add(mode)
  }, [mode])
  return (
    <header id="header">
      <nav id="nav">
        <div id="logo">
          <div className="logotype"></div>
          <span>Blog</span>
        </div>
        <div id="menu-right">
          <div className="button">
            <a href="#">BACK TO DASHBOARD</a>
          </div>
          <div className="switchMode">
            <i className={`icon icon-dark ${mode == 'dark' ? 'active' : ''}`} id="theme-dark" onClick={() => context.setMode('dark')}></i>
            <i className={`icon icon-light ${mode == 'light' ? 'active' : ''}`} id="theme-light" onClick={() => context.setMode('light')}></i>
          </div>
        </div>
      </nav>
      <div className="blog-info container">
        <h1 className="blog-title">
          Blog
        </h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut nunc sollicitudin, rutrum lacus non,
          tincidunt felis.</p>
      </div>
    </header>
  );
}

export default Header;