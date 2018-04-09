import { ILocation } from './location';

export interface Client {
	id: String;
	tipo: String;
	cliente: String;
	location: ILocation;
}
