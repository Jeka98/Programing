var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {

    //get category by id
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
            res.send(item);
            }
        });
    });

    //output all categories
    app.get('/notes',(req,res) => {
        db.collection('notes').find({}).toArray(function(err, result) {
            if (err) throw err;
            res.send(result);
        });
    });

    //create category from postman body
    app.post('/notes', (req, res) => {
        const note = { text: req.body.body, title: req.body.title };
        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    //delete category by id
    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        });
    });

    //update category notes from postman body
    app.put ('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { text: req.body.body, title: req.body.title };
        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(note);
            }
        });
    });

    //create category with title from url
    app.post('/notes/add/:name', (req,res) => {
        const name = { title: req.params.name};
        db.collection('notes').insert(name, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result);
            }
        });
    });

};