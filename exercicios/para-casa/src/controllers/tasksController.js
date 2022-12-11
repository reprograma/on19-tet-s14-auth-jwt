const tasks = require("../models/tasks");
const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getAll = (req, res) => {
    const authHeader = req.get("Authorization");
    const token = authHeader?.split(" ")[1]??("Not authorized");
    console.log(`My header: ${token}`);

    if(!token){
        return res.status(401); //STATUS CODE = Unauthorized
    };

    const err = jwt.verify(token, SECRET, function(error){
        if(error) return error  
    });

    if (err) return res.status(401).send("Unauthorized"); //STATUS CODE = Unauthorized

    console.log(req.url);

    tasks.find(function (err, tasks) {
        res.status(200).send(tasks); //STATUS CODE = OK
    });
};

const postTasks = (req, res) => {
    const passwordWithHash = bcrypt.hashSync(req.body.password, 10);
    req.body.password = passwordWithHash;

    console.log(req.body);

    const task = new tasks(req.body);

    task.save(function (err) {
        if (err) {
            return res.status(500); //STATUS CODE = Internal Server Error
        }
        res.status(201).send(task.toJSON()); //STATUS CODE = Created
    });
};

const login = (req, res) => {
    tasks.findOne({ staffName: req.body.staffName }, function(error, task) {
        if(!task) {
            return res.status(404).send(`It couldn't find the name: ${req.body.staffName}`); //STATUS CODE = Not Found
        };

        const validPassword = bcrypt.compareSync(req.body.password, task.password);
        if(!validPassword){
            return res.status(403).send(`Wrong password. Please, try again`); //STATUS CODE = Forbidden
        };

        const token = jwt.sign({ staffName: req.body.staffName }, SECRET);
            return res.status(200).send(token); //STATUS CODE = OK
    });
};

module.exports = {
    getAll,
    postTasks,
    login
}