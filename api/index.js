const express = require('express')
const MongoClient = require('mongodb').MongoClient,
      ObjectID = require('mongodb').ObjectID

const app = express()
app.use(express.json())

const uri = process.env.MONGODB_URI
const port = 3030///process.env.PORT || 3000

MongoClient.connect(uri, { useUnifiedTopology: true })
  .then(client => {
    collection = client.db('studyDB').collection('user')
    console.log('Connected to Database')
    
    /////////
    // Routes
    /////////

    const router = express.Router()
    app.use('/',router)

    // Find All Users
    router.get('/api/findAllUsers', (req, res) => {
        collection.find().toArray()
            .then(user => {
            res.json(user)
            })
            .catch(/* ... */)
    })

    // Find User by ID
    router.get('/api/findAllUsers/:id', (req, res) => {
        collection.findOne({_id: ObjectID(req.params.id)})
            .then(user => {
            res.json(user)
            })
            .catch(/* ... */)
        })

        // Insert User
    router.post('/api/insertUser', (req, res) => {
        userCollection.insertOne(req.body)
        .then(result => {
            res.json("Inserted User with id : " + result.insertedId);
        })
        .catch(error => console.error(error))
    })

    // Update User
    router.put('/api/updateUser/:id', (req, res) => {
        userCollection.findOneAndUpdate({
            _id: ObjectID(req.params.id)
        },{
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                age: req.body.age,
                gender: req.body.gender,
                address: req.body.address
            }
        })
        .then(result => res.json("Updated User with id : " + req.params.id))
        .catch(error => console.error(error))
    })

    // Delete User by ID
    router.delete('/api/delete/:id', (req, res) => {
        userCollection.deleteOne(
        { _id: ObjectID(req.params.id) }
        )
        .then(result => {
            console.log(result)
            if (result.deletedCount === 0) {
            return res.json('No user to delete')
            }
            res.json("User deleted with id : " + req.params.id )
        })
        .catch(error => console.error(error))
    })

    // Find Users by Name
    router.get('/api/findByName/:name', (req, res) => {
        collection.find({ $or: [{'firstName': {$regex: req.params.name, $options: 'i' }}, {'lastName': {$regex: req.params.name, $options: 'i'}}]}).toArray()
        .then(user => {
            res.json(user)
        })
        .catch(/* ... */)
    })

    /////////
    // Listen
    /////////
    app.listen(port, function () {
        console.log(`listening on ${port}`)
      })

  })
  .catch(console.error)