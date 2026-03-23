import { useParams } from "react-router-dom"
import { useEffect, useState } from "react" 
import Cookie from "js-cookie"
import Header from "../Header"
import "./index.css" 

const pageStatus = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
}

const JobItemDetails = () => {
    const [status, setStatus] = useState(pageStatus.initial)
    const [jobDetails, setJobDetails] = useState({})
    const { id } = useParams()

    const getItemDetails = async () => {
        setStatus(pageStatus.inProgress)
        const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, {
            headers: {
                Authorization: `Bearer ${Cookie.get('jwt_token')}`, // Ensure you have your token here
            },
        })
        
        if (response.ok) {
            const data = await response.json()
            const updatedData = {
                companyLogoUrl: data.job_details.company_logo_url,
                companyWebsiteUrl: data.job_details.company_website_url,
                employmentType: data.job_details.employment_type,
                id: data.job_details.id,
                jobDescription: data.job_details.job_description,
                title: data.job_details.title,
                skills: data.job_details.skills.map(eachSkill => ({
                    imageUrl: eachSkill.image_url,
                    name: eachSkill.name,
                })),
                lifeAtCompany: {
                    description: data.job_details.life_at_company.description,
                    imageUrl: data.job_details.life_at_company.image_url,
                },
                location: data.job_details.location,
                packagePerAnnum: data.job_details.package_per_annum,
                rating: data.job_details.rating,
            }
            const updatedSimilarJobs = data.similar_jobs.map(eachJob => ({
                companyLogoUrl: eachJob.company_logo_url,
                employmentType: eachJob.employment_type,
                id: eachJob.id,
                jobDescription: eachJob.job_description,
                location: eachJob.location,
                rating: eachJob.rating,
                title: eachJob.title,
            }))

            setJobDetails({ ...updatedData, similarJobs: updatedSimilarJobs })
            setStatus(pageStatus.success)
        } else {
            setStatus(pageStatus.failure)
        }
    }

    useEffect(() => {
        getItemDetails()
    }, [id])

    const renderJobDetails = () => {
        const { 
            companyLogoUrl, companyWebsiteUrl, employmentType, jobDescription, 
            location, packagePerAnnum, rating, title, skills, lifeAtCompany, similarJobs 
        } = jobDetails

        return (
            <div className="job-details-container">
                <div className="job-card">
                    <div className="logo-title-container">
                        <img src={companyLogoUrl} alt="job details company logo" className="company-logo" />
                        <div>
                            <h1>{title}</h1>
                            <p>⭐ {rating}</p>
                        </div>
                    </div>
                    <div className="location-package-container">
                        <div className="location-type">
                            <p>{location}</p>
                            <p>{employmentType}</p>
                        </div>
                        <p className="package">{packagePerAnnum}</p>
                    </div>
                    <hr />
                    <div className="description-header">
                        <h2>Description</h2>
                        <a href={companyWebsiteUrl} target="_blank" rel="noreferrer">Visit</a>
                    </div>
                    <p>{jobDescription}</p>
                    
                    <h3>Skills</h3>
                    <ul className="skills-list">
                        {skills.map(skill => (
                            <li key={skill.name} className="skill-item">
                                <img src={skill.imageUrl} alt={skill.name} />
                                <p>{skill.name}</p>
                            </li>
                        ))}
                    </ul>

                    <div className="life-at-company">
                        <div>
                            <h3>Life at Company</h3>
                            <p>{lifeAtCompany.description}</p>
                        </div>
                        <img src={lifeAtCompany.imageUrl} alt="life at company" />
                    </div>
                </div>

                <h2>Similar Jobs</h2>
                <ul className="similar-jobs-list">
                    {similarJobs.map(job => (
                        <li key={job.id} className="similar-job-card">
                            <div className="logo-title-container">
                                <img src={job.companyLogoUrl} alt="similar job company logo" className="company-logo" />
                                <div>
                                    <h3>{job.title}</h3>
                                    <p>⭐ {job.rating}</p>
                                </div>
                            </div>
                            <h3>Description</h3>
                            <p>{job.jobDescription}</p>
                            <div className="location-type">
                                <p>{job.location}</p>
                                <p>{job.employmentType}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    return (
        <div className="job-item-details-bg">
            <Header />
            {status === pageStatus.success && renderJobDetails()}
            {status === pageStatus.inProgress && <p>Loading...</p>}
            {status === pageStatus.failure && <p>Failed to load. Please try again.</p>}
        </div>
    )
}

export default JobItemDetails