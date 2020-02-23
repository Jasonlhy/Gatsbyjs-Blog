import React, { useEffect, useState } from "react"
import Axios from "axios"
import FullLayout from "../components/fullLayout"
import SEO from "../components/seo"

/* Sample Data
{
  "ID": "tag:JHK100003000097007",
  "Subject": "Design Manager/ Senior Designer - G&M Engineering Co Ltd",
  "Summary": "HK$45k - HK$55k, 6 yr of exp, posted on 13 Jan 2020 07:20:00",
  "Links": "https://hk.jobsdb.com/hk/en/job/design-manager-senior-designer-100003000097007",
  "PublishDate": "2020-01-13T15:20:00",
  "JobCategory": "Design",
  "JobInSubject": "Design Manager/ Senior Designer",
  "CompanyInSubject": "G&M Engineering Co Ltd",
  "SalaryMin": null,
  "SalaryMax": null,
  "ExperienceInYear": null
}
*/

const ReferencePage = function ({ location }) {
  const [jobs, setJobs] = useState([])
  const [category, setCategory] = useState("Design")
  const [keyword, setKeyword] = useState("")
  const [code, setCode] = useState("")
  const [message, setMessage] = useState("")

  const fetchJob = async () => {
    if (!code) {
      setMessage("Please input the code")
      return
    }

    if (!category && !keyword) {
      setMessage("Please input category or keyword")
      setJobs([])
      return
    }

    const params = new URLSearchParams()
    params.append("category", category)
    params.append("keyword", keyword)
    params.append("code", code)

    // TODO: need to speed the searching seed
    Axios.defaults.timeout = 100000

    setMessage("Fetching .... ")
    setJobs([])
    try {
      const result = await Axios.get("https://readjobdbfeedapp.azurewebsites.net/api/SearchJobs", {
        params: params,
      })
      setJobs(result.data)
      setMessage("Top 100 records")
    } catch (err) {
      console.error(err)
      setMessage("Failed to retrieve the record")
    }
  }

  const categoryOption = [
    "",
    "Accounting",
    "Admin, HR",
    "Banking, Finance",
    "Beauty Care, Health",
    "Building, Construction",
    "Design",
    "E-commerce",
    "Education",
    "Engineering",
    "Hospitality, F and B",
    "Information Technology(IT)",
    "Insurance",
    "Management",
    "Manufacturing",
    "Marketing, Public Relations",
    "Media, Advertising",
    "Medical Services",
    "Merchandising, Purchasing",
    "Professional Services",
    "Property, Real Estate",
    "Public, Civil",
    "Sales, CS snd Business Devpt",
    "Sciences, Lab, R and D",
    "Transportation and Logistics",
    "Others",
  ]

  return (
    <FullLayout>
      <SEO title="Left For J" keywords={[`jobs`, `application`, `react`]} />
      <div>
        <h1 className="page-title">Job</h1>
        <div style={{ marginBottom: `.5rem` }}>
          <select style={{ marginRight: `.5rem` }}>
            {categoryOption.map(c => <option
              key={c}
              onChange={event => setCategory(event.target.value)}>{c}
            </option>)
            }
          </select>
          <input type="text" onChange={event => setKeyword(event.target.value)} value={keyword} placeholder="Keyword"></input>
        </div>
        <input style={{ marginRight: `.5rem` }} type="text" onChange={event => setCode(event.target.value)} value={code} placeholder="Code"></input>
        {/* TODO: remove the button */}
        <button onClick={event => fetchJob()}>Search</button>

        {message && <p>{message}</p>}

        {jobs && jobs.length > 0 && <div style={{
          maxHeight: `500px`,
          overflow: `scroll`,
          marginBottom: `1rem`,
        }}>
          <table style={{
            fontSize: `80%`,
          }}>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Summary</th>
                <th>Links</th>
                <th>Publish Date</th>
                <th>Category</th>
                <th>Title</th>
                <th>Company</th>
                <th>Salary Min</th>
                <th>Salary Max</th>
                <th>Experience</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(j =>
                <tr key={j.ID}>
                  <td>{j.Subject}</td>
                  <td>{j.Summary}</td>
                  <td>{j.Links}</td>
                  <td>{j.PublishDate}</td>
                  <td>{j.JobCategory}</td>
                  <td>{j.JobInSubject}</td>
                  <td>{j.CompanyInSubject}</td>
                  <td>{j.SalaryMin}</td>
                  <td>{j.SalaryMax}</td>
                  <td>{j.ExperienceInYear}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        }
      </div>

    </FullLayout >
  )
}

export default ReferencePage
