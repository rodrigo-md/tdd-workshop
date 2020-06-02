import React, { useState } from "react";

const VALID_INPUTS_REG = /^\d*(\d+.\d+)*-?((\d|k|K))?$/;
const ADD_DIGITS_SEPARATOR = /\B(?=(\d{3})+(?!\d))/g;

const getVerifyDigit = (value) =>
    value[value.length - 1] === "-" ? "-" : `-${value[value.length - 1]}`;

const RutInput = (props) => {
    const [value, setValue] = useState("");

    const onChange = (e) => {
        const { value } = e.target;
        if (VALID_INPUTS_REG.test(value)) {
            let digits = value;
            let verifyDigit = "";

            if (value.length >= 8) {
                digits = value.slice(0, value.length - 1);
                verifyDigit = getVerifyDigit(value);
            }
            const newValue = digits.replace(ADD_DIGITS_SEPARATOR, ".");
            setValue(`${newValue}${verifyDigit}`);
        }
    };

    return (
        <div>
            <label htmlFor="Rut">Ingrese un rut</label>
            <input
                data-testid="input"
                type="text"
                name="Rut"
                value={value}
                onChange={onChange}
            ></input>
        </div>
    );
};

export default RutInput;
