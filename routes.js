//# Principales enrutadores
const router = require('express').Router()//Para acceder a las rutas en las que se requiere autentificarse

router.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  	next()
})


//# Módulos de enumeraciones
const sc = require('./utils/status_code')//módulo con la colección de códigos de estados
const response = require('./utils/response')//módulo con la colección de respuestas http
const msg = require('./utils/message')//módulo con la colección de mensajes que se envían e las respuestas http

//# Módulos de aplicación
const projects = require('./modules/projects')
const tasks = require('./modules/tasks')
//const users = require('./modules/users')

router.use('/projects', projects)
router.use('/tasks', tasks)
//router.use('/users', users)

router.get('/', (req, res) => {
     res
     .status(sc.rest.success_accepted.code)
     .json(response.getJsonResponse( sc.rest.success_accepted, "API de la aplicación", "TEST Jaxi", {}))
 })

exports.router = router
