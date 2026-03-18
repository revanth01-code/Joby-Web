import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Profile from "../Profile"
import FilterSection from "../FilterSection"
import JobItem from '../JobItem'
import Header from '../Header'
import './index.css' 

const pageStatus = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
}


const Jobs = () => {
    const [jobsList, setJobsList] = useState([])
    const [status, setStatus] = useState(pageStatus.initial)
    const [searchInput, setSearchInput] = useState('')
    const [activeEmploymentTypes, setActiveEmploymentTypes] = useState('')
    const [activeSalaryRange, setActiveSalaryRange] = useState('')

    const provideFilteredData = (id, isChecked) => {
        setActiveEmploymentTypes(prevState => {
            const currentTypes = prevState ? prevState.split(',') : []
            if (isChecked) {
                return [...currentTypes, id].join(',')
            } else {
                return currentTypes.filter(type => type !== id).join(',')
            }
        })
    }

    const provideSalaryRange = (id) => {
        setActiveSalaryRange(id)
    }

    const getData = async () => {
        setStatus(pageStatus.inProgress)
        const url = `https://apis.ccbp.in/jobs?search=${searchInput}&employment_type=${activeEmploymentTypes}&minimum_package=${activeSalaryRange}`
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${Cookies.get('jwt_token')}`,
            },
        }
        try {
            const response = await fetch(url, options)
            if (response.ok) {
                const data = await response.json()
                const updatedData = data.jobs.map(eachJob => ({
                    companyLogoUrl: eachJob.company_logo_url,
                    employmentType: eachJob.employment_type,
                    id: eachJob.id,
                    jobDescription: eachJob.job_description,
                    location: eachJob.location,
                    packagePerAnnum: eachJob.package_per_annum,
                    rating: eachJob.rating,
                    title: eachJob.title,
                }))
                setJobsList(updatedData)
                setStatus(pageStatus.success)
            } else {
                setStatus(pageStatus.failure)
            }
        } catch {
            setStatus(pageStatus.failure)
        }
    }

    useEffect(() => {
        getData()
    }, [searchInput, activeEmploymentTypes,activeSalaryRange])

    const inProgressView = () => (
        <div className="loader-container">
            <h1 className="status-text">Loading...</h1>
        </div>
    )

    const successView = () => (
        <ul className="jobs-list">
            {jobsList.length > 0 ? (
                jobsList.map(eachJob => (
                    <JobItem key={eachJob.id} jobDetails={eachJob} />
                ))
            ) : (
                <div className="no-jobs-view">
                    <img src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png" alt="no jobs" />
                    <h1>No Jobs Found</h1>
                    <p>We could not find any jobs. Try other filters.</p>
                </div>
            )}
        </ul>
    )

    const failureView = () => (
        <div className="failure-view">
            <img src="https://assets.ccbp.in/frontend/react-js/failure-img.png" alt="failure view" />
            <h1>Oops! Something Went Wrong</h1>
            <button type="button" className="retry-button" onClick={getData}>Retry</button>
        </div>
    )

    const renderViews = () => {
        switch (status) {
            case pageStatus.inProgress: return inProgressView()
            case pageStatus.success: return successView()
            case pageStatus.failure: return failureView()
            default: return null
        }
    }

    return (
        <div>
        <Header />
            <div className="jobs-page-container">
            <div className="side-bar">
                <Profile />
                <hr className="separator" />
                <FilterSection provideFilteredData={provideFilteredData} provideSalaryRange={provideSalaryRange} />
            </div>
            <div className="jobs-main-content">
                <div className="search-container">
                    <input 
                        type="search" 
                        className="search-input" 
                        placeholder="Search"
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button type="button" className="search-button" onClick={getData}>
                        Search
                    </button>
                </div>
                {renderViews()}
            </div>
        </div>
        </div>
    )
}

export default Jobs