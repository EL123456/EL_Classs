const app = require('connect')();

app.use('/home', (req, res, next) => {
    res.end('This is the home page');
});

app.use('/content', (req,res,next) => {
    res.end('This is the main content of this app');
});

app.use('/about', (req,res,next) => {
    res.end('Huh? You want to know something?');
});

app.use(require('./queryParser.js'));
app.use((req,res,next) => {
    req.searchParams.get('magicWord') === 'please' 
    ? next()
    : next('Go Away!');
})

app.use('/restricted',(req,res,next) => {
    res.end('How are you even here?');
});

app.listen(8080);