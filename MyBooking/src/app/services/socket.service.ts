import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public psocket:any;
  public data : any;
  public sub = new BehaviorSubject<any>(null)
  constructor(private socket: Socket) {
     }

  fetchSeats() {
		// this.socket.emit('my broadcast');
    this.socket.on('my broadcast', (data: any) => {
      console.log('Data Emitted------',data);
      this.data = data
    this.setData(this.data)
    });
    return this.data;
	} 

  getData(): Observable<any>{
    return this.sub.asObservable();
  }

  setData(data: any){
    this.sub.next(data)
  }


  
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
