import React from 'react';
import styled from 'styled-components'

const BoxContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

function Card(props) {
  const { hit } = props;
  return (
    <BoxContainer>
      <img src={hit.img_url} alt={hit.title} />
      <h4>{hit.title}</h4>
      <p>Users rating: {hit.users_rating}</p>
    </BoxContainer>
  );
}

export default Card
