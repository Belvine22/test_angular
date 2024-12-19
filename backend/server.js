const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuration de la base de données
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'etudiantdb',
    port: 3306,
});

// Connexion à la base de données
db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err.message);
        return process.exit(1);
    }
    console.log('Connecté à la base de données MySQL.');
});

// Route racine (pour tester que le serveur fonctionne)
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API des étudiants !');
});

// Route pour récupérer les étudiants
app.get('/api/etudiants', (req, res) => {
    const sql = 'SELECT * FROM etudiant';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des étudiants :', err.message);
            return res.status(500).send('Erreur serveur.');
        }
        res.json(results);
    });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});


