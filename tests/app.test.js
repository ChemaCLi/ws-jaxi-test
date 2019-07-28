const request = require ('supertest')
const app = require('../app')

describe('Tests de peticiones del módulo app.js', () => {
     test('Debería responder con un status 202 a la petición GET en la ruta principal /api/v1', async () => {
          let response = await request(app).get('/api/v1')
          expect(response.body.status.code).toBe(202)
     })
})