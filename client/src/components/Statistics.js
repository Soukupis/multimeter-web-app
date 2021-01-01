import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./messages/Loading";
import Error from "./messages/Error";
import NavbarLayout from "./layouts/NavbarLayout";

import { Container } from "reactstrap";

const Statistics = () => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [data, setData] = useState();
  useEffect(() => {
    setLoading(true);

    axios
      .get(`${process.env.REACT_APP_API_URL}/main/getData`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        setError(true);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  function renderData() {
    let array = [];
    let count = 1;
    data.map((item) => {
      array.push({ x: count, y: item });
      count += 1;
    });
    console.log(array);
    return array;
  }
  if (error) {
    return <Error />;
  } else if (loading) {
    return <Loading />;
  } else if (data) {
    return (
      <>
        <NavbarLayout />
        <Container>
          <div>More seru na to</div>
        </Container>
      </>
    );
  } else {
    return <Loading />;
  }
};
export default Statistics;
