// Write your code here
import {Component} from 'react'
import './index.css'

class LanguageFilterItem extends Component {
  render() {
    const {eachLanguageFiltersData, onGettingView, isSelected} = this.props
    const {language, id} = eachLanguageFiltersData

    const buttonClassName = isSelected ? 'btn' : null

    const onClickingButton = () => {
      onGettingView(id)
    }

    return (
      <li>
        <button
          type="button"
          className={`button ${buttonClassName}`}
          onClick={onClickingButton}
        >
          {language}
        </button>
      </li>
    )
  }
}

export default LanguageFilterItem
