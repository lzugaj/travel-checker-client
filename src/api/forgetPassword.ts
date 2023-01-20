import * as paths from './paths';
import { ForgotPasswordDto } from "../dto/types";

export async function forgetPassword(data: ForgotPasswordDto): Promise<string> {
    const response = await fetch(paths.travelChecker.forgetPassword, {
        method: "POST",
        credentials: "include",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    console.log("ForgotPasswordDto: " + JSON.stringify(data));
    return !response.ok ? response.text() : "";
}