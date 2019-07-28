const router = require('express').Router()
const bodyParser = require('body-parser')

//# Pre-configuraciones del router
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

//# Módulos de enumeraciones
const sc = require('../../utils/status_code')//módulo con la colección de códigos de estados
const response = require('../../utils/response')//módulo con la colección de respuestas http
const msg = require('../../utils/message')//módulo con la colección de mensajes que se envían e las respuestas http

const ProjectModel = require('./project')

/**
 * @route           GET /
 * @description     Devuelve todos los proyectos activos 
 * @access          Public       
 */
router.get('/', (req, res) => {
    try {
        let Project = new ProjectModel.Project()

        Project.getActive()
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
        let Project = new ProjectModel.Project()

        Project.getActive()
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

        columns.str_title = req.body.str_title ? req.body.str_title : null
        columns.str_description = req.body.str_description ? req.body.str_description : null
        columns.dtm_start_date = req.body.dtm_start_date ? req.body.dtm_start_date : null
        columns.dtm_end_date = req.body.dtm_end_date ? req.body.dtm_end_date : null
        columns.dtm_last_edit = req.body.dtm_last_edit ? req.body.dtm_last_edit : null
        columns.dtm_finish_date = req.body.dtm_finish_date ? req.body.dtm_finish_date : null
        columns.bl_deleted = req.body.bl_deleted = !undefined ? req.body.bl_deleted : null
        columns.bl_is_active = req.body.bl_is_active = !undefined ? req.body.bl_is_active : null

        let Project = new ProjectModel.Project()
        Project.create(columns)
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
        columns.str_title = req.body.str_title ? req.body.str_title : false
        columns.str_description = req.body.str_description ? req.body.str_description : null
        columns.dtm_start_date = req.body.dtm_start_date ? req.body.dtm_start_date : null
        columns.dtm_end_date = req.body.dtm_end_date ? req.body.dtm_end_date : null
        columns.dtm_last_edit = req.body.dtm_last_edit ? req.body.dtm_last_edit : null
        columns.dtm_finish_date = req.body.dtm_finish_date ? req.body.dtm_finish_date : null
        columns.bl_deleted = req.body.bl_deleted = !undefined ? req.body.bl_deleted : false
        columns.bl_is_active = req.body.bl_is_active = !undefined ? req.body.bl_is_active : true

        let Project = new ProjectModel.Project()
        Project.update(columns)
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
 * @route           DELETE /:id
 * @description     Cambia el status del proyecto de activo a inactivo además lo establece como eliminado
 * @access          Public
 */
router.delete('/:id', (req, res) => {
    try {
        let int_id = req.params.id ? req.params.id : 0

        let Project = new ProjectModel.Project()
        Project.remove(int_id)
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