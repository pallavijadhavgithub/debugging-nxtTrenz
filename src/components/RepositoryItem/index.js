// Write your code here
import {Component} from 'react'
import './index.css'

class RepositoryItem extends Component {
  render() {
    const {eachData} = this.props
    const {avatarUrl, name, forksCount, starsCount, issuesCount} = eachData

    return (
      <li className="list container">
        <img src={avatarUrl} className="image" alt={name} />

        <h1 className="name">{name}</h1>

        <div className="small-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="symbols"
          />
          <p>{starsCount}</p>
        </div>
        <div className="small-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="symbols"
          />
          <p>{forksCount}</p>
        </div>
        <div className="small-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="symbols"
          />
          <p>{issuesCount}</p>
        </div>
      </li>
    )
  }
}

export default RepositoryItem
