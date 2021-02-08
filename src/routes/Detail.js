import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import Movie from "../components/Movie";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      title
      medium_cover_image
      language
      rating
      description_intro
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`;

const Section = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 45px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  width: 20%;
  height: 90%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`;

const Suggestions = styled.div`
  height: 300px;
  width: 80%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
  .suggestion-poster {
    border-radius: 7px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin: 5px;
  }
`;

const Movies = styled.div`
  margin: 100px 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 60%;
  .container {
    height: 200px;
  }
`;


export default function Detail() {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: +id },
  });
  return (
    <Container>
      <Section>
        <Column>
          <Title>{loading ? "Loading..." : data.movie.title}</Title>
          <>
            <Subtitle>
              {data?.movie?.language} {data?.movie?.rating}{" "}
            </Subtitle>
            <Description>{data?.movie?.description_intro}</Description>
          </>
        </Column>
        {/* <Poster bg={data && data.movie ? data.movie.medium_cover_image : ""} ></Poster> */}
        <Poster bg={data?.movie?.medium_cover_image}></Poster>
      </Section>
      <Suggestions>
        <Movies>
          {data?.suggestions?.map((s) => <Movie key={s.id} id={s.id} bg={s.medium_cover_image} />)}
        </Movies>        
      </Suggestions>
    </Container>
  );
}
