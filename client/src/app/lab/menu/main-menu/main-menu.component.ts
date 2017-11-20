import { Component, OnInit } from '@angular/core';
// import { SearchService } from './search.service';
// import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { ENV } from "./../../../env";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
  // providers: [SearchService]
})
export class MainMenuComponent implements OnInit {

constructor(private router:Router) { }

  // constructor(private searchService: SearchService) {
  //   this.searchService.search(this.searchTerm$)
  //     .subscribe(results => {
  //       this.results = results.results;
  //     });
  // }

setclass = 0;
public getUrl = window.location.pathname;
public menulists=[];
public user;
  ngOnInit() {
	  this.user = ENV.userName
	  //console.log(this.user)
	this.menulists = JSON.parse(localStorage.getItem('SelectMenuIten'));
	//console.log('I am Menu',this.menulists)
  }
  Logout_btn(){	
	   localStorage.removeItem("SelectMenuIten")
	   localStorage.removeItem("access_token")
	   localStorage.removeItem("keyTime") 
	   this.router.navigate(['/']);
  }
//   menulists = [
//   		{fa:'fa-tachometer', status:true, link:'/lab/dashboard', name:'Dashboard'},
//   		{fa:'fa-bed', status:true, link:'/lab/test-booking', name:'test booking'},
//   		{fa:'fa-calendar-plus-o', status:true, link:'/lab/reports', name:'reports'},
//   		{fa:'fa-plus-square', status:true, link:'/lab/add-transaction', name:'add transaction'},
//   		{fa:'fa-eye', status:true, link:'/lab/view-transaction', name:'view transaction'},
//   		{fa:'fa-list', status:true, link:'/lab/user', name:'User'},
// 	     	{fa:'fa-cogs', status:true, link:'/lab/modify', name:'Setting'},
// 		    {fa:'fa-question', status:true, link:'/lab/help', name:'Help'},
		  
//   		// {status:true, link:'/lab/settings', name:'settings'},  		
//   		// {fa:'fa-question-circle-o', status:true, link:'/lab/help', name:'help'}
//   ]



	// json = {
	// 	  "squadName": "Super hero squad",
	// 	  "homeTown": "Metro City",
	// 	  "formed": 2016,
	// 	  "secretBase": "Super tower",
	// 	  "active": true,
	// 	  "members": [
	// 	    {
	// 	      "name": "Molecule Man",
	// 	      "age": 29,
	// 	      "secretIdentity": "Dan Jukes",
	// 	      "powers": [
	// 	        "Radiation resistance",
	// 	        "Turning tiny",
	// 	        "Radiation blast"
	// 	      ]
	// 	    },
	// 	    {
	// 	      "name": "Madame Uppercut",
	// 	      "age": 39,
	// 	      "secretIdentity": "Jane Wilson",
	// 	      "powers": [
	// 	        "Million tonne punch",
	// 	        "Damage resistance",
	// 	        "Superhuman reflexes"
	// 	      ]
	// 	    },
	// 	    {
	// 	      "name": "Eternal Flame",
	// 	      "age": 1000000,
	// 	      "secretIdentity": "Unknown",
	// 	      "powers": [
	// 	        "Immortality",
	// 	        "Heat Immunity",
	// 	        "Inferno",
	// 	        "Teleportation",
	// 	        "Interdimensional travel"
	// 	      ]
	// 	    }
	// 	  ]
	// 	}

	addClass(value){
		this.setclass = value;
	}

}
