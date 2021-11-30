import React from 'react';
import styled from "styled-components";

interface PodcastBoxProps {
  img: string;
  title: string;
  author: string;
}

function PodcastBox(props: PodcastBoxProps) {

  const Box = styled.div`
    border: 1px solid #eee;
    box-shadow: 2px 2px 6px 2px #eee;
    margin: 40px 10px 10px;
    padding: 1rem;
    text-align:center;
    height: 100%;
  `

  const Image = styled.img`
    margin: -30px auto 0;
    display: block;
    border-radius: 50%;
    position: relative
  `
  const Title = styled.h1`
    font-size: 1rem;
    text-transform: uppercase;
  `
  const Text = styled.p`
    color: #777;
    font-size: 0.8rem
  `

  return (
    <Box>
      <Image src={props.img} alt={props.title} />
      <Title>{props.title}</Title>
      <Text>Author: {props.author}</Text>
    </Box>
  );
}

export default PodcastBox;