import React from "react";
import {
    render,
    fireEvent,
    waitFor,
    screen,
    getByTestId,
    queryByTestId,
    prettyDOM
} from "@testing-library/react";
import "@testing-library/jest-dom";
import RutInput from "../RutInput";

/**
 * COMO Usuario de banco al intentar ingresar mi Rut NECESITO verlo formateado
 * PARA facilitar el ingreso de los digitos
 *
 * Criterios de aceptacion
 *
 * 1. El input solo debe aceptar digitos y el caracter K o k
 * 2. El maximo numero de digitos es de 9
 * 3. Al ingresar digitos estos se van formateando usando puntos cada 3 digitos de derecha a izquierda
 *      Ej si ingreso 123  -> 123
 *         si ingreso 1234 -> 1.234
 *         si ingreso 12345123 -> 12.345.123
 * 4. Al ingresar sobre 7 digitos el ultimo digito es separado del resto usando un guion
 *      Ej si ingreso 12345678 -> 1.234.567-8
 * 5. El input debe ser formateado a minusculas
 */

describe("RutInput component", () => {
    it("should not display characters that arent digits", () => {
        const { queryByTestId } = render(<RutInput />);
        const input = "aaaaa";
        const element = queryByTestId("input");

        fireEvent.change(element, { target: { value: input } });

        expect(queryByTestId("input").value).toBe("");
    });

    it.each`
        value       | expected
        ${'1234'}   | ${'1.234'}
        ${'12345'}  | ${'12.345'}
        ${'123456'} | ${'123.456'}
    `("should format render value adding a point as preffix given three consecutives digits [$value, $expected]", ({value, expected}) => {
        const {queryByTestId} = render(<RutInput />);
        const element = queryByTestId("input");

        fireEvent.change(element, { target: { value } });

        expect(queryByTestId("input").value).toEqual(expected);
    });

    it("should separate last character using an hyphen for strings with length greater than 7 characters", () => {
        const { queryByTestId } = render(<RutInput />);
        const input = "12345678";
        const expected = "1.234.567-8"
        const element = queryByTestId("input");

        fireEvent.change(element, { target: { value: input } });

        expect(queryByTestId("input").value).toBe(expected);
    });

    xit("should format input value to lowercase", () => {});
});
