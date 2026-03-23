import Header from "../Header"
import { useNavigate } from "react-router-dom"
import './index.css'

const Home = ()=>{
    
    const navigate = useNavigate()

    return(
        <div>
            <Header />
            <div className="home-container">
                    <div className="home-content">
                        <h1>Find The Job That<br/>Fits Your Life</h1>
                        <p>
                        Millions of people are searching for jobs, salary
                        information, company reviews, and interview questions.
                        </p>
                        <button type="button" onClick={() => navigate('/jobs')}>Find Jobs</button>
                    </div>
                </div>
        </div>
    )
}

export default Home