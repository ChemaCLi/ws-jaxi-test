const request = require ('supertest')
const app = require('../app')

describe('Test del módulo projects', () => {

     describe('Obtener los proyectos activos activos', () => {
          test('Debería responder con un objeto con status 200 y la propiedad data debería ser un array de resultados', async () => {
               let response = await request(app).get('/api/v1/projects')
               expect(response.status).toBe(200)
               expect(response.body.error).toBe(false)
               expect(typeof(response.body.data)).toBe("object")
          })   
     })

     describe('Crear un proyecto', () => {

          test('Debería crear correctamente un nuevo proyecto', async () => {
               let response = await request(app).post('/api/v1/projects')
               .send({
                    str_title: "Project title",
                    str_description: "Super description",
                    dtm_start_date: "12-12-2012",
                    dtm_end_date: "12-12-2012",
                    dtm_last_edit: "12-12-2012",
                    dtm_finish_date: "12-12-2012",
                    bl_deleted: false,
                    bl_is_active: true
               })
               .set('Accept', 'application/json')

               expect(response.status).toBe(201)
               expect(response.body.error).toBe(false)
               expect(typeof(response.body.data)).toBe("object")
          })

          test('Debería crear correctamente un nuevo proyecto si no se envían algunos parámetros excepto el titulo', async () => {
               let response = await request(app).post('/api/v1/projects')
               .send({
                    str_title: "Project X",
                    str_description: "Super description",
               })
               .set('Accept', 'application/json')

               expect(response.status).toBe(201)
               expect(response.body.error).toBe(false)
               expect(typeof(response.body.data)).toBe("object")
          })

          test('Debería responder con un error si no se envía el titulo', async () => {
               let response = await request(app).post('/api/v1/projects')
               .send({
                    str_description: "Super description",
                    dtm_start_date: "12-12-2012",
               })
               .set('Accept', 'application/json')

               expect(response.status).toBe(500)
               expect(response.body.error).toBe(true)
               expect(typeof(response.body.data)).toBe("object")
          })
     })

     describe('Actualizar datos de un proyecto', () => {
          test('Debería actualizar correctamente los campos que se están pasando', async () => {
               let response = await request(app).put('/api/v1/projects')
               .send({
                    int_id: 1,
                    str_title: "Edited project title",
                    str_description: "Edited super description",
                    dtm_start_date: "07-20-2019",
                    dtm_end_date: "07-29-2019",
                    bl_deleted: false,
                    bl_is_active: true
               })
               .set('Accept', 'application/json')

               expect(response.status).toBe(202)
               expect(response.body.error).toBe(false)
               expect(response.body.data[0]).toBe(1)
          })

          test('Debería actualizar correctamente los campos que se están pasando', async () => {
               let response = await request(app).put('/api/v1/projects')
               .send({
                    int_id: 1,
                    str_title: "Edited project title"
               })
               .set('Accept', 'application/json')

               expect(response.status).toBe(202)
               expect(response.body.error).toBe(false)
               expect(response.body.data[0]).toBe(1)
          })

          test('Debería responder con un status ok pero los resultados de la actualización deberían ser 0', async () => {
               let response = await request(app).put('/api/v1/projects')
               .send({
                    str_title: "Edited project title",
               })
               .set('Accept', 'application/json')

               expect(response.status).toBe(202)
               expect(response.body.error).toBe(false)
               expect(response.body.data[0]).toBe(0)
          })
     })

     describe('Dar de baja un proyecto', () => {
          test('Debería dar de baja el proyecto especificado por el id', async () => {
               let response = await request(app).delete('/api/v1/projects/12')
               expect(response.status).toBe(202)
               expect(response.body.error).toBe(false)
               expect(response.body.data[0]).toBe(1)
          })

          test('Si no se especifica el id debería lanzar un error 404', async () => {
               let response = await request(app).delete('/api/v1/projects/')
               expect(response.status).toBe(404)
          })

          test('Si se especifica un id que no existe entonces debería responder con un código 202 pero sin afectar ningun registro', async () => {
               let response = await request(app).delete('/api/v1/projects/195')
               expect(response.status).toBe(202)
               expect(response.body.error).toBe(false)
               expect(response.body.data[0]).toBe(0)
          })
     })
})
