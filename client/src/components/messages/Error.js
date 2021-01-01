import React from "react";

import { Button, Container, Row, Col, Jumbotron } from "reactstrap";

const Error = () => {
  return (
    <Container style={{ color: "black", marginTop: "50px" }}>
      <Row>
        <Col>
          <Jumbotron>
            <h1 className="display-3">Error:(</h1>
            <hr className="my-2" />
            <p style={{ fontSize: "25pt" }}>
              Nastala nějaká chyba, buď se můžete vrátit zpět anebo chybu
              nahlašte administrátorovi
            </p>
            <p className="lead">
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
            </p>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
};

export default Error;
