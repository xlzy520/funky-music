const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const routes = require('./routes');
const PORT = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('./build'));

app.get('/session', routes.session.status);
app.post('/session', routes.session.create);
app.delete('/session', routes.session.remove);

app.get('/theme/:username', routes.theme.read);
app.put('/theme/:username', routes.theme.update);

app.get('/tasks/:username', routes.tasks.all.read);
app.delete('/tasks/:username', routes.tasks.all.remove);
app.post('/tasks/:username', routes.tasks.one.add);
app.get('/tasks/:username/:taskId', routes.tasks.one.read);
app.put('/tasks/:username/:taskId', routes.tasks.one.update);
app.delete('/tasks/:username/:taskId', routes.tasks.one.remove);

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`) );
