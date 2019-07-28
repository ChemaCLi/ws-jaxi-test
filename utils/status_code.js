const StatusCodes = {
    rest: {
        success_ok: {
            code: 200,
            status: 'OK',
            description: ''
        },
        success_created: {
            code: 201,
            status: 'creado',
            description: ''
        },
        success_accepted: {
            code: 202,
            status: 'aceptado',
            description: ''
        },
        success_no_content: {
            code: 204,
            status: 'sin contenido',
            description: ''
        },
        bad_request: {
            code: 400,
            status: 'solicitud erronea',
            description: 'La solicitud no puede ser procesa como se especificó'
        },
        unauthorized: {
            code: 401,
            status: 'no autorizado',
            description: ''
        },
        forbiden: {
            code: 403,
            status: 'prohibido',
            description: ''
        },
        not_found: {
            code: 404,
            status: 'no encontrado',
            description: ''
        },
        method_not_allow: {
            code: 405,
            status: 'metodo no permitido',
            description: ''
        },
        not_acceptable: {
            code: 406,
            status: 'metodo no aceptable',
            description: 'El servidor no puede enviar los datos de la forma solicitada'
        },
        unsupported_media_type: {
            code: 415,
            status: 'media-type no soportado',
            description: ''
        },
        internal_server_error: {
            code: 500,
            status: 'Error interno del servidor',
            description: ''
        },
        not_implemented: {
            code: 501,
            status: 'El servidor no reconoce el método de la petición',
            description: ''
        }
    },
    system: {
        ok: {
            code: 10,
            status: 'Operación exitosa',
            description: ''
        },
        interrupted : {
            code: 20,
            status: 'Operación interrumpida',
            description: ''
        },
        db_failure: {
            code: 30,
            status: 'Error al contactar el servidor de base de datos',
            description: ''
        },
        failure: {
            code: 50,
            status: 'No se pudo realizar la operación',
            description: ''
        },
        error: {
            code: 60,
            status: 'Error inesperado',
            description: ''
        }
    }
}
module.exports = StatusCodes