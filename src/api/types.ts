type Role = {
    name: string,
}

type Coordinate = {
    id: number,
    longitude: number,
    latitude: number,
}

type Markers = {
    id: number,
    name: string,
    description: string,
    eventDate: Date,
    grade: number,
    shouldVisitAgain: boolean,
    coordinates: Coordinate[],
}

export type User = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    roles: Role[],
    markers: Markers[],
}

export type Error = {
    localDateTime: string,
    httpStatusCode: number,
    httpStatus: string,
    message: string,
    path: string,
}