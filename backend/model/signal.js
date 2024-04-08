const mongoose = require('mongoose');

const VariableValueSchema = new mongoose.Schema({
  type: { type: String, enum: ['value', 'indicator'], required: true },
  values: [Number],
  study_type: String,
  parameter_name: String,
  min_value: Number,
  max_value: Number,
  default_value: Number
}, { _id: false });

const VariableSchema = new mongoose.Schema({
  $1: VariableValueSchema,
  $2: VariableValueSchema,
  $3: VariableValueSchema,
  $4: VariableValueSchema
}, { _id: false });

const CriteriaSchema = new mongoose.Schema({
  type: { type: String, enum: ['plain_text', 'variable'], required: true },
  text: { type: String, required: true },
  variable: VariableSchema
}, { _id: false });

const SignalSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  tag: { type: String, required: true },
  color: { type: String, required: true },
  criteria: [CriteriaSchema]
});

const signalModel = mongoose.model('data', SignalSchema);

module.exports = signalModel;