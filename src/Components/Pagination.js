import React from "react";
import { Button } from "react-bootstrap";

const Pagination = ({
  totalCounties,
  countriesPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalCounties / countriesPerPage); i++) {
    pages.push(i);
  }
  return (
    <div>
      <Button
        className="btn btn-light"
        onClick={() =>
          setCurrentPage(currentPage - 1 < 1 ? pages.length : currentPage - 1)
        }
      >
        &#8592;
      </Button>
      {pages.map((page, index) => {
        return (
          <div className="mx-1 d-inline">
            <Button
              key={index}
              className={
                currentPage === page ? "btn btn-primary" : "btn btn-light"
              }
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          </div>
        );
      })}
      <Button
        className="btn btn-light"
        onClick={() =>
          setCurrentPage(currentPage + 1 > pages.length ? 1 : currentPage + 1)
        }
      >
        &#8594;
      </Button>
    </div>
  );
};

export default Pagination;
