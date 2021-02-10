import React from "react";
import { Link } from "react-router-dom";
export default class BodyData extends React.Component {
  state = {
    query: "",
    data: [],
    filteredData: [],
  };

  handleInputChange = (event) => {
    const query = event.target.value;

    this.setState((prevState) => {
      const filteredData = prevState.data.filter((element) => {
        return element.title.toLowerCase().includes(query.toLowerCase());
      });

      return {
        query,
        filteredData,
      };
    });
  };

  getData = () => {
    fetch("http://localhost:8000/api/jobpost")
      .then((response) => response.json())
      .then((data) => {
        const { query } = this.state;
        const filteredData = data.filter((element) => {
          return element.title.toLowerCase().includes(query.toLowerCase());
        });

        this.setState({
          data,
          filteredData,
        });
      });
  };

  componentWillMount() {
    this.getData();
  }

  render() {
    return (
      <div>
        <div className="searchForm">
          <input
            placeholder="Search for job..."
            value={this.state.query}
            onChange={this.handleInputChange}
          />
        </div>

        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {this.state.filteredData.map((i) => (
                <div className="col" key={i._id}>
                  <div className="card-body" style={{ borderColor: "black" }}>
                    <div className="card">
                      <img
                        style={{ height: "15rem" }}
                        src={i.employer.logo}
                        className="card-img-top"
                        alt="..."
                      />
                    </div>
                    <p className="card-text">
                      <b>Post - </b>
                      {i.title}
                    </p>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <b>Company - </b>
                        {i.employer.company}
                      </li>
                      <li className="list-group-item">
                        <b>Salary - </b>
                        {i.salary} lpa
                      </li>
                      <li className="list-group-item">
                        <b>Qualification Required - </b> {i.qualification}
                      </li>
                      <li className="list-group-item">
                        <b>Location - </b>
                        {i.location}
                      </li>
                    </ul>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group" employer={i.employer}>
                        <Link to="/register/jobseeker">Register Now</Link>
                        <div className="align-left"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
