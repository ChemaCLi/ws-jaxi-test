const router = require('express').Router()
const bodyParser = require('body-parser')

//# Pre-configuraciones del router
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

//# Módulos de enumeraciones
const sc = require('../../utils/status_code')//módulo con la colección de códigos de estados
const response = require('../../utils/response')//módulo con la colección de respuestas http
const msg = require('../../utils/message')//módulo con la colección de mensajes que se envían e las respuestas http

const UserModel = require('./user')
const UserProject = require('./user_project')
const UserTask = require('./user_task')

/**
 * @route           GET /
 * @description     Devuelve todos los proyectos activos 
 * @access          Public       
 */
router.get('/', (req, res) => {
     try {
          let User = new UserModel.User()

          User.getActive()
               .then(rows => {
                    res
                         .status(sc.rest.success_ok.code)
                         .json(response.getJsonResponse(sc.rest.success_ok, msg.ok, rows.length, rows))
               })
               .catch(err => {
                    res
                         .status(sc.rest.internal_server_error.code)
                         .json(response.getJsonResponseError(sc.system.failure, msg.error, `error.projects.index ${err}`, null))
               })
     }
     catch (err) {
          res
               .status(sc.rest.internal_server_error.code)
               .json(response.getJsonResponseError(sc.system.failure, msg.error, `error.projects.index ${err}`, null))
     }
})

/**
* @route           GET /
* @description     Devuelve todos los proyectos activos 
* @access          Public       
*/
router.get('/:id', (req, res) => {
     try {
          let User = new UserModel.User()

          User.getActive()
               .then(rows => {
                    res
                         .status(sc.rest.success_ok.code)
                         .json(response.getJsonResponse(sc.rest.success_ok, msg.ok, rows.length, rows))
               })
               .catch(err => {
                    res
                         .status(sc.rest.internal_server_error.code)
                         .json(response.getJsonResponseError(sc.system.failure, msg.error, `error.projects.index ${err}`, null))
               })
     }
     catch (err) {
          res
               .status(sc.rest.internal_server_error.code)
               .json(response.getJsonResponseError(sc.system.failure, msg.error, `error.projects.index ${err}`, null))
     }
})

/**
 * @route           POST /
 * @description     Registra un nuevo proyecto y devuelve los datos del nuevo registro
 * @access          Public       
 */
router.post('/', (req, res) => {
     try {
          let columns = {}

          columns.str_name = req.body.str_name ? req.body.str_name : null
          columns.str_user = req.body.str_user ? req.body.str_user : null
          columns.str_password = req.body.str_password ? req.body.str_password : null
          columns.bl_deleted = req.body.bl_deleted ? req.body.bl_deleted : false

          let User = new UserModel.User()
          User.create(columns)
               .then(rows => {
                    res
                         .status(sc.rest.success_created.code)
                         .json(response.getJsonResponse(sc.rest.success_created, msg.ok, rows.length, rows))
               })
               .catch(err => {
                    res
                         .status(sc.rest.internal_server_error.code)
                         .json(response.getJsonResponseError(sc.system.failure, msg.error, `error.projects.index ${err}`, null))
               })
     }
     catch (err) {
          res
               .status(sc.rest.internal_server_error.code)
               .json(response.getJsonResponseError(sc.system.failure, msg.error, `error.projects.index ${err}`, null))
     }
})

/**
 * @route           PUT /
 * @description     Actualiza los datos de un proyecto existente
 * @access          Public       
 */
router.put('/', (req, res) => {
     try {
          let columns = {}

          columns.int_id = req.body.int_id > 0 ? req.body.int_id : 0
          columns.str_name = req.body.str_name ? req.body.str_name : false
          columns.str_user = req.body.str_user ? req.body.str_user : null
          columns.str_password = req.body.str_password ? req.body.str_password : null
          columns.bl_deleted = req.body.bl_deleted ? req.body.bl_deleted : false

          let User = new UserModel.User()
          User.update(columns)
               .then(rows => {
                    res
                         .status(sc.rest.success_accepted.code)
                         .json(response.getJsonResponse(sc.rest.success_accepted, msg.ok, rows.length, rows))
               })
               .catch(err => {
                    res
                         .status(sc.rest.internal_server_error.code)
                         .json(response.getJsonResponseError(sc.system.failure, msg.error, `error.projects.index ${err}`, null))
               })
     }
     catch (err) {
          res
               .status(sc.rest.internal_server_error.code)
               .json(response.getJsonResponseError(sc.system.failure, msg.error, `error.projects.index ${err}`, null))
     }
})

/**
 * @route           POST /:userId/add/task/:taskId
 * @description     Agrega una tarea a un usuario
 * @access          Public       
 */
