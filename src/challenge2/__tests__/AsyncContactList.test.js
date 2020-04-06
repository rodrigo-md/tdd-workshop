import React from "react";
import {
    screen,
    render,
    act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import AsyncContactList from "../AsyncContactList";

jest.mock("axios", () => ({
    get: jest.fn(),
    _esm: true,
}));

/**
 * COMO usuario logueado NECESITO ver mi lista de mis contactos guardados
 *
 * Criterios de aceptacion:
 *
 * 1. Debe obtener la informacion desde el servidor y mostrar un icono de loading mientras consulta.
 * 2. Si la consulta es exitosa y contiene datos, estos deben listarse en orden alfabetico por el campo nombre.
 * 3. Si la consulta es exitosa pero no contiene datos, se debe mostrar indicando la falta de datos.
 * 4. Si la consulta es fallida se debe mostrar un mensaje de error.
 */

describe("AsyncContactList component", () => {
    it("should call api service and display a loading icon", () => {
        axios.get.mockImplementation(
            () =>
                new Promise(
                    () => {},
                    () => {}
                )
        );

        render(<AsyncContactList />);

        expect(axios.get).toHaveBeenCalled();
        expect(screen.queryByTestId("loading")).not.toBeNull();
    });

    it("should list the contact information when the api response is succeded and has data", async () => {
        const contacts = [{ id: 1, name: "Rodrigo", phone: "+56912345" }];
        const promise = Promise.resolve({ data: contacts });
        axios.get.mockImplementation(() => promise);

        const { queryByTestId, findAllByRole } = render(<AsyncContactList />);

        // wait until re-render DOM after promise is resolved
        await act(async () => promise);

        expect(axios.get).toHaveBeenCalled();
        expect(queryByTestId("loading")).not.toBeInTheDocument();
        expect((await findAllByRole("listitem")).length).toBe(1);
    });

    it('should display a message of no data when the api response has no data', async() => {
        const promise = Promise.resolve({ data: [] });
        axios.get.mockImplementation(() => promise);

        const { queryByTestId, queryByRole, queryByText } = render(<AsyncContactList />);

        // wait until re-render DOM after promise is resolved
        await act(async () => promise);

        expect(axios.get).toHaveBeenCalled();
        expect(queryByTestId("loading")).not.toBeInTheDocument();
        expect(queryByRole('listitem')).not.toBeInTheDocument();
        expect(queryByText(/user has no data/i)).toBeInTheDocument();

    });
});
