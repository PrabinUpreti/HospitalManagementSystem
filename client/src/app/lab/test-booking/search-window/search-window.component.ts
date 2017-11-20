import { Component, OnInit,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-search-window',
  templateUrl: './search-window.component.html',
  styleUrls: ['./search-window.component.css']
})
export class SearchWindowComponent implements OnInit {

  @Output() selectedPatient = new EventEmitter<any>();

  searchlists = [
    {id: '1', name:'prabin', address:'hetauda'},
    {id: '2', name:'pravash', address:'hetauda'},
    {id: '3', name:'pk', address:'hetauda'},
    {id: '4', name:'don', address:'hetauda'},
    {id: '5', name:'man', address:'hetauda'},
    {id: '6', name:'banana', address:'hetauda'},
    {id: '7', name:'rat', address:'hetauda'},
    {id: '8', name:'pat', address:'hetauda'},
    {id: '9', name:'kick', address:'hetauda'},
    {id: '10', name:'lick', address:'hetauda'},
    {id: '11', name:'tick', address:'hetauda'},
    {id: '12', name:'tac', address:'hetauda'},
    {id: '13', name:'peo', address:'hetauda'},
    {id: '14', name:'teo', address:'hetauda'},
    {id: '15', name:'lio', address:'hetauda'},
    {id: '16', name:'deo', address:'hetauda'},
  ];
  constructor() { }

  ngOnInit() {
  }

  setSearchedData(index){
    //console.log(index)
    this.selectedPatient.emit(index)
  }

}