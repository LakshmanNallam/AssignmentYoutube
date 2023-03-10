import {Component} from 'react'
import Loader from 'react-loader-spinner'

import {Button} from './stylesCom'
import './index.css'

class Download extends Component {
  state = {istrue: false, result: null}

  componentDidMount() {
    this.getdetails()
  }

  getdetails = async () => {
    console.log(this.props)
    const {match} = this.props
    const {params} = match
    const {value} = params

    const resultfetched = await fetch(
      `http://localhost:3000/videdownload?value=${value}`,
    )
    const result = await resultfetched.json()

    this.setState({result, istrue: true})
  }

  render() {
    const {istrue, result} = this.state

    return (
      <div className="Appp">
        <h1>Sit back and relax while we get the best VIDEO resolution</h1>

        <div className="conForVideo">
          {istrue ? (
            <>
              <iframe
                width="570"
                height="320"
                src={`${result.url}`}
                title="video"
              />
              <h1>Video from best to poor quality</h1>
              {result.infoOfVideo.map(eachItem => {
                if (eachItem.hasAudio && eachItem.hasVideo) {
                  return (
                    <a href={`${eachItem.url}`} download>
                      <Button type="button" onClick={this.btnClikde}>
                        Click Here to download {eachItem.qualityLabel}
                      </Button>
                    </a>
                  )
                }
                return null
              })}
              <h1>Audio from best to poor quality</h1>
              {result.infoOfVideo.map(eachItem => {
                if (eachItem.hasAudio && !eachItem.hasVideo) {
                  return (
                    <a href={`${eachItem.url}`} download>
                      <Button type="button">
                        Click Here to download {eachItem.qualityLabel}
                      </Button>
                    </a>
                  )
                }
                return null
              })}
            </>
          ) : (
            <div className="loader-container">
              <Loader type="ThreeDots" color="blue" height="50" width="50" />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Download
