import React from "react";

import { Button, Container, Row, Col } from "reactstrap";

const Error = () => {
  return (
    <Container style={{ color: "white" }}>
      <Row style={{ fontSize: "70pt" }}>
        <Col>Error:(</Col>
      </Row>
      <Row style={{ fontSize: "25pt" }}>
        <Col>
          Nastala nějaká chyba, buď se můžete vrátit zpět anebo chybu nahlašte
          administrátorovi
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            color="danger"
            onClick={() => {
              window.location.reload();
            }}
            style={{ marginTop: "10px" }}
            size="lg"
          >
            Ok
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Error;