import dotenv from 'dotenv';
import helper from '../helpers/helpers';
import imageService from '../services/cloudinaryHelper';

dotenv.config();

class RequesterController {
  static async requestTask(req, res) {
    try {

        let uploadedImage;

        if (!req.files.uploadedImage) {
            return res.status(400).json({
              status: 400,
              data: `Please uploaded image.`
            });
        }

        if (req.files) {
            if (req.files.uploadedImage) {
                uploadedImage = await imageService(req.files.uploadedImage);
            }
            
          } else {
            return res.status(400).json({
              status: 400,
              data: `Please image is required.`
            });
        }

        if (uploadedImage === 'Error') {
            return res.status(400).json({
              status: 400,
              data: `Please check good internet and use correct format (jpg or png).`
            });
        }

        const data = await helper.saveTask(req.body, uploadedImage)
        if (data) {
            return res.status(201).json({
                status: 201,
                message: 'Request Saved Successfully ):',
                data
            });
        }
        
        return res.status(400).json({
            status: 400,
            message: 'Something wrong occured please try again'
        });

    } catch (error) {
      return res.status(500).json({
        status: 500,
        data: error.name
      });
    }
  }


  static async viewTasks(req, res) {
    try {

        const data = await helper.fetchTasks()

        if (!data || data.length < 1) {
            return res.status(404).json({
              status: 404,
              error: 'tasks not found'
            });
        }
        
        if (data) {
            return res.status(200).json({
                status: 200,
                message: 'Tasks fetched Successfully ):',
                data
            });
        }
        
        return res.status(400).json({
            status: 400,
            message: 'Something wrong occured please try again'
        });

    } catch (error) {
      return res.status(500).json({
        status: 500,
        data: error.name
      });
    }
  }


  static async viewTask(req, res) {
    try {

        const id = req.params.id;

        const data = await helper.taskExist(id)
        if (!data) {
            return res.status(404).json({
              status: 404,
              error: 'task not found'
            });
        }

        if (data) {
            return res.status(200).json({
                status: 200,
                message: 'Task viewed Successfully ):',
                data
            });
        }
        
        return res.status(400).json({
            status: 400,
            message: 'Something wrong occured please try again'
        });

    } catch (error) {
      return res.status(500).json({
        status: 500,
        data: error.name
      });
    }
  }


  static async filterTask(req, res) {
    try {
        const data = await helper.filterTasks(req.body.filter)
        if (!data || data.length < 1) {
            return res.status(404).json({
              status: 404,
              error: 'tasks not found'
            });
        }

        if (data) {
            return res.status(200).json({
                status: 200,
                message: 'Tasks filtered Successfully ):',
                data
            });
        }
        
        return res.status(400).json({
            status: 400,
            message: 'Something wrong occured please try again'
        });

    } catch (error) {
      return res.status(500).json({
        status: 500,
        data: error.name
      });
    }
  }


  static async deleteTask(req, res) {
    try {

        const id = req.params.id;

        const taskExist = await helper.taskExist(id)
        if (!taskExist) {
            return res.status(404).json({
              status: 404,
              error: 'task not found'
            });
        }
          
        const data = await helper.deleteTask(id)
        if (data) {
            return res.status(200).json({
                status: 200,
                message: 'Task deleted Successfully ):',
                data
            });
        }
        
        return res.status(400).json({
            status: 400,
            message: 'Something wrong occured please try again'
        });

    } catch (error) {
      return res.status(500).json({
        status: 500,
        data: error.name
      });
    }
  }
}

export default RequesterController;
