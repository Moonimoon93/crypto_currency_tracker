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
            chart: { height: 500, width: 500 },
            theme: { mode: "dark" },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
