var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {

    //get category by id
    app.get('/notes/:id', (req, res) => {
        const id       = req.params.id;
        const details  = { '_id': new ObjectID(id) };
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
        const id       = req.params.id;
        const details  = { '_id': new ObjectID(id) };
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
        const id       = req.params.id;
        const details  = { '_id': new ObjectID(id) };
        const note     = { text: req.body.body, title: req.body.title };
        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(note);
            }
        });
    });

    //create category with name from url
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


    //localhost:8000/notes/5ada5cb72968c02524130713/phone/someURL/300
    app.post('/notes/:id/:prodCatName/:prodName/:img/:price', (req, res) => {
        const id           = req.params.id;
        const prodID       = ObjectID();
        const prodName     = req.params.prodName;
        const img          = req.params.img;
        const price        = req.params.price;
        const details      = { '_id': new ObjectID(id) };
        //const product    = {id:  prodID , name: req.params.prodName, img: req.params.img, price: req.params.price }
        const takeCatName  =  req.params.prod;
        const product      = {id:  prodID , name: req.params.prodName, img: req.params.img, price: req.params.price }
        

        db.collection('notes').findOne(details, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                //db.collection.update(  { _id:...} , { $set: { some_key : new_info  } }
                db.collection('notes').update(details,{ $set :  {product}});
            }
            res.send(result);
        });
    });


    /////&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&7
    app.post('/notes/:id/prodID/:prodID', (req,res) => {
        const id        = req.params.id;
        const prodID    = req.params.prodID;
        const details   = { '_id': new ObjectID(id) };

        db.collection('notes').findOne(details, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                db.collection('notes').update({details}, { $pull: { "product" : { "id" : prodID } } }, false, true);
                res.send('Note ' + prodID + ' deleted!');
            }
        });
    });

    //  UserModel.findById(id, function (err, user) { ... } );

    //User.find({ _id: '55822f34a8394683dd015888' });  

    app.get('/notes/getCatById/:id',(req,res) => {
        const id        = req.params.id;
        const details   = { '_id': new ObjectID(id) };
        db.collection('notes').findOne (details, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(result);
            }
        });
    });


};