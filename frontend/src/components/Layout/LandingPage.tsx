import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Header from "./Header";
import MainPage from "../Home/MainPage";
import BooksPage from "../Books/BooksPage";
import Signin from "../Auth/Signin";

const Layout: React.FC = () => {
  return (
    <div>
      <div style={{ position: "sticky", top: "0px" }}>
        <Header />
      </div>
      <Outlet /> {/* Route content injected here*/}
    </div>
  );
};

export default function LandingPage() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="home" element={<MainPage />} />
            <Route path="books" element={<BooksPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
