import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { getJobsAction } from "../redux/actions";

const MainSearch = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jobsIsLoading = useSelector(state => state.jobs.isLoading);
  const jobsHasError = useSelector(state => state.jobs.hasError);
  const jobsErrorMessage = useSelector(state => state.jobs.errorMessage);
  const jobs = useSelector(state => state.jobs.content);

  const baseEndpoint = "https://strive-benchmark.herokuapp.com/api/jobs?search=";

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    dispatch(getJobsAction(baseEndpoint, query));
  };

  return (
    <Container>
      <Row>
        <Col xs={10} className="d-flex flex-wrap align-items-center mx-auto my-3">
          <h1 className="display-1 me-auto">Remote Jobs Search</h1>
          <Button variant="outline-primary" onClick={() => navigate("/favourites")}>
            go to Favourites
          </Button>
        </Col>
        <Col xs={10} className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              value={query}
              onChange={handleChange}
              placeholder="type and press Enter"
              required
            />
          </Form>
        </Col>
        <Col xs={10} className="mx-auto mt-5">
          {jobsIsLoading && <Spinner variant="primary"></Spinner>}
        </Col>
        {jobsHasError ? (
          <Col>
            <Alert variant="danger">{jobsErrorMessage}</Alert>
          </Col>
        ) : (
          <Col xs={10} className="mx-auto mb-5">
            {jobs.map(jobData => (
              <Job key={jobData._id} data={jobData} />
            ))}
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default MainSearch;
