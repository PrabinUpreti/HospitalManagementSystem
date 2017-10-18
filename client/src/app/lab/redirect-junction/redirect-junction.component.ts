import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect-junction',
  templateUrl: './redirect-junction.component.html',
  styleUrls: ['./redirect-junction.component.css']
})
export class RedirectJunctionComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    this.router.navigate(['/lab/test-booking']);
  }

}
