export interface Property {
    _id: string;
    index: number;
    type: string;
    location: string;
    rent: number;
    rooms: number;
    address: string;
    parking: string;
    Image: string[];
  }
export interface Type{
  _id: string;
  type : string
}
export interface Range{
  _id: string;
  range : string
}
export interface Room{
  _id: string;
  bedrooms : string
}
export interface location{
  _id: string;
  locationType : string
}
export interface CodeResponse{
  OtpGenrated: boolean;
  Otp: number 
}