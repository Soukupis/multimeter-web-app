import React from "react";
import { Spinner, Row, Col, Container } from "reactstrap";

const Loading = () => {
  return (
    <Container>
      <Row style={{ height: "100vh" }} className="align-items-center">
        <Col className="text-center">
          <Spinner style={{ width: "15rem", height: "15rem" }} type="grow" />
        </Col>
      </Row>
    </Container>
  );
};
export default Loading;
