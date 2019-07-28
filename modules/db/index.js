const systemConfig = {
     "db_name": "jaxi_test_project_manager",
     "db_server": "localhost",
     "db_port": 5432,
     "db_user": "postgres",
     "db_pass": "root",
     "api_key": "una noche fresca"
}

const Sequelize = require('sequelize')

class SequelizeConnection {

     /**
      * 
      */
     constructor() {

     }

     /**
      * Obtiene una conexión de sequelize
      */
     getConnection() {
          try {
               let connection = new Sequelize(
                    systemConfig.db_name,
                    systemConfig.db_user,
                    systemConfig.db_pass,
                    {
                         host: systemConfig.db_server,
                         dialect: 'postgres',
                         define: { timestamps: false },
                         pool:
                         {
                              max: 5,//5 conexiones al mismo tiempo máximo
                              min: 0,
                              acquire: 30000,
                              idle: 10000
                         },
                         operatorsAliases: false,
                         benchmark: true//imprime en consola los resultados de las consultas
                    })
               return connection
          }
          catch (err) {
               console.log(err)
               return false
          }
     }


     /**
      * Construye un modelo basico de sequelize
      * @param {*} tableName Nombre de la tabla
      * @param {*} obj         El objeto de definición de datos del modelo
      */
     buildBasicModel(tableName, obj) {
          try {
               let connection = this.getConnection()
               let model = connection.define(tableName, obj, {
                    freezeTableName: true,
                    tableName: tableName
               })

               return model
          }
          catch (err) {
               console.log(err)
               return false
          }
     }

     /**
      * Obtiene una transacción de se sequelize
      */
     async getTransaction() {
          let conexionSeq = this.getConnection()
          let trans = await conexionSeq.transaction()
               .then(t => { return t })
               .catch(err => { throw err })
          return trans
     }
}

module.exports = {
     Sequelize: Sequelize,
     SequelizeConnection: new SequelizeConnection()
}