import React from "react";
import NavbarLayout from "./layouts/NavbarLayout";
import { ReactComponent as Settings } from "../assets/settings.svg";
import { ReactComponent as Statistics } from "../assets/statistics.svg";

import { Col, Row, Container } from "reactstrap";
import { useHistory } from "react-router-dom";

const MainSite = () => {
  const history = useHistory();
  return (
    <>
      <NavbarLayout />
      <Container>
        <Row className="text-center" style={{ marginTop: "50px" }}>
          <Col lg="6" md="6" sm="12">
            <button
              style={{
                outline: "none",
                border: "none",
                backgroundColor: "transparent",
                color: "white",
              }}
              onClick={() => {
                history.push("/nastaveni");
              }}
            >
              <Settings
                style={{ height: "40vh", width: "100%" }}
                href="/nastaveni"
              />
            </button>
          </Col>
          <Col lg="6" md="6" sm="12">
            <button
              style={{
                outline: "none",
                border: "none",
                backgroundColor: "transparent",
                color: "white",
              }}
              onClick={() => {
                history.push("/statistiky");
              }}
            >
              <Statistics
                style={{ height: "40vh", width: "100%" }}
                href="/statistiky"
              />
            </button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default MainSite;
