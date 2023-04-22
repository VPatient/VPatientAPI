const router = require("express").Router();
const MedicineRoute = require("./medicine/medicine");

router.use("/medicine", MedicineRoute); // /order/medicine

module.exports = router;