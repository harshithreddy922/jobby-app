import {Component} from 'react'
import './index.css'

class EmploymentItem extends Component {
  state = {isChecked: false}

  onChangeCheckbox = () => {
    this.setState(
      prevState => ({isChecked: !prevState.isChecked}),
      this.onChangeEmploymentType,
    )
  }

  onChangeEmploymentType = () => {
    const {isChecked} = this.state
    const {changeEmploymentType, details} = this.props
    const {employmentTypeId} = details
    changeEmploymentType(employmentTypeId, isChecked)
  }

  render() {
    const {details} = this.props
    const {employmentTypeId, label} = details
    const {isChecked} = this.state
    return (
      <li className="input-container">
        <input
          type="checkbox"
          className="checkbox"
          id={employmentTypeId}
          onChange={this.onChangeCheckbox}
          checked={isChecked}
        />
        <label htmlFor={employmentTypeId} className="label-el">
          {label}
        </label>
      </li>
    )
  }
}
export default EmploymentItem
