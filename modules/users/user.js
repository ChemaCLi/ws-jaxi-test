const { SequelizeConnection, Sequelize } = require('../../modules/db')
let Project = require('../projects/project')
let Task  = require('../tasks/task')

class User {
     /**
      * Constructor del objeto
      */
     constructor() {

     }

     /**
      * Devuelve la estructura del modelo
      */
     getModelStructure() {
          let modelStructure = {
               tableName: 'users',
               tableDefinition: {
                    int_id: {
                         type: Sequelize.INTEGER,
                         primaryKey: true,
                         autoIncrement: true,
                         allowNull: false
                    },
                    str_name: {
                         type: Sequelize.STRING,
                         allowNull: false
                    },
                    str_user: {
                         type: Sequelize.STRING,
                         allowNull: true
                    },
                    str_password: {
                         type: Sequelize.STRING,
                         allowNull: true
                    },
                    bl_deleted: {
                         type: Sequelize.BOOLEAN,
                         allowNull: true
                    }
               }
          }
          return modelStructure
     }

    
     /**
      * Devuele los modelos de sequelize
      */
     getModels(){
          let project = new Project.Project()
          let task = new Task.Task()

          let UserModel = this.getModel()
          let ProjectModel = project.getModel()
          let TaskModel = task.getModel()

          TaskModel.belongsTo(ProjectModel, {
               foreignKey: 'project_int_id'
          })
          
          ProjectModel.hasMany(TaskModel, {
               foreignKey: 'project_int_id'
          })

          UserModel.belongsToMany(TaskModel, {
               through: 'users_tasks',
               foreignKey: 'user_int_id',
               otherKey: 'task_int_id'
          })

          UserModel.belongsToMany(ProjectModel, {
               through: 'users_projects',
               foreignKey: 'user_int_id',
               otherKey: 'project_int_id'
          })
          

          return ({
               ProjectModel: ProjectModel,
               TaskModel: TaskModel,
               UserModel: UserModel
          })
     }
       

     /**
      * Devuelve el modelo de sequelize
      */
     getModel() {
          let modelStructure = this.getModelStructure()
          let model = SequelizeConnection.buildBasicModel(modelStructure.tableName, modelStructure.tableDefinition)
          return model
     }

     /**
      * Genera un nuevo registro
      * @param {*} columns las columnas que se van a registrar
      */
     async create(columns) {
          let colsToInsert = {}

          if (columns.hasOwnProperty('str_name'))
               colsToInsert.str_name = columns.str_name
          if (columns.hasOwnProperty('str_user'))
               colsToInsert.str_user = columns.str_user
          if (columns.hasOwnProperty('str_password'))
               colsToInsert.str_password = columns.str_password
          if (columns.hasOwnProperty('bl_deleted'))
               colsToInsert.bl_deleted = columns.bl_deleted

          let Task = this.getModel()
          let newTask = await Task.create(colsToInsert).then(result => { return result }).catch(err => { throw err })
          return newTask
     }

     /**
      * Devuelve todos las tasks registradas activas
      */
     async getActive() {
          let models = this.getModels()
          let TaskModel = models.TaskModel
          let ProjectModel = models.ProjectModel
          let UserModel = models.UserModel

          let activeUsers = await UserModel.findAll({
               attributes: ['int_id', 'str_name', 'str_user', 'bl_deleted'],
               include: [
                    {model: ProjectModel},
                    {model: TaskModel, include: [{ model: ProjectModel }]}
               ],
               where: { bl_deleted: false },
          }).then(rows => { return (rows) }).catch(
               err => { throw err })

          return activeUsers
     }

     /**
     * Actualiza los campos del registro identificado por el ID
     * @param {*} columns las columnas que se van a actualizar
     */
     async update(columns) {
          let cols = {}
          if (columns.hasOwnProperty('int_id'))
               cols.int_id = columns.int_id
          if (columns.hasOwnProperty('str_name'))
               cols.str_name = columns.str_name
          if (columns.hasOwnProperty('str_user'))
               cols.str_user = columns.str_user
          if (columns.hasOwnProperty('str_password'))
               cols.str_password = columns.str_password
          if (columns.hasOwnProperty('bl_deleted'))
               cols.bl_deleted = columns.bl_deleted

          let User = this.getModel()

          let result = await User.update(
               cols,
               { where: { int_id: cols.int_id } })
               .then(result => { return result })
               .catch(err => { throw err })

          return result
     }

     /**
      * Desactiva un  registro
      * @param {*} int_id el id del proyecto a remover
      */
     async remove(int_id) {
          let result = await this.update({
               int_id: int_id,
               bl_deleted: true,
          })

          return result
     }
}

exports.User = User