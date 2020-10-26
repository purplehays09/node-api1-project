console.log("ITS WORKING")

const express = require('express')
const generate = require(shortid).generate

const app = express()

app.use(express.json())

const PORT = 5000

let people = [
    {id:generate(),name:'Remy Labeau',bio:'charges inorganic material with kinetic energy'}
]

//--------------------------------



app.all('*', (req,res) => {
  res.status(404).json({ message: 'Not found!' })
})

app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`))