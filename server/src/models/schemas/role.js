import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    enum: ['User', 'Student', 'Instructor', 'Manager', 'Admin'],
    required: [true, 'Name field required'],
    default: 'User'
  },
  description: {
    type: String,
    default: ""
  },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true } );

export default mongoose.model('Role', schema);
