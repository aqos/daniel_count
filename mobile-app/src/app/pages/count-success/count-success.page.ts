import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-count-success',
  templateUrl: './count-success.page.html',
  styleUrls: ['./count-success.page.scss'],
})
export class CountSuccessPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onHome() {
    this.router.navigate(['/tabs']);
  }

}
