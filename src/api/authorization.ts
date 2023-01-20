import { AuthorizationDto } from "../dto/types";
import * as paths from './paths';
import { User } from "./types";

export async function authorization(data: AuthorizationDto): Promise<User> {
    const response = await fetch(paths.travelChecker.authorization, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    return response.ok ? response.json() : null;
}