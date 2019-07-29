const request = require ('supertest')
const app = require('../app')

describe('Test del módulo users', () => {

     describe('Obtener los usuarios activos', () => {
          test('Debería responder con un objeto con status 200 y la propiedad data debería ser un array de resultados', async () => {
               let response = await request(app).get('/api/v1/users')
               expect(response.status).toBe(200)
               expect(response.body.error).toBe(false)
               expect(typeof(response.body.data)).toBe("object")
          })   
     })

     describe('Crear un nuevo usuario', () => {

          test('Debería crear correctamente un nuevo usuario', async () => {
               let response = await request(app).post('/api/v1/users')
               .send({
                    str_name: "Elliot Alderson",
                    str_user: "Usuario para el test",
                    str_password: "ejemplo de contraseña segura",
                    bl_deleted: false,
               })
               .set('Accept', 'application/json')

               expect(response.status).toBe(201)
               expect(response.body.error).toBe(false)
               expect(typeof(response.body.data)).toBe("object")
          })

          test('Debería crear correctamente el usuario incluso si no se envían algunos datos', async () => {
               let response = await request(app).post('/api/v1/users')
               .send({
                    str_name: "Kevin Mitnick"
               })
               .set('Accept', 'application/json')

               expect(response.status).toBe(201)
               expect(response.body.error).toBe(false)
               expect(typeof(response.body.data)).toBe("object")
          })

          test('Debería responder con un error controlado si no se envía el nombre', async () => {
               let response = await request(app).post('/api/v1/users')
               .send({
                    str_user: "Usuario para iniciar sesión",
                    bl_deleted:true,
                    str_password: "Conrtraseña segura"
               })
               .set('Accept', 'application/json')

               expect(response.status).toBe(500)
               expect(response.body.error).toBe(true)
               expect(response.body.data).toBe(null)
          })
     })

     describe('Actualizar datos de un usuario', () => {
          test('Debería actualizar correctamente los campos que se están pasando', async () => {
               let response = await request(app).put('/api/v1/users')
               .send({
                    int_id: 3,
                    str_name: "Nombre editado",
                    str_user: "usuario editado",
                    str_password: "contraseña editada",
                    bl_deleted: false,
               })
               .set('Accept', 'application/json')

               expect(response.status).toBe(202)
               expect(response.body.error).toBe(false)
               expect(response.body.data[0]).toBe(1)
          })

          test('Debería actualizar correctamente los campos que se están pasando', async () => {
               let response = await request(app).put('/api/v1/users')
               .send({
                    int_id: 2,
                    str_name: "Nombre doblemente actualizado"
               })
               .set('Accept', 'application/json')

               expect(response.status).toBe(202)
               expect(response.body.error).toBe(false)
               expect(response.body.data[0]).toBe(1)
          })


          test('Debería responder positivamente pero con un 0 si no se encontró el id', async () => {
               let response = await request(app).put('/api/v1/users')
               .send({
                    int_id: 250,
                    str_name: "Nombre de este usuario actualizado de nuevo, bueno, no"
               })
               .set('Accept', 'application/json')

               expect(response.status).toBe(202)
               expect(response.body.error).toBe(false)
               expect(response.body.data[0]).toBe(0)
          })

          test('Debería responder con un status ok pero los resultados de la actualización deberían ser 0', async () => {
               let response = await request(app).put('/api/v1/users')
               .send({
                    str_title: "Se prentende actualizar un registro pero no se está especificando cual",
               })
               .set('Accept', 'application/json')

               expect(response.status).toBe(202)
               expect(response.body.error).toBe(false)
               expect(response.body.data[0]).toBe(0)
          })
     })

     describe('Dar de baja un usuario', () => {
          test('Debería dar de baja el usuario especificado por el id', async () => {
               let response = await request(app).delete('/api/v1/users/2')
               expect(response.status).toBe(202)
               expect(response.body.error).toBe(false)
               expect(response.body.data[0]).toBe(1)
          })

          test('Si no se especifica el id debería lanzar un error 404', async () => {
               let response = await request(app).delete('/api/v1/users')
               expect(response.status).toBe(404)
          })

          test('Si se especifica un id que no existe entonces debería responder con un código 202 pero sin afectar ningun registro', async () => {
               let response = await request(app).delete('/api/v1/users/195')
               expect(response.status).toBe(202)
               expect(response.body.error).toBe(false)
               expect(response.body.data[0]).toBe(0)
          })
     })

     describe('Vincular un usuario con un proyecto', () => {
          test('Debería vincular el usuario con el proyecto especificado, porque ambos existen', async () => {
               let response = await request(app).post('/api/v1/users/2/join-to/project/3')
               expect(response.status).toBe(202)
               expect(response.body.error).toBe(false)
               expect(typeof(response.body.data)).toBe("object")
          })

          test('Si no se especifica el id de usuario debería lanzar un error 404', async () => {
               let response = await request(app).post('/api/v1/users//join-to/project/3')
               expect(response.status).toBe(404)
          })

          test('Si no se especifica el id de proyecto debería lanzar un error 404', async () => {
               let response = await request(app).post('/api/v1/users/5/join-to/project/')
               expect(response.status).toBe(404)
          })

          test('Si se especifica un id que no existe entonces debería responder con un error controlado', async () => {
               let response = await request(app).post('/api/v1/users/5/join-to/project/526')
               expect(response.status).toBe(500)
               expect(response.body.error).toBe(true)
               expect(response.body.data).toBe(null)
          })
     })

     describe('Des-vincular un usuario de un proyecto', () => {
          test('Debería eliminar la relacion entre usuario y el proyecto', async () => {
               let response = await request(app).delete('/api/v1/users/2/unlink/project/3')
               expect(response.status).toBe(202)
               expect(response.body.error).toBe(false)
               expect(response.body.data).toBeGreaterThanOrEqual(1)
          })

          test('Si no se especifica el id de usuario debería lanzar un error 404', async () => {
               let response = await request(app).delete('/api/v1/users//unlink/project/3')
               expect(response.status).toBe(404)
          })

          test('Si no se especifica el id de proyecto debería lanzar un error 404', async () => {
               let response = await request(app).delete('/api/v1/users/5/unlink/project/')
               expect(response.status).toBe(404)
          })

          test('Si se especifica un id que no existe debería responder con un codigo 202 pero sin realizar cambio alguno', async () => {
               let response = await request(app).delete('/api/v1/users/5/unlink/project/526')
               expect(response.status).toBe(202)
               expect(response.body.error).toBe(false)
               expect(response.body.data).toBe(0)
          })
     })


     describe('Agregar una tarea a un usuario', () => {
          test('Debería vincular el usuario con la tarea especificado, porque ambos existen', async () => {
               let response = await request(app).post('/api/v1/users/2/add/task/3')
               expect(response.status).toBe(202)
               expect(response.body.error).toBe(false)
               expect(typeof(response.body.data)).toBe("object")
          })

          test('Si no se especifica el id de usuario debería lanzar un error 404', async () => {
               let response = await request(app).post('/api/v1/users//add/task/3')
               expect(response.status).toBe(404)
          })

          test('Si no se especifica el id de la actividad debería lanzar un error 404', async () => {
               let response = await request(app).post('/api/v1/users/5/add/task/')
               expect(response.status).toBe(404)
          })

          test('Si se especifica un id que no existe entonces debería responder con un error controlado', async () => {
               let response = await request(app).post('/api/v1/users/5/add/task/526')
               expect(response.status).toBe(500)
               expect(response.body.error).toBe(true)
               expect(response.body.data).toBe(null)
          })
     })

     describe('Remover tareas al usuario', () => {
          test('Debería eliminar la relacion entre usuario y el proyecto', async () => {
               let response = await request(app).delete('/api/v1/users/2/remove/task/3')
               expect(response.status).toBe(202)
               expect(response.body.error).toBe(false)
               expect(response.body.data).toBeGreaterThanOrEqual(1)
          })

          test('Si no se especifica el id de usuario debería lanzar un error 404', async () => {
               let response = await request(app).delete('/api/v1/users//remove/task/3')
               expect(response.status).toBe(404)
          })

          test('Si no se especifica el id de la tarea debería lanzar un error 404', async () => {
               let response = await request(app).delete('/api/v1/users/5/remove/task/')
               expect(response.status).toBe(404)
          })

          test('Si se especifica un id que no existe debería responder con un codigo 202 pero sin realizar cambio alguno', async () => {
               let response = await request(app).delete('/api/v1/users/5/remove/task/526')
               expect(response.status).toBe(202)
               expect(response.body.error).toBe(false)
               expect(response.body.data).toBe(0)
          })
     })
})
