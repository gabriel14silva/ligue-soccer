import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import { styled } from "@mui/material/styles";

export default function InformationLeagueList() {
  const [informationLeagues, setInformationLeague] = useState([]);
  const navigate = useNavigate();

  const loadInformationLeague = async () => {
    const response = await fetch("http://localhost:4000/information_league");
    const data = await response.json();
    setInformationLeague(data);
  };

  // const StyledTableCell = styled(TableCell)(({ theme }) => ({
  //   [`&.${tableCellClasses.head}`]: {
  //     backgroundColor: theme.palette.common.black,
  //     color: theme.palette.common.white,
  //   },
  //   [`&.${tableCellClasses.body}`]: {
  //     fontSize: 14,
  //   },
  // }));

  // const StyledTableRow = styled(TableRow)(({ theme }) => ({
  //   "&:nth-of-type(odd)": {
  //     backgroundColor: theme.palette.action.hover,
  //   },
  //   // hide last border
  //   "&:last-child td, &:last-child th": {
  //     border: 0,
  //   },
  // }));

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/information_league/${id}`, {
        method: "DELETE",
      });

      setInformationLeague(
        informationLeagues.filter(
          (informationLeagues) => informationLeagues.id !== id
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadInformationLeague();
  }, []);

  return (
    <>
      <h1>Lista de Ligas</h1>
      {informationLeagues.map((informationLeague) => (
        <Card
          style={{
            marginBottom: ".7rem",
            backgroundColor: "#1e272e",
          }}
          key={informationLeague.id}
        >
          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ color: "white" }}>
              <Typography>{informationLeague.nombre_competicion}</Typography>
              <Typography>{informationLeague.tipo_competicion}</Typography>
              <Typography>{informationLeague.genero}</Typography>
              <Typography>{informationLeague.deporte}</Typography>
              <Typography>{informationLeague.descripcion_corta}</Typography>
            </div>

            <div>
              <Button
                variant="contained"
                color="inherit"
                onClick={() =>
                  navigate(`/information_league/${informationLeague.id}/edit`)
                }
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleDelete(informationLeague.id)}
                style={{ marginLeft: ".5rem" }}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="left">
                Nombre de competición
              </StyledTableCell>
              <StyledTableCell align="left">
                Tipo de competición&nbsp;
              </StyledTableCell>
              <StyledTableCell align="left">Deporte&nbsp;</StyledTableCell>
              <StyledTableCell align="left">Genero&nbsp;</StyledTableCell>
              <StyledTableCell align="left">
                Descripción corta&nbsp;
              </StyledTableCell>
              <StyledTableCell align="left">Accciones&nbsp;</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {informationLeagues.map((informationLeague) => (
              <StyledTableRow key={informationLeague.name}>
                <StyledTableCell component="th" scope="row">
                  {informationLeague.id}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {informationLeague.name}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {informationLeague.nombre_competicion}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {informationLeague.tipo_competicion}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {informationLeague.genero}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {informationLeague.deporte}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {informationLeague.descripcion_corta}
                </StyledTableCell>
                <StyledTableCell align="left">{}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </>
  );
}
