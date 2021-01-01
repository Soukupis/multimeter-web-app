import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import Loading from "./messages/Loading";
import Error from "./messages/Error";
import NavbarLayout from "./layouts/NavbarLayout";

import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Button,
  Alert,
  Label,
  Input,
} from "reactstrap";

import {
  XYPlot,
  LineSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
} from "react-vis";

const Statistics = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState([]);

  const validate = (values) => {
    const errors = {};

    if (!values.length) {
      errors.length = "Nutné vyplnit!";
    } else if (!values.number) {
      errors.number = "Nutné vyplnit!";
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      length: 0,
      number: 0,
    },
    validate,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      setLoading(true);
      axios
        .post(`${process.env.REACT_APP_API_URL}/main/getData`, {
          length: parseInt(values.length),
          number: parseInt(values.number),
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
          setError(true);
        })
        .then(() => {
          setSubmitting(false);
          setLoading(false);
        });
    },
  });
  function renderData() {
    let array = [];
    data.forEach((item, index) => {
      array.push({ x: index + 1, y: item });
    });
    return array;
  }
  if (error) {
    return (
      <>
        <NavbarLayout />
        <Error />
      </>
    );
  } else if (loading) {
    return (
      <>
        <NavbarLayout />
        <Loading />
      </>
    );
  } else if (data) {
    return (
      <>
        <NavbarLayout />
        <Container>
          <Row className="justify-content-center">
            <Col className="text-center">
              <h1>Statistiky z arduina</h1>
              <hr />
              <Row form>
                <Form
                  inline
                  style={{ width: "100%" }}
                  onSubmit={formik.handleSubmit}
                >
                  <Col lg="4" md="4" sm="12" xs="12" className="text-right">
                    <FormGroup row>
                      <Label style={{ marginRight: "20px" }}>Počet čísel</Label>
                      <Input
                        id="length"
                        name="length"
                        type="number"
                        placeholder="150"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.length}
                      />
                      {formik.errors.length && formik.touched.length ? (
                        <Alert style={{ marginTop: "10px" }} color="danger">
                          {formik.errors.length}
                        </Alert>
                      ) : null}
                    </FormGroup>
                  </Col>
                  <Col lg="4" md="4" sm="12" xs="12" className="text-right">
                    <FormGroup row>
                      <Label style={{ marginRight: "20px" }}>
                        Velikost čísla
                      </Label>
                      <Input
                        id="number"
                        name="number"
                        type="number"
                        placeholder="1"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.number}
                      />
                      {formik.errors.number && formik.touched.number ? (
                        <Alert style={{ marginTop: "10px" }} color="danger">
                          {formik.errors.number}
                        </Alert>
                      ) : null}
                    </FormGroup>
                  </Col>
                  <Col lg="4" md="4" sm="12" xs="12" className="text-left">
                    <Button type="submit" color="success" variant="primary">
                      Uložit
                    </Button>
                  </Col>
                </Form>
              </Row>
              <hr />
              {data !== [] ? (
                <XYPlot width={window.innerWidth / 1.5} height={300}>
                  <VerticalGridLines />
                  <HorizontalGridLines />
                  <XAxis />
                  <YAxis />
                  <LineSeries
                    data={renderData()}
                    color="#59b953"
                    style={{ strokeWidth: 4 }}
                  />
                </XYPlot>
              ) : (
                <Alert color="danger">No data to display</Alert>
              )}
            </Col>
          </Row>
        </Container>
      </>
    );
  } else {
    return <Loading />;
  }
};
export default Statistics;
