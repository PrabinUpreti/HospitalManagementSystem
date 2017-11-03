import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-redirect-junction',
  templateUrl: './redirect-junction.component.html',
  styleUrls: ['./redirect-junction.component.css']
})
export class RedirectJunctionComponent implements OnInit {

  constructor(private router:Router,private route: ActivatedRoute,) { }
  public routeParameter;
  public paramId;

  ngOnInit() {

    this.routeParameter = this.route.params
    .subscribe(params => {
      console.log(params);
      this.paramId = params['id'];
      if(this.paramId == 'fromtestbooking'){
        this.nevigateToTestbooking();
      }
      if(this.paramId == 'fromreport'){
        this.nevigateToReport();
      }
      if(this.paramId == 'fromaddtransaction'){
        this.nevigateToAddTransaction();
      }
    });

  }

  nevigateToTestbooking(){
    this.router.navigate(['/lab/test-booking']);
  }
  nevigateToReport(){
    this.router.navigate(['/lab/reports']);
  }
  nevigateToAddTransaction(){
    console.log('look')
    this.router.navigate(['/lab/add-transaction']);
  }

}
