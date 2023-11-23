export type BikeCoord = {
    stolen_coordinates:[number, number]
}
    
export type Bikes = [Bike];

export type Bike = {
    title: string;
    id: string;
    frame_colors: string;
    date_stolen: number;
    serial: number;
    thumb: string;
    large_img: string;
    stolen_coordinates:[number, number]
}