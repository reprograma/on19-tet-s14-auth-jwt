const colaboradoras = require("../models/colaboradoras");
const SECRET = process.env.SECRET
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const getAll = (req, res) => {
  const authHeader = req.get(`authorization`);
  const token = authHeader.split(' ')[1];
  console.log(`Meu header: ${token}`);

  if(!token) {
    return res.status(401).send('Invalid header. Please, try again.');
  }

  const err = jwt.verify(token, SECRET, function(error) {
    if(error) 
    return error
  });
    
    if (err) 
    return res.status(401).send('Unauthorized');

  console.log(req.url);
  colaboradoras.find(function (err, colaboradoras) {
    res.status(200);
  });
};

const postColaboradora = (req, res) => {
  const senhaComHash = bcrypt.hashSync(req.body.password, 10);
  req.body.password = senhaComHash;

  const colaboradora = new colaboradoras(req.body);
  colaboradora.save(function (err) {
    if (err) res.status(500).send({ message: err.message });

    res.status(201).send(colaboradora.toJSON());
  });
};

const login = (req, res) => {
  colaboradoras.findOne({email: req.body.email}, function(error, colaboradora){
    if(!colaboradora) {
      return res.status(404).send(`Can't find the email: ${req.body.email}`)
    }

    const validPassword = bcrypt.compareSync(req.body.password, colaboradora.password); 
    if(!validPassword) {
      return res.status(403).send(`Wrong password, please try again.`)
    }

    const token = jwt.sign({ email: req.body.password }, SECRET);
      return res.status(200).send(token);
  });
}

module.exports = {
    getAll,
    postColaboradora,
    login
}