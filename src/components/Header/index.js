import {BsSearch} from 'react-icons/bs'
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
          <div className="LogoCon">
            <img
              src="https://themayanagari.com/wp-content/uploads/2021/01/2-28.jpg"
              className="logo"
              alt="logo"
            />
          </div>
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
