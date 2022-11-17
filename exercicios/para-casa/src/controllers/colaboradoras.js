const colaboradoras = require("../model/colabores");
const SECRET = process.env.SECRET
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const getAll = (req, res) => {
  const authHeader = req.get(`authorization`);
  const token = authHeader?.split(" ")[1] ?? ("Não autorizado");
  console.log(`Meu header:`, token);

  if(!token){
    return res.status(401)
  }

  const err = jwt.verify(token,SECRET,function(error){
    if(error) return error 
  })
  
  if (err) return res.status(401).send("não autorizado")

  console.log(req.url);
  colaboradoras.find(function (err, colaboradoras) {
    res.status(200).send(colaboradoras);
  });
};


module.exports = {
    getAll,
    postColaboradora,
    login
}

