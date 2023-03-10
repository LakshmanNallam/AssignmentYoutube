import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiOutlineLike} from 'react-icons/ai'
import {BiListPlus} from 'react-icons/bi'
import context from '../../context/context'
import Header from '../Header/index'
import AllVideos from '../AllVideos'

import './index.css'

class Home extends Component {
  state = {IsDataLoaded: false, Data: []}

  componentDidMount() {
    this.getReponse()
  }

  getReponse = async () => {
    const response = await fetch('http://localhost:3000/videos')
    const dataa = await response.json()
    const {Array} = dataa
    this.setState({IsDataLoaded: true, Data: Array})
  }

  render() {
    const {IsDataLoaded, Data} = this.state

    return (
      <context.Consumer>
        {value => {
          const {currentSearchInput} = value
          const FilteredData = Data.filter(eachItem =>
            eachItem.title
              .toLowerCase()
              .includes(currentSearchInput.toLowerCase()),
          )
          console.log(FilteredData)
          return (
            <div className="MainDiv">
              <Header />
              <div className="LowerConInHome">
                <div className="LeftCon">
                  <Link to="/savedVideos">
                    <div className="leftConDetailsRow">
                      <BiListPlus size="30" className="BIPLUS" color="red" />
                      <p>Saved Videos</p>
                    </div>
                  </Link>
                  <Link to="/likedVideos">
                    <div className="leftConDetailsRow">
                      <AiOutlineLike size="30" className="BIPLUS" color="red" />
                      <p>Liked Videos</p>
                    </div>
                  </Link>
                </div>
                <div className="RightCon">
                  {IsDataLoaded ? <AllVideos Data={FilteredData} /> : null}
                </div>
              </div>
            </div>
          )
        }}
      </context.Consumer>
    )
  }
}

export default Home
