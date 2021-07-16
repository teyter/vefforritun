const path = require('path');
const express = require('express');
const videoApp = require('./src/videos');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.locals.format = require('./src/format');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use('/videos', express.static(videosPath));
app.use('/', videoApp);

// 404 villa
function notFoundHandler(req, res, next) {
    const title = 'Fannst ekki';
    const message = 'Sorry, efnid finnst ekki';
    res.status(404).render('error', { title, message });
}
// 500 villa
function serverErrorHandler(err, req, res, next) {
    const title = 'Villa kom upp';
    const message = 'Sorry, thetta er a okkur';
    res.status(500).render('error', { title, message });
}

const host = '127.0.0.1';
const port = 3000;
app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});

