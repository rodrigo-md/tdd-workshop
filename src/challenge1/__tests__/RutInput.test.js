import React from "react";
import { render, fireEvent } from "@testing-library/react";
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
        const { getByTestId } = render(<RutInput />);

        fireEvent.change(getByTestId("input"), { target: { value: "a.-a" } });

        expect(getByTestId("input").value).toEqual("");
    });

    it("should format render value adding a point as preffix given three consecutives digits", () => {
        const { getByTestId } = render(<RutInput />);
        const cases = [
            ["1234", "1.234"],
            ["12345", "12.345"],
            ["123456", "123.456"],
            ["1234567", "1.234.567"],
        ];

        cases.forEach(([value, expected]) => {
            fireEvent.change(getByTestId("input"), { target: { value } });

            expect(getByTestId("input").value).toEqual(expected);
        });
    });

    it("should separate last character using an hyphen for strings with length greater than 7 characters", () => {
        const { getByTestId } = render(<RutInput />);

        fireEvent.change(getByTestId("input"), {
            target: { value: "10.234.567k" },
        });

        expect(getByTestId("input").value).toEqual("10.234.567-k");
    });

    it("should format to lowercase", () => {
        const { getByTestId } = render(<RutInput />);
        const currentValue = "10.123.783";

        fireEvent.change(getByTestId("input"), {
            target: { value: `${currentValue}K` },
        });

        expect(getByTestId("input").value).toEqual(`${currentValue}-k`);
    });

    // secret tests

    it("should not override the current value when it will be exceed the max of digits", () => {
        const { getByTestId } = render(<RutInput />);
        const currentValue = "10.123.783-5";

        fireEvent.change(getByTestId("input"), {
            target: { value: currentValue },
        });

        fireEvent.change(getByTestId("input"), {
            target: { value: `${currentValue}1` },
        });

        expect(getByTestId("input").value).toEqual(currentValue);
    });

    it("should not modify valid ruts", () => {
        const { getByTestId } = render(<RutInput />);
        const currentValue = "10.123.783-5";

        fireEvent.change(getByTestId("input"), {
            target: { value: currentValue },
        });

        expect(getByTestId("input").value).toEqual(currentValue);
    });
});
