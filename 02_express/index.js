import 'dotenv/config'; 
import express from 'express';

const app = express();
const port = procress.env.PORT || 3000;

app.use(express.json());
let playerData = [];  //an array to store the data
let nextID = 1;  //an ID for reference purpose

//CRUD application

//add anew player(C)
app.post('/players', (req, res) => {
    const {name, number} = req.body;  //extracting data from request in a raw body in the json format
    const newPlayer = {id : nextID, name, number}  //creating an object
    playerData.push(newPlayer);  //pushing object in the array
    res.status(201).send(newPlayer);  //responding with the status and the actual data
})

//list all the players(R)
app.get('/players', (req, res) => {
    res.status(200).send(playerData);
})

//get a single player with id(R)
app.get('/players/:id', (req, res) => {
    const player = playerData.find(p =>p.id === parseInt(req.params.id));
    if(!player){
        return res.status(404).send('Player not found');
    }
    else{
        return res.send(200).send(player);
    }
})

//updation(U)
app.put('/player/:id', (req,res) => {
    //finding the id
     const player_id = playerData.find(p => p.id === parseInt(req.params.id));
     if(!player_id){
        return res.status(404).send('Player not found')
     }
     else{
        const {name, number} = req.body;   //getting the name and number from the bpdy
        player_id.name = name;  //updating name
        player_id.number = number;  //updating number
        res.send(200).send(player);
     }
})

//delete player(D)
app.delete('/player/:id', (req,res) => {
    console.log("delete");
    console.log(req.params.id);
    const idx = playerData.findIndex(p => p.id === parseInt(req.params.id))
    if(idx === -1){
        return res.status(404).send('Player not found');
    }
    else{
        playerData.splice(idx, 1);
        return res.status(204).send('Deleted');
    }
})

app.listen(port, () => {
    console.log(`Server is running ar port : ${port}...`);
})