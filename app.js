var express = require('express');
var exphbs = require('express-handlebars');
const creatureList = require('./creatures.json');
const spellList = require('./spells.json');
const featList = require('./feats.json');
var generator = require('./generateEncounter.js');
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('creatures', {'creatures': creatureList});
});

app.get('/creatures', (req, res) => {
  res.render('creatures', {'creatures': creatureList});
});

app.get('/creatures/:creatureName', (req, res) => {
  const creature = creatureList.find((creature) => creature.name == req.params.creatureName)
  res.render('creature', creature)
});

app.get('/spells', (req, res) => {
  res.render('spells', {'spells': spellList})
})

app.get('/spells/:spellName', (req, res) => {
  const spell = spellList.find((spell) => spell.name == req.params.spellName)
  res.render('spell', spell)
});

app.get('/classes/:className', (req, res) => {
  res.render('classes/' + req.params.className);
})

app.get('/feats', (req, res) => {
  res.render('feats', {'feats': featList})
})

app.get('/encounter', (req, res) => {
  
  res.render('encounter')
})

app.get('/encounter/generate', (req, res) => {
  console.log(generator())
  res.render('encounter', {'encounter': generator().list})
})

app.get('/encounter/no/', (req,res)=> {
  res.json(req.query)
})
app.listen(process.env.PORT || 3000);
