import React from "react";
import Container from "./Container";
import SideMenu from "./SideMenu";

type ToolBarProps = {
    onClick: () => void;
}

export default function Toolbar({ onClick }: ToolBarProps) {
    return (
        <Container>
            <header className="fixed top-0 left-0 w-full h-56px bg-cyan-900 z-50">
                <nav className="flex items-center h-full p-5">
                    <div />
                    <div>
                        <SideMenu onClick={onClick} />
                    </div>
                    <div className="ml-5">
                        <a className="text-stone-100 no-underline" href="/">Travel Checker</a>
                    </div>
                </nav>
            </header>
        </Container>
    );
}