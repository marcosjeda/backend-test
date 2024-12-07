import app from '../src/server.js';
import request from 'supertest';

import { configuration } from '../src/config.js'

describe("Bateria de test de servidor", () => {

    test("Pruebas sobre el endpoint /", async () => {
        return await request(app)
            .get('/')
            .expect(200)
            .expect("Content-Type", /text/)
            .then(response => {
                expect(response.text).toBe(`Hola mundo al usuario ${ configuration.username }`);
            });
    });

    test("Pruebas sobre el endpoint /api-key", async () => {
        return await request(app)
            .get('/api-key')
            .expect(200)
            .expect("Content-Type", /text/)
            .then(response => {
                expect(response.text).toBe(`la apikey de mi aplicacion es: ${configuration.apikey}`);
            });
    });

    test("Pruebas sobre el endpoint /validar-rut", async () => {
        let rut : any = "11.111.111-1"
        await request(app)
            .get(`/validar-rut?rut=${ rut }`)
            .expect(200)
            .expect("Content-Type", /text/)
            .then(response => {
                expect(response.text).toBe(`El rut suministrado (${rut}) es : valido`);
            });
        
        rut = undefined
        await request(app)
            .get(`/validar-rut?rut=${ rut }`)
            .expect(200)
            .expect("Content-Type", /text/)
            .then(response => {
                expect(response.text).toBe(`El rut suministrado (${rut}) es : invalido`);
            });
        
        rut = 'asdf'
        await request(app)
            .get(`/validar-rut?rut=${ rut }`)
            .expect(200)
            .expect("Content-Type", /text/)
            .then(response => {
                expect(response.text).toBe(`El rut suministrado (${rut}) es : invalido`);
            });
        
        await request(app)
            .get(`/validar-rut`)
            .expect(500)
            .expect("Content-Type", /text/)
            .then(response => {
                expect(response.text).toContain('TypeError');
            });
    });

    test("Pruebas sobre el endpoint /buscar-subcadena", async () => {
        let cadena : any = "Hola mundo"
        let subCadena : any = "mundo"
        await request(app)
            .get(`/buscar-subcadena?cadena=${ cadena }&subcadena=${subCadena}`)
            .expect(200)
            .expect("Content-Type", /text/)
            .then(response => {
                expect(response.text).toBe(`La cadeja "${ cadena }" tiene 1 repeticiones de la subcadena "${ subCadena }"`);
            });
        
        cadena = "texto de prueba"
        subCadena = "asd"

        await request(app)
            .get(`/buscar-subcadena?cadena=${ cadena }&subcadena=${subCadena}`)
            .expect(200)
            .expect("Content-Type", /text/)
            .then(response => {
                expect(response.text).toBe(`La cadeja "${ cadena }" tiene 0 repeticiones de la subcadena "${ subCadena }"`);
            });

        cadena = "otra cadena para otra prueba"
        subCadena = "otra"

        await request(app)
            .get(`/buscar-subcadena?cadena=${ cadena }&subcadena=${subCadena}`)
            .expect(200)
            .expect("Content-Type", /text/)
            .then(response => {
                expect(response.text).toBe(`La cadeja "${ cadena }" tiene 2 repeticiones de la subcadena "${ subCadena }"`);
            });
        
        await request(app)
            .get(`/buscar-subcadena`)
            .expect(500)
            .expect("Content-Type", /text/)
            .then(response => {
                expect(response.text).toContain('TypeError');
            });
    });
});