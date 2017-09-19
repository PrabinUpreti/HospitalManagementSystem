import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbutton',
  templateUrl: './checkbutton.component.html',
  styleUrls: ['./checkbutton.component.css']
})
export class CheckbuttonComponent implements OnInit {

@Output() readyBtn = new EventEmitter<any>();
@Output() notreadyBtn = new EventEmitter<any>();

 constructor(){}
  ngOnInit() {
  }
 ready(){
 let id=1;
  this.readyBtn.emit(id)
  }
 notready(){
 let id=0;
  this.notreadyBtn.emit(id)
    }
}

