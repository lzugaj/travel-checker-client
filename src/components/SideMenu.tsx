import React from "react";
import Container from "./Container";

type SideMenuProps = {
    onClick: () => void;
}

export default function SideMenu({ onClick }: SideMenuProps) {
    return (
        <Container>
            <button onClick={onClick}>
                <div className="space-y-2">
                    <div className="w-8 h-0.5 bg-gray-600" />
                    <div className="w-8 h-0.5 bg-gray-600" />
                    <div className="w-8 h-0.5 bg-gray-600" />
                </div>
            </button>
        </Container>
    );
}