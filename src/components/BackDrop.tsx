import React from "react";
import Container from "./Container";

type BackDropProps = {
    onClick: () => void;
}

export default function BackDrop({ onClick }: BackDropProps) {
    return (
        <Container>
            <div className="fixed top-0 left-0 w-full h-full bg-neutral-400 z-100" onClick={onClick} />
        </Container>
    );
}