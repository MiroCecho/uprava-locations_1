export interface ILocation {
    id: number;
    parentId: number;
    name: string;
    typeName: string;
    description: string;
    gpsLat: number;
    gpsLong: number;
    children: ILocation[] | null;
}