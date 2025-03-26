import mongoose from 'mongoose';

const currencySchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true
  }
});

const Currency = mongoose.model('Currency', currencySchema);

export { Currency };