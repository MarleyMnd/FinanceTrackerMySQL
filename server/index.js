const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }))

require('./app/routes/user.route')(app)
require('./app/routes/expense.route')(app)
require('./app/routes/task.route')(app)

//test
app.get('/', (req, res) => {
    res.json({message: 'Welcome'})
})

const PORT = 8080

const db = require('./app/models')
db.connex.sync() // 'force: false' pour ne pas supprimer les données existantes
    .then(() => {
        console.log('Tables créées avec succès !');
        // Démarrez le serveur après la synchronisation
        app.listen(PORT, () => {
            console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Erreur lors de la création des tables :', err);
    });
