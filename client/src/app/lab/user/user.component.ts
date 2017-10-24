import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
private Menulists=[];
private UserData;
  constructor(private router:Router) {
    this.Menulists= JSON.parse(localStorage.getItem('SelectMenuIten'));
    console.log(this.Menulists)
    for(let x in this.Menulists){
      if(this.Menulists[x].link !== this.router.url){
        //  this.router.navigate(['**'])
      }
    }
   }
  ngOnInit() {
  }
  OnUserData(Data){
    this.UserData=Data;

  }
}
