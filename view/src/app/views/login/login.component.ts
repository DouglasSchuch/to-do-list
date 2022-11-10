import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { GeneralService } from 'src/app/services/general.service';
import { RouteService } from 'src/app/services/route.service';
import { Login, User } from '../../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hidePassword: boolean = false;
  errMessage: string = '';
  timeoutErr: any = null;
  isLogin: boolean = true;

  form: FormGroup | null = null;

  constructor(
    private routeService: RouteService
    , private general: GeneralService
    , public fb: FormBuilder
    , private app: AppComponent
  ) { }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.form = this.fb.group({ email: [''], password: [''] });
  }

  onVisiblePassword(event: any) {
    if (event.detail > 0) {
      this.hidePassword = !this.hidePassword
    }
  }

  onLogin() {
    const email = this.form?.get('email')?.value;
    const password = this.form?.get('password')?.value;
    if (email && password) {
      this.routeService.login(new Login(email, password)).subscribe((data: any) => {
        if (data?.access_token) {
          this.general.user = data.user;
          this.general.setCookie('TOKEN', data.access_token);
        } else {
          this.setMessageErr('Usuário ou senha inválido');
        }
      }, (err: any) => this.setMessageErr(err.error.message || err.message))
    } else {
      this.setMessageErr('Insira email e senha para continuar');
    }
  }

  onToggleRegister() {
    this.isLogin = !this.isLogin;
  }

  setMessageErr(text: string) {
    if (this.timeoutErr) {
      clearTimeout(this.timeoutErr);
      this.timeoutErr = null;
    }
    this.errMessage = text;
    this.timeoutErr = setTimeout(() => this.errMessage = '', 5000);
  }

  onRegister() {
    const email = this.form?.get('email')?.value;
    const password = this.form?.get('password')?.value;
    if (email && password) {
      this.routeService.createUser(new User(email, password)).subscribe((userId: number) => {
        if (userId) {
          this.onToggleRegister();
        } else {
          this.setMessageErr('E-mail já cadastrado')
        }
      }, (err: any) => this.setMessageErr(err.error.message || err.message))
    } else {
      this.setMessageErr('Insira e-mail e senha para continuar');
    }
  }
}