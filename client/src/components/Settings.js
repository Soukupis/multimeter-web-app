import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import Loading from "./messages/Loading";
import Error from "./messages/Error";
import NavbarLayout from "./layouts/NavbarLayout";

import { Container, Row, Col, Label, Input, Form, FormGroup } from "reactstrap";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";

const Settings = () => {
  const history = useHistory();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [ports, setPorts] = useState();
  const [modes, setModes] = useState();
  const [radio, setRadio] = useState("");

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get(`${process.env.REACT_APP_API_URL}/main/getModes`)
      .then((response) => {
        setModes(response.data);
      })
      .catch((error) => {
        setError(true);
      });
    axios
      .get(`${process.env.REACT_APP_API_URL}/main/getPorts`)
      .then((response) => {
        setPorts(response.data);
      })
      .catch((error) => {
        setError(true);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);
  const validate = (values) => {
    const errors = {};

    if (!radio) {
      errors.port = "Nutné vyplnit!";
    }
    /*else if (values.mode) {
      errors.mode = "Nutné vyplnit!";
    }
    */
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      //mode: "",
      port: radio,
    },
    validate,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      axios
        .post(`${process.env.REACT_APP_API_URL}/main/portSettings`, {
          baundRate: 115200,
          portName: radio,
        })
        .then((response) => {
          setError(false);
          history.push("/statistiky");
        })
        .catch((error) => {
          setError(true);
        })
        .then(() => {
          setSubmitting(false);
        });
    },
  });
  function renderPorts() {
    let array = ports.map((item) => {
      return (
        <>
          <Label check>
            <Input
              type="radio"
              id="port"
              name="port"
              onChange={() => setRadio(item)}
              onBlur={formik.handleBlur}
              value={item}
            />
            {item}
          </Label>
          <br />
        </>
      );
    });
    return array;
  }
  function renderModes() {
    let array = modes.map((item) => {
      return (
        <>
          <Label check>
            <Input type="radio" name="radio1" disabled />
            {item}
          </Label>
          <br />
        </>
      );
    });
    return array;
  }

  if (error) {
    return <Error />;
  } else if (loading) {
    return <Loading />;
  } else if (ports && modes) {
    return (
      <>
        <NavbarLayout />
        <Container>
          <Row form>
            <Col lg="6" md="6" sm="12">
              <Form>
                <h1>Druh měření</h1>
                <hr />
                <FormGroup style={{ marginLeft: "20px" }}>
                  {renderModes()}
                </FormGroup>
              </Form>
            </Col>
            <Col lg="6" md="6" sm="12">
              <Form onSubmit={formik.handleSubmit}>
                <h1>Porty</h1>
                <hr />
                <FormGroup style={{ marginLeft: "20px" }}>
                  {renderPorts()}
                </FormGroup>
                <Button type="submit" color="success" variant="primary">
                  Uložit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </>
    );
  } else {
    return <Loading />;
  }
};
export default Settings;
