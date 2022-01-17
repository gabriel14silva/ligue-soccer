import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { padding, sizeWidth } from "@mui/system";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function InformationLeagueForm() {
  const [informationLeague, setInformationLeague] = useState({
    nombre_competicion: "",
    tipo_competicion: "",
    descripcion_corta: "",
    deporte: "",
    genero: "",
  });

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (editing) {
      await fetch(`http://localhost:4000/information_league/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(informationLeague),
      });
    } else {
      await fetch("http://localhost:4000/information_league", {
        method: "POST",
        body: JSON.stringify(informationLeague),
        headers: { "Content-Type": "application/json" },
      });
    }

    setLoading(false);

    navigate("/");
  };

  const handleChange = (e) =>
    setInformationLeague({
      ...informationLeague,
      [e.target.name]: e.target.value,
    });

  const loadInformationLeague = async (id) => {
    const res = await fetch(`http://localhost:4000/information_league/${id}`);
    const data = await res.json();
    setInformationLeague({
      nombre_competicion: data.nombre_competicion,
      tipo_competicion: data.tipo_competicion,
      deporte: data.deporte,
      genero: data.genero,
      descripcion_corta: data.descripcion_corta,
    });
    setEditing(true);
  };

  useEffect(() => {
    if (params.id) {
      loadInformationLeague(params.id);
    }
  }, [params.id]);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Card
          sx={{ mt: 5, minWidth: 700 }}
          style={{
            backgroundColor: "#1e272e",
            padding: "1rem",
          }}
        >
          <Typography variant="h5" textAlign="center" color="white">
            {editing ? "Editar datos de liga" : "Crear datos de la liga"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="fullWidth"
                variant="filled"
                label="Nombre de competición"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="nombre_competicion"
                value={informationLeague.nombre_competicion}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />

              <TextField
                fullWidth
                label="fullWidth"
                variant="filled"
                label="Tipo de Competición"
                multiline
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="tipo_competicion"
                value={informationLeague.tipo_competicion}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />

              <TextField
                fullWidth
                label="fullWidth"
                variant="filled"
                label="Deporte"
                multiline
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="deporte"
                value={informationLeague.deporte}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />

              <TextField
                fullWidth
                label="fullWidth"
                variant="filled"
                label="Género"
                multiline
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="genero"
                value={informationLeague.genero}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />

              <TextField
                fullWidth
                label="fullWidth"
                variant="filled"
                label="Descripción"
                multiline
                rows={4}
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="descripcion_corta"
                value={informationLeague.descripcion_corta}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={
                  !informationLeague.nombre_competicion ||
                  !informationLeague.tipo_competicion ||
                  !informationLeague.deporte ||
                  !informationLeague.descripcion_corta ||
                  !informationLeague.genero
                }
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Guardar"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
