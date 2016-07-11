var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var players = [
{
    id: 1,
    name: 'Von Miller',
    team: 'Denver Broncos',
    description: 'Super Bowl 50 MVP, what more can I say?',
    image: 'http://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/13976.png&w=350&h=254'

},
{
    id: 2,
    name: 'Alshon Jeffery',
    team: 'Chicago Bears',
    description: 'As a Chicago Bears Fan, he should be payed pronto, a true #1 Wide Receiver!',
    image: 'http://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/14912.png&w=350&h=254'
}
];

var currentId = 2;

var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());


app.get('/players', function(req, res) {
  res.send({ players: players });
});

app.post('/players', function(req, res) {
    var playersName = req.body.name;
    var playersTeam = req.body.team;
    var playersDescription = req.body.description;
    var playersImage = req.body.image;
    currentId++;

    players.push({
        id: currentId,
        name: playersName,
        team: playersTeam,
        description: playersDescription,
        image: playersImage
    });

    res.send('Added new player!');
});

app.put('/players/:id', function(req, res) {
    var id = req.params.id;
    var newName = req.body.newName;
    var newTeam = req.body.newTeam;
    var newDescription = req.body.newDescription;
    var newImage  = req.body.newImage;

    var found = false;

    players.forEach(function(player, index) {
        if (!found && player.id === Number(id)) {
            player.name = newName;
            player.team = newTeam;
            player.description = newDescription;
            player.image = newImage;
        }
    });

    res.send('Changed player!');
});

app.delete('/players/:id', function(req, res) {
    var id = req.params.id;

    var found = false;

    players.forEach(function(player, index) {
        if (!found && player.id === Number(id)) {
            players.splice(index, 1);
        }
    });

    res.send('Deleted player!');
});

app.listen(PORT, function() {
  console.log('server is now listening at ' + PORT);
});

