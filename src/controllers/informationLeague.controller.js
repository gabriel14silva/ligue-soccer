const pool = require("../db");

const getAllInformationLeague = async (req, res, next) => {
  try {
    const allInformationLeague = await pool.query(
      "SELECT * FROM information_league"
    );

    res.json(allInformationLeague.rows);
  } catch (error) {
    next(error);
  }
};

const getInformationLeague = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM information_league WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Información de Liga No Encontrada",
      });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const createInformationLeague = async (req, res, next) => {
  const {
    nombre_competicion,
    tipo_competicion,
    descripcion_corta,
    deporte,
    genero,
  } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO information_league (nombre_competicion,tipo_competicion,descripcion_corta,deporte,genero) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [nombre_competicion, tipo_competicion, descripcion_corta, deporte, genero]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deleteInformationLegue = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM information_league WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Información de Liga No encontrada",
      });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const updateInformationLegue = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      nombre_competicion,
      tipo_competicion,
      descripcion_corta,
      deporte,
      genero,
    } = req.body;

    const result = await pool.query(
      "UPDATE information_league SET nombre_competicion = $1, tipo_competicion = $2, descripcion_corta = $3, deporte = $4, genero = $5 WHERE id = $6 RETURNING *",
      [
        nombre_competicion,
        tipo_competicion,
        descripcion_corta,
        deporte,
        genero,
        id,
      ]
    );

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Información de Liga No Encontrada",
      });

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllInformationLeague,
  getInformationLeague,
  createInformationLeague,
  deleteInformationLegue,
  updateInformationLegue,
};
