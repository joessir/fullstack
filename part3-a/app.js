const express = require('express');
const app = express();
var morgan = require('morgan');
const phonebooks = require('./controllers/phonebooks');



app.use(express.json());
app.set('view engine','ejs');

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'));



app.get('/',(req,res)=>{
    res.redirect('/api/persons');
})
app.get('/api/persons',phonebooks.getPhonebook);

app.get('/info',phonebooks.getInfo);

app.get('/api/persons/:id',phonebooks.getPerson);

app.delete('/api/persons/:id',phonebooks.deletePhonebook);

app.post('/api/persons',phonebooks.createPhonebook);

const PORT = 3001;
app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})