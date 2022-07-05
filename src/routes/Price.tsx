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
time_open: string;
time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<IData[]>(["candle", coinId], () =>
    fetchNiccoApi(coinId)
  );
  console.log(
    data?.map((price) => [
      price.time_open,
      price.open,
      price.high,
      price.low,
      price.close,
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
              data: [
                {
                  x: new Date(),
                  y: [53.98, 56.29, 51.59, 53.85],
                },
              ],
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
