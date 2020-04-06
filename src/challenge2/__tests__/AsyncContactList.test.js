import React from "react";
import { screen, render, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import AsyncContactList from "../AsyncContactList";

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
    xit("should call api service and display a loading icon", () => {});

    xit("should list the contact information when the api response is succeded and has data", async () => {});

    xit("should display a message of no data when the api response has no data", async () => {});
});
