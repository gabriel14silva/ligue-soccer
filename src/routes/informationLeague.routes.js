const { Router } = require("express");
const {
  getAllInformationLeague,
  getInformationLeague,
  createInformationLeague,
  deleteInformationLegue,
  updateInformationLegue,
} = require("../controllers/informationLeague.controller");

const router = Router();

router.get("/information_league", getAllInformationLeague);

router.get("/information_league/:id", getInformationLeague);

router.post("/information_league", createInformationLeague);

router.delete("/information_league/:id", deleteInformationLegue);

router.put("/information_league/:id", updateInformationLegue);

module.exports = router;
