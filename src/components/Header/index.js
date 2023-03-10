import {Link} from 'react-router-dom'

import context from '../../context/context'

import './index.css'

const Header = () => (
  <context.Consumer>
    {value => {
      const {currentSearchInput, SearchFun} = value
      console.log(currentSearchInput)
      const SearchFuncall = event => {
        SearchFun(event.target.value)
      }
      return (
        <nav className="NavBarEle">
          <Link to="/" className="LogoCon">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
              className="logo"
              alt="logo"
            />
          </Link>
          <div className="searchInputCon">
            <input
              value={currentSearchInput}
              type="search"
              className="searchInpu"
              placeholder="Search"
              onChange={SearchFuncall}
            />
          </div>
        </nav>
      )
    }}
  </context.Consumer>
)

export default Header
