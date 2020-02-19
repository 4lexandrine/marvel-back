// Création du modèle d'annonce

// Import de mongoose
const mongoose = require("mongoose");

const Character = mongoose.model("Offer", {
  name: {
    type: String,
    minLength: 1,
    maxLength: 50,
    require: true
  },
  thumbnail: {
    type: String
  },
  description: {
    type: String,
    minLength: 1,
    maxLength: 500,
    require: true
  }
});

module.exports = Character;
