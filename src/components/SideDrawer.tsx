import React from "react";
import Container from "./Container";
import "./SideDrawer.css";

type SideDrawerProps = {
    show: boolean;
}

export default function SideDrawer({ show }: SideDrawerProps) {
    let drawerClasses = ["side-drawer"];

    if (show) {
        drawerClasses = ["side-drawer", "open"];
    }

    return (
        <Container>
            {
                show ?
                    (
                        <Container>
                            <nav className={drawerClasses.join(" ")}>
                                <ul>
                                    <div className="text-center mb-5">
                                        <li>
                                            <img
                                                src="https://d5nunyagcicgy.cloudfront.net/external_assets/hero_examples/hair_beach_v391182663/original.jpeg"
                                                alt="Avatar"
                                                className="inline object-cover w-14 h-14 mr-2 rounded-full"
                                            />
                                        </li>
                                        <li>
                                            <a className="italic" href="/">Luka Žugaj</a>
                                        </li>
                                    </div>
                                    <div className="ml-5">
                                        <li>
                                            <a href="/">Home</a>
                                        </li>
                                        <li>
                                            <a href="/">My Profile</a>
                                        </li>
                                        <li>
                                            <a href="/">My Places</a>
                                        </li>
                                        <li>
                                            <a href="/">Statistics</a>
                                        </li>
                                        <li>
                                            <a href="/">Settings</a>
                                        </li>
                                        <li>
                                            <a href="/">Logout</a>
                                        </li>
                                    </div>
                                </ul>
                            </nav>
                        </Container>
                    ) : null
            }
        </Container>
    );
}