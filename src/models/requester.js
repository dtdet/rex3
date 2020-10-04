import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RequesterSchema = new Schema({
  taskType: { type: String, required: [true, 'field task type required'] },
  title: { type: String, required: [true, 'field title required'] },
  description: { type: String, required: [true, 'field description required'] },
  expiration: { type: String, required: [true, 'field expiration required'] },
  requirement: { type: String, required: [true, 'field requirement required'] },
  response: { type: String, required: [true, 'field response required'] },
  workerNumber: { type: String, required: [true, 'field workerNumber required'] },
  uploadedImage: { type: String, required: [true, 'field uploadedImage required'] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Requesters', RequesterSchema);
