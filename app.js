// first basic useless server with express
const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 4041;

// middleware verwenden
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors())

// todo mock data (Database)
let todos = [{ 
    id: 1, 
    name: 'Einkaufen gehen bis 18:30', 
    done: false
}, { 
    id: 2, 
    name: 'Müll entsorgen', 
    done: true
}]

let uniqueId = 2;

app.get('/todos', (req, res) => {
    res.json({
        ok: true,
        todos
    })
})

app.delete('/todos/:id', (req, res) => {
    const idToDelete = req.params.id;
    const foundTodo = todos.find(todo => todo.id == idToDelete)
    if (foundTodo) {
        todos = todos.filter(todo => todo.id != idToDelete)
        res.json({ok: true, deletedTodo: foundTodo})
    } else {
        res.status(500).json({ok: false, message: 'no todo found under this ID'})
    }
})

app.put('/todos/:id', (req, res) => {
    const { id } = req.params
    const udaptedTodo = req.body
    const foundTodo = todos.find(todo => todo.id == id)
    console.log("foundTodo: ", foundTodo);
    if (foundTodo) {
        const index = todos.findIndex(todo => todo.id == id)
        todos[index] = udaptedTodo;
        res.json({ok: true, todo: udaptedTodo}) 
    } else {
        res.status(404).json({ok: false, message: 'No todo found to update'})
    }
})


app.get('/done', (req, res) => {
    const doneTodos = todos.map(todo => {
        return { name: todo.name, done: todo.done}
    });
    res.json({ok: true, todos: doneTodos})
})

// first POST
app.post('/todos', (req, res) => {
    const { name } = req.body;
    if (name) {
        uniqueId++
        todos.push({id: uniqueId, name, done: false})
        res.json({ok: true, todos})
    }
})

// get one specific todo
app.get('/todos/:name', (req, res) => {
    const { name } = req.params;
    const foundTodo = todos.filter(todo => todo.name === name)
    console.log('foundTodo: ', foundTodo);
    if (foundTodo.length > 0) {
        res.json({ok: true, todo: foundTodo})
    } else {
        res.json({ok: false})
    }

})

// get one specific todo by id
app.get('/todo/:id', (req, res) => {
    const { id } = req.params;
    const foundTodo = todos.filter(todo => todo.id == id)
    if (foundTodo.length > 0) {
        res.json({ok: true, todo: foundTodo})
    } else {
        res.status(410).json({ok: false, message: 'No todo found with this ID'})
    }
})

// start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})