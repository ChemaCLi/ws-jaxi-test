const app = require('./app')
const server = require('http').createServer(app)

const systemConfig = {
     "port":8080
    }

/**
 * @description: Lanza la aplicación con la configuración establecida
 */
const iniciarAplicacion = () => {
     server.listen(systemConfig.port, () => {
       console.log('Aplicación ejecutandose en el puerto: ' + systemConfig.port)
     })
   }

iniciarAplicacion()