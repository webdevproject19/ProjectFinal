import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../shared/services/provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public login = '';
  public password = '';

  constructor(private provider: ProviderService, private router: Router) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/']);
    }
  }

  clear() {
    this.login = '';
    this.password = '';
  }

  auth() {
    if (!this.login || !this.password) {
      alert('Please, provide full information');
      this.clear();
    } else {
      this.provider.auth(this.login, this.password).then(res => {
        this.clear();
        localStorage.setItem('token', res.token);
        localStorage.setItem('name', res.name);
        if (res.is_admin) {
          localStorage.setItem('isAdmin', 'True');
        } else {
          localStorage.setItem('isAdmin', 'False');
        }
        window.location.reload();
      }).catch(res => {
        alert('Wrong login or password. Please, try again or sign up');
        this.clear();
      });
    }
  }

}
