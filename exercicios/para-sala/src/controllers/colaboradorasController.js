const ColaboradorasModel = require("../models/colaboradoras");

const findAllColaboradoras = async (req, res) => {
  try {
    const allColaboradoras = await ColaboradorasModel.find(); 
    res.status(200).json(allColaboradoras);
  } catch {
    console.log(error);
    res.status(500).json({ message: error.message})
  };
};

const addNewColaboradora = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;
    const newColaboradora = new ColaboradorasModel({
      name,
      email,
      password,
    });

    const savedColaboradora = await newColaboradora.save();

    res.status(201).json({ message: "Nova colaboradora resgistrada com sucesso"})
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  };
};

module.exports = {
  findAllColaboradoras,
  addNewColaboradora,
};
