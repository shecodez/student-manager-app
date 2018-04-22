import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field required']
  },
  description: {
    type: String,
    default: ""
  },
  startDate: {
    type: String
  },
  endDate: {
    type: String
  },
  instructor_id: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true } );

export default mongoose.model('Course', schema);
