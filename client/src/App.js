import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Loader from "./components/Loader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HideLoading,
  ReloadData,
  SetPortofolioData,
  ShowLoading
} from "./redux/rootSlice";
import Login from "./pages/Admin/Login";

function App() {
  const { loading, portofolioData, reloadData } = useSelector(
    (state) => state.root
  );
  const dispatch = useDispatch();

  // Fetch portfolio data
  const getPortofolioData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get("/api/portofolio/get-portofolio-data");
      dispatch(SetPortofolioData(response.data));
      dispatch(ReloadData(false));
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      console.log(error);
    }
  };

  // useEffect to fetch data if not already present
  useEffect(() => {
    if (!portofolioData) {
      getPortofolioData();
    }
  }, [portofolioData]);

  useEffect(() => {
    if (reloadData) {
      getPortofolioData();
    }
  }, [reloadData]);

  return (
    <BrowserRouter>
      {/* Conditional rendering for loader */}
      {loading && <Loader />}

      {/* Single Routes component */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
