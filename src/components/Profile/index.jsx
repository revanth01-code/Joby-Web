import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Profile = () => {
  const [profileData, setProfileData] = useState({})
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const getProfileDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }

    try {
      const response = await fetch(url, options)
      if (response.ok === true) {
        const data = await response.json()
        const updatedData = {
          name: data.profile_details.name,
          profileImageUrl: data.profile_details.profile_image_url,
          shortBio: data.profile_details.short_bio,
        }
        setProfileData(updatedData)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getProfileDetails()
  }, [])

  const renderSuccessView = () => (
    <div className="profile-container">
      <img
        src={profileData.profileImageUrl}
        alt="profile"
        className="profile-img"
      />
      <h1 className="profile-name">{profileData.name}</h1>
      <p className="profile-bio">{profileData.shortBio}</p>
    </div>
  )

  const renderLoadingView = () => (
    <div className="profile-container" style={{justifyContent: 'center', alignItems: 'center'}}>
      <p>Loading...</p>
    </div>
  )

  const renderFailureView = () => (
    <div className="profile-container" style={{justifyContent: 'center', alignItems: 'center'}}>
      <button type="button" className="profile-error-btn" onClick={getProfileDetails}>
        Retry
      </button>
    </div>
  )

  switch (apiStatus) {
    case apiStatusConstants.inProgress:
      return renderLoadingView()
    case apiStatusConstants.success:
      return renderSuccessView()
    case apiStatusConstants.failure:
      return renderFailureView()
    default:
      return null
  }
}

export default Profile