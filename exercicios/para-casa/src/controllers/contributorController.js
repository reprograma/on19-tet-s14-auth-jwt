const contributorModel = require("../models/contributorModel");
const SECRET = process.env.SECRET
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const getAll = verifyToken; async (req, res) => {
  try{
    const allCollaborators = await contributorModel.find();
    res.status(200).send(allCollaborators);
  }catch (error){
      res.status(500).send({message: error.message})
  }
}

function verifyToken(req,res,next){
    const authHeader = req.get("authorization");
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).send({ message: "O Token é inválido!" });
    }

    try{
    jwt.verify(token, SECRET)

    next();

  } catch (error) {
    res.status(400).send({ message: "Acesso negado! Sem autorização" });
  } 
}

const postContributor = async (req, res) => {
  try{
  const passwordwithHash = bcrypt.hashSync(req.body.password,10)
  req.body.password = passwordwithHash;

  const { nameContributor, description, completed, email, password } = req.body;

  const newContributor = new contributorModel({
    nameContributor,description, completed, email, password
  });

  const contributorExists = await contributorModel.findOne({ email: email });

  if (contributorExists) {
    return res.status(422).send({ message: "Email already registered, please enter another one" });
  }

  const savedContributor = await newContributor.save();
      res.status(200).send({message: "New contributor successfully added", savedContributor
    });
    }catch (error) {
        res.status(500).send({message: error.message});
    };
};

const login = (req, res) => {
  try{
    contributorModel.findOne({email: req.body.email}, function(error, contributor){
      if(!contributor){
        return res.status(404).send(`E-mail ${req.body.email} não cadastrado`)
      }
  
      const validpassword = bcrypt.compareSync(req.body.password, contributor.password)

      if(!validpassword){
        return res.status(403).send("Wrong password! Please try again.")
      }

      const token = jwt.sign({ email: req.body.email }, SECRET);
      res.status(200).send({ message: "Authentication Successfully",token })
    })

  }catch(error){
    res.status(500).send({message: error.message});
  }
}

module.exports = {
    getAll,
    verifyToken,
    postContributor,
    login
}