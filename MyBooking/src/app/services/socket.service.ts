import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public psocket:any;
  public data : any;
  constructor(private socket: Socket) {
     }
  fetchSeats() {
		// this.socket.emit('my broadcast');
    this.socket.on('my broadcast', (data: any) => {
      console.log('Emitted-------',data);
      this.data = data
    });
    return this.data;
	} 

//   key: "B_23"
// price: 12
// seatLabel: "B 21"
// seatNo: "21"
  
  setupSocketConnection(seatObj: any, id:string) {
    this.psocket = io(environment.socketUrl, {transports: ['websocket']});
    // this.psocket = io(environment.socketUrl);
    this.socket.emit('my broadcast', {'id':id,'seatObj':seatObj});
  }

  
	// listen event
	onCheckSeats() {
		return this.socket.fromEvent('my broadcast');
	}
}
