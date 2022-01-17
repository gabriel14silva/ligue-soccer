import { BrowserRouter, Route, Routes } from "react-router-dom";
import InformationLeagueForm from "./components/InformationLeagueForm";
import InformationLeagueList from "./components/InformationLeagueList";
import Menu from "./components/Navbar";
import { Container } from "@mui/material";

export default function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Container>
        <Routes>
          <Route path="/" element={<InformationLeagueList />} />
          <Route
            path="/information_league/new"
            element={<InformationLeagueForm />}
          />
          <Route
            path="/information_league/:id/edit"
            element={<InformationLeagueForm />}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
