import React, { useState } from "react";
import BackDrop from "../../components/BackDrop";
import Container from "../../components/Container";
import SideDrawer from "../../components/SideDrawer";
import Title from "../../components/Title";
import Toolbar from "../../components/Toolbar";

export default function Home() {
    const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

    return (
        <Container>
            <Toolbar onClick={() => setSideDrawerOpen(!sideDrawerOpen)} />
            <SideDrawer show={sideDrawerOpen} />

            {
                sideDrawerOpen ?
                    <BackDrop onClick={() => setSideDrawerOpen(false)} />
                    :
                    null
            }

            <Title label="Home page"/>

            {/*<div className="mt-10 z-50">

            </div>*/}
        </Container>
    );
}