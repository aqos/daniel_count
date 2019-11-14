import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-count-before',
  templateUrl: './count-before.page.html',
  styleUrls: ['./count-before.page.scss'],
})
export class CountBeforePage implements OnInit {
  password = '';
  wrongPassword = false;

  constructor(private router: Router, private storage: Storage) { }

  ngOnInit() {
  }

  requiredLength() {
    return this.password.length >= 8;
  }

  async onSubmit() {
    const goodPassword = localStorage.getItem('password');
    if (goodPassword !== this.password) {
      this.wrongPassword = true;
      return;
    }
    this.router.navigate(['/count-config']);
  }
}
