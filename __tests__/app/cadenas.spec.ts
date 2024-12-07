import { contarCoincidenciasEnCadena } from '../../src/app/cadenas'

describe('Batería de pruebas sobre cadenas.ts', () => {
    test('Debe retornar cantidad de coincidencias de cadena dentro de cadena', () => {
        const CadenaPrincipal = "Hola, soy una cadena de texto"
        let CadenaBuscada = "na"
        expect(contarCoincidenciasEnCadena(CadenaPrincipal, CadenaBuscada)).toBe(2)

        CadenaBuscada = "Hola"
        expect(contarCoincidenciasEnCadena(CadenaPrincipal, CadenaBuscada)).toBe(1)

        CadenaBuscada = "hola"
        expect(contarCoincidenciasEnCadena(CadenaPrincipal, CadenaBuscada)).toBe(0)

        expect(contarCoincidenciasEnCadena("", "")).toBe(0)
        
    });

    test('Debe lanzar error cuando los parámetros no están definidos', () => {
        let a : any = undefined
        let b : any = undefined

        expect(() => contarCoincidenciasEnCadena(a, b)).toThrow()
    });
});