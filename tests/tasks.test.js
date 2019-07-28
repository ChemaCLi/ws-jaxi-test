const request = require ('supertest')
const app = require('../app')

describe('Test del módulo tasks', () => {

     describe('Obtener las actividades activas', () => {
          test('Debería responder con un objeto con status 200 y la propiedad data debería ser un array de resultados', async () => {
               let response = await request(app).get('/api/v1/tasks')
               expect(response.status).toBe(200)
               expect(response.body.error).toBe(false)
               expect(typeof(response.body.data)).toBe("object")
          })   
     })

     describe('Crear una actividad', () => {

          test('Debería crear correctamente una nueva actividad', async () => {
               let response = await request(app).post('/api/v1/tasks')
               .send({
                    str_title: "Tarea de prueba",
                    str_description: "Descripción de la actividad",
                    dtm_start_date: "07-28-2019",
                    dtm_end_date: "07-29-2019",
                    dtm_last_edit: "07-28-2019",
                    dtm_finish_date: null,
                    bl_deleted: false,
                    bl_is_active: true,
                    int_priority: 3,
                    project_int_id: 1
               })
               .set('Accept', 'application/json')

               expect(response.status).toBe(201)
               expect(response.body.error).toBe(false)
               expect(typeof(response.body.data)).toBe("object")
          })

          test('Debería crear correctamente una nueva actividad si no se envían algunos parámetros excepto el titulo y la llave foranea del proyecto', async () => {
               let response = await request(app).post('/api/v1/tasks')
               .send({
                    str_title: "Tarea de prueba",
                    str_description: "Se enviaron parámetros incompletos",
                    project_int_id: 1
               })
               .set('Accept', 'application/json')

               expect(response.status).toBe(201)
               expect(response.body.error).toBe(false)
               expect(typeof(response.body.data)).toBe("object")
          })

          test('Debería responder con un error controlado si no se envía el titulo', async () => {
               let response = await request(app).post('/api/v1/tasks')
               .send({
                    str_description: "No se envió el título, y por ello no se podrá crear esta actividad",
                    dtm_start_date: "07-30-2019",
                    project_int_id: 1
               })
               .set('Accept', 'application/json')

               expect(response.status).toBe(500)
               expect(response.body.error).toBe(true)
               expect(response.body.data).toBe(null)
          })

          test('Debería responder con un error controlado si no se envía el id del proyecto', async () => {
               let response = await request(app).post('/api/v1/tasks')
               .send({
                    str_description: "No se envió el título, y por ello no se podrá crear esta actividad",
                    dtm_start_date: "07-30-2019",
               })
               .set('Accept', 'application/json')

               expect(response.status).toBe(500)
               expect(response.body.error).toBe(true)
               expect(response.body.data).toBe(null)
          })
     })

     describe('Actualizar datos de una actividad', () => {
          test('Debería actualizar correctamente los campos que se están pasando', async () => {
               let response = await request(app).put('/api/v1/tasks')
               .send({
                    int_id: 2,
                    str_title: "Actividad editada",
                    str_description: "La actividad ha sido actualizada",
                    dtm_start_date: "07-21-2019",
                    dtm_end_date: "07-29-2019",
                    bl_deleted: false,
                    bl_is_active: true,
                    int_priority: 6
               })
               .set('Accept', 'application/json')

               expect(response.status).toBe(202)
               expect(response.body.error).toBe(false)
               expect(response.body.data[0]).toBe(1)
          })

          test('Debería actualizar correctamente los campos que se están pasando', async () => {
               let response = await request(app).put('/api/v1/tasks')
               .send({
                    int_id: 2,
                    str_title: "Tarea actualizada"
               })
               .set('Accept', 'application/json')

               expect(response.status).toBe(202)
               expect(response.body.error).toBe(false)
               expect(response.body.data[0]).toBe(1)
          })


          test('Debería responder positivamente pero con un 0 si no se encontró el id', async () => {
               let response = await request(app).put('/api/v1/tasks')
               .send({
                    int_id: 250,
                    str_title: "Tarea actualizada"
               })
               .set('Accept', 'application/json')

               expect(response.status).toBe(202)
               expect(response.body.error).toBe(false)
               expect(response.body.data[0]).toBe(0)
          })

          test('Debería responder con un status ok pero los resultados de la actualización deberían ser 0', async () => {
               let response = await request(app).put('/api/v1/tasks')
               .send({
                    str_title: "Se prentende actualizar un registro pero no se está especificando cual",
               })
               .set('Accept', 'application/json')

               expect(response.status).toBe(202)
               expect(response.body.error).toBe(false)
               expect(response.body.data[0]).toBe(0)
          })
     })

     describe('Dar de baja una actividad', () => {
          test('Debería dar de baja la actividad especificada por el id', async () => {
               let response = await request(app).delete('/api/v1/tasks/2')
               expect(response.status).toBe(202)
               expect(response.body.error).toBe(false)
               expect(response.body.data[0]).toBe(1)
          })

          test('Si no se especifica el id debería lanzar un error 404', async () => {
               let response = await request(app).delete('/api/v1/tasks/')
               expect(response.status).toBe(404)
          })

          test('Si se especifica un id que no existe entonces debería responder con un código 202 pero sin afectar ningun registro', async () => {
               let response = await request(app).delete('/api/v1/tasks/195')
               expect(response.status).toBe(202)
               expect(response.body.error).toBe(false)
               expect(response.body.data[0]).toBe(0)
          })
     })
})
