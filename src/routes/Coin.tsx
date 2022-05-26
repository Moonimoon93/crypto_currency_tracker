import { useParams } from "react-router-dom";

interface CoinIdParams {
  coinId: string;
}

function Coin() {
  const { coinId } = useParams<CoinIdParams>();
  return (
    <div>
      <h1>Coin: {coinId}</h1>
    </div>
  );
}

export default Coin;
