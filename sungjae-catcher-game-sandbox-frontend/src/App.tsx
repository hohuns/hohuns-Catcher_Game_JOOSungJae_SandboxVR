import { Navigate, Route, Routes } from "react-router-dom";
import GameCanvas from "./components/GameCanvas";
import LeaderBoard from "./components/LeaderBoard";
import MenuSelection from "./components/MenuSelection";

function App() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="menu" />} />
      <Route path="/menu" element={<MenuSelection></MenuSelection>} />
      <Route path="/game" element={<GameCanvas></GameCanvas>} />
      <Route path="/board" element={<LeaderBoard></LeaderBoard>} />
    </Routes>
  );
}

export default App;
