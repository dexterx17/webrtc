import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';

const URL_WEBSOCKET = "ws://10.211.159.30:9000";

export interface Message{
	ev:String
}

@Injectable()
export class ChatService {

	public messages: Subject<Message>;

	constructor(wsService: WebsocketService) {
		this.messages = <Subject<Message>>wsService
			.connect(URL_WEBSOCKET)
			.map((response: MessageEvent): Message => {
				console.log('mapping data' + response.data);
				let data = JSON.parse(response.data);
				console.log('mapeado' + data);
				return data;
			})
	}



}
