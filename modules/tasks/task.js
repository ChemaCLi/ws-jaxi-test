const { SequelizeConnection, Sequelize } = require('../../modules/db')
let Project = require('../projects/project')



class Task {
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
               tableName: 'tasks',
               tableDefinition: {
                    int_id: {
                         type: Sequelize.INTEGER,
                         primaryKey: true,
                         autoIncrement: true,
                         allowNull: false
                    },
                    str_title: {
                         type: Sequelize.STRING,
                         allowNull: false
                    },
                    str_description: {
                         type: Sequelize.STRING,
                         allowNull: true
                    },
                    dtm_start_date: {
                         type: Sequelize.DATE,
                         allowNull: true
                    },
                    dtm_end_date: {
                         type: Sequelize.DATE,
                         allowNull: true
                    },
                    dtm_last_edit: {
                         type: Sequelize.DATE,
                         allowNull: true
                    },
                    dtm_finish_date: {
                         type: Sequelize.DATE,
                         allowNull: true
                    },
                    bl_deleted: {
                         type: Sequelize.BOOLEAN,
                         allowNull: true
                    },
                    bl_is_active: {
                         type: Sequelize.BOOLEAN,
                         allowNull: true
                    },
                    int_priority:{
                         type: Sequelize.INTEGER,
                         allowNull: true
                    },
                    project_int_id: {
                         primaryKey: true,
                         type: Sequelize.INTEGER,
                         references: {
                              model: 'projects',
                              key: 'int_id'
                         }
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
          let TaskModel = this.getModel()
          let ProjectModel = project.getModel()

          TaskModel.belongsTo(ProjectModel, {
               foreignKey: 'project_int_id'
          })
          
          ProjectModel.hasMany(TaskModel, {
               foreignKey: 'project_int_id'
          })
          

          return ({
               ProjectModel: ProjectModel,
               TaskModel: TaskModel
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

          if (columns.hasOwnProperty('str_title'))
               colsToInsert.str_title = columns.str_title
          if (columns.hasOwnProperty('str_description'))
               colsToInsert.str_description = columns.str_description
          if (columns.hasOwnProperty('dtm_start_date'))
               colsToInsert.dtm_start_date = columns.dtm_start_date
          if (columns.hasOwnProperty('dtm_end_date'))
               colsToInsert.dtm_end_date = columns.dtm_end_date
          if (columns.hasOwnProperty('dtm_last_edit'))
               colsToInsert.dtm_last_edit = columns.dtm_last_edit
          if (columns.hasOwnProperty('dtm_finish_date'))
               colsToInsert.dtm_finish_date = columns.dtm_finish_date

          if (columns.hasOwnProperty('bl_deleted'))
               colsToInsert.bl_deleted = columns.bl_deleted
          if (columns.hasOwnProperty('bl_is_active'))
               colsToInsert.bl_is_active = columns.bl_is_active
          
          if (columns.hasOwnProperty('project_int_id'))
               colsToInsert.project_int_id = columns.project_int_id
          if(columns.hasOwnProperty('int_priority'))
               colsToInsert.int_priority = columns.int_priority


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

          let activeTasks = await TaskModel.findAll({
               attributes: ['int_id', 'str_title', 'str_description', 'dtm_start_date', 'dtm_end_date', 'dtm_last_edit', 'dtm_finish_date', 'int_priority', 'bl_deleted', 'bl_is_active'],
               include: [{model: ProjectModel}],
               where: { bl_is_active: true },
          }).then(rows => { return (rows) }).catch(
               err => { throw err })

          return activeTasks
     }

     /**
     * Actualiza los campos del registro identificado por el ID
     * @param {*} columns las columnas que se van a actualizar
     */
     async update(columns) {
          let cols = {}
          if (columns.hasOwnProperty('int_id'))
               cols.int_id = columns.int_id
          if (columns.hasOwnProperty('str_title'))
               cols.str_title = columns.str_title
          if (columns.hasOwnProperty('str_description'))
               cols.str_description = columns.str_description
          if (columns.hasOwnProperty('dtm_start_date'))
               cols.dtm_start_date = columns.dtm_start_date
          if (columns.hasOwnProperty('dtm_end_date'))
               cols.dtm_end_date = columns.dtm_end_date
          if (columns.hasOwnProperty('dtm_last_edit'))
               cols.dtm_last_edit = columns.dtm_last_edit
          if (columns.hasOwnProperty('dtm_finish_date'))
               cols.dtm_finish_date = columns.dtm_finish_date
          if (columns.hasOwnProperty('bl_deleted'))
               cols.bl_deleted = columns.bl_deleted
          if (columns.hasOwnProperty('bl_is_active'))
               cols.bl_is_active = columns.bl_is_active
          if (columns.hasOwnProperty('project_int_id'))
               cols.project_int_id = columns.project_int_id
          if (columns.hasOwnProperty('int_priority'))
               cols.int_priority = columns.int_priority

          let Task = this.getModel()

          let result = await Task.update(
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
               bl_is_active: false
          })

          return result
     }
}

exports.Task = Task