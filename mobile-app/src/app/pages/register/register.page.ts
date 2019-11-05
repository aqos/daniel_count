import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Register } from '../../models/Register';
import { AuthService } from 'src/app/services/auth.service';
import { GenericResponse } from '../../models/GenericResponse';
import { Router } from '@angular/router';
import { NotificationTools } from '../../models/utils';
import {Location} from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationTools: NotificationTools,
    private location: Location
  ) { }

  buildForm() {
    this.registerForm = this.formBuilder.group({
      last_name: ['', Validators.required],
      first_name: ['', Validators.required],
      birth_place: ['', Validators.required],
      birth_date: ['', Validators.required],
      piece_number: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.buildForm();
  }

  async onRegister() {
    const data = new Register();
    data.last_name = this.registerForm.get('last_name').value;
    data.first_name = this.registerForm.get('first_name').value;
    data.birth_place = this.registerForm.get('birth_place').value;
    data.birth_date = this.registerForm.get('birth_date').value;
    data.piece_number = this.registerForm.get('piece_number').value;
    data.phone = this.registerForm.get('phone').value;
    data.email = this.registerForm.get('email').value;

    this.notificationTools.presentLoading('Veuillez patienter svp...');

    this.authService.register(data).subscribe(
      (response: GenericResponse) => {
        this.notificationTools.dismissLoading();
        this.router.navigate(['/register-success']);
      },
      error => {
        this.notificationTools.dismissLoading();
        console.log('Register page error: ', error);
        this.notificationTools.presentAlert('Alerte', '<p class="text-danger">Une erreur est survenue, veuillez réessayer !</p>');
      }
    );
  }

  onGoBack() {
    this.location.back();
  }

}
