import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../models/LoginData';
import { AuthService } from 'src/app/services/auth.service';
import { GenericResponse } from '../../models/GenericResponse';
import { Router } from '@angular/router';
import { NotificationTools, setItemInLocalStorage } from '../../models/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationTools: NotificationTools,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    const data = new Login();
    data.name = this.loginForm.get('name').value;
    data.password = this.loginForm.get('password').value;
    this.notificationTools.presentLoading('Veuillez patienter svp...');
    this.authService.login(data).subscribe(
      (response: GenericResponse) => {
        setItemInLocalStorage('token', response.token);
        setItemInLocalStorage('password', data.password);
        this.notificationTools.dismissLoading();
        this.router.navigate(['/tabs']);
      },
      error => {
        this.notificationTools.dismissLoading();
        console.log('Register page error: ', error);
        this.notificationTools.presentAlert('Alerte', '<p class="text-danger">Une erreur est survenue, veuillez réessayer !</p>');
      }
    );
  }

  onRegister() {
    this.router.navigate(['/register']);
  }
}
