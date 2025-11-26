import "./globals.css";
import RankChecker from "./components/RankChecker";

export default function Page() {
  return (
    <main style={{ padding: 20 }}>
      <h1>Zama Checker</h1>
      <p>Type a Twitter username and press Check</p>
      <RankChecker />
    </main>
  );
}
