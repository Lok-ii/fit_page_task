const signalModel = require("../model/signal");

const getAllData = async (req, res) => {
  try {
    const data = await signalModel.find({});
    res.json({
      success: true,
      message: "Data fetched successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

const getDataById = async (req, res) => {
  try {
    const data = await signalModel.find({ id: req.params.id });
    res.json({
      success: true,
      message: "Data fetched successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

const getCriteriaData = async (req, res) => {
  try {
    const data = await signalModel.findOne({ id: req.params.id });
    if (data) {
      let valuesForVariable = [];
      data.criteria.forEach((criterion) => {
        if (
          criterion.variable &&
          criterion.variable[`$${req.params.variable}`]
        ) {
          if (criterion.variable[`$${req.params.variable}`].type === "value") {
            valuesForVariable =
              criterion.variable[`$${req.params.variable}`].values;
          } else {
            valuesForVariable = criterion.variable[`$${req.params.variable}`];
          }
        }
      });

      res.json({
        success: true,
        message: "Data fetched successfully",
        data: data,
        valuesForVariable: valuesForVariable,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No data found with the given ID",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

const postData = async (req, res) => {
  try {
    const data = await signalModel.create(req.body);
    res.json({
      success: true,
      message: "Data added successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

module.exports = {
  getAllData,
  getDataById,
  postData,
  getCriteriaData,
};
