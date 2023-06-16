import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    selectedLanguageFilter: languageFiltersData[0].id,
    repositoriesData: [],
    apiStatus: '',
  }

  componentDidMount() {
    this.renderLanguages()
  }

  renderLanguages = async () => {
    const {selectedLanguageFilter} = this.state

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = `https://apis.ccbp.in/popular-repos?language=${selectedLanguageFilter}`
    const response = await fetch(url)
    console.log(response)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.popular_repos.map(eachData => ({
        id: eachData.id,
        avatarUrl: eachData.avatar_url,
        forksCount: eachData.forks_count,
        issuesCount: eachData.issues_count,
        name: eachData.name,
        starsCount: eachData.stars_count,
      }))
      this.setState({
        repositoriesData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onGettingView = id => {
    this.setState({selectedLanguageFilter: id}, this.renderLanguages)
  }

  renderRepositoryItem = () => {
    const {repositoriesData} = this.state
    return (
      <ul className="unorder-data">
        {repositoriesData.map(eachData => (
          <RepositoryItem eachData={eachData} key={eachData.id} />
        ))}
      </ul>
    )
  }

  renderLoading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  renderTheCases = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoryItem()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    const {selectedLanguageFilter} = this.state

    return (
      <div className="main-container">
        <h1 className="heading">Popular</h1>
        <ul className="button-list">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              isSelected={each.id === selectedLanguageFilter}
              eachLanguageFiltersData={each}
              key={each.id}
              onGettingView={this.onGettingView}
            />
          ))}
        </ul>
        {this.renderTheCases()}
        {/* {isLoading ? this.renderLoading() : this.renderRepositoryItem()} */}
      </div>
    )
  }
}

export default GithubPopularRepos
