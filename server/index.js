const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const routes = require('./routes');
const { search, getSongSource, getHotList } = require('./song')
const PORT = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('./build'));

app.post('/login', routes.session.login);
app.post('/register', routes.session.register);
app.delete('/logout', routes.session.remove);



app.get('/theme/:username', routes.theme.read);
app.put('/theme/:username', routes.theme.update);

// app.get('/tasks/:username', routes.tasks.all.read);
// app.delete('/tasks/:username', routes.tasks.all.remove);
// app.post('/tasks/:username', routes.tasks.one.add);
// app.get('/tasks/:username/:taskId', routes.tasks.one.read);
// app.put('/tasks/:username/:taskId', routes.tasks.one.update);
// app.delete('/tasks/:username/:taskId', routes.tasks.one.remove);

app.get('/search', search);
app.get('/song_source/:platform/:originalId', getSongSource);
app.get('/hot_list/:platform', getHotList);

app.post('/favorite/add', routes.favorite.add);
app.get('/favorite/getAll', routes.favorite.getAll);
app.delete('/favorite/:songId', routes.favorite.remove);

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`) );
