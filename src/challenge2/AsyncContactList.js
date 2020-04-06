import React, { useEffect, useState } from "react";
import axios from "axios";

const AsyncContactList = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            const response = await axios.get("http://localhost:3000/contact");
            setLoading(false);
            setData(response.data);
        }

        fetchData();
    }, []);

    return (
        <div>
            {data.length ? (
                <div role="list">
                    {data.map((value) => (
                        <div key={`contact-${value.id}`} role="listitem">
                            {value.name}
                        </div>
                    ))}
                </div>
            ) : (
                <div>user has no data</div>
            )}
            {loading && <div data-testid="loading"></div>}
        </div>
    );
};

export default AsyncContactList;
