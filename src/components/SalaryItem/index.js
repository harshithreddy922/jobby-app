import './index.css'

const SalaryItem = props => {
  const onChangeSalaryFilter = () => {
    const {changeSalaryFilter, details} = props
    const {salaryRangeId} = details
    changeSalaryFilter(salaryRangeId)
  }
  const {details} = props
  const {salaryRangeId, label} = details
  return (
    <li className="input-container">
      <input
        type="radio"
        className="checkbox"
        name="salary"
        id={salaryRangeId}
        onClick={onChangeSalaryFilter}
      />
      <label htmlFor={salaryRangeId} className="label-el">
        {label}
      </label>
    </li>
  )
}
export default SalaryItem
