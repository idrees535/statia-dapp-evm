import { Routes, Route } from "react-router-dom";
import Home from "../components/Home/Home"
import LeaderBoard from "../components/MarketOverview/LeaderBoard"
import Claims from "../components/Claims/Claims"
import Markets from "../components/Oracle/Markets"
import Bets from "../components/Portfolio/Bets"
import Node from "../components/Markets/Nodes"
import Login from "../components/Trade/Login"
import Chart from "../components/Trade/Chart/Chart";
import CreateMarketForm from "../components/Home/CreateMarketForm/CreateMarketForm";

export const AppRoute = ()=>{
 return (
    <Routes>
      <Route path="/" element={<Home />} />\
      <Route path="/leaderboard" element={<LeaderBoard />} />
      <Route path="/claims" element={<Claims />} />
      <Route path="/markets" element={<Node />} />
      <Route path="/bets" element={<Bets />} />
      <Route path="/node" element={<Markets />} />
      <Route path="/trade" element={<Login />} />
      <Route path="/chart" element={<Chart />} />
      <Route path="/create" element={<CreateMarketForm />} />
    </Routes>
 )
}