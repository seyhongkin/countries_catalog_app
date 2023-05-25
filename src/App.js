import "./style.css";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import Pagination from "./Components/Pagination";
import ModalComponent from "./Components/Modal";

function App() {
  const baseUrl = "https://restcountries.com/v3.1";
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(25);
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      const response = await axios.get(baseUrl + "/all", {
        params: { _limit: 10 },
      });
      setCountries(response.data);
      setLoading(false);
    };

    loadPost();
  }, []);

  const sorting = () => {
    if (order === "asc") {
      setCountries(
        countries.sort((a, b) => (a.name.official > b.name.official ? 1 : -1))
      );
      setOrder("desc");
    } else {
      setCountries(
        countries.sort((a, b) => (a.name.official < b.name.official ? 1 : -1))
      );
      setOrder("asc");
    }
  };

  const lastPostIndex = currentPage * countriesPerPage;
  const firstPostIndex = lastPostIndex - countriesPerPage;
  return (
    <div className="App">
      <Container className="mt-2">
        <Form className="w-25 mb-3">
          <Form.Group
            className="mb-1"
            controlId="formSearch"
          >
            <Form.Label>Search</Form.Label>
            <Form.Control
              type="text"
              placeholder="type here..."
              onChange={(e) => setSearch(e.target.value)}
              className="float-left"
            />
          </Form.Group>
        </Form>
        <label>Sorting: </label>
        <Button
          className="mb-2 mx-2"
          onClick={() => sorting()}
        >
          {order.toUpperCase()}
        </Button>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <Table
            striped
            bordered
            hover
            size="sm"
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Flag</th>
                <th> Country Name</th>
                <th>CCA2</th>
                <th>CCA3</th>
                <th>Native Country Name</th>
                <th>Alt Spelling</th>
                <th>IDD</th>
              </tr>
            </thead>
            <tbody>
              {countries
                .filter((country) => {
                  if (search === "") {
                    return country;
                  } else if (
                    country.name.official
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  ) {
                    return country;
                  }
                  return null;
                })
                .slice(firstPostIndex, lastPostIndex)
                .map((country, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={country.flags.png}
                          alt={country.name.common}
                          width="30px"
                        />
                      </td>
                      <td>
                        <ModalComponent data={country} />
                      </td>
                      <td>{country.cca2}</td>
                      <td>{country.cca3}</td>

                      <td>{}</td>
                      <td>{country.altSpellings[0]}</td>
                      <td>{country.idd.root}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        )}
      </Container>
      <div className="w-75 mx-auto mb-5">
        <Pagination
          totalCounties={countries.length}
          countriesPerPage={countriesPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default App;
