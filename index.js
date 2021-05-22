import express, { json } from 'express'
const app = express()
import { uid } from 'uid'
import path, { join } from 'path';
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)
db.read()
db.data = db.data || { products: [] }
app.use(json())

app.get('/product', async(req, res) => {
    await db.read()
    const {products} = db.data
    res.send(products)
})

app.post('/product', async(req, res) => {
    const product = {
        id: uid(16),
        ...req.body
    }
    db.data.products.push(product)
    await db.write()
    res.send(product)
})

app.put('/product/:id', async(req, res) => {
    await db.read()
    const { id } = req.params
    const {products} = db.data
    const newProducts = products.map(product => product.id === id ? {...req.body, id} : product)
    db.data.products = newProducts
    await db.write()
    res.json({message: 'Success'})
})

app.delete('/product/:id', async(req, res) => {
    await db.read()
    const { id } = req.params
    const {products} = db.data
    const filteredProducts = products.filter(product => product.id !== id)
    db.data.products = filteredProducts
    await db.write()
    res.json({message: 'Success'})
})

app.listen('3000', () => {
    console.log('Server on port 3000')
})