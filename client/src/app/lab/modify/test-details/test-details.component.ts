import { Component, OnInit } from '@angular/core';
import { ModifyService } from './../modify.service';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css']
})
export class TestDetailsComponent implements OnInit {

  constructor(private modifyService: ModifyService) { }

  ngOnInit() {
    // this.modifyService.get() .subscribe(
    //   (response)=>{
    //     this.responseDatas = response;
    //   },
    //   (error)=>{
    //       //console.log("sorry error in server")
    //   });
    // }    
  }

}
