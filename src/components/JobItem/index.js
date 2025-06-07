import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'
import {withRouter, Link} from 'react-router-dom'

const JobItem = props => {
  const {details} = props
  const {
    companyLogoUrl,
    location,
    title,
    rating,
    packagePerAnnum,
    employmentType,
    jobDescription,
    id,
  } = details

  return (
    <Link to={`/jobs/${id}`} className="link">
      <div className="job-item-container">
        <div className="job-role-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div>
            <h1 className="job-role-heading">{title}</h1>
            <div className="rating-container">
              <BsStarFill className="star-icon" />
              <p className="job-role-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-package-container">
          <div className="location-employment-container">
            <div className="location-container">
              <MdLocationOn className="location-icon" />
              <p className="location-paragraph">{location}</p>
            </div>
            <div className="location-employment-type-container">
              <BsFillBriefcaseFill className="employment-type-icon" />
              <p className="location-employment-type-para">{employmentType}</p>
            </div>
          </div>
          <p className="package-para">{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <h1 className="description-heading">Description</h1>
        <p className="description-para">{jobDescription}</p>
      </div>
    </Link>
  )
}
export default withRouter(JobItem)
