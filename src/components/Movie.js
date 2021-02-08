import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 400px;
  width: 100%;
  border-radius: 7px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: transparent;
`;


const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  height: 100%;
  width: 100%;
  background-size: auto;
  background-position: center center;
`;

export default function Moive({ id, bg }) {
  return (
    <Container className="container">
      <Link to={`/${id}`}>
        <Poster bg={bg}></Poster>
      </Link>
    </Container>
  );
}
