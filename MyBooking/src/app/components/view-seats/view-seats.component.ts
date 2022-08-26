import { keyframes } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Subscription } from 'rxjs';
import { SocketService } from 'src/app/services/socket.service';
import { seatLayout } from 'src/constant';

@Component({
  selector: 'app-view-seats',
  templateUrl: './view-seats.component.html',
  styleUrls: ['./view-seats.component.scss']
})
export class ViewSeatsComponent implements OnInit {
  movies: any[] = [];
  disabledSeats:any = []
  public seatLayout = seatLayout;
  public seat_map:any = [];
  public seatLayoutConfig = {
    isRowsLabel : true,
    isRowWisePricing : true,
    isNewSeatNumber : true
  }
  public cart:any = {
    selectedSeats : [],
    seatsToSave : [],
    totalPrice : 0,
    cartId : "",
    eventId : 0
  };
  

  title = '';
  uniqueId: any;

  constructor(
		private socketService: SocketService,public router:Router,public toastr: ToastrManager 
	) { 
    // this.toastr.warningToastr('Please select the future date', 'Warning')
  }

  ngOnInit(): void {
  
    this.uniqueId = Math.random()
    this.socketService.getData().subscribe(data=>{
      console.log('Updated-'+JSON.stringify(data))
      this.updateDisabled(data)
    })
    // const op = this.socketService.fetchSeats()
    
    this.generateSeats(this.seatLayout);
  }
  check(evt: any){
console.log('---',evt.target.value)
    this.socketService.fetchSeats();
  }


  public generateSeats ( data : any[] )
  {
    
      if( data.length > 0 )
      {
        var seatCount = 1;
        for (let i = 0; i < data.length; i++) {
          var rowLabel = "";
          var item_map = data[i].seat_obj;

          //Get seats label and prices
          rowLabel = "Row "+item_map[0].seat_row_name + " - ";
          if( item_map[ item_map.length - 1].seat_row_name != " " )
          {
            rowLabel += item_map[ item_map.length - 1].seat_row_name;
          }
          else
          {
            rowLabel += item_map[ item_map.length - 2].seat_row_name;
          }
          rowLabel += " : Rs. " + data[i].ticket_price;
          
          item_map.forEach((map_element: { seat_row_name: string; layout: string; }) => {
            var mapObj : any = {
              "seatRowLabel" : map_element.seat_row_name,
              "seats" : [],
              "seatPricingInformation" : rowLabel
            };
            rowLabel = "";
            var seatValArr = map_element.layout.split('');
            if( this.seatLayoutConfig.isNewSeatNumber )
            {
              seatCount = 1; //Reset the seat label counter for new row
            }
            var totalItemCounter = 1;
            seatValArr.forEach(item => {
              let seatObj:any = {};
               seatObj["key"] =  map_element.seat_row_name+"_"+totalItemCounter
               seatObj["price"] = data[i]["ticket_price"]
               seatObj["status"] = "available"
              if( item != '_')
              {
                seatObj["seatLabel"] = map_element.seat_row_name+" "+seatCount;
                if(seatCount < 10)
                { seatObj["seatNo"] = "0"+seatCount; }
                else { seatObj["seatNo"] = ""+seatCount; }
                
                seatCount++;
              }
              else
              {
                seatObj["seatLabel"] = "";
              }
              totalItemCounter++;
              mapObj["seats"].push(seatObj);
            });
            console.log(" \n\n\n Seat Objects " , mapObj);
            this.seat_map.push(mapObj);

          });
        }

      }
      console.log('/////'+JSON.stringify(this.seat_map))
      
  }

  

  public selectSeat( seatObject : any )
  {
    this.socketService.setupSocketConnection(seatObject,this.uniqueId)
    const data = this.socketService.fetchSeats();
  //  this.updateDisabled(data)
    if(seatObject.status == "available")
    {
      seatObject.status = "booked";
      this.cart.selectedSeats.push(seatObject.seatLabel);
      this.cart.seatsToSave.push(seatObject.key);
      this.cart.totalPrice += seatObject.price;
    }
    else if( seatObject.status = "booked" )
    {
      seatObject.status = "available";
      var seat_index = this.cart.selectedSeats.indexOf(seatObject.seatLabel);
      if( seat_index > -1)
      {
        this.cart.selectedSeats.splice(seat_index , 1);
        this.cart.seatsToSave.splice(seat_index , 1);
        this.cart.totalPrice -= seatObject.price;
      }
      
    } if(this.disabledSeats.includes(seatObject.seatLabel)){

    }
  }
  updateDisabled(data: any) {
    let bookedSeats: any[] = []
    data ? bookedSeats = (data) : bookedSeats = []
    console.log('@@@'+bookedSeats);
    this.disabledSeats = []
// There are the seats which are hold for other user who's selected 
  if(bookedSeats.length){
  bookedSeats = bookedSeats.filter((ele: any)=> ele['id']!= this.uniqueId)

    bookedSeats.forEach((obj: { seatList: any; }) => {
      this.disabledSeats = this.disabledSeats.concat(obj.seatList)
    });
    this.disabledSeats = [...new Set(this.disabledSeats)]
  }
    console.log('---'+this.disabledSeats);
    // key, seatLabel
    this.seat_map.forEach((mainObj:any) => {
      for(let i=0;i<this.disabledSeats.length;i++){
      if(mainObj['seatRowLabel']==this.disabledSeats[i][0]){
        mainObj['seats'].map((element: any)=>Number(element['seatNo'])== Number((this.disabledSeats[i].slice(-2)).replace(/\s/g, "")) ? element['status'] = 'unavailable': element['status']= element['status'])
        // mainObj['seats'].forEach((obj:any) => {
        //   const temp = (this.disabledSeats[i].slice(-2)).replace(/\s/g, "")
        //   console.log('Comparee '+Number(obj['seatNo']),'--->'+Number(temp))
        //   if(Number(obj['seatNo'])== Number(temp) ){
        //     obj['status'] = 'unavailable';
          
        //   }
        // }); 
      }
    }
    });

  }
  proceedBooking(){
    this.router.navigate(['/payment-gateway'])
  }
  

  public blockSeats(seatsToBlock : string)
  {
    if(seatsToBlock != "")
    {
      var seatToBook = seatsToBlock.split(',');
      for (let index = 0; index < seatToBook.length; index++) {
        var seat =  seatToBook[index]+"";
        var seatSplitArr = seat.split("_");
        console.log("Split seat: " , seatSplitArr);
        for (let index2 = 0; index2 < this.seat_map.length; index2++) {
          const element = this.seat_map[index2];
          if(element.seatRowLabel == seatSplitArr[0])
          {
            var seatObj = element.seats[parseInt(seatSplitArr[1]) - 1];
            if(seatObj)
            {
              console.log("\n\n\nFount Seat to block: " , seatObj);
              seatObj["status"] = "unavailable";
              this.seat_map[index2]["seats"][parseInt(seatSplitArr[1]) - 1] = seatObj;
              console.log("\n\n\nSeat Obj" , seatObj);
              console.log(this.seat_map[index2]["seats"][parseInt(seatSplitArr[1]) - 1]);
              break;
            }
             
          }
        }
       
      }
    }
    
  }
}
