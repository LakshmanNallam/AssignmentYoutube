import {Link} from 'react-router-dom'
import './index.css'

const AllVideos = props => {
  const {Data} = props
  console.log(Data)
  return Data.map(eachItem => {
    const value = eachItem.id.split('=')
    console.log(value[1])
    return (
      <Link to={`/video/${eachItem.id}`} className="ConForbOX">
        <div className="ThumbnailhOLDER">
          <img
            src={eachItem.thumbnail_url}
            className="thumbnauk"
            alt="thumbnail"
          />
          <div className="ProfileIMg">
            <div className="chennelLOgoConHoLDER">
              <img
                src={`${eachItem.profile_image_url}`}
                className="imdf"
                alt="ChannelLogo"
              />
            </div>
            <p>{eachItem.channelname}</p>
          </div>
          <p className="title">{eachItem.title}</p>
        </div>
      </Link>
    )
  })
}

export default AllVideos
