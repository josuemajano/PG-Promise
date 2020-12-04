const express = require("express"); //importing an object with methods to use in our code
const bodyParser = require("body-parser"); //Middleware
const pgp = require("pg-promise")(); //PG-Promise is how Postres and Node communicate
const db = pgp("postgres://localhost:5432/todo_app"); //connecting to the "todo_app DB"
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// CREATE a task
app.post("/tasks", (req, res) => {
    console.log("The req is ", req.body)
    const newTaskTitle = req.body.title;
    db.none("INSERT INTO tasks (title) VALUES ($1)", [newTaskTitle]).then(() => {
      res.send(`Task "${newTaskTitle}" was created`);
    });
  });


// READ all tasks
app.get("/tasks", (_, res) => {
    db.any("SELECT * from TASKS").then( (tasks) => {
        res.send(tasks) })
});


// UPDATE a task
app.patch("/tasks/:id/title", (req, res) => {
    const taskId = req.params.id;
    const taskTitle = req.body.title;
    db.none("UPDATE tasks SET title = $1 WHERE id = $2", [
        taskTitle, // is now $1
        taskId, // is now $2
    ]).then( () => {
        res.send(`Task ${taskId} is updated to ${taskTitle}`);
    })
});


// DELETE a task
app.delete("/tasks/:id", (req, res) => {
    const taskId = req.params.id;
    db.none("DELETE FROM tasks WHERE id = $1", [taskId]).then(() =>
      res.send(`Task ${taskId} was deleted`)
    );
  });


  //UPDATE if a task is completed
app.patch("/tasks/:id/is_completed", (req, res) => {
    const taskId = req.params.id;
    const taskIsCompleted = req.body.is_completed;
    db.none("UPDATE tasks SET is_completed = $1 WHERE is = $2", [
        taskIsCompleted,
        taskId,
    ]).then( () => {
        const result = taskIsCompleted ? "completed" : "not completed";
        res.send(`Task ${taskId} is ${result} (${taskIsCompleted})`);
    });
});


//Turns our app on port 3000
app.listen(PORT, () => {
    console.log(`Express application is running on port ${PORT}`);
  });