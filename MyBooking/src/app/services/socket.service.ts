import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public psocket:any;
  constructor(private socket: Socket) {
     }
  fetchSeats() {
		// this.socket.emit('my broadcast');
    this.socket.on('my broadcast', (data: string) => {
      console.log('Emitted',data);
    });
    
	} 
  
  setupSocketConnection(msg: string) {
    this.psocket = io(environment.socketUrl, {transports: ['websocket']});
    // this.psocket = io(environment.socketUrl);
    this.socket.emit('my broadcast', msg);
  }

  
	// listen event
	onCheckSeats() {
		return this.socket.fromEvent('my broadcast');
	}
}
