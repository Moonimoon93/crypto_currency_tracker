import { useEffect, useState } from "react";
import {
  InfiniteQueryObserver,
  useQuery,
  useQueryErrorResetBoundary,
} from "react-query";
import {
  useLocation,
  useParams,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import { theme } from "../theme";
import { fetchCoinInfo, fetchCoinPrice } from "./api";
import Chart from "./Chart";
import Price from "./Price";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 540px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 15vh;
  background-color: ${(props) => props.theme.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  font-size: 2rem;
`;
const Loader = styled.span`
  display: block;
  text-align: center;
  font-size: 1.5rem;
`;
const Description = styled.p`
  font-size: 1rem;
  margin: 0 10px 20px 10px;
  line-height: 150%;
`;
const Overview = styled.div`
  display: flex;
  background-color: #3e3d53;
  height: 50px;
  width: 100%;
  border-radius: 10px;
  justify-content: space-between;
  padding: 5px 10px;
  margin-bottom: 20px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  font-size: 0.9rem;
  span:nth-child(1) {
    font-size: 0.8rem;
  }
`;
const TabsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Tab = styled.div<{ isActive: boolean }>`
  background-color: #3e3d53;
  height: 25px;
  width: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 20px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
`;
const Button = styled.button``;

interface RouteParams {
  coinId: string;
}
interface RouteState {
  name: string;
}
interface CoinTyped {
  rank: number;
  is_active: boolean;
  type: string;
  description: string;
}

interface IInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface IPriceInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}
function Coin() {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const isPriceSelected = useRouteMatch("/:coinId/price");
  const isChartSelected = useRouteMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: priceLoading, data: priceData } = useQuery(
    ["price", coinId],
    () => fetchCoinPrice(coinId)
    // {
    //   refetchInterval: 5000,
    // }
  );
  const loading = infoLoading || priceLoading;
  return (
    <>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading . . .</Loader>
      ) : (
        <Container>
          <button style={{ marginBottom: 10, justifySelf: "center" }}>
            <Link to={"/"}>Go Back</Link>
          </button>
          <Overview>
            <OverviewItem>
              <span>RANK : </span>
              <span> {infoData?.rank} </span>
            </OverviewItem>
            <OverviewItem>
              <span>SYMBOL : </span>
              <span> {infoData?.symbol} </span>
            </OverviewItem>
            <OverviewItem>
              <span> Price : </span>
              <span> {priceData?.quotes.USD.price.toFixed(2)} </span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>TOTAL SUPPLY : </span>
              <span>{priceData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>MAX UPPLY : </span>
              <span>{priceData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <TabsContainer>
            <Tab isActive={isPriceSelected !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
            <Tab isActive={isChartSelected !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
          </TabsContainer>
          <Switch>
            <Route path="/:coinId/price">
              <Price coinId={coinId} />
            </Route>
            <Route path="/:coinId/chart">
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </Container>
      )}
    </>
  );
}

export default Coin;