router.post('/:userId/add/task/:taskId', (req, res) => {
     try {
          let columns = {}

          columns.user_int_id = req.params.userId > 0 ? req.params.userId : 0
          columns.task_int_id = req.params.taskId  > 0 ? req.params.taskId : 0

          let UserTaskModel = new UserTask.UserTask()
          UserTaskModel.create(columns)
               .then(rows => {
                    res
                         .status(sc.rest.success_accepted.code)
                         .json(response.getJsonResponse(sc.rest.success_accepted, msg.ok, rows.length, rows))
               })
               .catch(err => {
                    res
                         .status(sc.rest.internal_server_error.code)
                         .json(response.getJsonResponseError(sc.system.failure, msg.error, `error.users.index ${err}`, null))
               })
     }
     catch (err) {
          console.log(err)
     }
})

/**
 * @route           DELETE /:userId/remove/task/:taskId
 * @description     Elimina la relacion de la tarea con el usuario
 * @access          Public       
 */
router.delete('/:userId/remove/task/:taskId', (req, res) => {
     try {
          let columns = {}

          columns.user_int_id = req.params.userId > 0 ? req.params.userId : 0
          columns.task_int_id = req.params.taskId  > 0 ? req.params.taskId : 0

          let UserTaskModel = new UserTask.UserTask()
          UserTaskModel.remove(columns)
               .then(rows => {
                    res
                         .status(sc.rest.success_accepted.code)
                         .json(response.getJsonResponse(sc.rest.success_accepted, msg.ok, rows.length, rows))
               })
               .catch(err => {
                    res
                         .status(sc.rest.internal_server_error.code)
                         .json(response.getJsonResponseError(sc.system.failure, msg.error, `error.users.index ${err}`, null))
               })
     }
     catch (err) {
          console.log(err)
     }
})

/**
* @route           POST /:userId/join-to/project/:projectId
* @description     Vincula un usuario con un proyecto
* @access          Public       
*/
router.post('/:userId/join-to/project/:projectId', (req, res) => {
     try {
          let columns = {}

          columns.user_int_id = req.params.userId > 0 ? req.params.userId : 0
          columns.project_int_id = req.params.projectId  > 0 ? req.params.projectId : 0

          let UserProjectModel = new UserProject.UserProject()
          UserProjectModel.create(columns)
               .then(rows => {
                    res
                         .status(sc.rest.success_accepted.code)
                         .json(response.getJsonResponse(sc.rest.success_accepted, msg.ok, rows.length, rows))
               })
               .catch(err => {
                    res
                         .status(sc.rest.internal_server_error.code)
                         .json(response.getJsonResponseError(sc.system.failure, msg.error, `error.users.index ${err}`, null))
               })
     }
     catch (err) {
          console.log(err)
     }
})

/**
 * @route           DELETE /:userId/remove/task/:projectId
 * @description     Desvincula al usuario especificado del proyecto especificado
 * @access          Public       
 */
router.delete('/:userId/unlink/project/:projectId', (req, res) => {
     try {
          let columns = {}

          columns.user_int_id = req.params.userId > 0 ? req.params.userId : 0
          columns.project_int_id = req.params.projectId  > 0 ? req.params.projectId : 0

          let UserProjectModel = new UserProject.UserProject()
          UserProjectModel.remove(columns)
               .then(rows => {
                    res
                         .status(sc.rest.success_accepted.code)
                         .json(response.getJsonResponse(sc.rest.success_accepted, msg.ok, rows.length, rows))
               })
               .catch(err => {
                    res
                         .status(sc.rest.internal_server_error.code)
                         .json(response.getJsonResponseError(sc.system.failure, msg.error, `error.users.index ${err}`, null))
               })
     }
     catch (err) {
          console.log(err)
     }
})

/**
 * @route           DELETE /:id
 * @description     Cambia el status del usuario de activo a inactivo además lo establece como eliminado
 * @access          Public
 */
router.delete('/:id', (req, res) => {
     try {
          let int_id = req.params.id ? req.params.id : 0

          let User = new UserModel.User()
          User.remove(int_id)
               .then(rows => {
                    res
                         .status(sc.rest.success_accepted.code)
                         .json(response.getJsonResponse(sc.rest.success_accepted, msg.ok, rows.length, rows))
               })
               .catch(err => {
                    res
                         .status(sc.rest.internal_server_error.code)
                         .json(response.getJsonResponseError(sc.system.failure, msg.error, `error.projects.index ${err}`, null))
               })
     }
     catch (err) {
          res
               .status(sc.rest.internal_server_error.code)
               .json(response.getJsonResponseError(sc.system.failure, msg.error, `error.projects.index ${err}`, null))
     }
})

//# Exportaciones
module.exports = router