import {Link} from 'react-router-dom'
import {MdLocationOn, MdStar} from 'react-icons/md' // Optional: use react-icons for a pro look
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <li className="job-item-card">
      <Link to={`/jobs/${id}`} className="link-item">
        <div className="logo-title-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="title-rating-container">
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <MdStar className="star-icon" />
              <p className="rating-text">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-salary-container">
          <div className="location-type-container">
            <div className="info-item">
              <MdLocationOn className="info-icon" />
              <p className="info-text">{location}</p>
            </div>
            <div className="info-item">
              <BsBriefcaseFill className="info-icon" />
              <p className="info-text">{employmentType}</p>
            </div>
          </div>
          <p className="package-text">{packagePerAnnum}</p>
        </div>
        <hr className="separator" />
        <h1 className="description-heading">Description</h1>
        <p className="description-text">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobItem