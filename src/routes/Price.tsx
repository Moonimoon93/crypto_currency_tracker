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
  const { isLoading, data: datas } = useQuery<IData[]>(["candle", coinId], () =>
    fetchNiccoApi(coinId)
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
    <div>
      {isLoading ? (
        "Loading Chart"
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: datas?.map((data) => [
                data.time_open,
                data.open,
                data.high,
                data.low,
                data.close,
              ]),
            },
          ]}
          options={{
            chart: {
              height: 500,
              width: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            grid: { show: false },
            theme: { mode: "dark" },
            stroke: { curve: "smooth", width: 5 },
            yaxis: { labels: { show: true }, axisBorder: { show: true } },
            xaxis: {
              labels: { show: true },
              axisTicks: { show: true },
              axisBorder: { show: true },
            },
          }}
        />
      )}
    </div>
  );
}

export default Price;
