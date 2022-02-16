let phonebooks = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

const getPhonebook = (req,res)=>{
    res.json(phonebooks);
}

const getInfo = (req,res) =>{
  res.render('index.ejs',{n:phonebooks.length,date:new Date()});
}

const getPerson = (req,res)=>{
  const id = req.params.id;
  phonebooks.forEach(obj =>{
    if(obj.id == id)
    return res.status(200).json(obj);
  })
  res.status(404).send("<h1 style='color:red'> person not found </h1>");
  console.log(person);
}

const deletePhonebook = (req,res)=>{
  const id = req.params.id;
  phonebooks = phonebooks.filter(obj => obj.id != id);

  res.json(phonebooks);
}


const createPhonebook = (req,res) =>{
  
  const id = Math.floor(Math.random()*99999);
  const body = req.body;
  if(!body.name){
   return res.json({error : 'name is missing'});
  }
  else if(!body.number){
    return res.json({error : 'phone number is missing'});
  }
  phonebooks.forEach(obj =>{
    if(obj.name == body.name) 
    return res.json({error : 'name must be unique'})
  })
  const phonebook = {
    id,
    name: body.name,
    nuumber:  body.number
  };
  phonebooks = phonebooks.concat(phonebook);
  res.json(phonebooks);
  
}
module.exports = {
    getPhonebook,
    getInfo,
    getPerson,
    deletePhonebook,
    createPhonebook
};