import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './components/Home/index'
import VideoDetails from './components/VideoDetails/index'
import LikedVides from './components/LikedVides/index'
import Saved from './components/Saved'
import Login from './components/login'
import context from './context/context'
import './App.css'

// Replace your code here
class App extends Component {
  state = {currentSearchInput: '', SavedVidList: [], LikedVidList: []}

  SearchFun = prop => {
    console.log(prop)
    this.setState({currentSearchInput: prop})
  }

  SaveCliked = id => {
    console.log(id)
    const {SavedVidList} = this.state
    if (SavedVidList.includes(id)) {
      const UpdatedList = SavedVidList.filter(eachItem => eachItem !== id)
      this.setState({SavedVidList: UpdatedList})
    } else {
      this.setState(prevState => ({
        SavedVidList: [...prevState.SavedVidList, id],
      }))
    }
  }

  LikeCliked = id => {
    console.log(id)
    const {LikedVidList} = this.state
    if (LikedVidList.includes(id)) {
      const UpdatedList = LikedVidList.filter(eachItem => eachItem !== id)
      this.setState({LikedVidList: UpdatedList})
    } else {
      this.setState(prevState => ({
        LikedVidList: [...prevState.LikedVidList, id],
      }))
    }
  }

  render() {
    const {currentSearchInput, SavedVidList, LikedVidList} = this.state
    return (
      <context.Provider
        value={{
          currentSearchInput,
          SearchFun: this.SearchFun,
          SaveCliked: this.SaveCliked,
          LikeCliked: this.LikeCliked,
          SavedVidList,
          LikedVidList,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/video/:id" component={VideoDetails} />
          <Route exact path="/likedVideos" component={LikedVides} />
          <Route exact path="/savedVideos" component={Saved} />
        </Switch>
      </context.Provider>
    )
  }
}

export default App
