const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 8000;

app.use(express.json()); // Middleware to parse JSON bodies

// Replace the following URL with your MongoDB connection string
mongoose.connect('mongodb+srv://aditya:4458@cluster0.llnoazc.mongodb.net/cicd?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// Schema definition
const itemSchema = new mongoose.Schema({
    name: String
});

// Model
const Item = mongoose.model('Item', itemSchema);

// CREATE: Add a new item
app.post('/items', async (req, res) => {
    let item = new Item({ name: req.body.name });
    item = await item.save();
    res.status(201).send(item);
});

// READ: Get all items
app.get('/items', async (req, res) => {
    const items = await Item.find();
    res.status(200).send(items);
});

// READ: Get a single item by id
app.get('/items/:id', async (req, res) => {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).send('Item not found.');
    res.send(item);
});

// UPDATE: Modify an existing item
app.put('/items/:id', async (req, res) => {
    const item = await Item.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    if (!item) return res.status(404).send('Item not found.');
    res.send(item);
});

// DELETE: Remove an item
app.delete('/items/:id', async (req, res) => {
    const item = await Item.findByIdAndRemove(req.params.id);
    if (!item) return res.status(404).send('Item not found.');
    res.send(item);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
