import { useState } from "react";
import Modal from "react-bootstrap/Modal";

function ModalComponent({ data }) {
  const [lgShow, setLgShow] = useState(false);

  return (
    <>
      <p
        onClick={() => setLgShow(true)}
        className="cursor-p"
      >
        {data.name.official}
      </p>

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {data.name.official}
            <img
              src={data.flags.png}
              alt={data.name.common}
              width="25px"
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="container">
            <div class="row">
              <div class="col-sm">
                <p>Capital: {data.capital}</p>
                <p>Region: {data.region}</p>
                <p>
                  Continents:{" "}
                  {data.continents.map((c) => {
                    return c + " ";
                  })}
                </p>
                <p>
                  Coat of Arms:{" "}
                  <img
                    src={data.coatOfArms.png}
                    alt={data.coatOfArms.png}
                    width="30px"
                  />
                </p>
                <p>Day of the week: {data.startOfWeek}</p>
              </div>
              <div class="col-sm">
                <p>Independent: {data.independent ? "True" : "False"}</p>
                <p>Subregion: {data.subregion}</p>
                <p>Population: {data.population}</p>
                <p>Flag: {data.flag}</p>
                <p>
                  Capital info:{" "}
                  {data.capitalInfo.latlng.map((l) => {
                    return l + " ";
                  })}
                </p>
                <p>
                  Car: {data.car.signs[0]} {data.car.side}
                </p>
              </div>
              <div class="col-sm">
                <p>UN Member: {data.unMember ? "True" : "False"}</p>
                <p>
                  Area: {data.area}Km<sup>2</sup>
                </p>
                <p>Timezone: {data.timezones}</p>
                <p>
                  Google Map:{" "}
                  <a href={data.maps.googleMaps}>{data.maps.googleMaps}</a>
                </p>
                <p>Fifa: {data.fifa}</p>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalComponent;
