const express = require('express');
const httpProxy = require('http-proxy');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const proxy = httpProxy.createProxyServer({});
const webpack = require('webpack');
const app = express();
const config = require('./webpack.common.js');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000,
}));


app.all(/^\/api\/(.*)/, (req, res) => {
    proxy.web(req, res, {target: 'http://localhost:5000'});
});

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

// const server = http.createServer(app);
app.listen(process.env.PORT || 3001, () => {
    console.log('Listening on: 3001');
});
