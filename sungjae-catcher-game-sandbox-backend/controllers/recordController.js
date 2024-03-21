//Importing modules
const Record = require("../schema/record.schema");

//Check Connection
exports.checkConnection = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    res.end("This is record api gateway");
  } catch (err) {
    res.status(500).json({ status: "fail", err: err });
  }
};

exports.getAllRecords = async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const records = await Record.find().sort({ score: -1 });

    res.status(200).json({
      status: "success",
      result: records.length,
      data: { records },
    });
  } catch (err) {
    return res.status(400).json({ status: "fail", err: err });
  }
};

exports.creatRecord = async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const newRecord = await Record.create(req.body);

    res.status(201).json({ status: "success", data: { tour: newRecord } });
  } catch (err) {
    res.status(500).json({ status: "fail", err: err });
  }
};

exports.deleteRecord = async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const record = await Record.findByIdAndDelete(req.params.id);

    //Error handling
    if (!record) {
      return res.status(404).json({
        status: "fail",
        messsage: "No record found with that ID",
      });
    }

    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    res.status(500).json({ status: "fail", err: err });
  }
};
