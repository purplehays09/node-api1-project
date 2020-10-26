const express = require('express')
const generate = require('shortid').generate

const app = express()

app.use(express.json())

const PORT = 5000

let people = [
    {id:generate(),name:'Remy Labeau',bio:'charges inorganic material with kinetic energy'}
]

//--------------------------------

//get users
app.get('/users',(req,res) => {
    res.status(200).json(people)
})

//get user by id
app.get('/users/:id', (req,res) => {
    const {id} = req.params
    const user = people.find(user => user.id === id)

    if(!user) {
        res.status(404).json({
            message:`no user found with id ${id}`
        })
    }else{
        res.status(200).json(user)
    }
})

//post new user
app.post('/users',(req,res) => {
    const {name,bio} = req.body

    if(!name || !bio){
        res.status(400).json({message:"name and bio are required"})
    }else{
        const newUser = {id:generate(),name,bio}
        people.push(newUser)
        res.status(201).json(newUser)
    }
})

app.put('/users/:id', (req,res) => {
    const id = req.params
    const {name,bio} = req.body

    const indexOfUser = people.findIndex(user => user.id === id)

    if(indexOfUser !== -1){
        people[indexOfUser] = {id,name,bio}

        res.status(200).json({id,name,bio})
    }else{
        res.status(404).json({
            message:`user not found id: ${id}`
        })
    }
})

app.delete('/users/:id', (req,res) => {
    const id = req.params
    try {
        if(!people.find(user => user.id === id)){
            res.status(404).json({ message : 'Not found'})
        }else{
            people = people.filter(user => user.id === id)
            res.status(200).json({ message: `User with id ${id} got deleted!`})

        }
    }
    catch (error) {
        res.status(500).json({ message: 'Somethign went really bad' })
    }
})

app.all('*', (req,res) => {
  res.status(404).json({ message: 'Not found!' })
})

app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`))