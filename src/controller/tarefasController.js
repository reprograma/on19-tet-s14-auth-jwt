const tasks = require("../model/tarefa");
const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const getAll = (req, res) => {
  const authHeader = req.get(`authorization`);
  const token = authHeader.split(' ')[1];
  console.log(`Meu header:`, token);

  if(!token){
    return res.status(401)
  }

  const err = jwt.verify(token,SECRET, function(error) {
    if(error) return error 
  })
  
  if (err) return res.status(401).send("Unauthorized.")

  console.log(req.url);
  tasks.find(function (err, tasks) {
    res.status(200).send(tasks)
  });
};

const postTask = (req, res) => {
  const HashPassword = bcrypt.hashSync(req.body.password, 10);
  req.body.password = HashPassword;

  const task1 = new tasks(req.body);
  task1.save(function (error) {
    if (error) res.status(500).send({ message: error.message });

    res.status(201).send(task1.toJSON());
  });
};

const login = (req,res) => {
  tasks.findOne({ nome: req.body.nome }, function(error, task) {
    if(!task) {
      return res.status(404).send(`Not found: ${req.body.nome}`);
    }

    const password = bcrypt.compareSync(req.body.password, task.password);

    if(!password) {
      return res.status(403).send(`Incorrect password.`)
    }

    const token = jwt.sign({ nome: req.body.nome }, SECRET);
      return res.status(200).send(token)
  })
}

module.exports = {
  getAll,
  postTask: postTask,
  login
};

