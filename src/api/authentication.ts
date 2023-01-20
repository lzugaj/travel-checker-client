import * as paths from './paths';
import { AuthenticationDto } from "../dto/types";

export async function authentication(data: AuthenticationDto): Promise<boolean> {
    const response = await fetch(paths.travelChecker.authentication, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    return response.ok;
}