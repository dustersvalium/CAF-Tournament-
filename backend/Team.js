const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true, enum: ['GK', 'DF', 'MD', 'AT'] },
  isCaptain: { type: Boolean, default: false },
  ratings: {
    GK: { type: Number, required: true, min: 0, max: 100 },
    DF: { type: Number, required: true, min: 0, max: 100 },
    MD: { type: Number, required: true, min: 0, max: 100 },
    AT: { type: Number, required: true, min: 0, max: 100 }
  }
});

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  manager: { type: String, required: true },
  country: { type: String, required: true },
  rating: { type: Number, default: 0 },
  players: [playerSchema]
}, {
  timestamps: true
});

// Calculate team rating from player ratings
teamSchema.pre('save', function(next) {
  if (this.players.length > 0) {
    const totalRating = this.players.reduce((sum, player) => {
      return sum + player.ratings[player.position]; // Use natural position rating
    }, 0);
    this.rating = Math.round((totalRating / this.players.length) * 10) / 10;
  }
  next();
});

module.exports = mongoose.model('Team', teamSchema);