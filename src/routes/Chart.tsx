import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchNiccoApi } from "./api";
import ApexChart from "react-apexcharts";
import { SymbolDisplayPartKind } from "typescript";

interface ChartProps {
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

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IData[]>(["ohlcv", coinId], () =>
    fetchNiccoApi(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading Chart"
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Sales",
              data: data?.map((price) => price.close) as number[],
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
              axisTicks: { show: true},
              axisBorder: { show: true },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
