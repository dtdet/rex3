import RequesterSchema from '../models/requester';

class Helpers {
  static async taskExist(value) {
    const task = await RequesterSchema.findOne({ _id: value });
    return task;
  }

  static async fetchTasks() {
    const fetchedTasks = await RequesterSchema.find();
    return fetchedTasks;
  }


  static async filterTasks(value) {
    const filteredTasks = await RequesterSchema.find({ expiration: value });
    return filteredTasks;
  }


  static async deleteTask(id) {
    const fetchedTasks = await RequesterSchema.deleteOne({ _id: id });
    return fetchedTasks;
  }

  static async saveTask(request, imageURL) {
    const requestedTask = await RequesterSchema.create({
      taskType: request.taskType,
      title: request.title,
      description: request.description,
      expiration: request.expiration,
      requirement: request.requirement,
      response: request.response,
      workerNumber: request.workerNumber,
      uploadedImage: imageURL,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return requestedTask;
  } 
  
}

export default Helpers;