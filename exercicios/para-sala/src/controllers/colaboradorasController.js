const colaboradoras = require("../models/colaboradoras");
const SECRET = process.env.SECRET
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const getAll = (req, res) => {
  const authHeader = req.get(`authorization`);
  const token = authHeader.split(' ')[1];
  console.log(`Meu header:`, token);

  if (!token) {
    return res.status(401).send(`Header error.`);
  }

  const err = jwt.verify(token, SECRET, function (error) {
    if (error) return error
  })

  if (err) return res.status(401).send(`Not authorized.`)

  console.log(req.url);
  colaboradoras.find(function (err, colaboradoras) {
    res.status(200).send(colaboradoras);
  });
};


const postColaboradora = (req, res) => {
  const senhaComHash = bcrypt.hashSync(req.body.password, 10); //salt é intensidade que atribui, nesse caso é 10
  req.body.password = senhaComHash;

  console.log(req.body);

  const colaboradora = new colaboradoras(req.body);

  colaboradora.save(function (err) {
    if (err) {
      return res.status(500)
      }
     //res.status(500).send({ message: err.message });
     res.status(201).send(colaboradora.toJSON());
  });
};

const login = (req,res) => {
  colaboradoras.findOne({ email: req.body.email }, function(error, colaboradora) { //parametro q guarda email e senha
    if(!colaboradora) {
  return res.status(404).send(`não localizamos o email ${req.body.email}`);
    }

  const senhaValida = bcrypt.compareSync(req.body.password, colaboradora.password); //comapara a senha utlizada com a senha da pratf em formato de res  
  
  if(!senhaValida) {
    return res.status(403).send(`Esta senha está incorreta`);
  }

  const token = jwt.sign({ email: req.body.email }, SECRET);
    return res.status(200).send(token)

  })

  }

module.exports = {
    getAll,
    postColaboradora,
    login
}