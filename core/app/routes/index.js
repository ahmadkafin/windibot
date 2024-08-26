module.exports = (app) => {
    require('./cctv.routes')(app);
    require('./page.routes')(app);
}

