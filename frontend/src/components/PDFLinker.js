import axios from "axios";
import { useState } from 'react';
import { Button } from "react-bootstrap";

const PDFLinker = ({ fileName, displayName }) => {
    const [disabled, setDisabled] = useState(false);

    const showPDF = () => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        setDisabled(true);
        axios({
            method: "GET",
            url: "/api/file/" + fileName,
            responseType: 'blob',
            cancelToken: source.token,
        })
            .then(response => {
                const blob = new Blob([response.data], { type: 'application/pdf' });
                let name = fileName.endsWith("_syllabus.pdf") ? fileName : displayName + ".pdf";
                const url = "/web/viewer.html?file=" + encodeURIComponent(URL.createObjectURL(blob) + "#" + name);
                window.open(url);
                setDisabled(false);
            }
            ).catch(err => {
                if (!axios.isCancel(err)) {
                    window.open("/404", "_self");
                }
                setDisabled(false);
            })
        return () => source.cancel("Axios request cancelled");
    }

    return (
        <Button variant='outline-primary' className='pdf-link' onClick={showPDF} disabled={disabled}>
            {displayName}
        </Button>
    );
}

export default PDFLinker;