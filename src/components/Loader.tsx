import React from "react";

import Container from "./Container";
import LoadingOverlay from 'react-loading-overlay-ts';
import { RingLoader } from "react-spinners";

type LoaderProps = {
    children?: React.ReactNode;
    loading: boolean;
    text: string;
}

export default function Loader({ children, loading, text }: LoaderProps) {
    return (
        <Container>
            <LoadingOverlay
                spinner={ <RingLoader size={90} /> }
                active={ loading }
                text={ text }
            >
                { children }
            </LoadingOverlay>
        </Container>
    );
}