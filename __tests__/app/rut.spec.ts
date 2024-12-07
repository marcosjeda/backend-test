import { validarRUT } from '../../src/app/rut'

describe('Batería de pruebas sobre validador de RUT', () => {
    test('Debe validar correctamente un rut', () => {
        let rut = "11111111-1"
        expect(validarRUT(rut)).toBeTruthy()
        
        rut = "11111111-2"
        expect(validarRUT(rut)).toBeFalsy()
        
        rut = '1-9'
        expect(validarRUT(rut)).toBeTruthy()
        
        rut = '1'
        expect(validarRUT(rut)).toBeFalsy()
        
        rut = '1-g'
        expect(validarRUT(rut)).toBeFalsy()
        
        rut = '6k'
        expect(validarRUT(rut)).toBeTruthy()
        
        rut = '14-0'
        expect(validarRUT(rut)).toBeTruthy()
        
        rut = 'asd'
        expect(validarRUT(rut)).toBeFalsy()
    });

    test('Debe lanzar errores al recibir parámetros que no sean cadenas', () => {
        let rut : any = undefined
        expect(() => validarRUT( rut )).toThrow()
    });
});