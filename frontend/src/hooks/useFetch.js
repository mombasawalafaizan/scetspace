import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();

        axios({
            method: "GET",
            url: url,
            cancelToken: source.token,
        })
            .then(response => {
                if (response.status === 200) {
                    setData(response.data);
                } else {
                    setError({ status: response.status, message: response.data });
                }
                setIsPending(false);
            }
            ).catch(err => {
                if (!axios.isCancel(err)) {
                    console.error(err.response.data);
                    setIsPending(false);
                    setError({ status: err.response.status, message: err.response.data });
                }
            })

        return () => source.cancel("Axios request cancelled");
    }, [url]);

    return { data, isPending, error };
}

export default useFetch;