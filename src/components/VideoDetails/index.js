import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {BiListPlus} from 'react-icons/bi'
import ReactPlayer from 'react-player'
import context from '../../context/context'
import Header from '../Header/index'
import './index.css'

class VideoDetails extends Component {
  state = {isDataloaded: false, obj: {}}

  componentDidMount() {
    console.log('MOUNTED')
    this.getObjDetails()
  }

  getObjDetails = async () => {
    console.log(this.props)
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const response = await fetch(`http://localhost:3000/video?id=${id}`)
    const data = await response.json()
    const {Array} = data
    this.setState({isDataloaded: true, obj: Array[0]})
  }

  render() {
    const {isDataloaded, obj} = this.state
    console.log(isDataloaded, obj)
    const {match} = this.props
    const {params} = match
    const {id} = params
    return (
      <context.Consumer>
        {value => {
          const {SaveCliked, SavedVidList, LikedVidList, LikeCliked} = value

          const SaveClikedCall = () => {
            console.log('yes')
            SaveCliked(id)
          }

          const LikeClikedCall = () => {
            console.log('yes')
            LikeCliked(id)
          }
          const isSaved = SavedVidList.includes(id)
          const isLiked = LikedVidList.includes(id)
          console.log(isLiked)
          return (
            <div className="MainDiv">
              <nav className="NavBarEle">
                <div className="LogoCon">
                  <img
                    src="https://themayanagari.com/wp-content/uploads/2021/01/2-28.jpg"
                    className="logo"
                    alt="logo"
                  />
                </div>
              </nav>
              <div className="LowerConInHome">
                <div className="LeftCon">
                  <Link to="/savedVideos">
                    <div className="leftConDetailsRow">
                      <BiListPlus size="30" className="BIPLUS" />
                      <p>Saved Videos</p>
                    </div>
                  </Link>
                  <Link to="/likedVideos">
                    <div className="leftConDetailsRow">
                      <AiOutlineLike size="30" className="BIPLUS" />
                      <p>Liked Videos</p>
                    </div>
                  </Link>
                </div>
                <div className="RightCon indetails">
                  <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${id}`}
                    width="100%"
                    height="70vh"
                  />
                  <div className="ProfileIMg invideoPo">
                    <div className="chennelLOgoConHoLDER inVideoDetails">
                      <img
                        src={`${obj.profile_image_url}`}
                        className="imdf"
                        alt="ChannelLogo"
                      />
                    </div>
                    <p>{obj.channelname}</p>
                    <div className="divBtnCon">
                      <AiOutlineLike
                        color={isLiked ? 'blue' : 'black'}
                        size="25"
                        onClick={LikeClikedCall}
                      />
                      <p className="Likee">
                        {obj.view_count} {isLiked ? 'Liked' : 'Likes'}
                      </p>
                      <BiListPlus
                        size="25"
                        onClick={SaveClikedCall}
                        color={isSaved ? 'blue' : 'black'}
                      />
                      <p className="Likee">{isSaved ? 'Saved' : 'Save'}</p>
                    </div>
                  </div>
                  <p className="title">{obj.title}</p>
                </div>
              </div>
            </div>
          )
        }}
      </context.Consumer>
    )
  }
}

export default VideoDetails
