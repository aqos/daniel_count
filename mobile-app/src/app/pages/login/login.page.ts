import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../models/LoginData';
import { AuthService } from 'src/app/services/auth.service';
import { GenericResponse } from '../../models/GenericResponse';
import { Router } from '@angular/router';
import { NotificationTools, Utils } from '../../models/utils';

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
    private utils: Utils
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

  async onLogin() {
    const data = new Login();
    data.name = this.loginForm.get('name').value;
    data.password = this.loginForm.get('password').value;
    const loading = await this.notificationTools.createLoading('Veuillez patienter svp...');
    loading.present();
    // tslint:disable-next-line: max-line-length
    const alertError = await this.notificationTools.createAlert('Alerte', '<p class="text-danger">Identifiant ou mot de passe invalide !</p>');
    this.authService.login(data).subscribe(
      (response: GenericResponse) => {
        this.utils.store('token', response.token);
        this.utils.store('password', data.password);
        loading.dismiss();
        this.router.navigate(['/tabs']);
      },
      error => {
        loading.dismiss();
        console.log('Login page error: ', error);
        alertError.present();
      }
    );
  }

  onRegister() {
    this.router.navigate(['/register']);
  }
}
