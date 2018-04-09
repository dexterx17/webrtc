import { Component } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { ChatService } from './chat.service';
import { Constantes } from './constantes';

@Component({
  selector: 'arsi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WebsocketService, ChatService]
})

export class AppComponent {
  title = 'arsi';


  constructor(private chatService: ChatService){
  	chatService.messages.subscribe(msg =>{
  		console.log('Response from websocket: '+msg);
      switch (msg.ev) {
        case Constantes.MSG_INSTRUCCION:
          // code...
          break;
        
        default:
          console.log('evento no indentificado');
  		    console.log(msg);
          break;
      }
  	});
  }

  private message = {
  	ev: 'id',
  	cliente: 'yo',
  	tipo : 'visualizador'
  }

  sendMsg() {
  	console.log('new msg para websocket');
  	this.chatService.messages.next(this.message);
  //	this.message.message = '';
  }
}
