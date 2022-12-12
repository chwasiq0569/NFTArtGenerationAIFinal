import './App.css';
import Home from "./Pages/Home/Home";
import Explore from "./Pages/Explore/Explore";
import ItemsDetail from "./Pages/ItemsDetail/ItemsDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./Pages/AuthPage/AuthPage";
import "react-toastify/dist/ReactToastify.css";
import MintNFT from "./Pages/MintNFT/MintNFT";
import MyNFTs from "./Pages/MyNFTs/MyNFTs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/itemDetail" element={<ItemsDetail />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/mintnft" element={<MintNFT />} />
        <Route path="/mynfts" element={<MyNFTs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
