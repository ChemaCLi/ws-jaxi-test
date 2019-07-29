const { SequelizeConnection, Sequelize } = require('../../modules/db')

class UserProject {
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
               tableName: 'users_projects',
               tableDefinition: {
                    int_id: {
                         type: Sequelize.INTEGER,
                         primaryKey: true,
                         autoIncrement: true,
                         allowNull: false
                    },
                    user_int_id: {
                         type: Sequelize.INTEGER,
                         allowNull: false,
                         references: {
                              model: 'users',
                              key: 'int_id'
                         }
                    },
                    project_int_id: {
                         type: Sequelize.INTEGER,
                         allowNull: false,
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

          if (columns.hasOwnProperty('user_int_id'))
               colsToInsert.user_int_id = columns.user_int_id
          if (columns.hasOwnProperty('project_int_id'))
               colsToInsert.project_int_id = columns.project_int_id

          let UserProject = this.getModel()
          let newUserProject = await UserProject.create(colsToInsert).then(result => { return result }).catch(err => { throw err })
          return newUserProject
     }

     /**
      * Elimina el registro especificado por el id
      * @param {*} int_id el id del registro a remover
      */
     async remove(columns) {
          let cols = {}

          cols.user_int_id = columns.hasOwnProperty('user_int_id') ? columns.user_int_id : 0
          cols.project_int_id = columns.hasOwnProperty('project_int_id') ? columns.project_int_id : 0

          let UserTask = this.getModel()
          let result = await UserTask.destroy({
               where: {
                    user_int_id: cols.user_int_id,
                    project_int_id: cols.project_int_id
               }
          }).then(result => { return result }).catch(err => { throw err })
          return result
     }
}

exports.UserProject = UserProject