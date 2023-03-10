import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {AiOutlineLike} from 'react-icons/ai'
import {BiListPlus} from 'react-icons/bi'
import Header from '../Header/index'
import context from '../../context/context'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Saved extends Component {
  state = {Data: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    console.log('YES')
    this.GetALLDETAILS()
  }

  GetALLDETAILS = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const response = await fetch('http://localhost:3000/videos')
    const dataa = await response.json()
    const {Array} = dataa
    this.setState({apiStatus: apiStatusConstants.success, Data: Array})
  }

  renderVideosListView = () => {
    const {Data} = this.state
    console.log(Data)
    return (
      <context.Consumer>
        {value => {
          const {SavedVidList} = value
          if (SavedVidList.length === 0) {
            return (
              <div className="NOTFOUNDCon">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                  alt="notfound"
                  className="notfound"
                />
              </div>
            )
          }
          return Data.map(eachItem => {
            if (SavedVidList.includes(eachItem.id)) {
              return (
                <div className="SavedVidConDetails">
                  <div className="ImgConHolder">
                    <img
                      src={eachItem.thumbnail_url}
                      className="imgTHUMbail"
                      alt="thumbnail"
                    />
                  </div>
                  <div className="RightConinSavedDetials">
                    <p>{eachItem.title}</p>
                  </div>
                </div>
              )
            }
            return null
          })
        }}
      </context.Consumer>
    )
  }

  renderFailureView = () => (
    <div className="NOTFOUNDCon">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="notfound"
        className="notfound"
      />
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  RenderDetial = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideosListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
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
          <div className="RightConInSaved">{this.RenderDetial()}</div>
        </div>
      </div>
    )
  }
}

export default Saved
