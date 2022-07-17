import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchNiccoApi } from "./api";
import ApexChart from "react-apexcharts";
import { SymbolDisplayPartKind } from "typescript";
import dayjs from "dayjs";

interface PriceProps {
  coinId: string;
}
interface IData {
  time_open?: number;
  time_close?: number;
  open?: string;
  high?: string;
  low?: string;
  close?: string;
  volume?: string;
  market_cap?: number;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data: datas } = useQuery<IData[]>(
    ["priceInfo", coinId],
    () => fetchNiccoApi(coinId)
  );
  console.log(
    datas?.map((data) => [
      data.open,
      typeof data.open,
      data.high,
      data.low,
      data.close,
    ])
  );
  return (
    <>
      {isLoading ? (
        "Loading Chart"
      ) : (
        <>
          {datas?.map((data) => (
            <div> {data.close} </div>
          ))}
        </>
      )}
    </>
  );
}

export default Price;
