module.exports = function(app) {
 
    app.get('/jw/api/getworkcoordinates', function(req, res) {
        res.write("I am a new route")
        res.end();
    });
}