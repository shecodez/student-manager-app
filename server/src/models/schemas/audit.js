import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field required']
  },
  accessType: {
    type: String,
    enum: ['NEW', 'EDIT', 'DELETE']
  },
  object_id: {
    type: Schema.ObjectId
  },
  oldValue: {
    type: String,
    default: ""
  },
  newValue: {
    type: String,
    default: ""
  },
  accessor_id: {
    type: Schema.ObjectId,
    ref: 'User'
  },
}, { timestamps: true } );

export default mongoose.model('Audit', schema);
