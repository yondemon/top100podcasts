import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

const Box = styled.div`
  border: 1px solid #eee;
  box-shadow: 2px 2px 6px 2px #eee;
  margin: 20px 10px 10px;
  padding: 1rem;
  text-align:center;
  height: 100%;
`;
const Image = styled.img`
  margin: 0 auto 0;
  display: block;
  position: relative
`;
const TitleBlock = styled.div`
  text-align: left;
  margin: 1rem 0;
  border-top: 1px solid #CCC;
`;
const Title = styled.h1`
  color: #111;
  font-size: 1rem;
  margin-bottom: 0;
`;
const Author = styled.p`
  color: #111;
  font-size: 0.8rem;
  font-style: italic;
  margin: 0.2rem 0 0;
`;
const DescriptionBlock = styled.div`
  font-size: 0.8rem;
  margin: 0.5rem 0;
  padding: 0.5rem 0;
  border-top: 1px solid #CCC;
`;

interface PodcastInfoProps {
  img: string;
  title: string;
  author: string;
  description: string;
}

function PodcastInfo(props: PodcastInfoProps) {

  return (
    <Box>
      <Link to="">
        <Image src={props.img} alt={props.title} />
        <TitleBlock>
          <Title>{props.title}</Title>
          <Author>by {props.author}</Author>
        </TitleBlock>
      </Link>
      <DescriptionBlock>
        Description:
        {props.description}
      </DescriptionBlock>
    </Box>
  );
}

export default PodcastInfo;