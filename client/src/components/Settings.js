import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./messages/Loading";
import Error from "./messages/Error";
import NavbarLayout from "./layouts/NavbarLayout";

import { Container } from "reactstrap";

const Settings = () => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [ports, setPorts] = useState();
  const [modes, setModes] = useState();
  const [data, setData] = useState();

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
  if (error) {
    return <Error />;
  } else if (loading) {
    return <Loading />;
  } else if (ports && modes) {
    return (
      <>
        <NavbarLayout />
        <Container>
          <h1>Modes</h1>
          <div>
            {modes.map((item) => {
              return <div>{item}</div>;
            })}
          </div>
          <h1>Ports</h1>
          <div>
            {ports.map((item) => {
              return <div>{item}</div>;
            })}
          </div>
        </Container>
      </>
    );
  } else {
    return <Loading />;
  }
};
export default Settings;
