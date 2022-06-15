import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "./api";

const Title = styled.h1`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  font-size: 2rem;
`;
const Container = styled.div`
  padding: 0px 20px;
  max-width: 540px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  background-color: ${(props) => props.theme.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
  background-color: white;
  font-size: 1rem;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  border-radius: 15px;
  transition: transform 0.4s;
  a {
    transition: color 0.4s ease-in;
    display: flex;
    padding: 20px;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
    transform: translate(10px);
  }
  img {
    width: 2rem;
    height: 2rem;
    margin-right: 10px;
  }
`;
const Loader = styled.span`
  display: block;
  text-align: center;
  font-size: 1.5rem;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading . . .</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name}&rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
