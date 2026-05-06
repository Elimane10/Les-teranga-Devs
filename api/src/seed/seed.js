const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: './.env' });

// Chargement conditionnel de .env (local vs Docker)
const envPath = path.resolve(__dirname, '../../../.env');
if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
  console.log('📁 .env chargé pour le seed (mode local)');
} else {
  console.log('🐳 Mode Docker : seed avec variables d\'environnement injectées');
}

// const mongoose = require('mongoose');
// require('dotenv').config({ path: './.env' });

const Restaurant = require('../models/Restaurant');
const Plat = require('../models/Plat');

const restaurants = [
  {
    nom: 'Chez Fatou',
    cuisine: 'Sénégalaise traditionnelle',
    adresse: 'Rue 10, Médina, Dakar',
    telephone: '+221 77 123 45 67',
    description: 'Cuisine familiale sénégalaise authentique.',
    note: 4.5,
    horaires: { ouverture: '08:00', fermeture: '22:00' },
    estOuvert: true
  },
  {
    nom: 'Le Lamantin',
    cuisine: 'Africaine fusion',
    adresse: 'Corniche Ouest, Fann, Dakar',
    telephone: '+221 33 456 78 90',
    description: 'Restaurant gastronomique avec vue sur l\'océan.',
    note: 4.2,
    horaires: { ouverture: '11:00', fermeture: '23:00' },
    estOuvert: true
  },
  {
    nom: 'Dibiterie Keur Serigne',
    cuisine: 'Grillades sénégalaises',
    adresse: 'Avenue Cheikh Anta Diop, Dakar',
    telephone: '+221 76 234 56 78',
    description: 'Spécialiste du dibi.',
    note: 4.0,
    horaires: { ouverture: '10:00', fermeture: '01:00' },
    estOuvert: true
  },
  {
    nom: 'Phare des Mamelles',
    cuisine: 'Fruits de mer',
    adresse: 'Route des Mamelles, Ouakam, Dakar',
    telephone: '+221 33 567 89 01',
    description: 'Poissons et fruits de mer frais.',
    note: 4.7,
    horaires: { ouverture: '12:00', fermeture: '23:00' },
    estOuvert: true
  },
  {
    nom: 'Tangana Café',
    cuisine: 'Café & snacks',
    adresse: 'Rue Parchappe, Plateau, Dakar',
    telephone: '+221 78 345 67 89',
    description: 'Idéal pour les étudiants.',
    note: 3.8,
    horaires: { ouverture: '06:30', fermeture: '20:00' },
    estOuvert: true
  }
];

async function seed() {
  try {
    // Connexion MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB');

    // Nettoyage
    await Restaurant.deleteMany({});
    await Plat.deleteMany({});
    console.log('🗑️ Collections nettoyées');

    // Insertion restaurants
    const savedRestaurants = await Restaurant.insertMany(restaurants);
    console.log(`🏪 ${savedRestaurants.length} restaurants insérés`);

    // Insertion plats liés aux restaurants
    const plats = [
      {
        nom: 'Thiéboudienne',
        prix: 4000,
        restaurant: savedRestaurants[0]._id
      },
      {
        nom: 'Yassa poulet',
        prix: 3000,
        restaurant: savedRestaurants[0]._id
      },
      {
        nom: 'Mafé',
        prix: 3500,
        restaurant: savedRestaurants[1]._id
      },
      {
        nom: 'Dibi mouton',
        prix: 3500,
        restaurant: savedRestaurants[2]._id
      },
      {
        nom: 'Poisson grillé',
        prix: 5000,
        restaurant: savedRestaurants[3]._id
      },
      {
        nom: 'Attiéké poisson',
        prix: 4500,
        restaurant: savedRestaurants[3]._id
      },
      {
        nom: 'Café + croissant',
        prix: 1500,
        restaurant: savedRestaurants[4]._id
      }
    ];

    await Plat.insertMany(plats);
    console.log(`🍛 ${plats.length} plats insérés`);

    console.log('\n✅ Seed terminé avec succès !');

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Erreur lors du seed :', error.message);
    process.exit(1);
  }
}

seed();