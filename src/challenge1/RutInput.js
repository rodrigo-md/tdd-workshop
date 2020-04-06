import React, { useState } from "react";

const MAX_CHARS = 12;
const MIN_LENGTH_HYPHEN = 8;
const VALID_STATES_REG = /^\d*(\d+.\d+)*-?((\d|k|K))?$/;

const RutInput = () => {
    const [value, setValue] = useState("");

    const handleChange = (e) => {
        const { value } = e.target;

        if (value.length <= MAX_CHARS && VALID_STATES_REG.test(value)) {
            let digits = value;
            let verifier = "";

            if (value.length >= MIN_LENGTH_HYPHEN) {
                digits = value.slice(0, value.length - 1);
                verifier =
                    value[value.length - 1] === "-"
                        ? "-"
                        : `-${value[value.length - 1]}`;
            }
            const newValue = digits
                .replace(/(\.|-)/g, "")
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            setValue(`${newValue}${verifier}`.toLowerCase());
        }
    };

    return <input data-testid="input" value={value} onChange={handleChange} />;
};

export default RutInput;
