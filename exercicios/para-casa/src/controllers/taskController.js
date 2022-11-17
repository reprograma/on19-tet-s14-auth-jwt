const taskModel = require("../models/taskModel");
const SECRET = process.env.SECRET
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const getAll = async (req, res) => {
  try{
    const allTasks = await taskModel.find();
    res.status(200).send(allTasks);
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

const postTask = async (req, res) => {
  try{
  const passwordwithHash = bcrypt.hashSync(req.body.password,10)
  req.body.password = passwordwithHash;

  const { nameTask, description, completed, password } = req.body;

  const newTask = new taskModel({
    nameTask,description, completed, password
  });

  const taskExists = await taskModel.findOne({ nameTask: nameTask });

  if (taskExists) {
    return res.status(422).send({ message: "Task name already registered, please enter another one" });
  }

  const savedTask = await newTask.save();
      res.status(200).send({message: "New task successfully added", savedTask: savedTask
    });
    }catch (error) {
        res.status(500).send({message: error.message});
    };
};

const login = (req, res) => {
  try{
    taskModel.findOne({nameTask: req.body.nameTask}, function(error, task){
      if(!task){
        return res.status(404).send(`Task ${req.body.nameTask} not found`)
      }
  
      const validpassword = bcrypt.compareSync(req.body.password, task.password)

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
    postTask,
    login
}