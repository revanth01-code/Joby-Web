
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

const FilterSection = (props) => {
  const {provideFilteredData} = props

  const getFilteredData = event => {
    const {id, checked} = event.target
      provideFilteredData(id,checked)
  }

    return (
        <div className="filters-container">
            <div className="filter-group-container">
                <h1 className="filter-heading">Type of Employment</h1>
                <ul className="filters-list">
                    {employmentTypesList.map(eachType => (
                        <li className="filter-item" key={eachType.employmentTypeId}>
                            <input 
                                type="checkbox" 
                                className="filter-input" 
                                id={eachType.employmentTypeId} 
                                onChange = {getFilteredData}
                            />
                            <label className="filter-label" htmlFor={eachType.employmentTypeId}>
                                {eachType.label}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <hr className="separator" />
            <div className="filter-group-container">
                <h1 className="filter-heading">Salary Range</h1>
                <ul className="filters-list">
                    {salaryRangesList.map(eachRange => (
                        <li className="filter-item" key={eachRange.salaryRangeId}>
                            <input 
                                type="radio" 
                                className="filter-input" 
                                id={eachRange.salaryRangeId} 
                                name="salary" 
                                onChange={() => props.provideSalaryRange(eachRange.salaryRangeId)}  
                            />
                            <label className="filter-label" htmlFor={eachRange.salaryRangeId}>
                                {eachRange.label}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default FilterSection