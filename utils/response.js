/**
 * Estructura estándar de respuesta
 */
let responseStructure = {
    status: {},
    message: "",
    description: "",
    data: "",
    error: false
}

/**
 * @description             Retorna un objeto JSON que se utilizará para mandar la respuesta http
 * @param {*} status        Objeto status_code
 * @param {*} message       Mensaje que se mostrará al usuario
 * @param {*} description   Descripción detallada de la respuesta
 * @param {*} data          Objeto o conjunto de objetos json
 * @returns                 La estructura de la respuesta
 */
exports.getJsonResponse = (status, message, description, data) => {
    responseStructure.status = status
    responseStructure.message = message
    responseStructure.description = description
    responseStructure.data = data
    responseStructure.error = false
    return responseStructure
}

/**
 * @description             Determina que una respuesta con error. Retorna un objeto JSON que se utilizará para mandar la respuesta http
 * @param {*} status        Objeto status_code
 * @param {*} message       Mensaje que se mostrará al usuario
 * @param {*} description   Descripción detallada de la respuesta
 * @param {*} data          Objeto o conjunto de objetos json
 * @returns                 La estructura de una respuesta con código de error
 */
exports.getJsonResponseError = (status, message, description, data) => {
    responseStructure.status = status
    responseStructure.message = message
    responseStructure.description = description
    responseStructure.data = data
    responseStructure.error = true
    return responseStructure
}