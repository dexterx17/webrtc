import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class WebsocketService {

  constructor() { }

  private subjetc: Rx.Subject<MessageEvent>;

  public connect(url): Rx.Subject<MessageEvent> {
  	if (!this.subjetc){
  		this.subjetc = this.create(url);
  		console.log('Conectado a ' + url);
  	}
  	return this.subjetc;
  }

  private create(url): Rx.Subject<MessageEvent> {
  	let ws = new WebSocket(url);

  	let observable = Rx.Observable.create(
  		(obs: Rx.Observer<MessageEvent>) => {
  			ws.onmessage = obs.next.bind(obs);
  			ws.onerror = obs.error.bind(obs);
  			ws.onclose = obs.complete.bind(obs);
  			return ws.close.bind(ws);
  		})
  	let observer = {
  		next: (data: Object) => {
  			if ( ws.readyState === WebSocket.OPEN) {
  				ws.send(JSON.stringify(data));
  			}
  		}
  	}
  	return Rx.Subject.create(observer, observable);
  }
}