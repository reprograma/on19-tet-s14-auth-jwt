const colaboradoras = require("../models/colaboradoras");
const SECRET = process.env.SECRET
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


/*const getAll = (req, res) => {
const authHeader = req.get(`authorization`);
const token = authHeader.split('')[1];
console.log(`Meu header:`, token);

if(!token) {
  return res.status(401) //.send(`erro no header`)
};

jwt.verify(token, SECRET, function(erro){
  if(erro) {
    return res.status(401).send('Não autorizadoo')
  }
});*/

const getAll = (req, res) => {
  const authHeader = req.get("Authorization");
  //const token = authHeader.bearer.split(' ')[1];
  //const token = authHeader.
  //const token = authHeader.split(' ')[1];
  const token = authHeader?.split(" ")[1] ?? ("Não autorizado");

  console.log(`Meu header:`, token);

  if (!token) {
    return res.status(401)
  }

  jwt.verify(token, SECRET, function (Error) {
    if (Error) {
      return res.status(401).send("não autorizado")
    }
  })

  console.log(req.url);
  colaboradoras.find(function (err, colaboradoras) {
    res.status(200).send(colaboradoras)
  });
};




/*console.log(req.url);
  colaboradoras.find(function (err, colaboradoras) {
    res.status(200).send(colaboradoras);
  });*/


const postColaboradora = (req, res) => {
  const senhaComHash = bcrypt.hashSync(req.body.password, 10); // salt o parametro do salto
  req.body.password = senhaComHash
  console.log(req.body);


  const colaboradora = new colaboradoras(req.body);
  colaboradora.save(function (err) {
    if (err) res.status(500).send({ message: err.message });

    res.status(201).send(colaboradora.toJSON());
  });
};

const login = (req, res) => {
  colaboradoras.findOne({ email: req.body.email }, function (error, colaboradora) {
    if (!colaboradora) {
      return res.status(404).send(`Email não localizado ${req.body.email}`);
    };

    const senhaValida = bcrypt.compareSync(req.body.password, colaboradora.password);

    if (!senhaValida) {
      return res.status(403).send(`Senha invalida`)
    }

    const token = jwt.sign({ email: req.body.email }, SECRET)
    return res.status(200).send(token)

  });
};

module.exports = {
  getAll,
  postColaboradora,
  login
}