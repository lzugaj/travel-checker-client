import * as paths from './paths';
import { ResetPasswordDto } from "../dto/types";

export async function resetPassword(data: ResetPasswordDto, token: string): Promise<string> {
    const response = await fetch(paths.travelChecker.resetPassword + token, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    console.log("ResetPasswordDto: " + JSON.stringify(data));
    return !response.ok ? response.text() : "";
}