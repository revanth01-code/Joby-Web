import Header from "../Header"
import './index.css'

const Home = ()=>{
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
                        <button type="button">Find Jobs</button>
                    </div>
                </div>
        </div>
    )
}

export default Home