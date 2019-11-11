import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utils } from '../../models/utils';

@Component({
  selector: 'app-count-before',
  templateUrl: './count-before.page.html',
  styleUrls: ['./count-before.page.scss'],
})
export class CountBeforePage implements OnInit {
  password = '';
  wrongPassword = false;

  constructor(private router: Router, private utils: Utils) { }

  ngOnInit() {
  }

  requiredLength() {
    return this.password.length >= 8;
  }

  onSubmit() {
    const goodPassword = this.utils.get('password');
    if (goodPassword !== this.password) {
      this.wrongPassword = true;
      return;
    }
    this.router.navigate(['/count-config']);
  }
}
