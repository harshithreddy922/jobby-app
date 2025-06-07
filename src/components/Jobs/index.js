import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {IoSearchOutline} from 'react-icons/io5'
import Header from '../Header'
import JobItem from '../JobItem'
import EmploymentItem from '../EmploymentItem'
import SalaryItem from '../SalaryItem'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'initial',
  success: 'success',
  failure: 'failure',
  inProgress: 'in_progress',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    searchInput: '',
    employmentTypeId: [],
    salaryRange: '',
    profileDetails: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getAllJobs()
    this.getProfileDetails()
  }

  getAllJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput, employmentTypeId, salaryRange} = this.state
    let employmentType = ''
    const last = employmentTypeId.length - 1
    let i = 0
    employmentTypeId.forEach(eachItem => {
      console.log(i)
      console.log(last)
      if (i !== last) {
        employmentType = `${employmentType + eachItem},`
      } else {
        employmentType += eachItem
      }
      i += 1
    })
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?search=${searchInput}&employment_type=${employmentType}&minimum_package=${salaryRange}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.jobs.map(job => ({
        id: job.id,
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
        location: job.location,
        title: job.title,
        rating: job.rating,
        packagePerAnnum: job.package_per_annum,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  changeSalaryFilter = id => {
    this.setState({salaryRange: id}, this.getAllJobs)
  }

  changeEmploymentType = (id, isChecked) => {
    if (isChecked) {
      this.setState(
        prevState => ({employmentTypeId: [...prevState.employmentTypeId, id]}),
        this.getAllJobs,
      )
    } else {
      const {employmentTypeId} = this.state
      const updatedList = employmentTypeId.filter(eachItem => eachItem !== id)
      console.log(updatedList)
      this.setState({employmentTypeId: updatedList}, this.getAllJobs)
    }
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const profileDetails = await fetch(profileApiUrl, options)
    const profileResponse = await profileDetails.json()
    if (profileDetails.ok === true) {
      const updateProfileDetails = {
        name: profileResponse.profile_details.name,
        profileImageUrl: profileResponse.profile_details.profile_image_url,
        shortBio: profileResponse.profile_details.short_bio,
      }
      this.setState({profileDetails: updateProfileDetails})
    }
  }

  onSearchInput = () => {
    this.getAllJobs()
  }

  renderFailureView = () => (
    <>
      <img
        src='https://assets.ccbp.in/frontend/react-js/failure-img.png'
        alt='failure view'
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type='button'>Retry</button>
    </>
  )

  renderLoadingView = () => (
    <div data-testid='loader'>
      <Loader type='ThreeDots' />
    </div>
  )

  renderJobs = () => {
    const {jobsList, profileDetails} = this.state
    return (
      <>
        <Header />
        <div className='job-page-container'>
          <div className='left-container'>
            <div className='profile-container'>
              <img
                src={profileDetails.profileImageUrl}
                alt='profile'
                className='profile-image'
              />
              <h1 className='profile-heading'>{profileDetails.name}</h1>
              <p className='profile-paragraph'>{profileDetails.shortBio}</p>
            </div>
            <hr className='hr-line' />
            <div className='employment-container'>
              <h1 className='employment-heading'>Type of Employment</h1>
              <ul>
                {employmentTypesList.map(eachItem => (
                  <EmploymentItem
                    key={eachItem.employmentTypeId}
                    details={eachItem}
                    changeEmploymentType={this.changeEmploymentType}
                  />
                ))}
              </ul>
              <hr className='hr-line' />
              <div className='salary-container'>
                <ul>
                  {salaryRangesList.map(eachItem => (
                    <SalaryItem
                      key={eachItem.salaryRangeId}
                      details={eachItem}
                      changeSalaryFilter={this.changeSalaryFilter}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className='right-container'>
            <div className='search-container'>
              <input
                type='search'
                onChange={this.onChangeInput}
                className='search-input-el'
                placeholder='Search'
              />
              <button
                type='button'
                onClick={this.onSearchInput}
                className='search-button'
                data-testid='searchButton'
              >
                <IoSearchOutline className='search-icon' />
              </button>
            </div>
            <div className='jobs-display-container'>
              {jobsList.length === 0 ? (
                <>
                  <img
                    src='https://assets.ccbp.in/frontend/react-js/no-jobs-img.png'
                    alt='no jobs'
                  />
                  <h1>No Jobs Found</h1>
                  <p>We could not find any jobs. Try other filters</p>
                </>
              ) : (
                <ul>
                  {jobsList.map(job => (
                    <JobItem details={job} key={job.id} />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }

  renderJobsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobs()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderJobsView()}</>
  }
}
export default Jobs
