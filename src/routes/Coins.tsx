import styled from "styled-components";

function Coins() {
  const Title = styled.h1`
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    font-size: 2rem;
  `;

  return (
    <div>
      <Title> List of Coins</Title>
    </div>
  );
}

export default Coins;
