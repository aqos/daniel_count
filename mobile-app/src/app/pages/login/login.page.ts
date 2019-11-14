import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../models/LoginData';
import { AuthService } from 'src/app/services/auth.service';
import { GenericResponse } from '../../models/GenericResponse';
import { Router } from '@angular/router';
import { NotificationTools } from '../../models/utils';

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
        this.authService.setToken(response.token);
        localStorage.setItem('password', data.password);
        this.authService.user().subscribe(
          (resp) => {
            console.log(resp.user);
            localStorage.setItem('user', JSON.stringify(resp.user));
            loading.dismiss();
            this.router.navigate(['/tabs']);
          },
          error => {
            loading.dismiss();
            console.log('Login page error: ', error);
            alertError.present();
          }
        );
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
